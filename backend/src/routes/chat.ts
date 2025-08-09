import express, { Request, Response } from 'express';
import { ChatSession, ChatMessage } from '@/models/Chat.js';
import { aiService } from '@/services/ai.js';
import { logger } from '@/config/logger.js';
import { aiApiRateLimiterMiddleware } from '@/middleware/rateLimiter.js';
import { checkApiLimits, incrementApiUsage } from '@/middleware/auth.js';
import { asyncHandler, createError } from '@/middleware/errorHandler.js';

const router = express.Router();

// Create new chat session
router.post('/sessions', asyncHandler(async (req: Request, res: Response) => {
  const { title, type = 'general', settings } = req.body;

  if (!title || title.trim().length === 0) {
    throw createError(400, 'Session title is required', 'MISSING_TITLE');
  }

  try {
    const session = new ChatSession({
      userId: req.userId,
      title: title.trim(),
      type,
      status: 'active',
      metadata: {
        totalMessages: 0,
        topics: [],
        language: 'en'
      },
      settings: {
        aiPersonality: settings?.aiPersonality || 'friendly',
        responseLength: settings?.responseLength || 'medium',
        creativity: settings?.creativity || 0.7,
        formality: settings?.formality || 0.5,
        memoryEnabled: settings?.memoryEnabled !== false,
        voiceEnabled: settings?.voiceEnabled || false,
        ...settings
      }
    });

    await session.save();

    logger.info('New chat session created:', {
      userId: req.userId,
      sessionId: session._id,
      title
    });

    res.status(201).json({
      success: true,
      session: session.toJSON()
    });

  } catch (error) {
    logger.error('Error creating chat session:', error);
    throw createError(500, 'Failed to create chat session', 'SESSION_CREATE_ERROR');
  }
}));

// Get user's chat sessions
router.get('/sessions', asyncHandler(async (req: Request, res: Response) => {
  const { page = 1, limit = 20, status = 'active' } = req.query;

  const skip = (Number(page) - 1) * Number(limit);

  try {
    const [sessions, total] = await Promise.all([
      ChatSession.find({
        userId: req.userId,
        status
      })
        .sort({ updatedAt: -1 })
        .skip(skip)
        .limit(Number(limit))
        .lean(),
      ChatSession.countDocuments({
        userId: req.userId,
        status
      })
    ]);

    res.json({
      sessions,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    });

  } catch (error) {
    logger.error('Error fetching chat sessions:', error);
    throw createError(500, 'Failed to fetch chat sessions', 'SESSIONS_FETCH_ERROR');
  }
}));

// Get specific chat session
router.get('/sessions/:sessionId', asyncHandler(async (req: Request, res: Response) => {
  const { sessionId } = req.params;

  try {
    const session = await ChatSession.findOne({
      _id: sessionId,
      userId: req.userId
    });

    if (!session) {
      throw createError(404, 'Chat session not found', 'SESSION_NOT_FOUND');
    }

    res.json({
      session: session.toJSON()
    });

  } catch (error) {
    if (error.statusCode) throw error;
    logger.error('Error fetching chat session:', error);
    throw createError(500, 'Failed to fetch chat session', 'SESSION_FETCH_ERROR');
  }
}));

// Send message in chat session
router.post('/sessions/:sessionId/messages',
  aiApiRateLimiterMiddleware,
  checkApiLimits,
  asyncHandler(async (req: Request, res: Response) => {
    const { sessionId } = req.params;
    const { content, attachments } = req.body;

    if (!content || content.trim().length === 0) {
      throw createError(400, 'Message content is required', 'MISSING_CONTENT');
    }

    if (content.length > 10000) {
      throw createError(400, 'Message too long (max 10000 characters)', 'MESSAGE_TOO_LONG');
    }

    try {
      // Verify session ownership
      const session = await ChatSession.findOne({
        _id: sessionId,
        userId: req.userId,
        status: 'active'
      });

      if (!session) {
        throw createError(404, 'Chat session not found or inactive', 'SESSION_NOT_FOUND');
      }

      // Create user message
      const userMessage = new ChatMessage({
        sessionId: session._id,
        userId: req.userId,
        role: 'user',
        content: content.trim(),
        metadata: {
          attachments: attachments || []
        },
        timestamp: new Date()
      });

      await userMessage.save();

      // Get conversation history for context
      const recentMessages = await ChatMessage.find({
        sessionId: session._id
      })
        .sort({ timestamp: -1 })
        .limit(10)
        .lean();

      // Prepare messages for AI (reverse to chronological order)
      const conversationHistory = recentMessages
        .reverse()
        .map(msg => ({
          role: msg.role as 'user' | 'assistant' | 'system',
          content: msg.content
        }));

      // Generate AI response
      const startTime = Date.now();
      
      const aiResponse = await aiService.generateChatCompletion(
        conversationHistory,
        {
          temperature: session.settings.creativity,
          maxTokens: session.settings.responseLength === 'short' ? 500 :
                     session.settings.responseLength === 'long' ? 2000 : 1000
        }
      );

      const processingTime = Date.now() - startTime;

      // Create AI message
      const aiMessage = new ChatMessage({
        sessionId: session._id,
        userId: req.userId,
        role: 'assistant',
        content: aiResponse.choices[0]?.message?.content || 'I apologize, but I couldn\'t generate a response.',
        metadata: {
          model: aiResponse.model,
          tokenCount: aiResponse.usage?.total_tokens,
          processingTime,
          temperature: session.settings.creativity
        },
        timestamp: new Date()
      });

      await aiMessage.save();

      // Update session metadata
      await ChatSession.findByIdAndUpdate(session._id, {
        $inc: { 'metadata.totalMessages': 2 },
        $set: { 'metadata.lastMessageAt': new Date() }
      });

      // Increment API usage
      await incrementApiUsage(req, res, () => {});

      logger.info('Chat message processed:', {
        userId: req.userId,
        sessionId: session._id,
        processingTime,
        tokenCount: aiResponse.usage?.total_tokens
      });

      res.json({
        success: true,
        messages: [
          userMessage.toJSON(),
          aiMessage.toJSON()
        ],
        metadata: {
          processingTime,
          tokenCount: aiResponse.usage?.total_tokens,
          model: aiResponse.model
        }
      });

    } catch (error: any) {
      logger.error('Chat message error:', error);
      throw createError(500, 'Failed to process chat message', 'MESSAGE_ERROR', error.message);
    }
  })
);

