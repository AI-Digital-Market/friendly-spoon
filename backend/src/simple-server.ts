import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Basic middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'AI Digital Friend Backend is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Basic API test endpoints
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend API is working!' });
});

// Basic AI endpoints for testing
app.post('/api/ai/chat', (req, res) => {
  const { message } = req.body;
  res.json({ 
    response: `AI received: ${message}`,
    timestamp: new Date().toISOString()
  });
});

app.get('/api/ai/modules', (req, res) => {
  res.json([
    { id: 'mood-analyzer', name: 'Mood Analyzer', status: 'active' },
    { id: 'creative-writer', name: 'Creative Writer', status: 'active' },
    { id: 'code-assistant', name: 'Code Assistant', status: 'active' },
    { id: 'task-manager', name: 'Task Manager', status: 'active' },
    { id: 'learning-companion', name: 'Learning Companion', status: 'active' },
    { id: 'health-wellness', name: 'Health & Wellness', status: 'active' },
    { id: 'finance-advisor', name: 'Finance Advisor', status: 'active' },
    { id: 'entertainment', name: 'Entertainment Hub', status: 'active' }
  ]);
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 AI Digital Friend Backend running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🧪 Test endpoint: http://localhost:${PORT}/api/test`);
  console.log(`🤖 AI modules: http://localhost:${PORT}/api/ai/modules`);
});

export default app;
