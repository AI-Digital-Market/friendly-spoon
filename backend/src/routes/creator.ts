import express, { Request, Response } from 'express';
import { aiService } from '@/services/ai.js';
import { logger } from '@/config/logger.js';
import { aiApiRateLimiterMiddleware } from '@/middleware/rateLimiter.js';
import { checkApiLimits, incrementApiUsage } from '@/middleware/auth.js';
import { asyncHandler, createError } from '@/middleware/errorHandler.js';

const router = express.Router();

// Generate creative text content
router.post('/generate/text',
  aiApiRateLimiterMiddleware,
  checkApiLimits,
  asyncHandler(async (req: Request, res: Response) => {
    const { prompt, type = 'text', options = {} } = req.body;

    if (!prompt || typeof prompt !== 'string') {
      throw createError(400, 'Prompt is required for content generation', 'MISSING_PROMPT');
    }

    if (prompt.length > 1000) {
      throw createError(400, 'Prompt too long (max 1000 characters)', 'PROMPT_TOO_LONG');
    }

    const validTypes = ['text', 'ideas', 'story', 'poem', 'script', 'blog', 'article', 'email', 'social'];
    if (!validTypes.includes(type)) {
      throw createError(400, `Invalid content type. Must be one of: ${validTypes.join(', ')}`, 'INVALID_TYPE');
    }

    try {
      const startTime = Date.now();
      
      const result = await aiService.generateCreativeContent(prompt, type, {
        creativity: options.creativity || 0.8,
        maxTokens: options.maxTokens || 2000,
        temperature: options.temperature || 0.7
      });

      const processingTime = Date.now() - startTime;

      // Increment API usage
      await incrementApiUsage(req, res, () => {});

      logger.info('Creative content generated:', {
        userId: req.userId,
        type,
        promptLength: prompt.length,
        processingTime,
        contentLength: result.content?.length
      });

      res.json({
        success: true,
        result: {
          ...result,
          processingTime
        }
      });

    } catch (error: any) {
      logger.error('Creative content generation error:', error);
      throw createError(500, 'Failed to generate creative content', 'GENERATION_ERROR', error.message);
    }
  })
);

// Generate ideas and brainstorming
router.post('/brainstorm',
  aiApiRateLimiterMiddleware,
  checkApiLimits,
  asyncHandler(async (req: Request, res: Response) => {
    const { topic, category, count = 5, options = {} } = req.body;

    if (!topic || typeof topic !== 'string') {
      throw createError(400, 'Topic is required for brainstorming', 'MISSING_TOPIC');
    }

    try {
      const brainstormPrompt = `Generate ${count} creative and innovative ideas for: ${topic}
      ${category ? `Category: ${category}` : ''}
      
      Please provide diverse, practical, and creative ideas. Format as a JSON array with each idea having:
      - title: Brief title
      - description: Detailed description
      - feasibility: Low/Medium/High
      - category: The main category
      - tags: Relevant tags array`;

      const result = await aiService.generateChatCompletion([
        {
          role: 'system',
          content: 'You are a creative brainstorming assistant that generates innovative, practical ideas.'
        },
        {
          role: 'user',
          content: brainstormPrompt
        }
      ], {
        temperature: 0.9,
        maxTokens: 1500
      });

      let ideas;
      try {
        ideas = JSON.parse(result.choices[0]?.message?.content || '[]');
      } catch (parseError) {
        // Fallback if JSON parsing fails
        ideas = [{
          title: 'Creative Exploration',
          description: result.choices[0]?.message?.content || 'Ideas generated but formatting failed',
          feasibility: 'Medium',
          category: category || 'General',
          tags: [topic]
        }];
      }

      await incrementApiUsage(req, res, () => {});

      logger.info('Ideas generated:', {
        userId: req.userId,
        topic,
        category,
        ideaCount: ideas.length
      });

      res.json({
        success: true,
        topic,
        category,
        ideas,
        metadata: {
          count: ideas.length,
          model: result.model,
          generated: new Date().toISOString()
        }
      });

    } catch (error: any) {
      logger.error('Brainstorming error:', error);
      throw createError(500, 'Failed to generate ideas', 'BRAINSTORM_ERROR', error.message);
    }
  })
);

// Image enhancement and analysis
router.post('/image/analyze',
  aiApiRateLimiterMiddleware,
  checkApiLimits,
  asyncHandler(async (req: Request, res: Response) => {
    const { imageUrl, analysisType = 'general' } = req.body;

    if (!imageUrl) {
      throw createError(400, 'Image URL is required', 'MISSING_IMAGE_URL');
    }

    try {
      // Download image
      const fetch = (await import('node-fetch')).default;
      const response = await fetch(imageUrl);
      
      if (!response.ok) {
        throw createError(400, 'Failed to fetch image from URL', 'IMAGE_FETCH_ERROR');
      }

      const imageBuffer = Buffer.from(await response.arrayBuffer());

      // Analyze image
      const analysis = await aiService.analyzeImage(imageBuffer, {
        analysisType
      });

      await incrementApiUsage(req, res, () => {});

      logger.info('Image analyzed:', {
        userId: req.userId,
        imageUrl,
        analysisType,
        resultCount: analysis.length
      });

      res.json({
        success: true,
        analysis,
        metadata: {
          imageUrl,
          analysisType,
          analyzed: new Date().toISOString()
        }
      });

    } catch (error: any) {
      logger.error('Image analysis error:', error);
      throw createError(500, 'Failed to analyze image', 'IMAGE_ANALYSIS_ERROR', error.message);
    }
  })
);

