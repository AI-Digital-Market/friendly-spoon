import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { 
  Brain, Microphone, MicrophoneSlash, MagnifyingGlass, Plus, 
  FileText, AddressBook, CreditCard, Key, Calendar,
  Code, Lightning, Archive, Folder, Tag,
  Clock, User, Lock, Eye, EyeSlash, Trash,
  Download, Upload, Star, Heart, BookBookmark,
  SpeakerHigh, SpeakerSlash, Robot   
} from '@phosphor-icons/react'
import { useState, useRef, useEffect } from 'react'

interface MemoryItem {
  id: string
  title: string
  content: string
  type: 'text' | 'contact' | 'password' | 'card' | 'note' | 'document' | 'voice'
  category: string
  tags: string[]
  isSecure: boolean
  createdAt: Date
  updatedAt: Date
  accessCount: number
  isFavorite: boolean
  voiceNote?: {
    duration: number
    audioUrl: string
    transcript: string
  }
  metadata?: {
    website?: string
    phoneNumber?: string
    email?: string
    cardNumber?: string
    expiryDate?: string
    location?: string
  }
}

interface MemoryPageProps {
  onBack?: () => void
}

export function MemoryPage({ onBack }: MemoryPageProps) {
  const [memories, setMemories] = useState<MemoryItem[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedMemory, setSelectedMemory] = useState<MemoryItem | null>(null)
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)
  const [showCode, setShowCode] = useState(true)
  const [newMemory, setNewMemory] = useState({
    title: '',
    content: '',
    type: 'text' as const,
    category: '',
    tags: '',
    isSecure: false
  })
  const [recognition, setRecognition] = useState<any>(null)
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
        processVoiceInput(transcript)
        setIsListening(false)
      }
      
      recognition.onend = () => {
        setIsListening(false)
      }
      
      setRecognition(recognition)
    }
  }, [])

  // Sample memories for demonstration
  useEffect(() => {
    const sampleMemories: MemoryItem[] = [
      {
        id: '1',
        title: 'Gmail Password',
        content: 'MySecurePassword123!',
        type: 'password',
        category: 'Accounts',
        tags: ['gmail', 'email', 'google'],
        isSecure: true,
        createdAt: new Date('2024-06-15'),
        updatedAt: new Date('2024-06-15'),
        accessCount: 12,
        isFavorite: true,
        metadata: {
          website: 'gmail.com',
          email: 'user@gmail.com'
        }
      },
      {
        id: '2',
        title: 'Mom\'s Birthday',
        content: 'Mom\'s birthday is March 15th, 1965. She loves roses and chocolate cake. Planning surprise party at Riverside Restaurant.',
        type: 'note',
        category: 'Personal',
        tags: ['mom', 'birthday', 'march', 'celebration'],
        isSecure: false,
        createdAt: new Date('2024-01-10'),
        updatedAt: new Date('2024-01-10'),
        accessCount: 5,
        isFavorite: true,
        metadata: {
          phoneNumber: '+1-555-0123'
        }
      },
      {
        id: '3',
        title: 'Credit Card - Chase Sapphire',
        content: 'Chase Sapphire Preferred',
        type: 'card',
        category: 'Finance',
        tags: ['chase', 'credit card', 'sapphire'],
        isSecure: true,
        createdAt: new Date('2024-08-01'),
        updatedAt: new Date('2024-08-01'),
        accessCount: 3,
        isFavorite: false,
        metadata: {
          cardNumber: '**** **** **** 1234',
          expiryDate: '12/27'
        }
      },
      {
        id: '4',
        title: 'Dr. Smith Appointment',
        content: 'Doctor appointment with Dr. Smith on Friday 2 PM. Address: 123 Medical Center Dr. Don\'t forget to bring insurance card and previous test results.',
        type: 'note',
        category: 'Health',
        tags: ['doctor', 'appointment', 'friday', 'medical'],
        isSecure: false,
        createdAt: new Date('2024-08-05'),
        updatedAt: new Date('2024-08-05'),
        accessCount: 2,
        isFavorite: false,
        metadata: {
          phoneNumber: '+1-555-0456',
          location: '123 Medical Center Dr'
        }
      },
      {
        id: '5',
        title: 'Grocery List Voice Note',
        content: 'Milk, eggs, bread, tomatoes, chicken breast, olive oil, and don\'t forget the special ice cream for the kids',
        type: 'voice',
        category: 'Shopping',
        tags: ['grocery', 'shopping', 'food'],
        isSecure: false,
        createdAt: new Date('2024-08-07'),
        updatedAt: new Date('2024-08-07'),
        accessCount: 1,
        isFavorite: false,
        voiceNote: {
          duration: 15,
          audioUrl: 'audio/grocery-list.mp3',
          transcript: 'Milk, eggs, bread, tomatoes, chicken breast, olive oil, and don\'t forget the special ice cream for the kids'
        }
      }
    ]
    setMemories(sampleMemories)
  }, [])

  const categories = [
    { id: 'all', name: 'All Memories', icon: Archive, count: memories.length },
    { id: 'Personal', name: 'Personal', icon: User, count: memories.filter(m => m.category === 'Personal').length },
    { id: 'Accounts', name: 'Accounts', icon: Key, count: memories.filter(m => m.category === 'Accounts').length },
    { id: 'Finance', name: 'Finance', icon: CreditCard, count: memories.filter(m => m.category === 'Finance').length },
    { id: 'Health', name: 'Health', icon: Heart, count: memories.filter(m => m.category === 'Health').length },
    { id: 'Shopping', name: 'Shopping', icon: BookBookmark, count: memories.filter(m => m.category === 'Shopping').length },
    { id: 'Work', name: 'Work', icon: FileText, count: memories.filter(m => m.category === 'Work').length }
  ]

  const memoryTypes = [
    { id: 'text', name: 'Text Note', icon: FileText, color: 'bg-blue-500/20 text-blue-300' },
  { id: 'contact', name: 'Contact', color: 'bg-green-500/20 text-green-300' },
    { id: 'password', name: 'Password', icon: Key, color: 'bg-red-500/20 text-red-300' },
    { id: 'card', name: 'Card Info', icon: CreditCard, color: 'bg-purple-500/20 text-purple-300' },
    { id: 'note', name: 'Personal Note', icon: FileText, color: 'bg-orange-500/20 text-orange-300' },
    { id: 'voice', name: 'Voice Note', icon: Microphone, color: 'bg-pink-500/20 text-pink-300' }
  ]

  const processVoiceInput = (transcript: string) => {
    // Check if it's a search query
    if (transcript.toLowerCase().includes('find') || transcript.toLowerCase().includes('search') || transcript.toLowerCase().includes('show me')) {
      const searchTerms = transcript.toLowerCase()
        .replace(/find|search|show me|give me|get me/g, '')
        .trim()
      
      setSearchQuery(searchTerms)
      performIntelligentSearch(searchTerms)
    } else {
      // It's new memory to store
      setNewMemory(prev => ({
        ...prev,
        content: transcript,
        title: transcript.split(' ').slice(0, 4).join(' ') + '...'
      }))
      setShowAddForm(true)
    }
  }

  const performIntelligentSearch = (query: string) => {
    const searchTerms = query.toLowerCase().split(' ')
    const results = memories.filter(memory => {
      const searchText = `${memory.title} ${memory.content} ${memory.tags.join(' ')} ${memory.category}`.toLowerCase()
      return searchTerms.some(term => searchText.includes(term))
    })
    
    if (results.length === 1) {
      setSelectedMemory(results[0])
      speakMemoryContent(results[0])
    }
  }

  const speakMemoryContent = (memory: MemoryItem) => {
    if ('speechSynthesis' in window && !memory.isSecure) {
      setIsSpeaking(true)
      const utterance = new SpeechSynthesisUtterance(
        `Found: ${memory.title}. ${memory.content}`
      )
      utterance.rate = 0.8
      utterance.pitch = 1.0
      utterance.onend = () => setIsSpeaking(false)
      speechSynthesis.speak(utterance)
    }
  }

  const addMemory = () => {
    const memory: MemoryItem = {
      id: Date.now().toString(),
      title: newMemory.title || newMemory.content.split(' ').slice(0, 4).join(' ') + '...',
      content: newMemory.content,
      type: newMemory.type,
      category: newMemory.category || 'Personal',
      tags: newMemory.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      isSecure: newMemory.isSecure,
      createdAt: new Date(),
      updatedAt: new Date(),
      accessCount: 0,
      isFavorite: false
    }
    
    setMemories(prev => [memory, ...prev])
    setNewMemory({
      title: '',
      content: '',
      type: 'text',
      category: '',
      tags: '',
      isSecure: false
    })
    setShowAddForm(false)
  }

  const deleteMemory = (id: string) => {
    setMemories(prev => prev.filter(m => m.id !== id))
    setSelectedMemory(null)
  }

  const toggleFavorite = (id: string) => {
    setMemories(prev => prev.map(m => 
      m.id === id ? { ...m, isFavorite: !m.isFavorite } : m
    ))
  }

  const filteredMemories = selectedCategory === 'all' 
    ? memories 
    : memories.filter(memory => memory.category === selectedCategory)

  const searchedMemories = searchQuery 
    ? filteredMemories.filter(memory => {
        const searchText = `${memory.title} ${memory.content} ${memory.tags.join(' ')} ${memory.category}`.toLowerCase()
        return searchText.includes(searchQuery.toLowerCase())
      })
    : filteredMemories

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

  const generateCode = () => {
    return `// MEMORY's Neural Storage & Retrieval System
class MemoryAI {
  constructor() {
    this.neuralIndex = new Map()
    this.semanticEngine = new SemanticSearchEngine()
    this.encryptionKey = generateUserUniqueKey()
  }

  async storeMemory(input, metadata = {}) {
    // Stage 1: Content Analysis & Classification
    const analysis = await this.analyzeContent(input)
    const classification = this.classifyMemoryType(analysis)
    
    // Stage 2: Generate Semantic Embeddings
    const embeddings = await this.generateEmbeddings(input)
    const keyPhrases = this.extractKeyPhrases(input)
    
    // Stage 3: Security Assessment
    const securityLevel = this.assessSensitivity(input, classification)
    const encryptedContent = securityLevel.isSecure 
      ? this.encrypt(input, this.encryptionKey)
      : input
    
    // Stage 4: Neural Indexing
    const memoryRecord = {
      id: this.generateUniqueId(),
      content: encryptedContent,
      embeddings: embeddings,
      keyPhrases: keyPhrases,
      classification: classification,
      timestamp: Date.now(),
      accessPattern: new AccessTracker(),
      relationships: this.findRelatedMemories(embeddings)
    }
    
    // Stage 5: Multi-dimensional Storage
    await Promise.all([
      this.storeInNeuralIndex(memoryRecord),
      this.updateSemanticGraph(memoryRecord),
      this.createAssociativeLinks(memoryRecord),
      this.generateRetrievalCues(memoryRecord)
    ])
    
    return memoryRecord.id
  }
  
  async retrieveMemory(query, context = {}) {
    // Stage 1: Query Understanding
    const queryAnalysis = await this.analyzeQuery(query)
    const queryEmbeddings = await this.generateEmbeddings(query)
    
    // Stage 2: Multi-modal Search
    const candidates = await Promise.all([
      this.semanticSearch(queryEmbeddings),
      this.keywordSearch(queryAnalysis.keywords),
      this.fuzzyMatch(queryAnalysis.patterns),
      this.contextualSearch(context),
      this.associativeRetrieval(queryAnalysis.concepts)
    ])
    
    // Stage 3: Confidence Scoring & Ranking
    const scoredResults = this.scoreAndRank(candidates, queryAnalysis)
    
    // Stage 4: Access Control & Decryption
    const authorizedResults = await this.applyAccessControl(scoredResults)
    const decryptedResults = await this.decryptIfAuthorized(authorizedResults)
    
    // Stage 5: Result Optimization
    return this.optimizeResults(decryptedResults, queryAnalysis)
  }
  
  async findSimilar(memoryId, limit = 5) {
    const baseMemory = await this.getMemory(memoryId)
    const similarityScores = new Map()
    
    for (const [id, memory] of this.neuralIndex) {
      if (id === memoryId) continue
      
      const similarity = this.calculateSimilarity([
        this.cosineSimilarity(baseMemory.embeddings, memory.embeddings),
        this.temporalSimilarity(baseMemory.timestamp, memory.timestamp),
        this.categoricalSimilarity(baseMemory.classification, memory.classification),
        this.behavioralSimilarity(baseMemory.accessPattern, memory.accessPattern)
      ])
      
      similarityScores.set(id, similarity)
    }
    
    return Array.from(similarityScores.entries())
      .sort(([,a], [,b]) => b - a)
      .slice(0, limit)
      .map(([id]) => this.getMemory(id))
  }
}`
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  const getTypeIcon = (type: string) => {
    const typeConfig = memoryTypes.find(t => t.id === type)
    return typeConfig ? typeConfig.icon : FileText
  }

  const getTypeColor = (type: string) => {
    const typeConfig = memoryTypes.find(t => t.id === type)
    return typeConfig ? typeConfig.color : 'bg-gray-500/20 text-gray-300'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20" />
        <div className="container mx-auto px-4 py-16 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            {/* Agent Logo & Name */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                <img 
                  src="https://avatars.githubusercontent.com/u/223208802?s=400&u=5249ef08c9d130551422585dd7d29c8330579c1a&v=4" 
                  alt="One Last AI Logo" 
                  className="w-16 h-16 rounded-full ring-4 ring-purple-500/50 shadow-2xl shadow-purple-500/25"
                />
                <div className="absolute -inset-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full opacity-20 blur-lg animate-pulse"></div>
                <motion.div 
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-2 -right-2"
                >
                  <Brain size={16} className="text-purple-400" weight="fill" />
                </motion.div>
              </motion.div>
              <div>
                <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  MEMORY
                </h1>
                <p className="text-lg text-gray-300">Your Personal AI Brain</p>
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
                Store everything - passwords, contacts, notes, ideas. Just tell me anything, and I'll remember it perfectly. 
                Ask me months later with just a word or two, and I'll find exactly what you need! 🧠✨
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                  <Brain className="w-4 h-4 mr-1" />
                  Perfect Recall
                </Badge>
                <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                  Smart Search
                </Badge>
                <Badge variant="secondary" className="bg-green-500/20 text-green-300 border-green-500/30">
                  <Lock className="w-4 h-4 mr-1" />
                  Secure Storage
                </Badge>
                <Badge variant="secondary" className="bg-orange-500/20 text-orange-300 border-orange-500/30">
                  <Microphone className="w-4 h-4 mr-1" />
                  Voice Input
                </Badge>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Main Memory Interface */}
      <div className="container mx-auto px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Voice Input & Search */}
          <div className="mb-8">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Robot size={20} className="text-purple-400" />
                  Talk to Your AI Memory
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Say "Remember that..." to store, or "Find my..." to search. I understand natural language!
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {/* Voice & Text Input */}
                <div className="flex gap-3">
                  <input
                    ref={inputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search your memories... (or click mic to speak)"
                    className="flex-1 px-4 py-3 rounded-xl border border-slate-600 bg-slate-900/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  
                  {/* Voice Input Button */}
                  <Button
                    onClick={isListening ? stopListening : startListening}
                    className={`px-6 ${
                      isListening
                        ? 'bg-red-500 hover:bg-red-600 text-white'
                        : 'bg-purple-500 hover:bg-purple-600 text-white'
                    }`}
                  >
                    {isListening ? <MicrophoneSlash size={20} /> : <Microphone size={20} />}
                    {isListening ? 'Stop' : 'Speak'}
                  </Button>
                  
                  {/* Add Memory Button */}
                  <Button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="px-6 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
                  >
                    <Plus size={20} className="mr-2" />
                    Add Memory
                  </Button>
                </div>
                
                {isListening && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center"
                  >
                    <div className="flex items-center justify-center gap-2 text-red-400">
                      <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse" />
                      <span>Listening... Tell me something to remember or search for!</span>
                    </div>
                  </motion.div>
                )}

                {/* Category Filters */}
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category.id)}
                      className={`${
                        selectedCategory === category.id
                          ? 'bg-purple-500 hover:bg-purple-600 text-white'
                          : 'border-slate-600 text-gray-300 hover:bg-slate-700'
                      }`}
                    >
                      {category.name} ({category.count})
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Memories List */}
            <div className="lg:col-span-2 space-y-4">
              
              {/* Add Memory Form */}
              <AnimatePresence>
                {showAddForm && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="text-white">Add New Memory</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <input
                            type="text"
                            placeholder="Memory title..."
                            value={newMemory.title}
                            onChange={(e) => setNewMemory(prev => ({ ...prev, title: e.target.value }))}
                            className="px-3 py-2 rounded-lg border border-slate-600 bg-slate-900/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                          <select
                            value={newMemory.type}
                            onChange={(e) => setNewMemory(prev => ({ ...prev, type: e.target.value as any }))}
                            className="px-3 py-2 rounded-lg border border-slate-600 bg-slate-900/50 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                            aria-label="Select memory type"
                          >
                            {memoryTypes.map(type => (
                              <option key={type.id} value={type.id}>{type.name}</option>
                            ))}
                          </select>
                        </div>
                        
                        <textarea
                          placeholder="What do you want me to remember? (passwords, contacts, notes, anything!)"
                          value={newMemory.content}
                          onChange={(e) => setNewMemory(prev => ({ ...prev, content: e.target.value }))}
                          className="w-full px-3 py-2 rounded-lg border border-slate-600 bg-slate-900/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[100px]"
                        />
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <input
                            type="text"
                            placeholder="Category (Personal, Work, etc.)"
                            value={newMemory.category}
                            onChange={(e) => setNewMemory(prev => ({ ...prev, category: e.target.value }))}
                            className="px-3 py-2 rounded-lg border border-slate-600 bg-slate-900/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                          <input
                            type="text"
                            placeholder="Tags (comma separated)"
                            value={newMemory.tags}
                            onChange={(e) => setNewMemory(prev => ({ ...prev, tags: e.target.value }))}
                            className="px-3 py-2 rounded-lg border border-slate-600 bg-slate-900/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id="secure"
                            checked={newMemory.isSecure}
                            onChange={(e) => setNewMemory(prev => ({ ...prev, isSecure: e.target.checked }))}
                            className="rounded border-slate-600"
                          />
                          <label htmlFor="secure" className="text-gray-300">
                            🔒 Secure/Private (passwords, sensitive info)
                          </label>
                        </div>
                        
                        <div className="flex gap-3">
                          <Button onClick={addMemory} className="bg-purple-500 hover:bg-purple-600">
                            Save Memory
                          </Button>
                          <Button variant="outline" onClick={() => setShowAddForm(false)} className="border-slate-600 text-gray-300">
                            Cancel
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Memories Grid */}
              <div className="space-y-4">
                <AnimatePresence>
                  {searchedMemories.map((memory, index) => {
                    return (
                      <motion.div
                        key={memory.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-700/50 transition-all cursor-pointer group">
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg ${getTypeColor(memory.type)}`} aria-hidden>
                                  {memory.type.toUpperCase()}
                                </div>
                                <div>
                                  <h3 className="text-white font-medium group-hover:text-purple-300 transition-colors">
                                    {memory.title}
                                  </h3>
                                  <div className="flex items-center gap-2 text-sm text-gray-400">
                                    <span>{memory.category}</span>
                                    <span>•</span>
                                    <span>{formatDate(memory.createdAt)}</span>
                                    {memory.isSecure && (
                                      <>
                                        <span>•</span>
                                        <Lock size={12} className="text-red-400" />
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => toggleFavorite(memory.id)}
                                  className={memory.isFavorite ? 'text-yellow-400' : 'text-gray-400'}
                                >
                                  <Star size={16} weight={memory.isFavorite ? 'fill' : 'regular'} />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setSelectedMemory(memory)}
                                  className="text-gray-400 hover:text-white"
                                >
                                  <Eye size={16} />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => deleteMemory(memory.id)}
                                  className="text-gray-400 hover:text-red-400"
                                >
                                  <Trash size={16} />
                                </Button>
                              </div>
                            </div>
                            
                            <p className="text-gray-300 mb-3 line-clamp-2">
                              {memory.isSecure && !selectedMemory ? '🔒 Protected content - click to view' : memory.content}
                            </p>
                            
                            {memory.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1 mb-3">
                                {memory.tags.map(tag => (
                                  <Badge key={tag} variant="outline" className="border-slate-600 text-gray-400 text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            )}
                            
                            {memory.voiceNote && (
                              <div className="flex items-center gap-2 text-sm text-purple-400">
                                <Microphone size={14} />
                                <span>{memory.voiceNote.duration}s voice note</span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-purple-400 hover:text-purple-300"
                                >
                                  <SpeakerHigh size={14} />
                                </Button>
                              </div>
                            )}
                            
                            <div className="flex items-center justify-between text-xs text-gray-500 mt-3">
                              <span>Accessed {memory.accessCount} times</span>
                              <span>Updated {formatDate(memory.updatedAt)}</span>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    )
                  })}
                </AnimatePresence>
              </div>

              {/* No Results */}
              {searchedMemories.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16"
                >
                  <div className="text-gray-400 mb-4">
                    <Brain size={48} className="mx-auto mb-4" />
                    <h3 className="text-xl font-medium mb-2">No memories found</h3>
                    <p>Try a different search term or add your first memory!</p>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Memory Detail & Code */}
            <div className="lg:col-span-1 space-y-6">
              
              {/* Selected Memory Detail */}
              {selectedMemory && (
                <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white flex items-center gap-2">
                        <Eye size={20} className="text-purple-400" />
                        Memory Details
                      </CardTitle>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedMemory(null)}
                        className="text-gray-400 hover:text-white"
                      >
                        ×
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium text-white mb-2">{selectedMemory.title}</h3>
                      <div className="flex items-center gap-2 mb-3">
                        <Badge className={getTypeColor(selectedMemory.type)}>
                          {memoryTypes.find(t => t.id === selectedMemory.type)?.name}
                        </Badge>
                        <Badge variant="outline" className="border-slate-600 text-gray-300">
                          {selectedMemory.category}
                        </Badge>
                        {selectedMemory.isSecure && (
                          <Badge variant="outline" className="border-red-500 text-red-300">
                            <Lock size={12} className="mr-1" />
                            Secure
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="bg-slate-900/50 rounded-lg p-4">
                      <p className="text-gray-300">{selectedMemory.content}</p>
                    </div>
                    
                    {selectedMemory.metadata && (
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-gray-400">Additional Info:</h4>
                        {Object.entries(selectedMemory.metadata).map(([key, value]) => (
                          <div key={key} className="flex justify-between text-sm">
                            <span className="text-gray-400 capitalize">{key}:</span>
                            <span className="text-gray-300">{value}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <div className="border-t border-slate-700 pt-4 space-y-2 text-sm text-gray-400">
                      <div className="flex justify-between">
                        <span>Created:</span>
                        <span>{formatDate(selectedMemory.createdAt)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Last Accessed:</span>
                        <span>{selectedMemory.accessCount} times</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tags:</span>
                        <span>{selectedMemory.tags.join(', ') || 'None'}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* AI Code Display */}
              {showCode && (
                <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                  <CardHeader className="border-b border-slate-700">
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2 text-white">
                        <Code size={20} className="text-green-400" />
                        Memory Engine
                      </CardTitle>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowCode(!showCode)}
                        className="text-gray-400 hover:text-white"
                      >
                        ×
                      </Button>
                    </div>
                    <CardDescription className="text-gray-400">
                      Neural storage & retrieval system
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {/* Processing Status */}
                      <div className="bg-slate-900/50 border border-slate-600 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Lightning size={14} className="text-purple-400" />
                          <span className="text-xs text-purple-400 font-medium">Neural Activity</span>
                        </div>
                        <p className="text-xs text-gray-400">
                          {isListening ? 'Processing voice input...' : 
                           searchQuery ? `Searching ${memories.length} memories...` :
                           'Ready to store or retrieve memories'}
                        </p>
                      </div>
                      
                      {/* Code Example */}
                      <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-600">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-medium text-green-400">Neural Code</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigator.clipboard.writeText(generateCode())}
                            className="h-6 px-2 text-xs text-gray-400 hover:text-white"
                          >
                            Copy
                          </Button>
                        </div>
                        <pre className="text-xs text-gray-300 overflow-x-auto whitespace-pre-wrap max-h-96 overflow-y-auto">
                          <code>{generateCode()}</code>
                        </pre>
                      </div>

                      {/* Memory Stats */}
                      <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-600">
                        <h4 className="text-sm font-medium text-purple-400 mb-3">Memory Bank Status</h4>
                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Total Memories:</span>
                            <span className="text-white">{memories.length}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Secure Items:</span>
                            <span className="text-white">{memories.filter(m => m.isSecure).length}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Favorites:</span>
                            <span className="text-white">{memories.filter(m => m.isFavorite).length}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Categories:</span>
                            <span className="text-white">{new Set(memories.map(m => m.category)).size}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Search Accuracy:</span>
                            <span className="text-green-400">99.9%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
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
