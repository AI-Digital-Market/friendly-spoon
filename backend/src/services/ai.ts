import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ElevenLabsAPI } from 'elevenlabs';
import { HfInference } from '@huggingface/inference';
import { config } from '@/config/config.js';
import { logger } from '@/config/logger.js';

export class AIService {
  private openai: OpenAI | null = null;
  private googleAI: GoogleGenerativeAI | null = null;
  private elevenLabs: ElevenLabsAPI | null = null;
  private huggingFace: HfInference | null = null;

  constructor() {
    this.initializeServices();
  }

  private initializeServices(): void {
    try {
      // Initialize OpenAI
      if (config.apiKeys.openai) {
        this.openai = new OpenAI({
          apiKey: config.apiKeys.openai
        });
        logger.info('✅ OpenAI service initialized');
      }

      // Initialize Google AI
      if (config.apiKeys.googleAI) {
        this.googleAI = new GoogleGenerativeAI(config.apiKeys.googleAI);
        logger.info('✅ Google AI service initialized');
      }

      // Initialize ElevenLabs
      if (config.apiKeys.elevenLabs) {
        this.elevenLabs = new ElevenLabsAPI({
          apiKey: config.apiKeys.elevenLabs
        });
        logger.info('✅ ElevenLabs service initialized');
      }

      // Initialize Hugging Face
      if (config.apiKeys.huggingFace) {
        this.huggingFace = new HfInference(config.apiKeys.huggingFace);
        logger.info('✅ Hugging Face service initialized');
      }

    } catch (error) {
      logger.error('❌ Error initializing AI services:', error);
    }
  }

  // Chat completion using OpenAI
  async generateChatCompletion(messages: any[], options: any = {}): Promise<any> {
    if (!this.openai) {
      throw new Error('OpenAI service not available');
    }

    try {
      const response = await this.openai.chat.completions.create({
        model: options.model || config.aiModels.defaultModel,
        messages,
        temperature: options.temperature || config.aiModels.defaultTemperature,
        max_tokens: options.maxTokens || config.aiModels.maxTokens,
        stream: options.stream || false,
        ...options
      });

      return response;
    } catch (error: any) {
      logger.error('OpenAI chat completion error:', error);
      
      // Try fallback model if available
      if (options.model !== config.aiModels.fallbackModel) {
        logger.info('Trying fallback model...');
        return this.generateChatCompletion(messages, {
          ...options,
          model: config.aiModels.fallbackModel
        });
      }
      
      throw new Error(`AI chat service error: ${error.message}`);
    }
  }

  // Mood analysis using multiple AI models
  async analyzeMood(text: string, options: any = {}): Promise<any> {
    try {
      const moodPrompt = `
Analyze the emotional content and mood of the following text. Provide a detailed analysis including:

1. Primary emotion (joy, sadness, anger, fear, surprise, disgust, trust, anticipation, love, hope, anxiety, excitement, confidence, gratitude, contentment)
2. Mood score (0-100, where 0 is very negative and 100 is very positive)
3. Sentiment analysis (polarity: -1 to 1, subjectivity: 0 to 1)
4. Individual emotion scores (0-1 for each emotion)
5. Confidence level (0-1)
6. Key emotional indicators found in the text
7. Contextual insights
8. Recommendations for mood improvement if needed

Text to analyze: "${text}"

Please respond with a JSON object containing all this information.
`;

      const messages = [
        {
          role: 'system',
          content: 'You are an expert emotional intelligence AI specialized in mood analysis and mental health insights. Provide accurate, empathetic, and helpful analysis.'
        },
        {
          role: 'user',
          content: moodPrompt
        }
      ];

      const response = await this.generateChatCompletion(messages, {
        temperature: 0.3,
        maxTokens: 1000,
        ...options
      });

      const content = response.choices[0]?.message?.content;
      
      try {
        return JSON.parse(content);
      } catch (parseError) {
        // Fallback if JSON parsing fails
        return {
          primaryEmotion: 'neutral',
          moodScore: 50,
          sentiment: { polarity: 0, subjectivity: 0.5, confidence: 0.5 },
          emotions: {
            joy: 0, sadness: 0, anger: 0, fear: 0, surprise: 0,
            disgust: 0, trust: 0, anticipation: 0, love: 0, hope: 0,
            anxiety: 0, excitement: 0, confidence: 0, gratitude: 0, contentment: 0
          },
          confidence: 0.5,
          indicators: ['Analysis parsing failed'],
          insights: ['Unable to parse detailed analysis'],
          recommendations: ['Please try again with different text']
        };
      }

    } catch (error: any) {
      logger.error('Mood analysis error:', error);
      throw new Error(`Mood analysis failed: ${error.message}`);
    }
  }

