import { Server as SocketIOServer, Socket } from 'socket.io';
import jwt from 'jsonwebtoken';
import { User } from '@/models/User.js';
import { config } from '@/config/config.js';
import { logger } from '@/config/logger.js';

export class SocketService {
  private io: SocketIOServer;
  private connectedUsers: Map<string, Socket> = new Map();

  constructor(io: SocketIOServer) {
    this.io = io;
  }

  public initialize(): void {
    // Authentication middleware for socket connections
    this.io.use(async (socket: Socket, next) => {
      try {
        const token = socket.handshake.auth.token || socket.handshake.headers.authorization?.replace('Bearer ', '');
        
        if (!token) {
          return next(new Error('Authentication error: No token provided'));
        }

        const decoded = jwt.verify(token, config.jwt.secret) as { userId: string, email: string };
        const user = await User.findById(decoded.userId).select('-password');

        if (!user || !user.isActive) {
          return next(new Error('Authentication error: Invalid user'));
        }

        socket.data.user = user;
        socket.data.userId = user._id.toString();
        
        next();
      } catch (error) {
        next(new Error('Authentication error: Invalid token'));
      }
    });

    this.io.on('connection', (socket: Socket) => {
      this.handleConnection(socket);
    });

    logger.info('🔌 Socket.IO service initialized');
  }

  private handleConnection(socket: Socket): void {
    const userId = socket.data.userId;
    const user = socket.data.user;

    if (!userId || !user) {
      socket.disconnect();
      return;
    }

    // Store connected user
    this.connectedUsers.set(userId, socket);

    logger.info('User connected via WebSocket:', {
      userId,
      email: user.email,
      socketId: socket.id
    });

    // Join user to their personal room
    socket.join(`user:${userId}`);

    // Send welcome message
    socket.emit('connection:success', {
      message: 'Connected successfully',
      userId,
      timestamp: new Date().toISOString()
    });

    // Handle chat events
    this.setupChatHandlers(socket);

    // Handle mood events
    this.setupMoodHandlers(socket);

    // Handle user events
    this.setupUserHandlers(socket);

    // Handle typing indicators
    this.setupTypingHandlers(socket);

    // Handle disconnect
    socket.on('disconnect', (reason) => {
      this.handleDisconnection(socket, reason);
    });
  }

  private setupChatHandlers(socket: Socket): void {
    const userId = socket.data.userId;

    // Join chat session
    socket.on('chat:join', (sessionId: string) => {
      socket.join(`chat:${sessionId}`);
      socket.emit('chat:joined', { sessionId });
      
      logger.debug('User joined chat session:', { userId, sessionId });
    });

    // Leave chat session
    socket.on('chat:leave', (sessionId: string) => {
      socket.leave(`chat:${sessionId}`);
      socket.emit('chat:left', { sessionId });
      
      logger.debug('User left chat session:', { userId, sessionId });
    });

    // Real-time message updates
    socket.on('chat:message:status', (data: { messageId: string, status: 'sending' | 'sent' | 'error' }) => {
      socket.to(`chat:${data.messageId}`).emit('chat:message:status', data);
    });
  }

  private setupMoodHandlers(socket: Socket): void {
    const userId = socket.data.userId;

    // Mood analysis progress
    socket.on('mood:analyze:start', (data: { text: string }) => {
      socket.emit('mood:analyze:progress', { 
        status: 'analyzing',
        message: 'Analyzing your mood...'
      });
    });

    // Real-time mood insights
    socket.on('mood:insights:subscribe', () => {
      socket.join(`mood:${userId}`);
      socket.emit('mood:insights:subscribed');
    });

    socket.on('mood:insights:unsubscribe', () => {
      socket.leave(`mood:${userId}`);
      socket.emit('mood:insights:unsubscribed');
    });
  }

  private setupUserHandlers(socket: Socket): void {
    const userId = socket.data.userId;

    // User status updates
    socket.on('user:status', (status: 'online' | 'away' | 'busy') => {
      socket.broadcast.emit('user:status:update', {
        userId,
        status,
        timestamp: new Date().toISOString()
      });
    });

    // User preferences updates
    socket.on('user:preferences:update', (preferences: any) => {
      socket.emit('user:preferences:updated', {
        preferences,
        timestamp: new Date().toISOString()
      });
    });
  }

  private setupTypingHandlers(socket: Socket): void {
    const userId = socket.data.userId;

    // Typing indicators for chat
    socket.on('chat:typing:start', (sessionId: string) => {
      socket.to(`chat:${sessionId}`).emit('chat:typing:start', {
        userId,
        sessionId
      });
    });

    socket.on('chat:typing:stop', (sessionId: string) => {
      socket.to(`chat:${sessionId}`).emit('chat:typing:stop', {
        userId,
        sessionId
      });
    });
  }

  private handleDisconnection(socket: Socket, reason: string): void {
    const userId = socket.data.userId;
    const user = socket.data.user;

    if (userId) {
      this.connectedUsers.delete(userId);
      
      logger.info('User disconnected from WebSocket:', {
        userId,
        email: user?.email,
        socketId: socket.id,
        reason
      });

      // Notify other users about disconnection
      socket.broadcast.emit('user:status:update', {
        userId,
        status: 'offline',
        timestamp: new Date().toISOString()
      });
    }
  }

  // Public methods for sending messages to users
  public sendToUser(userId: string, event: string, data: any): void {
    this.io.to(`user:${userId}`).emit(event, data);
  }

  public sendToChatSession(sessionId: string, event: string, data: any): void {
    this.io.to(`chat:${sessionId}`).emit(event, data);
  }

  public sendMoodUpdate(userId: string, moodData: any): void {
    this.io.to(`mood:${userId}`).emit('mood:update', {
      ...moodData,
      timestamp: new Date().toISOString()
    });
  }

  public broadcastSystemMessage(event: string, data: any): void {
    this.io.emit(event, {
      ...data,
      timestamp: new Date().toISOString()
    });
  }

  public getConnectedUsers(): string[] {
    return Array.from(this.connectedUsers.keys());
  }

  public isUserConnected(userId: string): boolean {
    return this.connectedUsers.has(userId);
  }

  public getConnectionCount(): number {
    return this.connectedUsers.size;
  }
}

export default SocketService;