// Get messages from chat session
router.get('/sessions/:sessionId/messages', asyncHandler(async (req: Request, res: Response) => {
  const { sessionId } = req.params;
  const { page = 1, limit = 50 } = req.query;

  const skip = (Number(page) - 1) * Number(limit);

  try {
    // Verify session ownership
    const session = await ChatSession.findOne({
      _id: sessionId,
      userId: req.userId
    });

    if (!session) {
      throw createError(404, 'Chat session not found', 'SESSION_NOT_FOUND');
    }

    const [messages, total] = await Promise.all([
      ChatMessage.find({ sessionId })
        .sort({ timestamp: -1 })
        .skip(skip)
        .limit(Number(limit))
        .lean(),
      ChatMessage.countDocuments({ sessionId })
    ]);

    res.json({
      messages: messages.reverse(), // Return in chronological order
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    });

  } catch (error) {
    if (error.statusCode) throw error;
    logger.error('Error fetching chat messages:', error);
    throw createError(500, 'Failed to fetch chat messages', 'MESSAGES_FETCH_ERROR');
  }
}));

// Update chat session
router.put('/sessions/:sessionId', asyncHandler(async (req: Request, res: Response) => {
  const { sessionId } = req.params;
  const { title, settings, status } = req.body;

  try {
    const session = await ChatSession.findOne({
      _id: sessionId,
      userId: req.userId
    });

    if (!session) {
      throw createError(404, 'Chat session not found', 'SESSION_NOT_FOUND');
    }

    const updates: any = {};

    if (title !== undefined) {
      if (!title.trim()) {
        throw createError(400, 'Title cannot be empty', 'INVALID_TITLE');
      }
      updates.title = title.trim();
    }

    if (settings !== undefined) {
      updates.settings = { ...session.settings, ...settings };
    }

    if (status !== undefined) {
      if (!['active', 'archived', 'deleted'].includes(status)) {
        throw createError(400, 'Invalid status', 'INVALID_STATUS');
      }
      updates.status = status;
    }

    const updatedSession = await ChatSession.findByIdAndUpdate(
      sessionId,
      { $set: updates },
      { new: true }
    );

    logger.info('Chat session updated:', {
      userId: req.userId,
      sessionId,
      updates: Object.keys(updates)
    });

    res.json({
      success: true,
      session: updatedSession?.toJSON()
    });

  } catch (error) {
    if (error.statusCode) throw error;
    logger.error('Error updating chat session:', error);
    throw createError(500, 'Failed to update chat session', 'SESSION_UPDATE_ERROR');
  }
}));

// Delete chat session
router.delete('/sessions/:sessionId', asyncHandler(async (req: Request, res: Response) => {
  const { sessionId } = req.params;

  try {
    const session = await ChatSession.findOne({
      _id: sessionId,
      userId: req.userId
    });

    if (!session) {
      throw createError(404, 'Chat session not found', 'SESSION_NOT_FOUND');
    }

    // Soft delete - mark as deleted
    await ChatSession.findByIdAndUpdate(sessionId, {
      $set: { status: 'deleted' }
    });

    // Optionally delete associated messages
    await ChatMessage.deleteMany({ sessionId });

    logger.info('Chat session deleted:', {
      userId: req.userId,
      sessionId
    });

    res.json({
      success: true,
      message: 'Chat session deleted successfully'
    });

  } catch (error) {
    if (error.statusCode) throw error;
    logger.error('Error deleting chat session:', error);
    throw createError(500, 'Failed to delete chat session', 'SESSION_DELETE_ERROR');
  }
}));

// Generate voice response
router.post('/sessions/:sessionId/voice',
  aiApiRateLimiterMiddleware,
  checkApiLimits,
  asyncHandler(async (req: Request, res: Response) => {
    const { sessionId } = req.params;
    const { messageId, voice = 'Rachel' } = req.body;

    try {
      const message = await ChatMessage.findOne({
        _id: messageId,
        sessionId,
        role: 'assistant'
      });

      if (!message) {
        throw createError(404, 'Message not found', 'MESSAGE_NOT_FOUND');
      }

      // Generate speech
      const audioBuffer = await aiService.generateSpeech(message.content, {
        voice,
        stability: 0.75,
        similarity_boost: 0.75
      });

      res.set({
        'Content-Type': 'audio/mpeg',
        'Content-Length': audioBuffer.length.toString(),
        'Cache-Control': 'public, max-age=3600'
      });

      res.send(audioBuffer);

    } catch (error: any) {
      logger.error('Voice generation error:', error);
      throw createError(500, 'Failed to generate voice', 'VOICE_ERROR', error.message);
    }
  })
);

export default router;
