import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useState, useRef, useEffect } from 'react'

interface CreativeMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  type: 'text' | 'voice'
  category?: string
  codeExample?: string
  thinking?: string
}

interface CreatorToolsPageProps {
  onBack?: () => void
}

export function CreatorToolsPage({ onBack }: CreatorToolsPageProps) {
  const [messages, setMessages] = useState<CreativeMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m MUSE - your Magical Universe of Stories & Expression! ✨ I\'m here to help you create amazing stories, write engaging posts, craft hilarious jokes, and bring your wildest creative ideas to life. What story shall we tell today?',
      timestamp: new Date(),
      type: 'text',
      category: 'greeting',
      thinking: 'Initializing creative inspiration engines and storytelling protocols...'
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

  // Creative Content Generator with Story Logic
  const generateCreativeResponse = (userInput: string): { content: string; codeExample: string; thinking: string; category: string } => {
  const input = userInput.toLowerCase()
    // Creative content patterns
    const creativePatterns = {
      story: {
        triggers: ['story', 'tale', 'adventure', 'fiction', 'novel', 'write a story', 'create a story'],
        content: 'I\'d love to help you craft an amazing story! Let me weave together characters, plot, and magic to create something truly special. What genre or theme interests you most?',
        codeExample: `// MUSE's Story Generation Engine\nclass StoryWeaver {\n  createStory(prompt, genre = 'adventure') {\n    const elements = this.analyzePrompt(prompt)\n    const structure = this.buildNarrative(elements)\n    \n    return {\n      plot: this.generatePlotOutline(structure),\n      characters: this.createCharacters(elements.themes),\n      setting: this.craftWorldbuilding(genre),\n      conflict: this.designConflict(structure.tension),\n      resolution: this.weaveEnding(structure.arc)\n    }\n  }\n  \n  addCreativeFlair(story) {\n    return this.enhanceWithMetaphors(\n      this.addEmotionalDepth(\n        this.polishDialogue(story)\n      )\n    )\n  }\n}`,
        thinking: 'Analyzing narrative structure, gathering creative inspiration, preparing storytelling framework...',
  category: 'story',
      },
      joke: {
        triggers: ['joke', 'funny', 'humor', 'laugh', 'comedy', 'make me laugh', 'tell a joke'],
        content: 'Time for some laughter! 😄 I\'ll craft a joke that\'ll tickle your funny bone. What type of humor do you enjoy - puns, observational comedy, or something silly?',
        codeExample: `// MUSE's Comedy Workshop\nclass HumorGenerator {\n  craftJoke(style = 'witty', topic = 'general') {\n    const comedyElements = this.analyzeHumorStyle(style)\n    const timing = this.calculatePunchlineTiming()\n    \n    return {\n      setup: this.buildSetup(topic, comedyElements),\n      punchline: this.createPunchline(timing),\n      delivery: this.optimizeDelivery(style),\n      alternativeEndings: this.generateVariations()\n    }\n  }\n  \n  testHumor(joke) {\n    return {\n      funniness: this.rateFunniness(joke),\n      appropriateness: this.checkAppropriate(joke),\n      originality: this.assessOriginality(joke)\n    }\n  }\n}`,
        thinking: 'Activating humor algorithms, analyzing comedic timing, preparing punchline delivery...',
  category: 'humor',
      },
      post: {
        triggers: ['post', 'social media', 'instagram', 'facebook', 'twitter', 'caption', 'hashtag'],
        content: 'Let\'s create some engaging social media content! I can help with captivating captions, trending hashtags, and posts that get people talking. What platform and topic?',
        codeExample: `// MUSE's Social Media Magic\nclass ContentCreator {\n  generatePost(platform, topic, tone = 'engaging') {\n    const audience = this.analyzeAudience(platform)\n    const trends = this.getCurrentTrends(platform)\n    \n    return {\n      caption: this.writeCaptivatingCaption(topic, tone),\n      hashtags: this.generateHashtags(topic, trends),\n      timing: this.suggestOptimalPostTime(audience),\n      engagement: this.addEngagementHooks(),\n      visuals: this.suggestVisualElements(topic)\n    }\n  }\n  \n  optimizeForReach(post) {\n    return this.addTrendingElements(\n      this.enhanceEngagement(post)\n    )\n  }\n}`,
        thinking: 'Analyzing social media trends, optimizing engagement strategies, crafting viral content...',
  category: 'social',
      },
      poem: {
        triggers: ['poem', 'poetry', 'verse', 'rhyme', 'haiku', 'sonnet', 'write a poem'],
        content: 'Poetry is the language of the soul! 🌟 Let me compose verses that dance with rhythm and meaning. What emotions or themes would you like to explore?',
        codeExample: `// MUSE's Poetry Forge\nclass VerseSmith {\n  composePoem(theme, style = 'free_verse') {\n    const emotions = this.extractEmotions(theme)\n    const imagery = this.gatherImagery(theme)\n    \n    return {\n      structure: this.designStructure(style),\n      rhymeScheme: this.createRhymePattern(style),\n      meter: this.establishRhythm(style),\n      metaphors: this.craftMetaphors(imagery),\n      finale: this.buildEmotionalClimax(emotions)\n    }\n  }\n  \n  polishVerse(poem) {\n    return this.refineRhythm(\n      this.enhanceImagery(\n        this.perfectFlow(poem)\n      )\n    )\n  }\n}`,
        thinking: 'Channeling poetic inspiration, structuring verse patterns, weaving emotional imagery...',
  category: 'poetry',
      },
      script: {
        triggers: ['script', 'dialogue', 'screenplay', 'play', 'drama', 'scene', 'theater'],
        content: 'Lights, camera, action! 🎬 I\'ll help you write compelling scripts with dynamic dialogue and engaging scenes. What story do you want to bring to life?',
        codeExample: `// MUSE's Script Studio\nclass ScriptWriter {\n  writeScript(premise, format = 'short_film') {\n    const acts = this.structureActs(premise)\n    const characters = this.developCharacters(premise)\n    \n    return {\n      logline: this.craftLogline(premise),\n      treatment: this.writeTreatment(acts),\n      scenes: this.buildScenes(acts, characters),\n      dialogue: this.craftDialogue(characters),\n      action: this.writeActionLines(acts)\n    }\n  }\n  \n  refineScript(script) {\n    return this.improveDialogue(\n      this.enhancePacing(\n        this.strengthenConflict(script)\n      )\n    )\n  }\n}`,
        thinking: 'Structuring dramatic arcs, developing character voices, crafting compelling dialogue...',
  category: 'script',
      },
      creative: {
        triggers: ['creative', 'idea', 'inspiration', 'brainstorm', 'imagine', 'invent', 'design'],
        content: 'Time to unleash creativity! 🎨 I\'m bubbling with ideas and ready to help you brainstorm, innovate, and create something extraordinary. What\'s sparking your imagination?',
        codeExample: `// MUSE's Inspiration Engine\nclass CreativitySpark {\n  generateIdeas(prompt, quantity = 10) {\n    const associations = this.freeAssociate(prompt)\n    const combinations = this.crossPollinate(associations)\n    \n    return combinations.map(concept => ({\n      idea: concept,\n      uniqueness: this.rateOriginality(concept),\n      feasibility: this.assessPracticality(concept),\n      impact: this.measurePotential(concept),\n      development: this.suggestNextSteps(concept)\n    })).sort((a, b) => b.uniqueness - a.uniqueness)\n  }\n  \n  expandIdea(seed) {\n    return this.addDimensions(\n      this.exploreAngles(\n        this.deepenConcept(seed)\n      )\n    )\n  }\n}`,
        thinking: 'Igniting creative sparks, connecting unusual concepts, generating innovative possibilities...',
  category: 'creative',
      },
      default: {
        triggers: [],
        content: 'What a fascinating creative challenge! ✨ Let me tap into my magical creative powers and help you bring this vision to life. Tell me more about what you\'re imagining!',
        codeExample: `// MUSE's Universal Creator\nasync function createMagic(userInput) {\n  const intent = await detectCreativeIntent(userInput)\n  const inspiration = gatherCreativeSeeds(userInput)\n  const magic = await weaveMagic(intent, inspiration)\n  \n  return {\n    creation: magic,\n    style: determineTone(userInput),\n    enhancement: addCreativeFlair(magic),\n    suggestions: generateFollowUps(intent),\n    sparkle: addMagicalTouch(magic)\n  }\n}`,
        thinking: 'Analyzing creative essence, channeling artistic energy, preparing magical content creation...',
  category: 'general'
      }
    }

    // Find matching creative pattern
    for (const [key, pattern] of Object.entries(creativePatterns)) {
      if (pattern.triggers.some(trigger => input.includes(trigger))) {
        return pattern as { content: string; codeExample: string; thinking: string; category: string }
      }
    }
    
  return creativePatterns.default as { content: string; codeExample: string; thinking: string; category: string }
  }

  const sendMessage = async () => {
    if (!inputMessage.trim()) return
    
    const userMessage: CreativeMessage = {
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
      const creativeResponse = generateCreativeResponse(inputMessage)
      const assistantMessage: CreativeMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: creativeResponse.content,
        timestamp: new Date(),
        type: 'text',
        category: creativeResponse.category,
        codeExample: creativeResponse.codeExample,
        thinking: creativeResponse.thinking
      }
      setMessages(prev => [...prev, assistantMessage])
      setIsThinking(false)
    }, 2500)
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

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-900 via-purple-900 to-orange-900 text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-600/20 to-orange-600/20" />
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
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="relative"
              >
                <img 
                  src="https://avatars.githubusercontent.com/u/223208802?s=400&u=5249ef08c9d130551422585dd7d29c8330579c1a&v=4" 
                  alt="One Last AI Logo" 
                  className="w-16 h-16 rounded-full ring-4 ring-pink-500/50 shadow-2xl shadow-pink-500/25"
                />
                <div className="absolute -inset-2 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full opacity-20 blur-lg animate-pulse"></div>
                <motion.div 
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-2 -right-2"
                >
                  {/* No icon rendering */}
                </motion.div>
              </motion.div>
              <div>
                <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent">
                  MUSE
                </h1>
                <p className="text-lg text-gray-300">Magical Universe of Stories & Expression</p>
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
                Your creative companion for crafting stories, jokes, posts, and magical content.
                From epic adventures to hilarious jokes - let's create something amazing together!
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Badge variant="secondary" className="bg-pink-500/20 text-pink-300 border-pink-500/30">
                  {/* No icon rendering */}
                  Story Writing
                </Badge>
                <Badge variant="secondary" className="bg-orange-500/20 text-orange-300 border-orange-500/30">
                  {/* No icon rendering */}
                  Comedy & Humor
                </Badge>
                <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                  {/* No icon rendering */}
                  Creative Posts
                </Badge>
                <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
                  {/* No icon rendering */}
                  Magical Ideas
                </Badge>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Main Creative Interface */}
      <div className="container mx-auto px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Creative Chat Section */}
            <div className="lg:col-span-2">
              <Card className="h-[700px] bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader className="border-b border-slate-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2 text-white">
                        {/* No icon rendering */}
                        Create with MUSE
                      </CardTitle>
                      <CardDescription className="text-gray-400">
                        Tell me what you want to create - stories, jokes, posts, anything creative!
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowCode(!showCode)}
                        className="border-slate-600 text-gray-300"
                      >
                        {/* No icon rendering */}
                        {showCode ? 'Hide' : 'Show'} Magic
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
                                  ? 'bg-gradient-to-r from-pink-500 to-orange-500 text-white ml-4'
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
                                    {/* No icon rendering */}
                                    Read
                                  </Button>
                                  {isSpeaking && (
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={stopSpeaking}
                                      className="h-6 px-2 text-xs text-gray-400 hover:text-white"
                                    >
                                      {/* No icon rendering */}
                                      Stop
                                    </Button>
                                  )}
                                </div>
                              )}
                            </div>
                            
                            {/* Creative Process */}
                            {message.thinking && showCode && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="mt-2 mr-4"
                              >
                                <div className="bg-slate-900/50 border border-slate-600 rounded-lg p-3">
                                  <div className="flex items-center gap-2 mb-2">
                                    {/* No icon rendering */}
                                    <span className="text-xs text-pink-400 font-medium">Creative Process</span>
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
                              <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" />
                              <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce [animation-delay:0.1s]" />
                              <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                            </div>
                            <span className="text-sm text-gray-400">MUSE is crafting magic...</span>
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
                          placeholder="Write a story about... Tell me a joke... Create a post... Let's be creative!"
                          className="w-full px-4 py-3 rounded-xl border border-slate-600 bg-slate-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
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
                        {/* No icon rendering */}
                      </Button>
                      
                      {/* Send Button */}
                      <Button
                        onClick={sendMessage}
                        disabled={!inputMessage.trim() || isThinking}
                        className="px-6 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white border-0"
                      >
                        {/* No icon rendering */}
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
                          Listening for creative inspiration...
                        </span>
                      </motion.div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Creative Magic Section */}
            {showCode && (
              <div className="lg:col-span-1">
                <Card className="h-[700px] bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                  <CardHeader className="border-b border-slate-700">
                    <CardTitle className="flex items-center gap-2 text-white">
                      Creative Magic
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      See how MUSE weaves creative magic in real-time
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="p-6 h-full overflow-y-auto">
                    <Tabs defaultValue="current" className="h-full">
                      <TabsList className="grid w-full grid-cols-2 bg-slate-900/50">
                        <TabsTrigger value="current" className="text-gray-300">Current Magic</TabsTrigger>
                        <TabsTrigger value="inspiration" className="text-gray-300">Inspiration</TabsTrigger>
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
                                <span className="text-sm font-medium text-pink-400">Latest Creation</span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => copyCode(messages[messages.length - 1].codeExample || '')}
                                  className="h-6 px-2 text-xs text-gray-400 hover:text-white"
                                >
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
                      
                      <TabsContent value="inspiration" className="mt-4">
                        <div className="space-y-4">
                          <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-600">
                            <h4 className="text-sm font-medium text-pink-400 mb-2">Creative Stats</h4>
                            <div className="space-y-2 text-xs text-gray-400">
                              <div>Stories Created: {messages.filter(m => m.category === 'story').length}</div>
                              <div>Jokes Generated: {messages.filter(m => m.category === 'humor').length}</div>
                              <div>Posts Written: {messages.filter(m => m.category === 'social').length}</div>
                              <div>Creative Boost: 150% ✨</div>
                            </div>
                          </div>
                          
                          <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-600">
                            <h4 className="text-sm font-medium text-orange-400 mb-2">Active Magic</h4>
                            <div className="space-y-1 text-xs text-gray-400">
                              <div>• Story Structure Engine</div>
                              <div>• Humor Detection Module</div>
                              <div>• Creative Inspiration Network</div>
                              <div>• Narrative Flow Optimizer</div>
                              <div>• Character Development AI</div>
                              <div>• Plot Twist Generator</div>
                            </div>
                          </div>
                          
                          <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-600">
                            <h4 className="text-sm font-medium text-purple-400 mb-2">Quick Ideas</h4>
                            <div className="space-y-2">
                              <button className="w-full text-left text-xs text-gray-400 hover:text-white p-2 rounded bg-slate-800/50 hover:bg-slate-700/50 transition-colors">
                                "Write a space adventure story"
                              </button>
                              <button className="w-full text-left text-xs text-gray-400 hover:text-white p-2 rounded bg-slate-800/50 hover:bg-slate-700/50 transition-colors">
                                "Tell me a dad joke about coffee"
                              </button>
                              <button className="w-full text-left text-xs text-gray-400 hover:text-white p-2 rounded bg-slate-800/50 hover:bg-slate-700/50 transition-colors">
                                "Create an Instagram caption"
                              </button>
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
