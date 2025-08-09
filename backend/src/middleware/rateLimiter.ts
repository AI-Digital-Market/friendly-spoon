import { Request, Response, NextFunction } from 'express';
import { RateLimiterMemory, RateLimiterRedis } from 'rate-limiter-flexible';
import { logger } from '@/config/logger.js';
import { config } from '@/config/config.js';

// Create rate limiter instance
const rateLimiter = new RateLimiterMemory({
  keyPrefix: 'middleware',
  points: config.rateLimiting.maxRequests, // Number of requests
  duration: config.rateLimiting.windowMs / 1000, // Per second(s)
  blockDuration: 60, // Block for 60 seconds if limit exceeded
  execEvenly: true // Spread requests evenly across duration
});

// Stricter rate limiter for auth endpoints
const authRateLimiter = new RateLimiterMemory({
  keyPrefix: 'auth',
  points: 5, // 5 requests
  duration: 900, // Per 15 minutes
  blockDuration: 900, // Block for 15 minutes
});

// Very strict rate limiter for registration
const registrationRateLimiter = new RateLimiterMemory({
  keyPrefix: 'register',
  points: 3, // 3 requests
  duration: 3600, // Per hour
  blockDuration: 3600, // Block for 1 hour
});

// AI API rate limiter (more generous for authenticated users)
const aiApiRateLimiter = new RateLimiterMemory({
  keyPrefix: 'ai_api',
  points: 30, // 30 requests
  duration: 60, // Per minute
  blockDuration: 120, // Block for 2 minutes
});

export const rateLimiterMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const key = req.ip || 'unknown';
    
    await rateLimiter.consume(key);
    next();
    
  } catch (rateLimiterRes: any) {
    const remainingPoints = rateLimiterRes?.remainingPoints || 0;
    const msBeforeNext = rateLimiterRes?.msBeforeNext || 0;
    
    logger.warn(`Rate limit exceeded for IP: ${req.ip}`, {
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      path: req.path,
      remainingPoints,
      msBeforeNext
    });

    res.status(429).json({
      error: 'Too Many Requests',
      message: 'Rate limit exceeded. Please try again later.',
      retryAfter: Math.round(msBeforeNext / 1000),
      limit: config.rateLimiting.maxRequests,
      window: config.rateLimiting.windowMs / 1000,
      remaining: remainingPoints
    });
  }
};

export const authRateLimiterMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const key = req.ip || 'unknown';
    
    await authRateLimiter.consume(key);
    next();
    
  } catch (rateLimiterRes: any) {
    const msBeforeNext = rateLimiterRes?.msBeforeNext || 0;
    
    logger.warn(`Auth rate limit exceeded for IP: ${req.ip}`, {
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      path: req.path,
      method: req.method
    });

    res.status(429).json({
      error: 'Too Many Authentication Attempts',
      message: 'Too many authentication attempts. Please try again in 15 minutes.',
      retryAfter: Math.round(msBeforeNext / 1000)
    });
  }
};

export const registrationRateLimiterMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const key = req.ip || 'unknown';
    
    await registrationRateLimiter.consume(key);
    next();
    
  } catch (rateLimiterRes: any) {
    const msBeforeNext = rateLimiterRes?.msBeforeNext || 0;
    
    logger.warn(`Registration rate limit exceeded for IP: ${req.ip}`, {
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      email: req.body?.email
    });

    res.status(429).json({
      error: 'Too Many Registration Attempts',
      message: 'Too many registration attempts. Please try again in 1 hour.',
      retryAfter: Math.round(msBeforeNext / 1000)
    });
  }
};

export const aiApiRateLimiterMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Use user ID if authenticated, otherwise fall back to IP
    const key = req.userId || req.ip || 'unknown';
    
    await aiApiRateLimiter.consume(key);
    next();
    
  } catch (rateLimiterRes: any) {
    const msBeforeNext = rateLimiterRes?.msBeforeNext || 0;
    
    logger.warn(`AI API rate limit exceeded`, {
      userId: req.userId,
      ip: req.ip,
      path: req.path,
      method: req.method
    });

    res.status(429).json({
      error: 'AI API Rate Limit Exceeded',
      message: 'Too many AI API requests. Please wait before making another request.',
      retryAfter: Math.round(msBeforeNext / 1000),
      suggestion: 'Consider upgrading your plan for higher rate limits'
    });
  }
};

// Custom rate limiter for specific endpoints
export const createCustomRateLimiter = (points: number, duration: number, blockDuration: number) => {
  const customLimiter = new RateLimiterMemory({
    keyPrefix: 'custom',
    points,
    duration,
    blockDuration,
    execEvenly: true
  });

  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const key = req.userId || req.ip || 'unknown';
      
      await customLimiter.consume(key);
      next();
      
    } catch (rateLimiterRes: any) {
      const msBeforeNext = rateLimiterRes?.msBeforeNext || 0;
      
      res.status(429).json({
        error: 'Rate Limit Exceeded',
        message: 'Rate limit exceeded for this endpoint.',
        retryAfter: Math.round(msBeforeNext / 1000)
      });
    }
  };
};

// Export the default rate limiter
export const rateLimiter = rateLimiterMiddleware;

export default rateLimiterMiddleware;
