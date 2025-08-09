import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User, IUser } from '@/models/User.js';
import { config } from '@/config/config.js';
import { logger } from '@/config/logger.js';

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
      userId?: string;
    }
  }
}

export interface AuthenticatedRequest extends Request {
  user: IUser;
  userId: string;
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      res.status(401).json({
        error: 'Authorization header missing',
        message: 'Please provide a valid authorization token'
      });
      return;
    }

    const token = authHeader.startsWith('Bearer ') 
      ? authHeader.slice(7) 
      : authHeader;

    if (!token) {
      res.status(401).json({
        error: 'Token missing',
        message: 'Please provide a valid authorization token'
      });
      return;
    }

    try {
      // Verify JWT token
      const decoded = jwt.verify(token, config.jwt.secret) as { userId: string, email: string };
      
      // Find user in database
      const user = await User.findById(decoded.userId)
        .select('-password -loginAttempts -lockoutUntil')
        .exec();

      if (!user) {
        res.status(401).json({
          error: 'User not found',
          message: 'Invalid token - user does not exist'
        });
        return;
      }

      if (!user.isActive) {
        res.status(401).json({
          error: 'Account deactivated',
          message: 'Your account has been deactivated'
        });
        return;
      }

      // Check if account is locked
      if (user.isLocked()) {
        res.status(423).json({
          error: 'Account locked',
          message: 'Account is temporarily locked due to too many failed login attempts'
        });
        return;
      }

      // Update last login time
      user.lastLoginAt = new Date();
      await user.save();

      // Attach user to request
      req.user = user;
      req.userId = user._id.toString();

      next();

    } catch (jwtError) {
      if (jwtError instanceof jwt.TokenExpiredError) {
        res.status(401).json({
          error: 'Token expired',
          message: 'Your session has expired. Please log in again.'
        });
        return;
      }

      if (jwtError instanceof jwt.JsonWebTokenError) {
        res.status(401).json({
          error: 'Invalid token',
          message: 'The provided token is invalid'
        });
        return;
      }

      throw jwtError;
    }

  } catch (error) {
    logger.error('Authentication middleware error:', error);
    res.status(500).json({
      error: 'Authentication error',
      message: 'An error occurred during authentication'
    });
  }
};

export const optionalAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return next();
    }

    const token = authHeader.startsWith('Bearer ') 
      ? authHeader.slice(7) 
      : authHeader;

    if (!token) {
      return next();
    }

    try {
      const decoded = jwt.verify(token, config.jwt.secret) as { userId: string, email: string };
      const user = await User.findById(decoded.userId)
        .select('-password -loginAttempts -lockoutUntil')
        .exec();

      if (user && user.isActive && !user.isLocked()) {
        req.user = user;
        req.userId = user._id.toString();
      }
    } catch (jwtError) {
      // Silently ignore token errors in optional auth
      logger.debug('Optional auth middleware - token error:', jwtError);
    }

    next();

  } catch (error) {
    logger.error('Optional authentication middleware error:', error);
    next();
  }
};

export const requireRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        error: 'Authentication required',
        message: 'You must be logged in to access this resource'
      });
      return;
    }

    const userRole = req.user.subscription.plan;
    
    if (!roles.includes(userRole)) {
      res.status(403).json({
        error: 'Insufficient permissions',
        message: `This feature requires a ${roles.join(' or ')} subscription`,
        currentPlan: userRole,
        requiredPlans: roles
      });
      return;
    }

    next();
  };
};

export const requireEmailVerification = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.user) {
    res.status(401).json({
      error: 'Authentication required',
      message: 'You must be logged in to access this resource'
    });
    return;
  }

  if (!req.user.isEmailVerified && config.features.enableEmailVerification) {
    res.status(403).json({
      error: 'Email verification required',
      message: 'Please verify your email address to access this feature'
    });
    return;
  }

  next();
};

export const checkApiLimits = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  if (!req.user) {
    return next();
  }

  try {
    const user = req.user;
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Check if we need to reset counters
    const lastReset = user.usage.apiCalls.lastReset;
    
    // Reset daily counter if it's a new day
    if (lastReset < today) {
      user.usage.apiCalls.daily = 0;
    }

    // Reset monthly counter if it's a new month
    if (lastReset < thisMonth) {
      user.usage.apiCalls.monthly = 0;
    }

    // Define limits based on subscription plan
    const limits = {
      free: { daily: 50, monthly: 1000 },
      basic: { daily: 200, monthly: 5000 },
      premium: { daily: 1000, monthly: 25000 },
      enterprise: { daily: -1, monthly: -1 } // Unlimited
    };

    const userLimits = limits[user.subscription.plan];

    // Check daily limit
    if (userLimits.daily !== -1 && user.usage.apiCalls.daily >= userLimits.daily) {
      res.status(429).json({
        error: 'Daily API limit exceeded',
        message: `You have exceeded your daily API limit of ${userLimits.daily} requests`,
        limits: userLimits,
        current: user.usage.apiCalls,
        resetTime: new Date(today.getTime() + 24 * 60 * 60 * 1000)
      });
      return;
    }

    // Check monthly limit
    if (userLimits.monthly !== -1 && user.usage.apiCalls.monthly >= userLimits.monthly) {
      res.status(429).json({
        error: 'Monthly API limit exceeded',
        message: `You have exceeded your monthly API limit of ${userLimits.monthly} requests`,
        limits: userLimits,
        current: user.usage.apiCalls,
        resetTime: new Date(thisMonth.getTime() + 31 * 24 * 60 * 60 * 1000)
      });
      return;
    }

    next();

  } catch (error) {
    logger.error('API limits check error:', error);
    res.status(500).json({
      error: 'API limits check failed',
      message: 'An error occurred while checking API limits'
    });
  }
};

export const incrementApiUsage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  if (!req.user) {
    return next();
  }

  try {
    const user = req.user;
    const now = new Date();

    // Increment API usage counters
    await User.findByIdAndUpdate(user._id, {
      $inc: {
        'usage.apiCalls.total': 1,
        'usage.apiCalls.daily': 1,
        'usage.apiCalls.monthly': 1
      },
      $set: {
        'usage.apiCalls.lastReset': now
      }
    });

    next();

  } catch (error) {
    logger.error('API usage increment error:', error);
    // Don't fail the request if usage tracking fails
    next();
  }
};

export default authMiddleware;
