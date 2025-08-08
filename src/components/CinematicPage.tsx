import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { 
  Play, Microphone, MicrophoneSlash, Globe, Sparkle, MagicWand, 
  FilmStrip, Camera, SpeakerHigh, SpeakerSlash, Download, Share,
  Code, Lightning, Copy, Palette, VideoCamera, Clock,
  Translate, PaintBrush, Image, ChatCircle, Robot,
  Target, Eye, StopCircle, PaperPlaneTilt
} from '@phosphor-icons/react'
import { useState, useRef, useEffect } from 'react'

interface VideoGeneration {
  id: string
  timestamp: Date
  originalPrompt: string
  translatedPrompt?: string
  language: string
  videoUrl?: string
  thumbnail?: string
  duration: number
  style: 'realistic' | 'animated' | 'cinematic' | 'artistic'
  scenes: Array<{
    description: string
    duration: number
    timestamp: number
  }>
  voiceover?: {
    text: string
    language: string
    voice: string
    audioUrl?: string
  }
  status: 'generating' | 'completed' | 'failed'
  progress: number
  code: string
  thinking: string
}

interface CinematicPageProps {
  onBack?: () => void
}

export function CinematicPage({ onBack }: CinematicPageProps) {
  const [prompt, setPrompt] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [showCode, setShowCode] = useState(true)
  const [selectedLanguage, setSelectedLanguage] = useState('en')
  const [selectedStyle, setSelectedStyle] = useState<'realistic' | 'animated' | 'cinematic' | 'artistic'>('cinematic')
  const [selectedVoice, setSelectedVoice] = useState('natural')
  const [currentGeneration, setCurrentGeneration] = useState<VideoGeneration | null>(null)
  const [generationHistory, setGenerationHistory] = useState<VideoGeneration[]>([])
  const [recognition, setRecognition] = useState<any>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition()
      recognition.continuous = false
      recognition.interimResults = false
      recognition.lang = selectedLanguage === 'en' ? 'en-US' : selectedLanguage
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setPrompt(transcript)
        setIsListening(false)
      }
      
      recognition.onend = () => {
        setIsListening(false)
      }
      
      setRecognition(recognition)
    }
  }, [selectedLanguage])

  // Language options
  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸' },
    { code: 'fr', name: 'French', flag: '🇫🇷' },
    { code: 'de', name: 'German', flag: '🇩🇪' },
    { code: 'it', name: 'Italian', flag: '🇮🇹' },
    { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
    { code: 'ko', name: 'Korean', flag: '🇰🇷' },
    { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
    { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
    { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
    { code: 'ru', name: 'Russian', flag: '🇷🇺' }
  ]

  // Voice options
  const voices = [
    { id: 'natural', name: 'Natural Voice', description: 'Warm and conversational' },
    { id: 'narrator', name: 'Narrator', description: 'Professional storytelling' },
    { id: 'dramatic', name: 'Dramatic', description: 'Emotional and expressive' },
    { id: 'child', name: 'Child Voice', description: 'Young and innocent' },
    { id: 'elderly', name: 'Elderly Voice', description: 'Wise and experienced' }
  ]

  // Style options
  const styles = [
    { 
      id: 'realistic' as const, 
      name: 'Realistic', 
      description: 'Photorealistic scenes',
      gradient: 'from-blue-500 to-cyan-500'
    },
    { 
      id: 'animated' as const, 
      name: 'Animated', 
      description: 'Pixar-style animation',
      gradient: 'from-purple-500 to-pink-500'
    },
    { 
      id: 'cinematic' as const, 
      name: 'Cinematic', 
      description: 'Movie-like quality',
      gradient: 'from-orange-500 to-red-500'
    },
    { 
      id: 'artistic' as const, 
      name: 'Artistic', 
      description: 'Stylized and creative',
      gradient: 'from-green-500 to-teal-500'
    }
  ]

  // Advanced Video Generation Engine
  const generateVideo = async () => {
    if (!prompt.trim()) return
    
    setIsGenerating(true)
    
    const generation: VideoGeneration = {
      id: Date.now().toString(),
      timestamp: new Date(),
      originalPrompt: prompt,
      language: selectedLanguage,
      duration: 30,
      style: selectedStyle,
      scenes: parseScenes(prompt),
      status: 'generating',
      progress: 0,
      code: generateVideoCode(),
      thinking: `Analyzing scene: "${prompt}"... Breaking down into visual sequences, generating storyboard, preparing ${selectedStyle} style video with ${selectedLanguage} voiceover...`
    }

    setCurrentGeneration(generation)
    setGenerationHistory(prev => [generation, ...prev].slice(0, 10))

    // Simulate realistic video generation process
    simulateVideoGeneration(generation)
  }

  const parseScenes = (text: string) => {
    // Mock scene parsing (in real app, use GPT-4 for intelligent scene breakdown)
    const scenes = [
      { description: 'Opening scene setup', duration: 8, timestamp: 0 },
      { description: 'Main action sequence', duration: 15, timestamp: 8 },
      { description: 'Resolution and ending', duration: 7, timestamp: 23 }
    ]
    
    return scenes
  }

  const generateVideoCode = () => {
    return `// CINEMATIC's Advanced Video Generation Pipeline
class CinematicAI {
  async generateVideo(prompt, settings) {
    // Stage 1: Scene Understanding
    const sceneAnalysis = await this.analyzeScene(prompt, settings.language)
    const storyboard = await this.createStoryboard(sceneAnalysis)
    
    // Stage 2: Multi-modal Processing
    const visualElements = await Promise.all([
      this.generateVisualPrompts(storyboard),
      this.analyzeLighting(sceneAnalysis),
      this.determineCameraAngles(storyboard),
      this.extractEmotionalTone(prompt)
    ])
    
    // Stage 3: Video Generation
    const videoSegments = await this.generateSegments({
      scenes: storyboard,
      style: settings.style,
      duration: settings.duration,
      quality: 'ultra-hd'
    })
    
    // Stage 4: Audio & Voiceover
    const audioTrack = await this.generateVoiceover({
      script: this.createNarration(prompt),
      voice: settings.voice,
      language: settings.language,
      emotion: visualElements.emotionalTone
    })
    
    // Stage 5: Post-production
    return await this.assembleVideo({
      segments: videoSegments,
      audio: audioTrack,
      transitions: this.generateTransitions(storyboard),
      effects: this.addCinematicEffects(settings.style)
    })
  }
  
  async analyzeScene(prompt, language) {
    const translation = await this.translateToEnglish(prompt, language)
    const entities = await this.extractEntities(translation)
    const emotions = await this.analyzeEmotions(translation)
    const setting = await this.identifyEnvironment(translation)
    
    return {
      characters: entities.people,
      objects: entities.objects,
      location: setting,
      mood: emotions,
      actions: this.parseActions(translation),
      timeOfDay: this.inferTimeContext(translation)
    }
  }
  
  async generateSegments(config) {
    const segments = []
    
    for (const scene of config.scenes) {
      const segment = await this.runDiffusionModel({
        prompt: this.enhancePrompt(scene.description, config.style),
        duration: scene.duration,
        resolution: '1920x1080',
        fps: 30,
        model: this.selectOptimalModel(config.style)
      })
      
      segments.push(await this.applyPostProcessing(segment))
    }
    
    return segments
  }
}`
  }

  const simulateVideoGeneration = async (generation: VideoGeneration) => {
    const steps = [
      { progress: 10, status: 'Analyzing scene and characters...' },
      { progress: 25, status: 'Creating detailed storyboard...' },
      { progress: 40, status: 'Generating visual sequences...' },
      { progress: 60, status: 'Rendering high-quality video...' },
      { progress: 80, status: 'Adding voiceover and audio...' },
      { progress: 95, status: 'Final processing and optimization...' },
      { progress: 100, status: 'Video generation complete!' }
    ]

    for (const step of steps) {
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const updatedGeneration = {
        ...generation,
        progress: step.progress,
        thinking: step.status
      }
      
      if (step.progress === 100) {
        updatedGeneration.status = 'completed'
        updatedGeneration.videoUrl = `https://example.com/generated-video-${generation.id}.mp4`
        updatedGeneration.thumbnail = `https://picsum.photos/640/360?random=${generation.id}`
        updatedGeneration.voiceover = {
          text: generateVoiceoverScript(generation.originalPrompt),
          language: generation.language,
          voice: selectedVoice,
          audioUrl: `https://example.com/voiceover-${generation.id}.mp3`
        }
      }
      
      setCurrentGeneration(updatedGeneration)
      setGenerationHistory(prev => 
        prev.map(item => item.id === generation.id ? updatedGeneration : item)
      )
    }
    
    setIsGenerating(false)
    setPrompt('')
  }

  const generateVoiceoverScript = (prompt: string): string => {
    // Mock voiceover generation (in real app, use GPT-4 to create engaging narration)
    return `In this touching scene, we witness a powerful moment of childhood emotion. ${prompt} This story captures the complex feelings that define our human experience, reminding us of the delicate balance between guidance and understanding in our relationships.`
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

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      setIsSpeaking(true)
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.8
      utterance.pitch = 1.0
      utterance.lang = selectedLanguage === 'en' ? 'en-US' : selectedLanguage
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

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const downloadVideo = (url: string, filename: string) => {
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    link.click()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20" />
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
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                <img 
                  src="https://avatars.githubusercontent.com/u/223208802?s=400&u=5249ef08c9d130551422585dd7d29c8330579c1a&v=4" 
                  alt="One Last AI Logo" 
                  className="w-16 h-16 rounded-full ring-4 ring-purple-500/50 shadow-2xl shadow-purple-500/25"
                />
                <div className="absolute -inset-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-20 blur-lg animate-pulse"></div>
                <motion.div 
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-2 -right-2"
                >
                  <FilmStrip size={16} className="text-purple-400" weight="fill" />
                </motion.div>
              </motion.div>
              <div>
                <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  CINEMATIC
                </h1>
                <p className="text-lg text-gray-300">AI Storytelling & Video Generation</p>
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
                Transform your stories into stunning videos with voice input, multilingual support, 
                and intelligent scene understanding. Create cinematic masterpieces in real-time! 🎬✨
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                  <Microphone className="w-4 h-4 mr-1" />
                  Voice Input
                </Badge>
                <Badge variant="secondary" className="bg-pink-500/20 text-pink-300 border-pink-500/30">
                  <Globe className="w-4 h-4 mr-1" />
                  12+ Languages
                </Badge>
                <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                  <VideoCamera className="w-4 h-4 mr-1" />
                  HD Video Gen
                </Badge>
                <Badge variant="secondary" className="bg-orange-500/20 text-orange-300 border-orange-500/30">
                  <Robot className="w-4 h-4 mr-1" />
                  Scene AI
                </Badge>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Main Interface */}
      <div className="container mx-auto px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Video Generation Input */}
          <div className="mb-8">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <MagicWand size={20} className="text-purple-400" />
                  Story to Video Generator
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Describe your scene in any language - I'll create a stunning video with voiceover
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {/* Language & Style Selection */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Language Selection */}
                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-2 block">Language</label>
                    <select
                      value={selectedLanguage}
                      onChange={(e) => setSelectedLanguage(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-600 bg-slate-800/50 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      aria-label="Select language for video generation"
                    >
                      {languages.map(lang => (
                        <option key={lang.code} value={lang.code}>
                          {lang.flag} {lang.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Style Selection */}
                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-2 block">Video Style</label>
                    <select
                      value={selectedStyle}
                      onChange={(e) => setSelectedStyle(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-600 bg-slate-800/50 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      aria-label="Select video style"
                    >
                      {styles.map(style => (
                        <option key={style.id} value={style.id}>
                          {style.name} - {style.description}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Voice Selection */}
                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-2 block">Voice Style</label>
                    <select
                      value={selectedVoice}
                      onChange={(e) => setSelectedVoice(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-600 bg-slate-800/50 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      aria-label="Select voice style"
                    >
                      {voices.map(voice => (
                        <option key={voice.id} value={voice.id}>
                          {voice.name} - {voice.description}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Text Input */}
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">
                    Describe Your Scene
                  </label>
                  <div className="flex gap-3">
                    <input
                      ref={inputRef}
                      type="text"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && !isGenerating && generateVideo()}
                      placeholder="A child going to school with parents, crying, resisting but being taken forcefully..."
                      className="flex-1 px-4 py-3 rounded-xl border border-slate-600 bg-slate-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      disabled={isGenerating}
                    />
                    
                    {/* Voice Input Button */}
                    <Button
                      variant="outline"
                      onClick={isListening ? stopListening : startListening}
                      className={`px-4 border-slate-600 ${
                        isListening
                          ? 'bg-red-500 hover:bg-red-600 text-white border-red-500'
                          : 'bg-slate-800/50 hover:bg-slate-700 text-gray-300'
                      }`}
                      disabled={isGenerating}
                    >
                      {isListening ? <MicrophoneSlash size={20} /> : <Microphone size={20} />}
                    </Button>
                    
                    {/* Generate Button */}
                    <Button
                      onClick={generateVideo}
                      disabled={!prompt.trim() || isGenerating}
                      className="px-8 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0"
                    >
                      {isGenerating ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Creating
                        </div>
                      ) : (
                        <>
                          <VideoCamera size={20} className="mr-2" />
                          Generate
                        </>
                      )}
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
                        Listening... Tell me your story in {languages.find(l => l.code === selectedLanguage)?.name}
                      </span>
                    </motion.div>
                  )}
                </div>

                {/* Quick Prompts */}
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Quick Story Ideas</label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "A magical forest where animals can talk",
                      "Grandmother baking cookies with her grandchild",
                      "Children playing in a sunny park",
                      "A family dinner during sunset",
                      "Student presenting in front of class, nervous but determined"
                    ].map((idea, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => setPrompt(idea)}
                        className="border-slate-600 text-gray-300 hover:bg-slate-700 text-xs"
                        disabled={isGenerating}
                      >
                        {idea}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Generation Results */}
          {currentGeneration && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Video Display & Controls */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Video Player */}
                <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2 text-white">
                        <Play size={20} className="text-purple-400" />
                        Generated Video
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        {currentGeneration.status === 'completed' && (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => downloadVideo(currentGeneration.videoUrl!, 'cinematic-video.mp4')}
                              className="border-slate-600 text-gray-300"
                            >
                              <Download size={16} className="mr-1" />
                              Download
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-slate-600 text-gray-300"
                            >
                              <Share size={16} className="mr-1" />
                              Share
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="relative rounded-lg overflow-hidden bg-slate-900/50 aspect-video">
                      {currentGeneration.status === 'completed' && currentGeneration.thumbnail ? (
                        <div className="relative w-full h-full">
                          <img 
                            src={currentGeneration.thumbnail}
                            alt="Generated video thumbnail"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                            <Button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border-0">
                              <Play size={32} className="text-white" />
                            </Button>
                          </div>
                          <div className="absolute bottom-4 right-4">
                            <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                              <Clock size={12} className="mr-1" />
                              {currentGeneration.duration}s
                            </Badge>
                          </div>
                        </div>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                            <p className="text-gray-300 mb-2">Generating your cinematic video...</p>
                            <div className="w-64 mb-2">
                              <Progress 
                                value={currentGeneration.progress} 
                                className="bg-slate-700"
                              />
                            </div>
                            <p className="text-sm text-gray-400">{currentGeneration.progress}% Complete</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Scene Breakdown */}
                <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                      <Target size={20} className="text-purple-400" />
                      Scene Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm text-gray-400">Original Prompt</label>
                          <p className="text-white mt-1">{currentGeneration.originalPrompt}</p>
                        </div>
                        <div>
                          <label className="text-sm text-gray-400">Language</label>
                          <p className="text-white mt-1">
                            {languages.find(l => l.code === currentGeneration.language)?.flag} {' '}
                            {languages.find(l => l.code === currentGeneration.language)?.name}
                          </p>
                        </div>
                        <div>
                          <label className="text-sm text-gray-400">Style</label>
                          <p className="text-white mt-1 capitalize">{currentGeneration.style}</p>
                        </div>
                        <div>
                          <label className="text-sm text-gray-400">Duration</label>
                          <p className="text-white mt-1">{currentGeneration.duration} seconds</p>
                        </div>
                      </div>

                      {/* Scene Timeline */}
                      <div>
                        <label className="text-sm text-gray-400 mb-3 block">Scene Timeline</label>
                        <div className="space-y-2">
                          {currentGeneration.scenes.map((scene, index) => (
                            <div key={index} className="flex items-center gap-3 p-3 bg-slate-900/30 rounded-lg">
                              <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                                <span className="text-purple-300 text-sm font-medium">{index + 1}</span>
                              </div>
                              <div className="flex-1">
                                <p className="text-white text-sm">{scene.description}</p>
                                <p className="text-gray-400 text-xs">{scene.timestamp}s - {scene.timestamp + scene.duration}s ({scene.duration}s)</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Voiceover */}
                      {currentGeneration.voiceover && (
                        <div>
                          <label className="text-sm text-gray-400 mb-2 block">AI Generated Voiceover</label>
                          <div className="bg-slate-900/30 rounded-lg p-4">
                            <p className="text-gray-300 text-sm mb-3 italic">"{currentGeneration.voiceover.text}"</p>
                            <div className="flex items-center gap-3">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => speakText(currentGeneration.voiceover!.text)}
                                className="border-slate-600 text-gray-300"
                                disabled={isSpeaking}
                              >
                                {isSpeaking ? <SpeakerSlash size={16} /> : <SpeakerHigh size={16} />}
                                {isSpeaking ? 'Stop' : 'Play'}
                              </Button>
                              <span className="text-xs text-gray-400">
                                {currentGeneration.voiceover.voice} voice in {languages.find(l => l.code === currentGeneration.voiceover!.language)?.name}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Code Analysis */}
              <div className="lg:col-span-1">
                {showCode && (
                  <Card className="h-fit bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                    <CardHeader className="border-b border-slate-700">
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2 text-white">
                          <Code size={20} className="text-green-400" />
                          AI Engine
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
                        See how CINEMATIC processes stories
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        {/* Processing Status */}
                        <div className="bg-slate-900/50 border border-slate-600 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <Lightning size={14} className="text-purple-400" />
                            <span className="text-xs text-purple-400 font-medium">Live Processing</span>
                          </div>
                          <p className="text-xs text-gray-400 italic">{currentGeneration.thinking}</p>
                        </div>
                        
                        {/* Code Example */}
                        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-600">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-medium text-green-400">Generation Code</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyToClipboard(currentGeneration.code)}
                              className="h-6 px-2 text-xs text-gray-400 hover:text-white"
                            >
                              <Copy size={12} className="mr-1" />
                              Copy
                            </Button>
                          </div>
                          <pre className="text-xs text-gray-300 overflow-x-auto whitespace-pre-wrap max-h-96 overflow-y-auto">
                            <code>{currentGeneration.code}</code>
                          </pre>
                        </div>

                        {/* Generation Stats */}
                        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-600">
                          <h4 className="text-sm font-medium text-purple-400 mb-3">Generation Stats</h4>
                          <div className="space-y-2 text-xs">
                            <div className="flex justify-between">
                              <span className="text-gray-400">Status:</span>
                              <span className={`capitalize ${
                                currentGeneration.status === 'completed' ? 'text-green-400' : 
                                currentGeneration.status === 'generating' ? 'text-yellow-400' : 'text-red-400'
                              }`}>
                                {currentGeneration.status}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Progress:</span>
                              <span className="text-white">{currentGeneration.progress}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Scenes:</span>
                              <span className="text-white">{currentGeneration.scenes.length}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Duration:</span>
                              <span className="text-white">{currentGeneration.duration}s</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Quality:</span>
                              <span className="text-white">Ultra HD</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          )}

          {/* Generation History */}
          {generationHistory.length > 1 && (
            <div className="mt-8">
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <FilmStrip size={20} className="text-purple-400" />
                    Recent Generations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {generationHistory.slice(1, 7).map((generation) => (
                      <div key={generation.id} className="bg-slate-900/30 rounded-lg p-4 border border-slate-700">
                        <div className="aspect-video bg-slate-800 rounded-lg mb-3 overflow-hidden">
                          {generation.thumbnail ? (
                            <img src={generation.thumbnail} alt="Video thumbnail" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <VideoCamera size={24} className="text-gray-500" />
                            </div>
                          )}
                        </div>
                        <p className="text-white text-sm mb-2 line-clamp-2">{generation.originalPrompt}</p>
                        <div className="flex items-center justify-between text-xs text-gray-400">
                          <span>{generation.timestamp.toLocaleDateString()}</span>
                          <Badge variant="secondary" className={`text-xs ${
                            generation.status === 'completed' ? 'bg-green-500/20 text-green-300 border-green-500/30' :
                            generation.status === 'generating' ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' :
                            'bg-red-500/20 text-red-300 border-red-500/30'
                          }`}>
                            {generation.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
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
