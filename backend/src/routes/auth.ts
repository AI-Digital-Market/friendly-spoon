import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User, IUser } from '@/models/User.js';
import { config } from '@/config/config.js';
import { logger } from '@/config/logger.js';
import { authRateLimiterMiddleware, registrationRateLimiterMiddleware } from '@/middleware/rateLimiter.js';
import { authMiddleware } from '@/middleware/auth.js';
import { asyncHandler, createError } from '@/middleware/errorHandler.js';

const router = express.Router();

// Generate JWT token
const generateToken = (userId: string, email: string): string => {
  return jwt.sign(
    { userId, email },
    config.jwt.secret,
    { expiresIn: config.jwt.expiresIn }
  );
};

// Generate refresh token
const generateRefreshToken = (userId: string): string => {
  return jwt.sign(
    { userId, type: 'refresh' },
    config.jwt.refreshSecret,
    { expiresIn: config.jwt.refreshExpiresIn }
  );
};

// User Registration
router.post('/register', registrationRateLimiterMiddleware, asyncHandler(async (req: Request, res: Response) => {
  const { email, password, firstName, lastName, username } = req.body;

  // Validation
  if (!email || !password || !firstName || !lastName) {
    throw createError(400, 'Email, password, first name, and last name are required', 'MISSING_FIELDS');
  }

  if (password.length < 8) {
    throw createError(400, 'Password must be at least 8 characters long', 'WEAK_PASSWORD');
  }

  // Check if user already exists
  const existingUser = await User.findOne({
    $or: [
      { email: email.toLowerCase() },
      ...(username ? [{ username }] : [])
    ]
  });

  if (existingUser) {
    if (existingUser.email === email.toLowerCase()) {
      throw createError(409, 'Email already registered', 'EMAIL_EXISTS');
    }
    if (existingUser.username === username) {
      throw createError(409, 'Username already taken', 'USERNAME_EXISTS');
    }
  }

  // Create new user
  const userData: Partial<IUser> = {
    email: email.toLowerCase(),
    password,
    firstName,
    lastName,
    username,
    profile: {
      language: 'en',
      preferences: {
        theme: 'auto',
        notifications: {
          email: true,
          push: true,
          mood: true,
          chat: true,
          blog: true
        },
        privacy: {
          profileVisibility: 'private',
          moodDataSharing: false,
          analyticsOptOut: false
        }
      }
    },
    subscription: {
      plan: 'free',
      status: 'active'
    },
    usage: {
      apiCalls: {
        total: 0,
        monthly: 0,
        daily: 0,
        lastReset: new Date()
      },
      storage: {
        used: 0,
        limit: 1073741824 // 1GB
      }
    },
    isEmailVerified: !config.features.enableEmailVerification,
    isActive: true
  };

  const user = new User(userData);
  await user.save();

  logger.info('New user registered:', { userId: user._id, email: user.email });

  // Generate tokens
  const token = generateToken(user._id.toString(), user.email);
  const refreshToken = generateRefreshToken(user._id.toString());

  res.status(201).json({
    message: 'User registered successfully',
    user: user.toJSON(),
    tokens: {
      accessToken: token,
      refreshToken,
      expiresIn: config.jwt.expiresIn
    },
    ...(config.features.enableEmailVerification && {
      notice: 'Please check your email to verify your account'
    })
  });
}));

// User Login
router.post('/login', authRateLimiterMiddleware, asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw createError(400, 'Email and password are required', 'MISSING_CREDENTIALS');
  }

  // Find user
  const user = await User.findOne({ email: email.toLowerCase() }).select('+password +loginAttempts +lockoutUntil');

  if (!user) {
    throw createError(401, 'Invalid credentials', 'INVALID_CREDENTIALS');
  }

  // Check if account is locked
  if (user.isLocked()) {
    throw createError(423, 'Account temporarily locked due to too many failed login attempts', 'ACCOUNT_LOCKED');
  }

  // Check if account is active
  if (!user.isActive) {
    throw createError(401, 'Account has been deactivated', 'ACCOUNT_DEACTIVATED');
  }

  // Verify password
  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) {
    await user.incrementLoginAttempts();
    throw createError(401, 'Invalid credentials', 'INVALID_CREDENTIALS');
  }

  // Reset login attempts on successful login
  if (user.loginAttempts > 0) {
    await user.resetLoginAttempts();
  }

  // Update last login
  user.lastLoginAt = new Date();
  await user.save();

  logger.info('User logged in:', { userId: user._id, email: user.email });

  // Generate tokens
  const token = generateToken(user._id.toString(), user.email);
  const refreshToken = generateRefreshToken(user._id.toString());

  res.json({
    message: 'Login successful',
    user: user.toJSON(),
    tokens: {
      accessToken: token,
      refreshToken,
      expiresIn: config.jwt.expiresIn
    }
  });
}));