// Code generation and programming assistance
router.post('/code/generate',
  aiApiRateLimiterMiddleware,
  checkApiLimits,
  asyncHandler(async (req: Request, res: Response) => {
    const { description, language = 'javascript', framework, complexity = 'medium' } = req.body;

    if (!description) {
      throw createError(400, 'Code description is required', 'MISSING_DESCRIPTION');
    }

    try {
      const codePrompt = `Generate ${language} code for: ${description}
      ${framework ? `Framework: ${framework}` : ''}
      Complexity: ${complexity}
      
      Please provide:
      1. Clean, well-commented code
      2. Best practices implementation
      3. Error handling where appropriate
      4. Usage examples if applicable
      
      Format the response as JSON with:
      - code: The main code
      - explanation: Brief explanation
      - usage: Usage examples
      - dependencies: Required dependencies`;

      const result = await aiService.generateChatCompletion([
        {
          role: 'system',
          content: `You are an expert ${language} developer. Generate high-quality, production-ready code with best practices.`
        },
        {
          role: 'user',
          content: codePrompt
        }
      ], {
        temperature: 0.3,
        maxTokens: 2000
      });

      let codeResult;
      try {
        codeResult = JSON.parse(result.choices[0]?.message?.content || '{}');
      } catch (parseError) {
        codeResult = {
          code: result.choices[0]?.message?.content || '',
          explanation: 'Code generated but structured parsing failed',
          usage: 'See code above',
          dependencies: []
        };
      }

      await incrementApiUsage(req, res, () => {});

      logger.info('Code generated:', {
        userId: req.userId,
        language,
        framework,
        complexity,
        codeLength: codeResult.code?.length
      });

      res.json({
        success: true,
        result: {
          ...codeResult,
          language,
          framework,
          complexity
        },
        metadata: {
          generated: new Date().toISOString(),
          model: result.model
        }
      });

    } catch (error: any) {
      logger.error('Code generation error:', error);
      throw createError(500, 'Failed to generate code', 'CODE_GENERATION_ERROR', error.message);
    }
  })
);

// Content optimization and improvement
router.post('/optimize',
  aiApiRateLimiterMiddleware,
  checkApiLimits,
  asyncHandler(async (req: Request, res: Response) => {
    const { content, optimizationType = 'general', targetAudience, goals } = req.body;

    if (!content) {
      throw createError(400, 'Content is required for optimization', 'MISSING_CONTENT');
    }

    if (content.length > 5000) {
      throw createError(400, 'Content too long (max 5000 characters)', 'CONTENT_TOO_LONG');
    }

    try {
      const optimizationPrompt = `Optimize this content for ${optimizationType}:
      
      Original Content:
      "${content}"
      
      ${targetAudience ? `Target Audience: ${targetAudience}` : ''}
      ${goals ? `Goals: ${goals}` : ''}
      
      Please provide:
      1. Optimized version
      2. Key improvements made
      3. SEO suggestions (if applicable)
      4. Readability score improvement
      
      Format as JSON with optimized_content, improvements, seo_suggestions, readability_notes`;

      const result = await aiService.generateChatCompletion([
        {
          role: 'system',
          content: 'You are a content optimization expert specializing in improving clarity, engagement, and effectiveness.'
        },
        {
          role: 'user',
          content: optimizationPrompt
        }
      ], {
        temperature: 0.4,
        maxTokens: 2000
      });

      let optimization;
      try {
        optimization = JSON.parse(result.choices[0]?.message?.content || '{}');
      } catch (parseError) {
        optimization = {
          optimized_content: result.choices[0]?.message?.content || content,
          improvements: ['Content processed but structured parsing failed'],
          seo_suggestions: [],
          readability_notes: 'See optimized content above'
        };
      }

      await incrementApiUsage(req, res, () => {});

      logger.info('Content optimized:', {
        userId: req.userId,
        optimizationType,
        originalLength: content.length,
        optimizedLength: optimization.optimized_content?.length
      });

      res.json({
        success: true,
        original: {
          content,
          length: content.length
        },
        optimized: {
          content: optimization.optimized_content,
          length: optimization.optimized_content?.length,
          improvements: optimization.improvements,
          seo_suggestions: optimization.seo_suggestions,
          readability_notes: optimization.readability_notes
        },
        metadata: {
          type: optimizationType,
          targetAudience,
          goals,
          optimized: new Date().toISOString()
        }
      });

    } catch (error: any) {
      logger.error('Content optimization error:', error);
      throw createError(500, 'Failed to optimize content', 'OPTIMIZATION_ERROR', error.message);
    }
  })
);

export default router;
