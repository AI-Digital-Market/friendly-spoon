import dotenv from 'dotenv';

dotenv.config();

export const config = {
  // Server configuration
  port: parseInt(process.env.PORT || '3001', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',

  // Database configuration
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/ai-digital-friend',
    options: {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4
    }
  },

  // JWT configuration
  jwt: {
    secret: process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d'
  },

  // API Keys for AI services
  apiKeys: {
    openai: process.env.VITE_OPENAI_API_KEY,
    googleAI: process.env.VITE_GOOGLE_AI_API_KEY,
    huggingFace: process.env.VITE_HUGGINGFACE_API_KEY,
    elevenLabs: process.env.VITE_ELEVENLABS_API_KEY,
    anthropic: process.env.VITE_ANTHROPIC_API_KEY,
    stability: process.env.VITE_STABILITY_API_KEY,
    replicate: process.env.VITE_REPLICATE_API_TOKEN,
    ipinfo: process.env.VITE_IPINFO_API_KEY
  },

  // Passage Authentication
  passage: {
    appId: process.env.VITE_PASSAGE_APP_ID,
    apiKey: process.env.PASSAGE_API_KEY
  },

  // External services
  external: {
    googleOAuthClientId: process.env.VITE_GOOGLE_OAUTH_CLIENT_ID,
    githubOAuthClientId: process.env.VITE_GITHUB_OAUTH_CLIENT_ID,
    stripePublishableKey: process.env.VITE_STRIPE_PUBLISHABLE_KEY,
    stripeSecretKey: process.env.STRIPE_SECRET_KEY,
    cloudflareApiToken: process.env.CLOUDFLARE_API_TOKEN,
    awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
    awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    twilioAccountSid: process.env.VITE_TWILIO_ACCOUNT_SID,
    twilioAuthToken: process.env.VITE_TWILIO_AUTH_TOKEN
  },

  // Rate limiting
  rateLimiting: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10), // 15 minutes
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10),
    skipSuccessfulRequests: false,
    skipFailedRequests: false
  },

  // Redis configuration (for caching and sessions)
  redis: {
    url: process.env.REDIS_URL,
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
    password: process.env.REDIS_PASSWORD,
    db: parseInt(process.env.REDIS_DB || '0', 10)
  },

  // Email configuration
  email: {
    smtp: {
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    },
    from: process.env.EMAIL_FROM || 'noreply@onelastai.com'
  },

  // File upload configuration
  upload: {
    maxFileSize: parseInt(process.env.MAX_FILE_SIZE || '10485760', 10), // 10MB
    allowedFileTypes: process.env.ALLOWED_FILE_TYPES?.split(',') || [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'application/pdf',
      'text/plain',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ]
  },

  // Security configuration
  security: {
    bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS || '12', 10),
    maxLoginAttempts: parseInt(process.env.MAX_LOGIN_ATTEMPTS || '5', 10),
    lockoutTime: parseInt(process.env.LOCKOUT_TIME || '900000', 10), // 15 minutes
    sessionSecret: process.env.SESSION_SECRET || 'your-session-secret-change-this'
  },

  // AI model configuration
  aiModels: {
    defaultTemperature: parseFloat(process.env.AI_DEFAULT_TEMPERATURE || '0.7'),
    maxTokens: parseInt(process.env.AI_MAX_TOKENS || '2048', 10),
    defaultModel: process.env.AI_DEFAULT_MODEL || 'gpt-4o-mini',
    fallbackModel: process.env.AI_FALLBACK_MODEL || 'gpt-3.5-turbo'
  },

  // Monitoring and analytics
  monitoring: {
    enableMetrics: process.env.ENABLE_METRICS === 'true',
    metricsPort: parseInt(process.env.METRICS_PORT || '9090', 10),
    enableTracing: process.env.ENABLE_TRACING === 'true'
  },

  // Feature flags
  features: {
    enableRegistration: process.env.ENABLE_REGISTRATION !== 'false',
    enableEmailVerification: process.env.ENABLE_EMAIL_VERIFICATION === 'true',
    enableTwoFactor: process.env.ENABLE_TWO_FACTOR === 'true',
    enableAnalytics: process.env.ENABLE_ANALYTICS !== 'false',
    enableWebsockets: process.env.ENABLE_WEBSOCKETS !== 'false'
  }
};

// Validate required environment variables
const requiredEnvVars = [
  'MONGODB_URI'
];

const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  throw new Error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
}

export default config;
