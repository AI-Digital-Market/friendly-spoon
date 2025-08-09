import express, { Request, Response } from 'express';
import { MoodEntry, MoodPattern } from '@/models/Mood.js';
import { aiService } from '@/services/ai.js';
import { logger } from '@/config/logger.js';
import { aiApiRateLimiterMiddleware } from '@/middleware/rateLimiter.js';
import { checkApiLimits, incrementApiUsage } from '@/middleware/auth.js';
import { asyncHandler, createError } from '@/middleware/errorHandler.js';

const router = express.Router();

// Analyze mood from text
router.post('/analyze', 
  aiApiRateLimiterMiddleware,
  checkApiLimits,
  asyncHandler(async (req: Request, res: Response) => {
    const { text, context, options } = req.body;

    if (!text || typeof text !== 'string') {
      throw createError(400, 'Text input is required for mood analysis', 'MISSING_TEXT');
    }

    if (text.length > 2000) {
      throw createError(400, 'Text input too long (max 2000 characters)', 'TEXT_TOO_LONG');
    }

    try {
      // Analyze mood using AI service
      const analysis = await aiService.analyzeMood(text, options);

      // Create mood entry
      const moodEntry = new MoodEntry({
        userId: req.userId,
        date: new Date(),
        timestamp: new Date(),
        moodScore: analysis.moodScore || 50,
        primaryEmotion: analysis.primaryEmotion || 'neutral',
        emotions: analysis.emotions || {},
        sentiment: analysis.sentiment || { polarity: 0, subjectivity: 0.5, confidence: 0.5 },
        textInput: text,
        inputType: 'text',
        inputMetadata: {
          wordCount: text.split(/\s+/).length,
          language: 'en',
          processingTime: Date.now(),
          confidence: analysis.confidence || 0.5
        },
        context: context || {},
        insights: {
          patterns: analysis.indicators || [],
          trends: [],
          recommendations: analysis.recommendations || [],
          riskFactors: [],
          positiveFactors: []
        },
        tags: options?.tags || [],
        isPrivate: options?.isPrivate !== false,
        source: 'automatic'
      });

      await moodEntry.save();

      // Increment API usage
      await incrementApiUsage(req, res, () => {});

      logger.info('Mood analysis completed:', {
        userId: req.userId,
        moodScore: analysis.moodScore,
        primaryEmotion: analysis.primaryEmotion
      });

      res.json({
        success: true,
        moodEntry: moodEntry.toJSON(),
        analysis: {
          ...analysis,
          processingTime: Date.now() - moodEntry.timestamp.getTime()
        }
      });

    } catch (error: any) {
      logger.error('Mood analysis error:', error);
      throw createError(500, 'Failed to analyze mood', 'ANALYSIS_ERROR', error.message);
    }
  })
);

// Get mood history
router.get('/history', asyncHandler(async (req: Request, res: Response) => {
  const { 
    page = 1, 
    limit = 20, 
    startDate, 
    endDate, 
    emotion, 
    minScore, 
    maxScore 
  } = req.query;

  const skip = (Number(page) - 1) * Number(limit);
  const query: any = { userId: req.userId };

  // Date range filter
  if (startDate || endDate) {
    query.date = {};
    if (startDate) query.date.$gte = new Date(startDate as string);
    if (endDate) query.date.$lte = new Date(endDate as string);
  }

  // Emotion filter
  if (emotion) {
    query.primaryEmotion = emotion;
  }

  // Score range filter
  if (minScore || maxScore) {
    query.moodScore = {};
    if (minScore) query.moodScore.$gte = Number(minScore);
    if (maxScore) query.moodScore.$lte = Number(maxScore);
  }

  try {
    const [entries, total] = await Promise.all([
      MoodEntry.find(query)
        .sort({ timestamp: -1 })
        .skip(skip)
        .limit(Number(limit))
        .lean(),
      MoodEntry.countDocuments(query)
    ]);

    res.json({
      entries,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    });

  } catch (error) {
    logger.error('Error fetching mood history:', error);
    throw createError(500, 'Failed to fetch mood history', 'FETCH_ERROR');
  }
}));

// Get mood insights
router.get('/insights', asyncHandler(async (req: Request, res: Response) => {
  const { period = '30d' } = req.query;

  let startDate: Date;
  const now = new Date();

  switch (period) {
    case '7d':
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      break;
    case '30d':
      startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      break;
    case '90d':
      startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
      break;
    case '1y':
      startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
      break;
    default:
      startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  }

  try {
    const entries = await MoodEntry.find({
      userId: req.userId,
      date: { $gte: startDate }
    }).sort({ date: 1 });

    if (entries.length === 0) {
      return res.json({
        period,
        insights: {
          averageMood: null,
          moodTrend: 'insufficient_data',
          emotionDistribution: {},
          patterns: [],
          recommendations: ['Start tracking your mood regularly to see insights']
        },
        stats: {
          totalEntries: 0,
          daysTracked: 0,
          streakDays: 0
        }
      });
    }

    // Calculate insights
    const averageMood = entries.reduce((sum, entry) => sum + entry.moodScore, 0) / entries.length;
    
    // Emotion distribution
    const emotionCounts: Record<string, number> = {};
    entries.forEach(entry => {
      emotionCounts[entry.primaryEmotion] = (emotionCounts[entry.primaryEmotion] || 0) + 1;
    });

    // Mood trend calculation
    const recentEntries = entries.slice(-7); // Last 7 entries
    const olderEntries = entries.slice(0, Math.min(7, entries.length - 7));
    
    let moodTrend = 'stable';
    if (recentEntries.length > 0 && olderEntries.length > 0) {
      const recentAvg = recentEntries.reduce((sum, entry) => sum + entry.moodScore, 0) / recentEntries.length;
      const olderAvg = olderEntries.reduce((sum, entry) => sum + entry.moodScore, 0) / olderEntries.length;
      
      const difference = recentAvg - olderAvg;
      if (difference > 5) moodTrend = 'improving';
      else if (difference < -5) moodTrend = 'declining';
    }

    // Calculate streak
    const uniqueDays = new Set(entries.map(entry => entry.date.toDateString())).size;
    
    res.json({
      period,
      insights: {
        averageMood: Math.round(averageMood * 10) / 10,
        moodTrend,
        emotionDistribution: emotionCounts,
        patterns: [],
        recommendations: generateRecommendations(averageMood, moodTrend, emotionCounts)
      },
      stats: {
        totalEntries: entries.length,
        daysTracked: uniqueDays,
        streakDays: calculateStreak(entries)
      }
    });

  } catch (error) {
    logger.error('Error generating mood insights:', error);
    throw createError(500, 'Failed to generate insights', 'INSIGHTS_ERROR');
  }
}));

