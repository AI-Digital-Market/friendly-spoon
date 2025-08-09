import mongoose, { Document, Schema } from 'mongoose';

export interface IMoodEntry extends Document {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  date: Date;
  timestamp: Date;
  
  // Primary mood data
  moodScore: number; // 0-100 scale
  primaryEmotion: string;
  emotions: {
    joy: number;
    sadness: number;
    anger: number;
    fear: number;
    surprise: number;
    disgust: number;
    trust: number;
    anticipation: number;
    love: number;
    hope: number;
    anxiety: number;
    excitement: number;
    confidence: number;
    gratitude: number;
    contentment: number;
  };
  
  // Analysis data
  sentiment: {
    polarity: number; // -1 to 1
    subjectivity: number; // 0 to 1
    confidence: number; // 0 to 1
  };
  
  // Input data
  textInput?: string;
  inputType: 'text' | 'voice' | 'image' | 'manual' | 'survey';
  inputMetadata?: {
    wordCount?: number;
    language?: string;
    processingTime?: number;
    confidence?: number;
  };
  
  // Context data
  context: {
    location?: string;
    weather?: string;
    activity?: string;
    socialContext?: 'alone' | 'friends' | 'family' | 'work' | 'public';
    triggers?: string[];
    stressLevel?: number; // 1-10
    energyLevel?: number; // 1-10
    sleepQuality?: number; // 1-10
    physicalHealth?: number; // 1-10
  };
  
  // Insights and patterns
  insights?: {
    patterns: string[];
    trends: string[];
    recommendations: string[];
    riskFactors: string[];
    positiveFactors: string[];
  };
  
  // Metadata
  tags: string[];
  isPrivate: boolean;
  source: 'manual' | 'automatic' | 'import';
  version: string;
  
  createdAt: Date;
  updatedAt: Date;
}

export interface IMoodPattern extends Document {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  type: 'daily' | 'weekly' | 'monthly' | 'seasonal' | 'custom';
  pattern: {
    name: string;
    description: string;
    confidence: number;
    strength: number; // How strong this pattern is
    frequency: number; // How often it occurs
    duration: number; // How long it lasts
    triggers: string[];
    effects: string[];
  };
  dataPoints: {
    date: Date;
    value: number;
    metadata?: any;
  }[];
  analysis: {
    correlations: {
      factor: string;
      strength: number;
      type: 'positive' | 'negative' | 'neutral';
    }[];
    trends: {
      direction: 'up' | 'down' | 'stable' | 'cyclical';
      strength: number;
      timeframe: string;
    }[];
    predictions: {
      date: Date;
      predictedMood: number;
      confidence: number;
      factors: string[];
    }[];
  };
  lastAnalyzed: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const moodEntrySchema = new Schema<IMoodEntry>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  
  date: {
    type: Date,
    required: true,
    index: true
  },
  
  timestamp: {
    type: Date,
    default: Date.now,
    index: true
  },
  
  moodScore: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  
  primaryEmotion: {
    type: String,
    required: true,
    enum: [
      'joy', 'sadness', 'anger', 'fear', 'surprise', 'disgust',
      'trust', 'anticipation', 'love', 'hope', 'anxiety', 'excitement',
      'confidence', 'gratitude', 'contentment', 'neutral'
    ]
  },
  
  emotions: {
    joy: { type: Number, min: 0, max: 1, default: 0 },
    sadness: { type: Number, min: 0, max: 1, default: 0 },
    anger: { type: Number, min: 0, max: 1, default: 0 },
    fear: { type: Number, min: 0, max: 1, default: 0 },
    surprise: { type: Number, min: 0, max: 1, default: 0 },
    disgust: { type: Number, min: 0, max: 1, default: 0 },
    trust: { type: Number, min: 0, max: 1, default: 0 },
    anticipation: { type: Number, min: 0, max: 1, default: 0 },
    love: { type: Number, min: 0, max: 1, default: 0 },
    hope: { type: Number, min: 0, max: 1, default: 0 },
    anxiety: { type: Number, min: 0, max: 1, default: 0 },
    excitement: { type: Number, min: 0, max: 1, default: 0 },
    confidence: { type: Number, min: 0, max: 1, default: 0 },
    gratitude: { type: Number, min: 0, max: 1, default: 0 },
    contentment: { type: Number, min: 0, max: 1, default: 0 }
  },
  
