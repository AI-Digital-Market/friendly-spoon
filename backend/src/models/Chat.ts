import mongoose, { Document, Schema } from 'mongoose';

export interface IChatSession extends Document {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  title: string;
  type: 'general' | 'therapy' | 'creative' | 'technical' | 'personal';
  status: 'active' | 'archived' | 'deleted';
  metadata: {
    totalMessages: number;
    lastMessageAt?: Date;
    averageResponseTime?: number;
    mood?: string;
    topics: string[];
    language: string;
  };
  settings: {
    aiPersonality: 'friendly' | 'professional' | 'casual' | 'supportive' | 'creative';
    responseLength: 'short' | 'medium' | 'long';
    creativity: number; // 0-1
    formality: number; // 0-1
    memoryEnabled: boolean;
    voiceEnabled: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface IChatMessage extends Document {
  _id: mongoose.Types.ObjectId;
  sessionId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  role: 'user' | 'assistant' | 'system';
  content: string;
  metadata: {
    tokenCount?: number;
    model?: string;
    temperature?: number;
    processingTime?: number;
    cost?: number;
    attachments?: {
      type: 'image' | 'file' | 'audio';
      url: string;
      filename: string;
      size: number;
    }[];
    emotions?: {
      detected: string[];
      confidence: number;
    };
    intent?: string;
    context?: any;
  };
  timestamp: Date;
  editedAt?: Date;
  isEdited: boolean;
  reactions?: {
    userId: mongoose.Types.ObjectId;
    type: 'like' | 'dislike' | 'love' | 'helpful' | 'funny';
    timestamp: Date;
  }[];
}

const chatSessionSchema = new Schema<IChatSession>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  
  title: {
    type: String,
    required: true,
    maxlength: [100, 'Title cannot exceed 100 characters'],
    trim: true
  },
  
  type: {
    type: String,
    enum: ['general', 'therapy', 'creative', 'technical', 'personal'],
    default: 'general'
  },
  
  status: {
    type: String,
    enum: ['active', 'archived', 'deleted'],
    default: 'active'
  },
  
  metadata: {
    totalMessages: { type: Number, default: 0 },
    lastMessageAt: Date,
    averageResponseTime: Number,
    mood: String,
    topics: [{ type: String }],
    language: { type: String, default: 'en' }
  },
  
  settings: {
    aiPersonality: {
      type: String,
      enum: ['friendly', 'professional', 'casual', 'supportive', 'creative'],
      default: 'friendly'
    },
    responseLength: {
      type: String,
      enum: ['short', 'medium', 'long'],
      default: 'medium'
    },
    creativity: { type: Number, min: 0, max: 1, default: 0.7 },
    formality: { type: Number, min: 0, max: 1, default: 0.5 },
    memoryEnabled: { type: Boolean, default: true },
    voiceEnabled: { type: Boolean, default: false }
  }
}, {
  timestamps: true
});

const chatMessageSchema = new Schema<IChatMessage>({
  sessionId: {
    type: Schema.Types.ObjectId,
    ref: 'ChatSession',
    required: true,
    index: true
  },
  
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  
  role: {
    type: String,
    enum: ['user', 'assistant', 'system'],
    required: true
  },
  
  content: {
    type: String,
    required: true,
    maxlength: [10000, 'Message content cannot exceed 10000 characters']
  },
  
  metadata: {
    tokenCount: Number,
    model: String,
    temperature: Number,
    processingTime: Number,
    cost: Number,
    attachments: [{
      type: { type: String, enum: ['image', 'file', 'audio'] },
      url: String,
      filename: String,
      size: Number
    }],
    emotions: {
      detected: [String],
      confidence: Number
    },
    intent: String,
    context: Schema.Types.Mixed
  },
  
  timestamp: {
    type: Date,
    default: Date.now,
    index: true
  },
  
  editedAt: Date,
  
  isEdited: {
    type: Boolean,
    default: false
  },
  
  reactions: [{
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    type: { type: String, enum: ['like', 'dislike', 'love', 'helpful', 'funny'] },
    timestamp: { type: Date, default: Date.now }
  }]
}, {
  timestamps: false // Using custom timestamp field
});

// Indexes for better performance
chatSessionSchema.index({ userId: 1, createdAt: -1 });
chatSessionSchema.index({ userId: 1, status: 1 });
chatSessionSchema.index({ type: 1, status: 1 });

chatMessageSchema.index({ sessionId: 1, timestamp: 1 });
chatMessageSchema.index({ userId: 1, timestamp: -1 });
chatMessageSchema.index({ role: 1, timestamp: -1 });

// Middleware to update session metadata when messages are added
chatMessageSchema.post('save', async function() {
  try {
    const ChatSession = mongoose.model('ChatSession');
    await ChatSession.findByIdAndUpdate(this.sessionId, {
      $inc: { 'metadata.totalMessages': 1 },
      $set: { 'metadata.lastMessageAt': this.timestamp }
    });
  } catch (error) {
    console.error('Error updating chat session metadata:', error);
  }
});

export const ChatSession = mongoose.model<IChatSession>('ChatSession', chatSessionSchema);
export const ChatMessage = mongoose.model<IChatMessage>('ChatMessage', chatMessageSchema);
