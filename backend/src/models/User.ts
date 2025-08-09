import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  email: string;
  password?: string;
  passageId?: string;
  firstName: string;
  lastName: string;
  username?: string;
  avatar?: string;
  
  // Profile information
  profile: {
    bio?: string;
    dateOfBirth?: Date;
    location?: string;
    timezone?: string;
    language: string;
    preferences: {
      theme: 'light' | 'dark' | 'auto';
      notifications: {
        email: boolean;
        push: boolean;
        mood: boolean;
        chat: boolean;
        blog: boolean;
      };
      privacy: {
        profileVisibility: 'public' | 'private' | 'friends';
        moodDataSharing: boolean;
        analyticsOptOut: boolean;
      };
    };
  };

  // Subscription and usage
  subscription: {
    plan: 'free' | 'basic' | 'premium' | 'enterprise';
    status: 'active' | 'inactive' | 'cancelled' | 'past_due';
    currentPeriodStart?: Date;
    currentPeriodEnd?: Date;
    stripeCustomerId?: string;
    stripeSubscriptionId?: string;
  };

  usage: {
    apiCalls: {
      total: number;
      monthly: number;
      daily: number;
      lastReset: Date;
    };
    storage: {
      used: number; // in bytes
      limit: number; // in bytes
    };
  };

  // Account status
  isEmailVerified: boolean;
  isActive: boolean;
  lastLoginAt?: Date;
  loginAttempts: number;
  lockoutUntil?: Date;

  // Timestamps
  createdAt: Date;
  updatedAt: Date;

  // Methods
  comparePassword(candidatePassword: string): Promise<boolean>;
  incrementLoginAttempts(): Promise<void>;
  resetLoginAttempts(): Promise<void>;
  isLocked(): boolean;
  toJSON(): any;
}

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  
  password: {
    type: String,
    minlength: [8, 'Password must be at least 8 characters long']
  },
  
  passageId: {
    type: String,
    unique: true,
    sparse: true
  },
  
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxlength: [50, 'First name cannot exceed 50 characters']
  },
  
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxlength: [50, 'Last name cannot exceed 50 characters']
  },
  
  username: {
    type: String,
    unique: true,
    sparse: true,
    trim: true,
    minlength: [3, 'Username must be at least 3 characters long'],
    maxlength: [20, 'Username cannot exceed 20 characters'],
    match: [/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores']
  },
  
  avatar: {
    type: String,
    default: null
  },

  profile: {
    bio: {
      type: String,
      maxlength: [500, 'Bio cannot exceed 500 characters']
    },
    dateOfBirth: Date,
    location: String,
    timezone: {
      type: String,
      default: 'UTC'
    },
    language: {
      type: String,
      default: 'en',
      enum: ['en', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'zh', 'ja', 'ko']
    },
    preferences: {
      theme: {
        type: String,
        enum: ['light', 'dark', 'auto'],
        default: 'auto'
      },
      notifications: {
        email: { type: Boolean, default: true },
        push: { type: Boolean, default: true },
        mood: { type: Boolean, default: true },
        chat: { type: Boolean, default: true },
        blog: { type: Boolean, default: true }
      },
      privacy: {
        profileVisibility: {
          type: String,
          enum: ['public', 'private', 'friends'],
          default: 'private'
        },
        moodDataSharing: { type: Boolean, default: false },
        analyticsOptOut: { type: Boolean, default: false }
      }
    }
  },

  subscription: {
    plan: {
      type: String,
      enum: ['free', 'basic', 'premium', 'enterprise'],
      default: 'free'
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'cancelled', 'past_due'],
      default: 'active'
    },
    currentPeriodStart: Date,
    currentPeriodEnd: Date,
    stripeCustomerId: String,
    stripeSubscriptionId: String
  },

  usage: {
    apiCalls: {
      total: { type: Number, default: 0 },
      monthly: { type: Number, default: 0 },
      daily: { type: Number, default: 0 },
      lastReset: { type: Date, default: Date.now }
    },
    storage: {
      used: { type: Number, default: 0 },
      limit: { type: Number, default: 1073741824 } // 1GB default
    }
  },

  isEmailVerified: {
    type: Boolean,
    default: false
  },
  
  isActive: {
    type: Boolean,
    default: true
  },
  
  lastLoginAt: Date,
  
  loginAttempts: {
    type: Number,
    default: 0
  },
  
  lockoutUntil: Date

}, {
  timestamps: true,
  toJSON: { 
    transform: function(doc, ret) {
      delete ret.password;
      delete ret.loginAttempts;
      delete ret.lockoutUntil;
      delete ret.__v;
      return ret;
    }
  }
});

// Indexes
userSchema.index({ email: 1 });
userSchema.index({ passageId: 1 });
userSchema.index({ username: 1 });
userSchema.index({ createdAt: 1 });
userSchema.index({ 'subscription.plan': 1 });
userSchema.index({ isActive: 1 });

// Virtual for full name
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Pre-save middleware to hash password
userSchema.pre<IUser>('save', async function(next) {
  if (!this.isModified('password') || !this.password) {
    return next();
  }

  try {
    const saltRounds = 12;
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  if (!this.password) {
    return false;
  }
  return bcrypt.compare(candidatePassword, this.password);
};

// Increment login attempts
userSchema.methods.incrementLoginAttempts = function(): Promise<void> {
  // If we have a previous lock that has expired, restart at 1
  if (this.lockoutUntil && this.lockoutUntil < Date.now()) {
    return this.updateOne({
      $unset: { lockoutUntil: 1 },
      $set: { loginAttempts: 1 }
    });
  }
  
  const updates: any = { $inc: { loginAttempts: 1 } };
  
  // Lock account after 5 attempts for 15 minutes
  if (this.loginAttempts + 1 >= 5 && !this.isLocked()) {
    updates.$set = { lockoutUntil: Date.now() + 15 * 60 * 1000 }; // 15 minutes
  }
  
  return this.updateOne(updates);
};

// Reset login attempts
userSchema.methods.resetLoginAttempts = function(): Promise<void> {
  return this.updateOne({
    $unset: { loginAttempts: 1, lockoutUntil: 1 }
  });
};

// Check if account is locked
userSchema.methods.isLocked = function(): boolean {
  return !!(this.lockoutUntil && this.lockoutUntil > Date.now());
};

export const User = mongoose.model<IUser>('User', userSchema);
export default User;