// Get mood statistics
router.get('/stats', asyncHandler(async (req: Request, res: Response) => {
  try {
    const [
      totalEntries,
      averageMood,
      emotionStats,
      recentEntry
    ] = await Promise.all([
      MoodEntry.countDocuments({ userId: req.userId }),
      MoodEntry.aggregate([
        { $match: { userId: req.userId } },
        { $group: { _id: null, average: { $avg: '$moodScore' } } }
      ]),
      MoodEntry.aggregate([
        { $match: { userId: req.userId } },
        { $group: { _id: '$primaryEmotion', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]),
      MoodEntry.findOne({ userId: req.userId }).sort({ timestamp: -1 })
    ]);

    res.json({
      totalEntries,
      averageMood: averageMood[0]?.average || null,
      topEmotions: emotionStats.slice(0, 5),
      lastEntry: recentEntry,
      streakDays: recentEntry ? calculateStreakFromDate(req.userId as string, recentEntry.date) : 0
    });

  } catch (error) {
    logger.error('Error fetching mood stats:', error);
    throw createError(500, 'Failed to fetch statistics', 'STATS_ERROR');
  }
}));

// Manual mood entry
router.post('/entry', asyncHandler(async (req: Request, res: Response) => {
  const {
    moodScore,
    primaryEmotion,
    emotions,
    context,
    textInput,
    tags
  } = req.body;

  if (typeof moodScore !== 'number' || moodScore < 0 || moodScore > 100) {
    throw createError(400, 'Valid mood score (0-100) is required', 'INVALID_MOOD_SCORE');
  }

  if (!primaryEmotion) {
    throw createError(400, 'Primary emotion is required', 'MISSING_EMOTION');
  }

  try {
    const moodEntry = new MoodEntry({
      userId: req.userId,
      date: new Date(),
      timestamp: new Date(),
      moodScore,
      primaryEmotion,
      emotions: emotions || {},
      sentiment: {
        polarity: (moodScore - 50) / 50, // Convert 0-100 to -1 to 1
        subjectivity: 0.5,
        confidence: 0.8
      },
      textInput,
      inputType: 'manual',
      inputMetadata: {
        confidence: 0.9
      },
      context: context || {},
      tags: tags || [],
      isPrivate: true,
      source: 'manual'
    });

    await moodEntry.save();

    logger.info('Manual mood entry created:', {
      userId: req.userId,
      moodScore,
      primaryEmotion
    });

    res.status(201).json({
      success: true,
      moodEntry: moodEntry.toJSON()
    });

  } catch (error) {
    logger.error('Error creating mood entry:', error);
    throw createError(500, 'Failed to create mood entry', 'ENTRY_ERROR');
  }
}));

// Helper functions
function generateRecommendations(averageMood: number, trend: string, emotions: Record<string, number>): string[] {
  const recommendations: string[] = [];

  if (averageMood < 40) {
    recommendations.push('Consider speaking with a mental health professional');
    recommendations.push('Try engaging in activities that bring you joy');
    recommendations.push('Practice mindfulness or meditation');
  } else if (averageMood < 60) {
    recommendations.push('Focus on self-care activities');
    recommendations.push('Connect with friends and family');
    recommendations.push('Maintain a regular sleep schedule');
  } else {
    recommendations.push('Keep up the great work!');
    recommendations.push('Continue your positive habits');
    recommendations.push('Consider helping others to maintain positivity');
  }

  if (trend === 'declining') {
    recommendations.push('Take note of recent changes in your routine');
    recommendations.push('Consider what might be contributing to stress');
  }

  return recommendations.slice(0, 3);
}

function calculateStreak(entries: any[]): number {
  if (entries.length === 0) return 0;

  const sortedDates = entries
    .map(entry => entry.date.toDateString())
    .filter((date, index, arr) => arr.indexOf(date) === index)
    .sort()
    .reverse();

  let streak = 0;
  const today = new Date().toDateString();
  let currentDate = new Date();

  for (const dateStr of sortedDates) {
    if (dateStr === currentDate.toDateString()) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
}

async function calculateStreakFromDate(userId: string, startDate: Date): Promise<number> {
  // Implementation for calculating streak from a specific date
  return 0; // Placeholder
}

export default router;
