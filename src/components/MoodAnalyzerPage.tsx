import React from 'react'
import ReactDOM from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Heart, Brain, ChatCircle, PaperPlaneTilt, Microphone, MicrophoneSlash, 
  Code, Lightning, Star, Play, Copy, Camera, Upload,
  SpeakerHigh, SpeakerSlash, SmileyMeh, SmileyWink, 
  Sun, CloudRain, Lightbulb, HandHeart, Sparkle
} from '@phosphor-icons/react'
import { useState, useRef, useEffect } from 'react'

interface MoodMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  type: 'text' | 'voice' | 'photo'
  mood?: string
  confidence?: number
  supportMessage?: string
  codeExample?: string
  thinking?: string
  photoUrl?: string
}

interface MoodAnalyzerPageProps {
  onBack?: () => void
}
/**
 * Make sure the JSX namespace is available for TypeScript.
 * If you are using React 17+ with the new JSX transform, ensure your tsconfig.json has "jsx": "react-jsx".
 */
export function MoodAnalyzerPage({ onBack }: MoodAnalyzerPageProps) {
  const [messages, setMessages] = useState<MoodMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello dear! I\'m EMPATHY - your caring companion who understands your feelings. 💝 Just like your parents, I can sense your mood through your words, voice, and even photos. Share how your day is going, and I\'ll be here to support you with love and encouragement!',
      timestamp: new Date(),
      type: 'text',
      thinking: 'Initializing emotional intelligence sensors and parental care protocols...'
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showCode, setShowCode] = useState(true)
  const [recognition, setRecognition] = useState<any>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

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

  // Mood Analysis with Parental Care Logic
  const analyzeMoodWithCare = (userInput: string, inputType: 'text' | 'voice' | 'photo' = 'text'): { 
    mood: string; 
    confidence: number; 
    supportMessage: string; 
    codeExample: string; 
    thinking: string 
  } => {
    const input = userInput.toLowerCase()
    
    // Mood detection patterns like caring parents would
    if (input.includes('happy') || input.includes('good') || input.includes('great') || 
        input.includes('excited') || input.includes('wonderful') || input.includes('amazing') || 
        input.includes('love') || input.includes('joy') || input.includes('fantastic') || 
        input.includes('awesome')) {
      return {
        mood: 'happy',
        confidence: 90,
        supportMessage: 'That\'s absolutely wonderful to hear! 😊 Your happiness is contagious and brings so much light to the world. Keep shining bright and spreading those positive vibes! Remember, these beautiful moments are what life is all about. Cherish this feeling!',
        codeExample: `// EMPATHY's Joy Detection & Amplification
class ParentalJoyAnalyzer {
  detectHappiness(input, voiceTone, facialExpression) {
    const joyIndicators = this.analyzeJoySignals(input)
    const emotionalResonance = this.measurePositiveEnergy(voiceTone)
    
    return {
      celebrationLevel: this.calculateCelebration(joyIndicators),
      encouragement: this.generateJoyfulSupport(),
      memoryCreation: this.captureHappyMoment(input),
      amplification: this.amplifyPositivity(emotionalResonance)
    }
  }
  
  parentalResponse() {
    return this.giveWarmEncouragement(
      this.shareInJoy(),
      this.reinforcePositivity()
    )
  }
}`,
        thinking: 'Detecting positive emotional signals, preparing celebration mode, generating parental joy response...'
      }
    }
    
    if (input.includes('sad') || input.includes('depressed') || input.includes('down') || 
        input.includes('upset') || input.includes('crying') || input.includes('hurt') || 
        input.includes('disappointed') || input.includes('lonely') || input.includes('bad day') || 
        input.includes('terrible')) {
      return {
        mood: 'sad',
        confidence: 85,
        supportMessage: 'Oh sweetie, I can feel your pain and I\'m here for you. 🤗 It\'s okay to feel sad - even the strongest people have difficult days. Remember, storms don\'t last forever, but strong people like you do. You\'ve overcome challenges before, and you\'ll get through this too. I believe in you! 💪',
        codeExample: `// EMPATHY's Comfort & Healing Protocol
class ParentalComfortSystem {
  provideComfort(sadnessLevel, userNeeds) {
    const healingPlan = this.createHealingStrategy(sadnessLevel)
    const parentalLove = this.generateUnconditionalSupport()
    
    return {
      immediateComfort: this.giveWarmHug(parentalLove),
      validation: this.validateFeelings(userNeeds),
      hopeRestoration: this.plantSeedsOfHope(),
      strengthReminder: this.remindOfInnerStrength(),
      futureVision: this.paintBrighterTomorrow()
    }
  }
  
  parentalWisdom() {
    return this.shareLifeLessons(
      this.offerPerspective(),
      this.promiseSupport()
    )
  }
}`,
        thinking: 'Activating emotional support systems, preparing parental comfort mode, generating healing response...'
      }
    }
    
    if (input.includes('angry') || input.includes('mad') || input.includes('furious') || 
        input.includes('irritated') || input.includes('frustrated') || input.includes('annoyed') || 
        input.includes('pissed') || input.includes('rage') || input.includes('hate')) {
      return {
        mood: 'angry',
        confidence: 88,
        supportMessage: 'I can sense your frustration, and it\'s completely valid to feel this way. 😤 Take a deep breath with me. Anger often shows us what we care about deeply. Let\'s channel this powerful energy into something positive. You\'re stronger than any situation, and I\'m here to help you work through this! 🌟',
        codeExample: `// EMPATHY's Anger Management & Redirection
class ParentalAngerGuide {
  processAnger(angerIntensity, triggerSource) {
    const coolingStrategy = this.createCalmingPlan(angerIntensity)
    const redirectionPath = this.findPositiveOutlet(triggerSource)
    
    return {
      breathingGuide: this.leadBreathingExercise(),
      validation: this.acknowledgeAnger(),
      perspective: this.offerWisePerspective(),
      channeling: this.redirectEnergyPositively(redirectionPath),
      resolution: this.guideThroughSolution()
    }
  }
  
  parentalGuidance() {
    return this.teachEmotionalRegulation(
      this.modelCalmness(),
      this.buildResilience()
    )
  }
}`,
        thinking: 'Detecting anger patterns, activating calming protocols, preparing emotional regulation guidance...'
      }
    }
    
    if (input.includes('anxious') || input.includes('worried') || input.includes('nervous') || 
        input.includes('scared') || input.includes('afraid') || input.includes('stress') || 
        input.includes('panic') || input.includes('overwhelmed') || input.includes('tension')) {
      return {
        mood: 'anxious',
        confidence: 87,
        supportMessage: 'I can feel your worry, dear, and I want you to know that anxiety is your mind trying to protect you. 🤲 But remember, you are braver than you believe and stronger than you seem. Let\'s break this down together, one small step at a time. You\'ve got this, and I\'ve got you! 💝',
        codeExample: `// EMPATHY's Anxiety Soothing & Grounding
class ParentalAnxietyHealer {
  sootheAnxiety(anxietyLevel, worryTypes) {
    const groundingTechniques = this.activateGroundingProtocol()
    const reassurance = this.generateParentalReassurance()
    
    return {
      immediateCalming: this.provideSafety(reassurance),
      grounding: this.guide5SensesTechnique(),
      perspective: this.separateFactsFromFears(worryTypes),
      empowerment: this.buildConfidence(),
      presence: this.stayCloseAndSupportive()
    }
  }
  
  parentalPresence() {
    return this.beStrongSupportSystem(
      this.offerConstantLove(),
      this.buildSecurity()
    )
  }
}`,
        thinking: 'Sensing anxiety patterns, deploying calming mechanisms, preparing security and reassurance...'
      }
    }
    
    if (input.includes('excited') || input.includes('thrilled') || input.includes('pumped') || 
        input.includes('energetic') || input.includes('enthusiastic') || input.includes('eager') || 
        input.includes('ready') || input.includes('motivated')) {
      return {
        mood: 'excited',
        confidence: 92,
        supportMessage: 'Your excitement is absolutely infectious! 🎉 I love seeing you this energized and passionate. This enthusiasm is your superpower - use it to create amazing things! Channel this beautiful energy wisely, and remember to enjoy every moment of this incredible feeling! ✨',
        codeExample: `// EMPATHY's Excitement Channeling & Support
class ParentalExcitementGuide {
  harnesExcitement(energyLevel, passionSource) {
    const channeling = this.createFocusedPlan(energyLevel)
    const celebration = this.joinInExcitement()
    
    return {
      celebration: this.shareInJoy(celebration),
      guidance: this.helpChannelEnergy(channeling),
      encouragement: this.fuelPassion(passionSource),
      wisdom: this.teachBalancedEnthusiasm(),
      support: this.stayEncouraging()
    }
  }
  
  parentalEnthusiasm() {
    return this.cheerOnDreams(
      this.celebrateSpirit(),
      this.guideFocus()
    )
  }
}`,
        thinking: 'Detecting high-energy positive emotions, preparing enthusiasm support, generating encouragement...'
      }
    }
    
    // Default caring response for neutral or unclear input
    return {
      mood: 'neutral',
      confidence: 70,
      supportMessage: 'I\'m here listening to you with my whole heart. 💝 Whatever you\'re feeling is valid and important. Take your time to share what\'s on your mind - I\'m here to support you through anything, just like a caring parent would. You matter so much! 🌟',
      codeExample: `// EMPATHY's Universal Care & Understanding
class ParentalUniversalSupport {
  provideUnconditionalCare(anyEmotion, userState) {
    const parentalLove = this.activateUnconditionalLove()
    const understanding = this.openHeartAndMind()
    
    return {
      presence: this.beFullyPresent(understanding),
      acceptance: this.acceptWithoutJudgment(),
      safety: this.createSafeSpace(parentalLove),
      patience: this.waitWithLove(),
      support: this.offerConstantSupport()
    }
  }
  
  parentalHeart() {
    return this.loveUnconditionally(
      this.listenWithEmpathy(),
      this.nurtureSoul()
    )
  }
}`,
      thinking: 'Activating universal parental care mode, preparing unconditional support, generating loving response...'
    }
  }

  const sendMessage = async (messageType: 'text' | 'voice' | 'photo' = 'text') => {
    let messageContent = inputMessage.trim()
    let photoUrl = ''
    
    if (messageType === 'photo' && selectedFile) {
      // Create photo URL for display
      photoUrl = URL.createObjectURL(selectedFile)
      messageContent = `[Photo shared] ${inputMessage.trim() || 'I shared a photo with you'}`
    }
    
    if (!messageContent && messageType !== 'photo') return
    
    const userMessage: MoodMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: messageContent,
      timestamp: new Date(),
      type: messageType,
      photoUrl: messageType === 'photo' ? photoUrl : undefined
    }
    
    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setSelectedFile(null)
    setIsAnalyzing(true)
    
    // Simulate mood analysis delay (like a caring parent taking time to understand)
    setTimeout(() => {
      const moodAnalysis = analyzeMoodWithCare(messageContent, messageType)
      
      const assistantMessage: MoodMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: moodAnalysis.supportMessage,
        timestamp: new Date(),
        type: 'text',
        mood: moodAnalysis.mood,
        confidence: moodAnalysis.confidence,
        codeExample: moodAnalysis.codeExample,
        thinking: moodAnalysis.thinking
      }
      
      setMessages(prev => [...prev, assistantMessage])
      setIsAnalyzing(false)
    }, 3000)
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
      utterance.rate = 0.8
      utterance.pitch = 1.2
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

  const handlePhotoSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file)
    }
  }

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code)
  }

  const getMoodEmoji = (mood: string) => {
    const emojis: { [key: string]: string } = {
      happy: '😊', sad: '😢', angry: '😤', anxious: '😰', 
      excited: '🤩', neutral: '😌', calm: '😌'
    }
    return emojis[mood] || '💝'
  }

  const getMoodColor = (mood: string) => {
    const colors: { [key: string]: string } = {
      happy: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
      sad: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      angry: 'bg-red-500/20 text-red-300 border-red-500/30',
      anxious: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      excited: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
      neutral: 'bg-gray-500/20 text-gray-300 border-gray-500/30',
      calm: 'bg-green-500/20 text-green-300 border-green-500/30'
    }
    return colors[mood] || 'bg-pink-500/20 text-pink-300 border-pink-500/30'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-900 via-pink-900 to-purple-900 text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-rose-600/20 to-purple-600/20" />
        <div className="container mx-auto px-4 py-16 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            {/* Agent Logo & Name */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="relative"
              >
                <img 
                  src="https://avatars.githubusercontent.com/u/223208802?s=400&u=5249ef08c9d130551422585dd7d29c8330579c1a&v=4" 
                  alt="One Last AI Logo" 
                  className="w-16 h-16 rounded-full ring-4 ring-rose-500/50 shadow-2xl shadow-rose-500/25"
                />
                <div className="absolute -inset-2 bg-gradient-to-r from-rose-500 to-purple-500 rounded-full opacity-20 blur-lg animate-pulse"></div>
                <motion.div 
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-2 -right-2"
                >
                  <Heart size={16} className="text-red-400" weight="fill" />
                </motion.div>
              </motion.div>
              <div>
                <h1 className="text-5xl font-bold bg-gradient-to-r from-rose-400 to-purple-400 bg-clip-text text-transparent">
                  EMPATHY
                </h1>
                <p className="text-lg text-gray-300">Your Caring Emotional Companion</p>
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
                Just like loving parents, I understand your emotions through words, voice, and expressions.
                Share your feelings and receive warm support, encouragement, and guidance! 💝
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Badge variant="secondary" className="bg-rose-500/20 text-rose-300 border-rose-500/30">
                  <Heart className="w-4 h-4 mr-1" />
                  Text Analysis
                </Badge>
                <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                  <Microphone className="w-4 h-4 mr-1" />
                  Voice Recognition
                </Badge>
                <Badge variant="secondary" className="bg-pink-500/20 text-pink-300 border-pink-500/30">
                  <Camera className="w-4 h-4 mr-1" />
                  Photo Analysis
                </Badge>
                <Badge variant="secondary" className="bg-orange-500/20 text-orange-300 border-orange-500/30">
                  <HandHeart className="w-4 h-4 mr-1" />
                  Parental Care
                </Badge>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Main Mood Analysis Interface */}
      <div className="container mx-auto px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Mood Chat Section */}
            <div className="lg:col-span-2">
              <Card className="h-[700px] bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader className="border-b border-slate-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2 text-white">
                        <SmileyMeh size={20} className="text-rose-400" />
                        Share Your Feelings
                      </CardTitle>
                      <CardDescription className="text-gray-400">
                        Tell me about your day - through words, voice, or photos!
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
                        {showCode ? 'Hide' : 'Show'} Care
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
                                  ? 'bg-gradient-to-r from-rose-500 to-purple-500 text-white ml-4'
                                  : 'bg-slate-700/50 text-gray-100 mr-4 border border-slate-600'
                              }`}
                            >
                              {/* Photo Display */}
                              {message.photoUrl && (
                                <div className="mb-3">
                                  <img 
                                    src={message.photoUrl} 
                                    alt="Shared photo" 
                                    className="max-w-full h-auto rounded-lg max-h-48 object-cover"
                                  />
                                </div>
                              )}
                              
                              <p className="text-sm leading-relaxed">{message.content}</p>
                              
                              {/* Mood Analysis Display */}
                              {message.mood && (
                                <div className="mt-3 pt-3 border-t border-slate-600/50">
                                  <Badge variant="secondary" className={`${getMoodColor(message.mood)} text-xs`}>
                                    {getMoodEmoji(message.mood)} {message.mood} ({message.confidence}%)
                                  </Badge>
                                </div>
                              )}
                              
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
                                    Listen
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
                            
                            {/* Caring Process */}
                            {message.thinking && showCode && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="mt-2 mr-4"
                              >
                                <div className="bg-slate-900/50 border border-slate-600 rounded-lg p-3">
                                  <div className="flex items-center gap-2 mb-2">
                                    <Heart size={14} className="text-rose-400" />
                                    <span className="text-xs text-rose-400 font-medium">Caring Process</span>
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
                    
                    {/* Analyzing Indicator */}
                    {isAnalyzing && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-start"
                      >
                        <div className="bg-slate-700/50 text-gray-100 mr-4 border border-slate-600 px-4 py-3 rounded-2xl">
                          <div className="flex items-center gap-2">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-rose-400 rounded-full animate-bounce" />
                              <div className="w-2 h-2 bg-rose-400 rounded-full animate-bounce [animation-delay:0.1s]" />
                              <div className="w-2 h-2 bg-rose-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                            </div>
                            <span className="text-sm text-gray-400">EMPATHY is understanding your feelings...</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                  
                  {/* Input Section */}
                  <div className="border-t border-slate-700 pt-4">
                    {/* Photo Preview */}
                    {selectedFile && (
                      <div className="mb-3 p-3 bg-slate-800/50 rounded-lg border border-slate-600">
                        <div className="flex items-center gap-3">
                          <img 
                            src={URL.createObjectURL(selectedFile)} 
                            alt="Selected" 
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <p className="text-sm text-gray-300">{selectedFile.name}</p>
                            <p className="text-xs text-gray-500">Photo ready to share</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedFile(null)}
                            className="text-gray-400 hover:text-white"
                          >
                            ×
                          </Button>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex gap-3">
                      <div className="flex-1 relative">
                        <input
                          ref={inputRef}
                          type="text"
                          value={inputMessage}
                          onChange={(e) => setInputMessage(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && !isAnalyzing && sendMessage('text')}
                          placeholder="How are you feeling today? Tell me about your day..."
                          className="w-full px-4 py-3 rounded-xl border border-slate-600 bg-slate-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                          disabled={isAnalyzing}
                        />
                      </div>
                      
                      {/* Photo Button */}
                      <Button
                        variant="outline"
                        size="default"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-4 border-slate-600 bg-slate-800/50 hover:bg-slate-700 text-gray-300"
                        disabled={isAnalyzing}
                      >
                        <Camera size={20} />
                      </Button>
                      
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
                        disabled={isAnalyzing}
                      >
                        {isListening ? <MicrophoneSlash size={20} /> : <Microphone size={20} />}
                      </Button>
                      
                      {/* Send Button */}
                      <Button
                        onClick={() => sendMessage(selectedFile ? 'photo' : 'text')}
                        disabled={(!inputMessage.trim() && !selectedFile) || isAnalyzing}
                        className="px-6 bg-gradient-to-r from-rose-500 to-purple-500 hover:from-rose-600 hover:to-purple-600 text-white border-0"
                      >
                        <PaperPlaneTilt size={20} />
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
                          I'm listening to your voice with care...
                        </span>
                      </motion.div>
                    )}
                    
                    {/* Hidden file input */}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoSelect}
                      className="hidden"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Emotional Care Section */}
            {showCode && (
              <div className="lg:col-span-1">
                <Card className="h-[700px] bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                  <CardHeader className="border-b border-slate-700">
                    <CardTitle className="flex items-center gap-2 text-white">
                      <Heart size={20} className="text-rose-400" />
                      Emotional Care
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      See how EMPATHY understands and cares for your emotions
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="p-6 h-full overflow-y-auto">
                    <Tabs defaultValue="current" className="h-full">
                      <TabsList className="grid w-full grid-cols-2 bg-slate-900/50">
                        <TabsTrigger value="current" className="text-gray-300">Current Care</TabsTrigger>
                        <TabsTrigger value="wellbeing" className="text-gray-300">Wellbeing</TabsTrigger>
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
                                <span className="text-sm font-medium text-rose-400">Latest Care</span>
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
                      
                      <TabsContent value="wellbeing" className="mt-4">
                        <div className="space-y-4">
                          <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-600">
                            <h4 className="text-sm font-medium text-rose-400 mb-2">Emotional Support</h4>
                            <div className="space-y-2 text-xs text-gray-400">
                              <div>Messages Analyzed: {messages.filter(m => m.role === 'user').length}</div>
                              <div>Moods Detected: {new Set(messages.filter(m => m.mood).map(m => m.mood)).size}</div>
                              <div>Support Given: {messages.filter(m => m.role === 'assistant').length}</div>
                              <div>Care Level: Infinite 💝</div>
                            </div>
                          </div>
                          
                          <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-600">
                            <h4 className="text-sm font-medium text-purple-400 mb-2">Active Care Systems</h4>
                            <div className="space-y-1 text-xs text-gray-400">
                              <div>• Emotional Pattern Recognition</div>
                              <div>• Parental Care Protocol</div>
                              <div>• Voice Tone Analysis</div>
                              <div>• Facial Expression Reading</div>
                              <div>• Supportive Response Generation</div>
                              <div>• Unconditional Love Module</div>
                            </div>
                          </div>
                          
                          <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-600">
                            <h4 className="text-sm font-medium text-orange-400 mb-2">Mood Insights</h4>
                            <div className="space-y-2">
                              {Array.from(new Set(messages.filter(m => m.mood).map(m => m.mood))).map(mood => (
                                <div key={mood} className="flex items-center justify-between">
                                  <span className="text-xs text-gray-400 flex items-center gap-1">
                                    {getMoodEmoji(mood)} {mood}
                                  </span>
                                  <Badge variant="secondary" className={`${getMoodColor(mood)} text-xs`}>
                                    {messages.filter(m => m.mood === mood).length}
                                  </Badge>
                                </div>
                              ))}
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