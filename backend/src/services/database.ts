import mongoose, { ConnectOptions } from 'mongoose';
import { logger } from '@/config/logger.js';
import { config } from '@/config/config.js';

export class DatabaseService {
  private static instance: DatabaseService;
  private isConnected: boolean = false;

  constructor() {
    // Configure mongoose settings
    mongoose.set('strictQuery', false);
    
    // Handle connection events
    mongoose.connection.on('connected', () => {
      logger.info('📊 MongoDB connected successfully');
      this.isConnected = true;
    });

    mongoose.connection.on('error', (error) => {
      logger.error('❌ MongoDB connection error:', error);
      this.isConnected = false;
    });

    mongoose.connection.on('disconnected', () => {
      logger.warn('⚠️ MongoDB disconnected');
      this.isConnected = false;
    });

    // Handle application termination
    process.on('SIGINT', async () => {
      await this.disconnect();
      process.exit(0);
    });
  }

  static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  async connect(): Promise<void> {
    if (this.isConnected) {
      logger.info('📊 Already connected to MongoDB');
      return;
    }

    try {
      logger.info('🔄 Connecting to MongoDB...');
      
      const options: ConnectOptions = {
        ...config.mongodb.options,
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        family: 4,
        bufferCommands: false,
        autoIndex: true,
        autoCreate: true
      };

      await mongoose.connect(config.mongodb.uri, options);
      
      // Test the connection
      await mongoose.connection.db?.admin().ping();
      
      logger.info('✅ MongoDB connection established successfully');
      
      // Create indexes for better performance
      await this.createIndexes();
      
    } catch (error) {
      logger.error('❌ Failed to connect to MongoDB:', error);
      throw new Error(`Database connection failed: ${error}`);
    }
  }

  async disconnect(): Promise<void> {
    if (!this.isConnected) {
      return;
    }

    try {
      await mongoose.connection.close();
      logger.info('🔌 MongoDB connection closed');
      this.isConnected = false;
    } catch (error) {
      logger.error('❌ Error closing MongoDB connection:', error);
      throw error;
    }
  }

  async healthCheck(): Promise<boolean> {
    try {
      if (!this.isConnected) {
        return false;
      }

      await mongoose.connection.db?.admin().ping();
      return true;
    } catch (error) {
      logger.error('❌ MongoDB health check failed:', error);
      return false;
    }
  }

  private async createIndexes(): Promise<void> {
    try {
      // User collection indexes
      await mongoose.connection.db?.collection('users').createIndex({ email: 1 }, { unique: true });
      await mongoose.connection.db?.collection('users').createIndex({ passageId: 1 }, { unique: true, sparse: true });
      await mongoose.connection.db?.collection('users').createIndex({ createdAt: 1 });

      // Chat sessions indexes
      await mongoose.connection.db?.collection('chatsessions').createIndex({ userId: 1, createdAt: -1 });
      await mongoose.connection.db?.collection('chatsessions').createIndex({ userId: 1, active: 1 });

      // Chat messages indexes
      await mongoose.connection.db?.collection('chatmessages').createIndex({ sessionId: 1, timestamp: 1 });
      await mongoose.connection.db?.collection('chatmessages').createIndex({ userId: 1, timestamp: -1 });

      // Mood entries indexes
      await mongoose.connection.db?.collection('moodentries').createIndex({ userId: 1, timestamp: -1 });
      await mongoose.connection.db?.collection('moodentries').createIndex({ userId: 1, date: 1 });

      // Memory entries indexes
      await mongoose.connection.db?.collection('memoryentries').createIndex({ userId: 1, createdAt: -1 });
      await mongoose.connection.db?.collection('memoryentries').createIndex({ userId: 1, type: 1 });
      await mongoose.connection.db?.collection('memoryentries').createIndex({ userId: 1, tags: 1 });

      // Blog posts indexes
      await mongoose.connection.db?.collection('blogposts').createIndex({ slug: 1 }, { unique: true });
      await mongoose.connection.db?.collection('blogposts').createIndex({ published: 1, publishedAt: -1 });
      await mongoose.connection.db?.collection('blogposts').createIndex({ category: 1, published: 1 });
      await mongoose.connection.db?.collection('blogposts').createIndex({ tags: 1, published: 1 });

      // Analytics events indexes
      await mongoose.connection.db?.collection('analyticsevents').createIndex({ userId: 1, timestamp: -1 });
      await mongoose.connection.db?.collection('analyticsevents').createIndex({ eventType: 1, timestamp: -1 });

      logger.info('📊 Database indexes created successfully');
    } catch (error) {
      logger.error('❌ Error creating database indexes:', error);
    }
  }

  getConnectionStatus(): string {
    const states = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting'
    };
    return states[mongoose.connection.readyState as keyof typeof states] || 'unknown';
  }

  static async connect(): Promise<void> {
    const instance = DatabaseService.getInstance();
    return instance.connect();
  }

  static async disconnect(): Promise<void> {
    const instance = DatabaseService.getInstance();
    return instance.disconnect();
  }

  static async healthCheck(): Promise<boolean> {
    const instance = DatabaseService.getInstance();
    return instance.healthCheck();
  }
}

export default DatabaseService;
