import { Request, Response, NextFunction } from 'express';
import { logger } from '@/config/logger.js';
import { config } from '@/config/config.js';

export interface ApiError extends Error {
  statusCode?: number;
  code?: string;
  details?: any;
}

export const errorHandler = (
  error: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Log the error
  logger.error('API Error:', {
    error: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    userId: req.userId,
    body: req.body,
    query: req.query,
    params: req.params
  });

  // Default error values
  let statusCode = error.statusCode || 500;
  let message = error.message || 'Internal Server Error';
  let code = error.code || 'INTERNAL_ERROR';
  let details = error.details || null;

  // Handle specific error types
  if (error.name === 'ValidationError') {
    statusCode = 400;
    code = 'VALIDATION_ERROR';
    message = 'Validation failed';
    details = error.message;
  }

  if (error.name === 'CastError') {
    statusCode = 400;
    code = 'INVALID_ID';
    message = 'Invalid ID format';
  }

  if (error.name === 'MongoServerError' && (error as any).code === 11000) {
    statusCode = 409;
    code = 'DUPLICATE_ERROR';
    message = 'Resource already exists';
    
    // Extract field name from duplicate key error
    const field = Object.keys((error as any).keyValue)[0];
    details = `${field} already exists`;
  }

  if (error.name === 'JsonWebTokenError') {
    statusCode = 401;
    code = 'INVALID_TOKEN';
    message = 'Invalid authentication token';
  }

  if (error.name === 'TokenExpiredError') {
    statusCode = 401;
    code = 'TOKEN_EXPIRED';
    message = 'Authentication token has expired';
  }

  if (error.name === 'MulterError') {
    statusCode = 400;
    code = 'FILE_UPLOAD_ERROR';
    
    if ((error as any).code === 'LIMIT_FILE_SIZE') {
      message = 'File size too large';
    } else if ((error as any).code === 'LIMIT_FILE_COUNT') {
      message = 'Too many files';
    } else if ((error as any).code === 'LIMIT_UNEXPECTED_FILE') {
      message = 'Unexpected file field';
    } else {
      message = 'File upload error';
    }
  }

  // Network and external API errors
  if (error.message.includes('ECONNREFUSED') || error.message.includes('ENOTFOUND')) {
    statusCode = 503;
    code = 'SERVICE_UNAVAILABLE';
    message = 'External service unavailable';
  }

  if (error.message.includes('timeout')) {
    statusCode = 504;
    code = 'TIMEOUT';
    message = 'Request timeout';
  }

  // OpenAI API specific errors
  if (error.message.includes('OpenAI') || error.message.includes('insufficient_quota')) {
    statusCode = 503;
    code = 'AI_SERVICE_ERROR';
    message = 'AI service temporarily unavailable';
  }

  // Database connection errors
  if (error.message.includes('MongoDB') || error.message.includes('MongooseError')) {
    statusCode = 503;
    code = 'DATABASE_ERROR';
    message = 'Database service unavailable';
  }

  // Rate limiting errors (should be handled by rate limiter middleware)
  if (error.message.includes('rate limit') || error.message.includes('too many requests')) {
    statusCode = 429;
    code = 'RATE_LIMIT_EXCEEDED';
    message = 'Rate limit exceeded';
  }

  // Construct error response
  const errorResponse: any = {
    error: {
      code,
      message,
      ...(details && { details }),
      ...(config.nodeEnv === 'development' && {
        stack: error.stack,
        timestamp: new Date().toISOString()
      })
    }
  };

  // Add request ID for tracking
  if (req.headers['x-request-id']) {
    errorResponse.error.requestId = req.headers['x-request-id'];
  }

  // Add helpful suggestions for common errors
  if (statusCode === 401) {
    errorResponse.error.suggestion = 'Please check your authentication token and try again';
  }

  if (statusCode === 403) {
    errorResponse.error.suggestion = 'You may need to upgrade your subscription or verify your account';
  }

  if (statusCode === 404) {
    errorResponse.error.suggestion = 'Please check the URL and try again';
  }

  if (statusCode === 429) {
    errorResponse.error.suggestion = 'Please wait before making another request or consider upgrading your plan';
  }

  if (statusCode >= 500) {
    errorResponse.error.suggestion = 'This is a server error. Please try again later or contact support if the problem persists';
  }

  res.status(statusCode).json(errorResponse);
};

export const notFoundHandler = (req: Request, res: Response): void => {
  res.status(404).json({
    error: {
      code: 'NOT_FOUND',
      message: `Route ${req.method} ${req.path} not found`,
      suggestion: 'Please check the URL and method, or refer to the API documentation',
      availableEndpoints: [
        'GET /health',
        'GET /api',
        'POST /api/auth/login',
        'POST /api/auth/register',
        'GET /api/mood/analyze',
        'POST /api/chat/message'
      ]
    }
  });
};

export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export const createError = (statusCode: number, message: string, code?: string, details?: any): ApiError => {
  const error = new Error(message) as ApiError;
  error.statusCode = statusCode;
  error.code = code;
  error.details = details;
  return error;
};

export default errorHandler;
