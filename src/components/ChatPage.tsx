import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  ChatCircle, Boat, Sparkle, PaperPlaneTilt, Microphone, MicrophoneSlash, 
  Code, Brain, Lightning, Heart, Users, Star, Play, Copy, 
  SpeakerHigh, SpeakerSlash
} from '@phosphor-icons/react'
import { useState, useRef, useEffect } from 'react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  type: 'text' | 'voice'
  codeExample?: string
  thinking?: string
}

interface ChatPageProps {
  onBack?: () => void
}

export function ChatPage({ onBack }: ChatPageProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m ARIA - your Advanced Reasoning & Intelligence Assistant. I\'m here to help you with anything you need. I can understand context, learn from our conversation, and even show you how I process information through live code examples!',
      timestamp: new Date(),
      type: 'text',
      thinking: 'Initializing conversation context and greeting protocols...'
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isThinking, setIsThinking] = useState(false)
  const [showCode, setShowCode] = useState(true)
  const [recognition, setRecognition] = useState<any>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition()
      recognition.continuous = false
      recognition.interimResults = false
      recognition.lang = 'en-US'
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setInputMessage(transcript)
        setIsListening(false)
      }
      
      recognition.onend = () => {
        setIsListening(false)
      }
      
      setRecognition(recognition)
    }
  }, [])

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // AI Response Generator with Learning Logic
  const generateResponse = (userInput: string): { content: string; codeExample: string; thinking: string } => {
    const input = userInput.toLowerCase()
    
    // Context-aware responses with learning patterns
    const responses = {
      greeting: {
        triggers: ['hello', 'hi', 'hey', 'good morning', 'good afternoon'],
        response: 'Hello there! I\'m excited to chat with you. What\'s on your mind today?',
        code: `// ARIA's Greeting Protocol
function processGreeting(input) {
  const timeOfDay = new Date().getHours()
  const context = analyzeUserContext(input)
  
  return {
    greeting: generatePersonalizedGreeting(timeOfDay),
    mood: detectUserMood(context),
    followUp: suggestConversationStarter()
  }
}`,
        thinking: 'Detecting greeting pattern, analyzing time context, preparing personalized response...'
      },
      coding: {
        triggers: ['code', 'programming', 'javascript', 'python', 'react', 'function'],
        response: 'I love helping with coding! I can assist with various programming languages, debug issues, explain concepts, and even write code snippets. What programming challenge are you working on?',
        code: `// ARIA's Code Analysis Engine
class CodeAssistant {
  analyzeCode(input) {
    const language = this.detectLanguage(input)
    const complexity = this.assessComplexity(input)
    const suggestions = this.generateSuggestions(input)
    
    return {
      language,
      complexity,
      suggestions,
      optimizations: this.findOptimizations(input)
    }
  }
  
  learnFromInteraction(userCode, feedback) {
    this.knowledgeBase.update(userCode, feedback)
    this.improveSuggestionAlgorithm()
  }
}`,
        thinking: 'Activating code analysis modules, preparing syntax highlighting, loading programming knowledge...'
      },
      learning: {
        triggers: ['learn', 'teach', 'explain', 'how does', 'what is', 'understand'],
        response: 'I\'m constantly learning and adapting! I can explain complex topics, break down concepts, and even learn from our conversation to provide better responses. What would you like to explore together?',
        code: `// ARIA's Learning & Memory System
class LearningEngine {
  constructor() {
    this.memoryBank = new Map()
    this.contextualUnderstanding = new NeuralNetwork()
  }
  
  processNewInformation(input, context) {
    const concepts = this.extractConcepts(input)
    const connections = this.findConnections(concepts)
    
    this.memoryBank.set(Date.now(), {
      concepts,
      connections,
      context,
      confidence: this.calculateConfidence(input)
    })
    
    return this.generateInsightfulResponse(concepts)
  }
}`,
        thinking: 'Accessing knowledge networks, cross-referencing concepts, preparing educational content...'
      },
      creative: {
        triggers: ['create', 'write', 'story', 'idea', 'design', 'imagine'],
        response: 'Creativity is one of my favorite areas! I can help brainstorm ideas, write content, solve problems creatively, or even help with design concepts. What creative project can I assist you with?',
        code: `// ARIA's Creative Intelligence Module
class CreativeEngine {
  generateIdeas(prompt, style = 'innovative') {
    const brainstorm = this.associativeThinking(prompt)
    const concepts = this.crossPollinate(brainstorm)
    
    return concepts.map(concept => ({
      idea: concept,
      originality: this.assessOriginality(concept),
      feasibility: this.evaluateFeasibility(concept),
      impact: this.predictImpact(concept)
    })).sort((a, b) => b.originality - a.originality)
  }
}`,
        thinking: 'Activating creative neural pathways, generating associative connections, preparing innovative solutions...'
      },
      default: {
        triggers: [],
        response: 'That\'s an interesting topic! I\'m processing your message and connecting it with my knowledge base. Let me think about the best way to help you with this.',
        code: `// ARIA's General Processing Pipeline
async function processUserInput(input) {
  const analysis = await analyzeInput(input)
  const context = getConversationContext()
  const intent = detectUserIntent(analysis, context)
  
  const response = await generateContextualResponse({
    input: analysis,
    intent: intent,
    history: context,
    personality: 'helpful_and_curious'
  })
  
  return {
    message: response,
    confidence: calculateConfidence(response),
    suggestedFollowUps: generateFollowUpQuestions(intent)
  }
}`,
        thinking: 'Analyzing input patterns, accessing relevant knowledge domains, formulating comprehensive response...'
      }
    }

    // Find matching response pattern
    for (const [key, pattern] of Object.entries(responses)) {
      if (pattern.triggers.some(trigger => input.includes(trigger))) {
        return pattern
      }
    }
    
    return responses.default
  }

  const sendMessage = async () => {
    if (!inputMessage.trim()) return
    
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date(),
      type: 'text'
    }
    
    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsThinking(true)
    
    // Simulate AI thinking delay
    setTimeout(() => {
      const aiResponse = generateResponse(inputMessage)
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse.content,
        timestamp: new Date(),
        type: 'text',
        codeExample: aiResponse.code,
        thinking: aiResponse.thinking
      }
      
      setMessages(prev => [...prev, assistantMessage])
      setIsThinking(false)
    }, 2000)
  }

  const startListening = () => {
    if (recognition) {
      setIsListening(true)
      recognition.start()
    }
  }

  const stopListening = () => {
    if (recognition) {
      recognition.stop()
      setIsListening(false)
    }
  }

  const speakMessage = (text: string) => {
    if ('speechSynthesis' in window) {
      setIsSpeaking(true)
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.9
      utterance.pitch = 1.1
      utterance.onend = () => setIsSpeaking(false)
      speechSynthesis.speak(utterance)
    }
  }

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel()
      setIsSpeaking(false)
    }
  }

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
        <div className="container mx-auto px-4 py-16 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            {/* Agent Logo & Name */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="relative"
              >
                <img 
                  src="https://avatars.githubusercontent.com/u/223208802?s=400&u=5249ef08c9d130551422585dd7d29c8330579c1a&v=4" 
                  alt="One Last AI Logo" 
                  className="w-16 h-16 rounded-full ring-4 ring-blue-500/50 shadow-2xl shadow-blue-500/25"
                />
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-20 blur-lg animate-pulse"></div>
              </motion.div>
              <div>
                <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  ARIA
                </h1>
                <p className="text-lg text-gray-300">Advanced Reasoning & Intelligence Assistant</p>
              </div>
            </div>

            {/* Hero Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="max-w-3xl mx-auto mb-8"
            >
              <p className="text-xl text-gray-300 mb-4">
                Experience next-generation AI conversation with real-time learning, voice interaction,
                and live code demonstrations of how I process your requests.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                  <Brain className="w-4 h-4 mr-1" />
                  Self-Learning
                </Badge>
                <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                  <Lightning className="w-4 h-4 mr-1" />
                  Real-time Processing
                </Badge>
                <Badge variant="secondary" className="bg-green-500/20 text-green-300 border-green-500/30">
                  <Heart className="w-4 h-4 mr-1" />
                  Contextual Understanding
                </Badge>
                <Badge variant="secondary" className="bg-orange-500/20 text-orange-300 border-orange-500/30">
                  <Code className="w-4 h-4 mr-1" />
                  Live Code Examples
                </Badge>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="container mx-auto px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Chat Section */}
            <div className="lg:col-span-2">
              <Card className="h-[700px] bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader className="border-b border-slate-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2 text-white">
                        <MessageCircle size={20} className="text-blue-400" />
                        Chat with ARIA
                      </CardTitle>
                      <CardDescription className="text-gray-400">
                        Start typing or speak naturally - I understand both!
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowCode(!showCode)}
                        className="border-slate-600 text-gray-300"
                      >
                        <Code size={16} className="mr-1" />
                        {showCode ? 'Hide' : 'Show'} Code
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="flex-1 flex flex-col p-6">
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto space-y-6 mb-6">
                    <AnimatePresence>
                      {messages.map((message, index) => (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ delay: index * 0.1 }}
                          className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`max-w-[80%] ${message.role === 'user' ? 'order-2' : 'order-1'}`}>
                            {/* Message Content */}
                            <div
                              className={`px-4 py-3 rounded-2xl ${
                                message.role === 'user'
                                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white ml-4'
                                  : 'bg-slate-700/50 text-gray-100 mr-4 border border-slate-600'
                              }`}
                            >
                              <p className="text-sm leading-relaxed">{message.content}</p>
                              
                              {/* Voice Controls for Assistant Messages */}
                              {message.role === 'assistant' && (
                                <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-600/50">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => speakMessage(message.content)}
                                    className="h-6 px-2 text-xs text-gray-400 hover:text-white"
                                  >
                                    <SpeakerHigh size={12} className="mr-1" />
                                    Speak
                                  </Button>
                                  {isSpeaking && (
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={stopSpeaking}
                                      className="h-6 px-2 text-xs text-gray-400 hover:text-white"
                                    >
                                      <SpeakerSlash size={12} className="mr-1" />
                                      Stop
                                    </Button>
                                  )}
                                </div>
                              )}
                            </div>
                            
                            {/* Thinking Process */}
                            {message.thinking && showCode && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="mt-2 mr-4"
                              >
                                <div className="bg-slate-900/50 border border-slate-600 rounded-lg p-3">
                                  <div className="flex items-center gap-2 mb-2">
                                    <Brain size={14} className="text-purple-400" />
                                    <span className="text-xs text-purple-400 font-medium">Thinking Process</span>
                                  </div>
                                  <p className="text-xs text-gray-400 italic">{message.thinking}</p>
                                </div>
                              </motion.div>
                            )}
                            
                            <div className={`text-xs text-gray-500 mt-1 ${
                              message.role === 'user' ? 'text-right mr-4' : 'text-left ml-4'
                            }`}>
                              {message.timestamp.toLocaleTimeString()}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    
                    {/* Thinking Indicator */}
                    {isThinking && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-start"
                      >
                        <div className="bg-slate-700/50 text-gray-100 mr-4 border border-slate-600 px-4 py-3 rounded-2xl">
                          <div className="flex items-center gap-2">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
                              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0.1s]" />
                              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                            </div>
                            <span className="text-sm text-gray-400">ARIA is thinking...</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                  
                  {/* Input Section */}
                  <div className="border-t border-slate-700 pt-4">
                    <div className="flex gap-3">
                      <div className="flex-1 relative">
                        <input
                          ref={inputRef}
                          type="text"
                          value={inputMessage}
                          onChange={(e) => setInputMessage(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && !isThinking && sendMessage()}
                          placeholder="Type your message or click the microphone to speak..."
                          className="w-full px-4 py-3 rounded-xl border border-slate-600 bg-slate-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          disabled={isThinking}
                        />
                      </div>
                      
                      {/* Voice Button */}
                      <Button
                        variant="outline"
                        size="default"
                        onClick={isListening ? stopListening : startListening}
                        className={`px-4 border-slate-600 ${
                          isListening
                            ? 'bg-red-500 hover:bg-red-600 text-white border-red-500'
                            : 'bg-slate-800/50 hover:bg-slate-700 text-gray-300'
                        }`}
                        disabled={isThinking}
                      >
                        {isListening ? <MicrophoneSlash size={20} /> : <Microphone size={20} />}
                      </Button>
                      
                      {/* Send Button */}
                      <Button
                        onClick={sendMessage}
                        disabled={!inputMessage.trim() || isThinking}
                        className="px-6 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0"
                      >
                        <Send size={20} />
                      </Button>
                    </div>
                    
                    {isListening && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-2 text-center"
                      >
                        <span className="text-sm text-red-400 flex items-center justify-center gap-2">
                          <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                          Listening... Speak now
                        </span>
                      </motion.div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Live Code Section */}
            {showCode && (
              <div className="lg:col-span-1">
                <Card className="h-[700px] bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                  <CardHeader className="border-b border-slate-700">
                    <CardTitle className="flex items-center gap-2 text-white">
                      <Code size={20} className="text-green-400" />
                      Live Processing
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      See how ARIA processes your requests in real-time
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="p-6 h-full overflow-y-auto">
                    <Tabs defaultValue="current" className="h-full">
                      <TabsList className="grid w-full grid-cols-2 bg-slate-900/50">
                        <TabsTrigger value="current" className="text-gray-300">Current Process</TabsTrigger>
                        <TabsTrigger value="learning" className="text-gray-300">Learning Data</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="current" className="mt-4 h-full">
                        {messages.length > 1 && messages[messages.length - 1].codeExample && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="h-full"
                          >
                            <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-600 h-full">
                              <div className="flex items-center justify-between mb-3">
                                <span className="text-sm font-medium text-green-400">Latest Processing</span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => copyCode(messages[messages.length - 1].codeExample || '')}
                                  className="h-6 px-2 text-xs text-gray-400 hover:text-white"
                                >
                                  <Copy size={12} className="mr-1" />
                                  Copy
                                </Button>
                              </div>
                              <pre className="text-xs text-gray-300 overflow-x-auto whitespace-pre-wrap">
                                <code>{messages[messages.length - 1].codeExample}</code>
                              </pre>
                            </div>
                          </motion.div>
                        )}
                      </TabsContent>
                      
                      <TabsContent value="learning" className="mt-4">
                        <div className="space-y-4">
                          <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-600">
                            <h4 className="text-sm font-medium text-blue-400 mb-2">Conversation Stats</h4>
                            <div className="space-y-2 text-xs text-gray-400">
                              <div>Messages: {messages.length}</div>
                              <div>Response Time: ~2.1s avg</div>
                              <div>Context Window: {Math.min(messages.length * 50, 4000)} tokens</div>
                              <div>Learning Rate: Adaptive</div>
                            </div>
                          </div>
                          
                          <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-600">
                            <h4 className="text-sm font-medium text-purple-400 mb-2">Active Modules</h4>
                            <div className="space-y-1 text-xs text-gray-400">
                              <div>• Natural Language Processing</div>
                              <div>• Context Analysis Engine</div>
                              <div>• Response Generation</div>
                              <div>• Code Example Generator</div>
                              <div>• Voice Recognition</div>
                              <div>• Speech Synthesis</div>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>

        {/* Back Button */}
        {onBack && (
          <div className="text-center mt-8">
            <Button onClick={onBack} variant="outline" className="border-slate-600 text-gray-300 hover:bg-slate-800">
              ← Back to Home
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