// Refresh Token
router.post('/refresh', asyncHandler(async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    throw createError(400, 'Refresh token is required', 'MISSING_REFRESH_TOKEN');
  }

  try {
    const decoded = jwt.verify(refreshToken, config.jwt.refreshSecret) as { userId: string, type: string };

    if (decoded.type !== 'refresh') {
      throw createError(401, 'Invalid refresh token', 'INVALID_REFRESH_TOKEN');
    }

    const user = await User.findById(decoded.userId);

    if (!user || !user.isActive) {
      throw createError(401, 'User not found or inactive', 'USER_NOT_FOUND');
    }

    // Generate new tokens
    const newToken = generateToken(user._id.toString(), user.email);
    const newRefreshToken = generateRefreshToken(user._id.toString());

    res.json({
      message: 'Tokens refreshed successfully',
      tokens: {
        accessToken: newToken,
        refreshToken: newRefreshToken,
        expiresIn: config.jwt.expiresIn
      }
    });

  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      throw createError(401, 'Invalid refresh token', 'INVALID_REFRESH_TOKEN');
    }
    throw error;
  }
}));

// Get Current User
router.get('/me', authMiddleware, asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    throw createError(401, 'Authentication required', 'AUTH_REQUIRED');
  }

  res.json({
    user: req.user.toJSON()
  });
}));

// Update User Profile
router.put('/profile', authMiddleware, asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    throw createError(401, 'Authentication required', 'AUTH_REQUIRED');
  }

  const allowedUpdates = [
    'firstName', 'lastName', 'username', 'profile.bio', 'profile.location',
    'profile.timezone', 'profile.language', 'profile.preferences'
  ];

  const updates: any = {};
  
  // Filter allowed updates
  Object.keys(req.body).forEach(key => {
    if (allowedUpdates.includes(key)) {
      updates[key] = req.body[key];
    }
  });

  if (Object.keys(updates).length === 0) {
    throw createError(400, 'No valid fields to update', 'NO_UPDATES');
  }

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { $set: updates },
    { new: true, runValidators: true }
  );

  logger.info('User profile updated:', { userId: user?._id, updates: Object.keys(updates) });

  res.json({
    message: 'Profile updated successfully',
    user: user?.toJSON()
  });
}));

// Change Password
router.put('/password', authMiddleware, asyncHandler(async (req: Request, res: Response) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    throw createError(400, 'Current password and new password are required', 'MISSING_PASSWORDS');
  }

  if (newPassword.length < 8) {
    throw createError(400, 'New password must be at least 8 characters long', 'WEAK_PASSWORD');
  }

  if (!req.user) {
    throw createError(401, 'Authentication required', 'AUTH_REQUIRED');
  }

  const user = await User.findById(req.user._id).select('+password');

  if (!user || !user.password) {
    throw createError(400, 'Cannot change password for this account', 'PASSWORD_CHANGE_NOT_ALLOWED');
  }

  // Verify current password
  const isCurrentPasswordValid = await user.comparePassword(currentPassword);

  if (!isCurrentPasswordValid) {
    throw createError(401, 'Current password is incorrect', 'INCORRECT_PASSWORD');
  }

  // Update password
  user.password = newPassword;
  await user.save();

  logger.info('User password changed:', { userId: user._id });

  res.json({
    message: 'Password changed successfully'
  });
}));

// Logout (optional - mainly for logging purposes)
router.post('/logout', authMiddleware, asyncHandler(async (req: Request, res: Response) => {
  if (req.user) {
    logger.info('User logged out:', { userId: req.user._id, email: req.user.email });
  }

  res.json({
    message: 'Logged out successfully'
  });
}));

// Delete Account
router.delete('/account', authMiddleware, asyncHandler(async (req: Request, res: Response) => {
  const { password, confirmation } = req.body;

  if (confirmation !== 'DELETE_MY_ACCOUNT') {
    throw createError(400, 'Account deletion confirmation required', 'CONFIRMATION_REQUIRED');
  }

  if (!req.user) {
    throw createError(401, 'Authentication required', 'AUTH_REQUIRED');
  }

  const user = await User.findById(req.user._id).select('+password');

  if (!user) {
    throw createError(404, 'User not found', 'USER_NOT_FOUND');
  }

  // Verify password if user has one
  if (user.password && password) {
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw createError(401, 'Incorrect password', 'INCORRECT_PASSWORD');
    }
  }

  // Soft delete - deactivate account
  user.isActive = false;
  user.email = `deleted_${Date.now()}_${user.email}`;
  await user.save();

  logger.warn('User account deleted:', { userId: user._id, originalEmail: req.user.email });

  res.json({
    message: 'Account deleted successfully'
  });
}));

export default router;
