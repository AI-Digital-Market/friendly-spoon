import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();
import { DatabaseService } from '@/services/database.js';
import { SocketService } from '@/services/socket.js';

// Load environment variables
dotenv.config();

class Server {
  public app: Application;
  public server: any;
  public io: SocketIOServer;
  private port: number;

  constructor() {
    this.app = express();
    this.port = parseInt(process.env.PORT || '3001', 10);
    this.server = createServer(this.app);
    this.io = new SocketIOServer(this.server, {
      cors: {
        origin: process.env.FRONTEND_URL || "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true
      }
    });

    this.initializeMiddleware();
    this.initializeRoutes();
    this.initializeErrorHandling();
    this.initializeSocket();
  }

  private initializeMiddleware(): void {
    // Security middleware
    this.app.use(helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'", "https:"],
          scriptSrc: ["'self'", "'unsafe-eval'"],
          imgSrc: ["'self'", "data:", "https:"],
          connectSrc: ["'self'", "https:", "wss:"],
          fontSrc: ["'self'", "https:"],
          objectSrc: ["'none'"],
          mediaSrc: ["'self'"],
          frameSrc: ["'none'"],
        },
      },
      crossOriginEmbedderPolicy: false
    }));

    // CORS configuration
    this.app.use(cors({
      origin: process.env.NODE_ENV === 'production' 
        ? [
            'https://onelastai.com',
            'https://www.onelastai.com',
            'https://chat.onelastai.com',
            'https://creator.onelastai.com',
            'https://mood.onelastai.com',
            'https://ip.onelastai.com',
            'https://visual.onelastai.com',
            'https://blog.onelastai.com',
            'https://memory.onelastai.com'
          ]
        : ['http://localhost:5173', 'http://localhost:3000'],
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
    }));

    // Compression and parsing
    this.app.use(compression());
    this.app.use(express.json({ limit: '10mb' }));
    this.app.use(express.urlencoded({ extended: true, limit: '10mb' }));

    // Logging
    if (process.env.NODE_ENV !== 'test') {
      this.app.use(morgan('combined', {
        stream: {
          write: (message: string) => logger.info(message.trim())
        }
      }));
    }

    // Rate limiting
    this.app.use('/api/', rateLimiter);

    // Health check endpoint
    this.app.get('/health', (req: Request, res: Response) => {
      res.status(200).json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        version: process.env.npm_package_version || '1.0.0'
      });
    });

    // API documentation endpoint
    this.app.get('/api', (req: Request, res: Response) => {
      res.json({
        message: 'AI Digital Friend - One Last AI Platform API',
        version: '1.0.0',
        endpoints: {
          auth: '/api/auth',
          mood: '/api/mood',
          chat: '/api/chat',
          creator: '/api/creator',
          memory: '/api/memory',
          visual: '/api/visual',
          ip: '/api/ip',
          blog: '/api/blog',
          user: '/api/user',
          analytics: '/api/analytics'
        },
        documentation: 'https://docs.onelastai.com'
      });
    });
  }

  private initializeRoutes(): void {
    // API routes
    this.app.use('/api/auth', authRoutes);
    this.app.use('/api/mood', authMiddleware, moodRoutes);
    this.app.use('/api/chat', authMiddleware, chatRoutes);
    this.app.use('/api/creator', authMiddleware, creatorRoutes);
    this.app.use('/api/memory', authMiddleware, memoryRoutes);
    this.app.use('/api/visual', authMiddleware, visualRoutes);
    this.app.use('/api/ip', ipRoutes); // IP routes don't require auth
    this.app.use('/api/blog', blogRoutes);
    this.app.use('/api/user', authMiddleware, userRoutes);
    this.app.use('/api/analytics', authMiddleware, analyticsRoutes);

    // 404 handler for undefined routes
    this.app.use('*', (req: Request, res: Response) => {
      res.status(404).json({
        error: 'Route not found',
        message: `Cannot ${req.method} ${req.originalUrl}`,
        availableEndpoints: [
          'GET /health',
          'GET /api',
          'POST /api/auth/login',
          'POST /api/auth/register',
          'GET /api/mood/analyze',
          'POST /api/chat/message',
          'GET /api/creator/generate',
          'POST /api/memory/store',
          'POST /api/visual/analyze',
          'GET /api/ip/info',
          'GET /api/blog/posts'
        ]
      });
    });
  }

  private initializeErrorHandling(): void {
    this.app.use(errorHandler);
  }

  private initializeSocket(): void {
    const socketService = new SocketService(this.io);
    socketService.initialize();
  }

  public async start(): Promise<void> {
    try {
      // Connect to MongoDB
      await DatabaseService.connect();
      logger.info('📊 Connected to MongoDB');

      // Start server
      this.server.listen(this.port, () => {
        logger.info(`🚀 AI Digital Friend Backend Server running on port ${this.port}`);
        logger.info(`🌐 API Documentation available at http://localhost:${this.port}/api`);
        logger.info(`💚 Health check available at http://localhost:${this.port}/health`);
        
        if (process.env.NODE_ENV === 'development') {
          logger.info(`🔧 Frontend should connect to http://localhost:${this.port}`);
        }
      });

      // Graceful shutdown handling
      process.on('SIGTERM', this.gracefulShutdown.bind(this));
      process.on('SIGINT', this.gracefulShutdown.bind(this));

    } catch (error) {
      logger.error('❌ Failed to start server:', error);
      process.exit(1);
    }
  }

  private async gracefulShutdown(signal: string): Promise<void> {
    logger.info(`🛑 Received ${signal}. Starting graceful shutdown...`);

    // Close server
    this.server.close(() => {
      logger.info('🔌 HTTP server closed');
    });

    // Close socket connections
    this.io.close(() => {
      logger.info('🔌 Socket.IO server closed');
    });

    // Close database connection
    await DatabaseService.disconnect();
    logger.info('🔌 Database connection closed');

    logger.info('✅ Graceful shutdown completed');
    process.exit(0);
  }
}

// Start server
const server = new Server();
server.start().catch((error) => {
  winston.error('Failed to start server:', error);
  process.exit(1);
});

export default server;
