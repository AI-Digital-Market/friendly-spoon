# AI Digital Friend Backend

## Overview
Backend API server for the AI Digital Friend platform with MongoDB integration, authentication, AI services, and real-time WebSocket support.

## Features
- **User Authentication** - JWT-based auth with Passage integration
- **AI Services Integration** - OpenAI, Google AI, ElevenLabs, Hugging Face
- **Mood Analysis** - Advanced emotional intelligence and pattern recognition
- **Chat System** - Real-time chat with AI assistants
- **Creative Tools** - Content generation and optimization
- **IP Information** - Geolocation and network analysis
- **WebSocket Support** - Real-time bidirectional communication
- **Rate Limiting** - API protection and quota management
- **MongoDB Database** - Scalable data persistence
- **TypeScript** - Type-safe development

## Quick Start

### Prerequisites
- Node.js 18+
- npm 8+
- MongoDB Atlas connection
- AI service API keys

### Installation
```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Edit .env with your API keys
nano .env

# Build the project
npm run build

# Start development server
npm run dev
```

### Development
```bash
# Watch mode for development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run tests
npm test

# Lint code
npm run lint
```

## API Documentation

### Base URL
- Development: `http://localhost:3001`
- Production: `https://api.onelastai.com`

### Authentication
All protected endpoints require a Bearer token:
```bash
Authorization: Bearer your-jwt-token
```

### Core Endpoints

#### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh tokens
- `GET /api/auth/me` - Get current user

#### Mood Analysis
- `POST /api/mood/analyze` - Analyze mood from text
- `GET /api/mood/history` - Get mood history
- `GET /api/mood/insights` - Get mood insights
- `POST /api/mood/entry` - Manual mood entry

#### Chat System
- `POST /api/chat/sessions` - Create chat session
- `GET /api/chat/sessions` - Get user sessions
- `POST /api/chat/sessions/:id/messages` - Send message
- `GET /api/chat/sessions/:id/messages` - Get messages

#### Creative Tools
- `POST /api/creator/generate/text` - Generate content
- `POST /api/creator/brainstorm` - Generate ideas
- `POST /api/creator/optimize` - Optimize content
- `POST /api/creator/code/generate` - Generate code

#### IP Information
- `GET /api/ip/info` - Get IP information
- `GET /api/ip/geolocation` - Get geolocation
- `GET /api/ip/security` - Security analysis
- `POST /api/ip/bulk` - Bulk IP lookup

### Health Check
```bash
GET /health
```

### API Documentation
```bash
GET /api
```

## WebSocket Events

### Connection
```javascript
const socket = io('ws://localhost:3001', {
  auth: {
    token: 'your-jwt-token'
  }
});

socket.on('connection:success', (data) => {
  console.log('Connected:', data);
});
```

### Chat Events
```javascript
// Join chat session
socket.emit('chat:join', sessionId);

// Send typing indicator
socket.emit('chat:typing:start', sessionId);
socket.emit('chat:typing:stop', sessionId);

// Listen for messages
socket.on('chat:message:new', (message) => {
  console.log('New message:', message);
});
```

### Mood Events
```javascript
// Subscribe to mood updates
socket.emit('mood:insights:subscribe');

// Listen for mood updates
socket.on('mood:update', (moodData) => {
  console.log('Mood update:', moodData);
});
```

## Database Schema

### Users
- Authentication and profile information
- Subscription and usage tracking
- Preferences and settings

### Chat Sessions & Messages
- Conversation management
- Message history and metadata
- AI response tracking

### Mood Entries
- Emotional data and analysis
- Pattern recognition and insights
- Historical tracking

## Configuration

### Environment Variables
Required variables in `.env`:

```bash
# Core
NODE_ENV=development|production
PORT=3001
MONGODB_URI=mongodb://...

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d

# AI Services
VITE_OPENAI_API_KEY=sk-...
VITE_GOOGLE_AI_API_KEY=...
VITE_ELEVENLABS_API_KEY=...
VITE_HUGGINGFACE_API_KEY=...

# Rate Limiting
RATE_LIMIT_MAX_REQUESTS=100
RATE_LIMIT_WINDOW_MS=900000
```

### AI Models Configuration
```javascript
{
  defaultModel: 'gpt-4o-mini',
  fallbackModel: 'gpt-3.5-turbo',
  defaultTemperature: 0.7,
  maxTokens: 2048
}
```

## Security Features

- **JWT Authentication** - Secure token-based auth
- **Rate Limiting** - Multiple rate limiters for different endpoints
- **Input Validation** - Comprehensive request validation
- **CORS Protection** - Configured for frontend domains
- **Helmet.js** - Security headers
- **Account Locking** - Protection against brute force

## Rate Limits

### General API
- 100 requests per 15 minutes per IP

### Authentication
- 5 attempts per 15 minutes per IP

### AI Endpoints
- 30 requests per minute per user

### Registration
- 3 attempts per hour per IP

## Error Handling

All errors return consistent JSON format:
```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable message",
    "details": "Additional details",
    "suggestion": "What to do next"
  }
}
```

## Logging

Structured logging with Winston:
- **Error logs** - `/logs/error.log`
- **Combined logs** - `/logs/combined.log`
- **Console output** - Development only

## Performance

- **MongoDB Indexes** - Optimized queries
- **Connection Pooling** - Database connection management
- **Compression** - gzip response compression
- **Caching Headers** - Appropriate cache control

## Deployment

### Docker
```bash
docker build -t ai-backend .
docker run -p 3001:3001 ai-backend
```

### Production Checklist
- [ ] Set `NODE_ENV=production`
- [ ] Configure strong JWT secrets
- [ ] Set up SSL/TLS certificates
- [ ] Configure production MongoDB
- [ ] Set up logging aggregation
- [ ] Configure monitoring

## Development

### Project Structure
```
backend/
├── src/
│   ├── config/          # Configuration files
│   ├── middleware/      # Express middleware
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── services/        # Business logic
│   └── server.ts        # Main server file
├── logs/                # Log files
├── dist/                # Compiled JavaScript
└── package.json
```

### Code Style
- TypeScript strict mode
- ESLint configuration
- Prettier formatting
- Consistent error handling

### Testing
```bash
# Run tests
npm test

# Run with coverage
npm run test:coverage

# Watch mode
npm run test:watch
```

## API Client Examples

### JavaScript/Node.js
```javascript
const response = await fetch('http://localhost:3001/api/mood/analyze', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer your-token'
  },
  body: JSON.stringify({
    text: 'I feel really excited about this new project!',
    options: { includeInsights: true }
  })
});

const data = await response.json();
console.log(data);
```

### Python
```python
import requests

response = requests.post(
    'http://localhost:3001/api/chat/sessions/123/messages',
    headers={
        'Content-Type': 'application/json',
        'Authorization': 'Bearer your-token'
    },
    json={
        'content': 'Hello, how are you today?'
    }
)

data = response.json()
print(data)
```

### cURL
```bash
curl -X POST http://localhost:3001/api/creator/generate/text \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-token" \
  -d '{
    "prompt": "Write a blog post about AI",
    "type": "blog",
    "options": {"creativity": 0.8}
  }'
```

## Support

- **Documentation**: This README
- **Issues**: GitHub Issues
- **Email**: support@onelastai.com

## License

© 2025 One Last AI. All rights reserved.