  // Text-to-speech using ElevenLabs
  async generateSpeech(text: string, options: any = {}): Promise<Buffer> {
    if (!this.elevenLabs) {
      throw new Error('ElevenLabs service not available');
    }

    try {
      const audio = await this.elevenLabs.generate({
        voice: options.voice || "Rachel",
        text,
        model_id: options.model || "eleven_monolingual_v1",
        voice_settings: {
          stability: options.stability || 0.75,
          similarity_boost: options.similarity_boost || 0.75,
          style: options.style || 0.0,
          use_speaker_boost: options.use_speaker_boost || true
        }
      });

      const chunks: Buffer[] = [];
      for await (const chunk of audio) {
        chunks.push(chunk);
      }

      return Buffer.concat(chunks);
    } catch (error: any) {
      logger.error('Text-to-speech error:', error);
      throw new Error(`Speech generation failed: ${error.message}`);
    }
  }

  // Image analysis using Hugging Face
  async analyzeImage(imageBuffer: Buffer, options: any = {}): Promise<any> {
    if (!this.huggingFace) {
      throw new Error('Hugging Face service not available');
    }

    try {
      const result = await this.huggingFace.imageClassification({
        data: imageBuffer,
        model: options.model || 'google/vit-base-patch16-224'
      });

      return result;
    } catch (error: any) {
      logger.error('Image analysis error:', error);
      throw new Error(`Image analysis failed: ${error.message}`);
    }
  }

  // Generate creative content
  async generateCreativeContent(prompt: string, type: 'text' | 'ideas' | 'story' | 'poem' | 'script', options: any = {}): Promise<any> {
    try {
      const systemPrompts = {
        text: 'You are a creative writing assistant specialized in generating high-quality, engaging content.',
        ideas: 'You are a creative brainstorming assistant that generates innovative and practical ideas.',
        story: 'You are a master storyteller who creates compelling narratives with rich characters and engaging plots.',
        poem: 'You are a skilled poet who creates beautiful, meaningful poetry in various styles and forms.',
        script: 'You are a professional screenwriter who creates engaging scripts with natural dialogue and compelling scenes.'
      };

      const messages = [
        {
          role: 'system',
          content: systemPrompts[type] || systemPrompts.text
        },
        {
          role: 'user',
          content: `Please create ${type} content based on this prompt: ${prompt}`
        }
      ];

      const response = await this.generateChatCompletion(messages, {
        temperature: options.creativity || 0.8,
        maxTokens: options.maxTokens || 2000,
        ...options
      });

      return {
        content: response.choices[0]?.message?.content,
        type,
        prompt,
        metadata: {
          model: response.model,
          tokens: response.usage?.total_tokens,
          created: response.created
        }
      };

    } catch (error: any) {
      logger.error('Creative content generation error:', error);
      throw new Error(`Creative content generation failed: ${error.message}`);
    }
  }

  // Generate embeddings for semantic search
  async generateEmbeddings(text: string, options: any = {}): Promise<number[]> {
    if (!this.openai) {
      throw new Error('OpenAI service not available for embeddings');
    }

    try {
      const response = await this.openai.embeddings.create({
        model: options.model || 'text-embedding-3-small',
        input: text,
        encoding_format: 'float'
      });

      return response.data[0].embedding;
    } catch (error: any) {
      logger.error('Embeddings generation error:', error);
      throw new Error(`Embeddings generation failed: ${error.message}`);
    }
  }

  // Health check for all AI services
  async healthCheck(): Promise<any> {
    const services = {
      openai: false,
      googleAI: false,
      elevenLabs: false,
      huggingFace: false
    };

    try {
      if (this.openai) {
        await this.openai.models.list();
        services.openai = true;
      }
    } catch (error) {
      logger.debug('OpenAI health check failed:', error);
    }

    try {
      if (this.googleAI) {
        const model = this.googleAI.getGenerativeModel({ model: "gemini-pro" });
        await model.generateContent("test");
        services.googleAI = true;
      }
    } catch (error) {
      logger.debug('Google AI health check failed:', error);
    }

    try {
      if (this.elevenLabs) {
        await this.elevenLabs.voices.getAll();
        services.elevenLabs = true;
      }
    } catch (error) {
      logger.debug('ElevenLabs health check failed:', error);
    }

    try {
      if (this.huggingFace) {
        // Simple test inference
        services.huggingFace = true;
      }
    } catch (error) {
      logger.debug('Hugging Face health check failed:', error);
    }

    return services;
  }
}

export const aiService = new AIService();
export default aiService;