  sentiment: {
    polarity: { type: Number, min: -1, max: 1, required: true },
    subjectivity: { type: Number, min: 0, max: 1, required: true },
    confidence: { type: Number, min: 0, max: 1, required: true }
  },
  
  textInput: {
    type: String,
    maxlength: [2000, 'Text input cannot exceed 2000 characters']
  },
  
  inputType: {
    type: String,
    enum: ['text', 'voice', 'image', 'manual', 'survey'],
    required: true
  },
  
  inputMetadata: {
    wordCount: Number,
    language: String,
    processingTime: Number,
    confidence: Number
  },
  
  context: {
    location: String,
    weather: String,
    activity: String,
    socialContext: {
      type: String,
      enum: ['alone', 'friends', 'family', 'work', 'public']
    },
    triggers: [String],
    stressLevel: { type: Number, min: 1, max: 10 },
    energyLevel: { type: Number, min: 1, max: 10 },
    sleepQuality: { type: Number, min: 1, max: 10 },
    physicalHealth: { type: Number, min: 1, max: 10 }
  },
  
  insights: {
    patterns: [String],
    trends: [String],
    recommendations: [String],
    riskFactors: [String],
    positiveFactors: [String]
  },
  
  tags: [String],
  
  isPrivate: {
    type: Boolean,
    default: true
  },
  
  source: {
    type: String,
    enum: ['manual', 'automatic', 'import'],
    default: 'manual'
  },
  
  version: {
    type: String,
    default: '1.0'
  }
}, {
  timestamps: true
});

const moodPatternSchema = new Schema<IMoodPattern>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  
  type: {
    type: String,
    enum: ['daily', 'weekly', 'monthly', 'seasonal', 'custom'],
    required: true
  },
  
  pattern: {
    name: { type: String, required: true },
    description: String,
    confidence: { type: Number, min: 0, max: 1 },
    strength: { type: Number, min: 0, max: 1 },
    frequency: Number,
    duration: Number,
    triggers: [String],
    effects: [String]
  },
  
  dataPoints: [{
    date: { type: Date, required: true },
    value: { type: Number, required: true },
    metadata: Schema.Types.Mixed
  }],
  
  analysis: {
    correlations: [{
      factor: String,
      strength: Number,
      type: { type: String, enum: ['positive', 'negative', 'neutral'] }
    }],
    trends: [{
      direction: { type: String, enum: ['up', 'down', 'stable', 'cyclical'] },
      strength: Number,
      timeframe: String
    }],
    predictions: [{
      date: Date,
      predictedMood: Number,
      confidence: Number,
      factors: [String]
    }]
  },
  
  lastAnalyzed: {
    type: Date,
    default: Date.now
  },
  
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Indexes for better query performance
moodEntrySchema.index({ userId: 1, date: -1 });
moodEntrySchema.index({ userId: 1, timestamp: -1 });
moodEntrySchema.index({ userId: 1, primaryEmotion: 1 });
moodEntrySchema.index({ userId: 1, moodScore: 1 });
moodEntrySchema.index({ tags: 1 });

moodPatternSchema.index({ userId: 1, type: 1 });
moodPatternSchema.index({ userId: 1, isActive: 1 });
moodPatternSchema.index({ lastAnalyzed: 1 });

export const MoodEntry = mongoose.model<IMoodEntry>('MoodEntry', moodEntrySchema);
export const MoodPattern = mongoose.model<IMoodPattern>('MoodPattern', moodPatternSchema);
