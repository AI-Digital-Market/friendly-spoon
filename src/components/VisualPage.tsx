import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { 
  Eye, Camera, Image, Upload, Download, Share, Trash, 
  MagnifyingGlass, Sparkle, Palette, Crop, Resize, 
  Code, Lightning, Copy, Play, Magic, Wand,
  ScanLine, Target, Robot, FileImage, FilePlus,
  PaintBucket, Eraser, FloppyDisk, CloudArrowUp
} from '@phosphor-icons/react'
import { useState, useRef, useCallback } from 'react'

interface V                            <div className="flex items-center gap-3 p-3 bg-slate-900/30 rounded-lg">
                              <div 
                                className="w-8 h-8 rounded-full border-2 border-slate-600"
                                data-color={color.hex}
                              />
                              <div className="flex-1">nalysis {
  id: string
  timestamp: Date
  originalImage: string
  processedImage?: string
  analysis: {
    objects: Array<{ name: string; confidence: number; bbox: [number, number, number, number] }>
    faces: Array<{ age?: number; gender?: string; emotion?: string; confidence: number }>
    text: Array<{ text: string; confidence: number; bbox: [number, number, number, number] }>
    colors: Array<{ color: string; percentage: number; hex: string }>
    metadata: {
      width: number
      height: number
      format: string
      size: string
      quality: string
    }
    safety: {
      isNSFW: boolean
      violence: number
      adult: number
      medical: number
      racy: number
    }
  }
  enhancement?: {
    type: 'upscale' | 'denoise' | 'colorize' | 'restore' | 'enhance'
    settings: Record<string, any>
  }
  generation?: {
    prompt: string
    style: string
    model: string
  }
  code: string
  thinking: string
}

interface VisualPageProps {
  onBack?: () => void
}

export function VisualPage({ onBack }: VisualPageProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [currentAnalysis, setCurrentAnalysis] = useState<VisualAnalysis | null>(null)
  const [analysisHistory, setAnalysisHistory] = useState<VisualAnalysis[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [showCode, setShowCode] = useState(true)
  const [activeTab, setActiveTab] = useState<'analyze' | 'enhance' | 'generate'>('analyze')
  const [generationPrompt, setGenerationPrompt] = useState('')
  const [enhancementType, setEnhancementType] = useState<'upscale' | 'denoise' | 'colorize' | 'restore' | 'enhance'>('enhance')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const dropZoneRef = useRef<HTMLDivElement>(null)

  // Comprehensive Visual AI Analysis
  const analyzeImage = async (file: File): Promise<VisualAnalysis> => {
    const imageUrl = URL.createObjectURL(file)
    
    // Mock comprehensive analysis (in real app, you'd call various AI APIs)
    const mockAnalysis = generateMockAnalysis(file, imageUrl)
    
    const analysisCode = `// VISION's Image Analysis Engine
class VisualIntelligence {
  async analyzeImage(imageFile) {
    const analysis = await Promise.all([
      this.objectDetection(imageFile),
      this.faceAnalysis(imageFile),
      this.textExtraction(imageFile),
      this.colorAnalysis(imageFile),
      this.safetyCheck(imageFile),
      this.metadataExtraction(imageFile)
    ])
    
    return this.compileAnalysis(analysis)
  }
  
  async objectDetection(image) {
    const model = await this.loadYOLOv8()
    const detections = await model.detect(image)
    
    return detections.map(detection => ({
      name: detection.class,
      confidence: detection.confidence,
      bbox: detection.bbox,
      attributes: this.extractAttributes(detection)
    }))
  }
  
  async faceAnalysis(image) {
    const faceModel = await this.loadFaceAnalysisModel()
    const faces = await faceModel.detectFaces(image)
    
    return Promise.all(faces.map(async face => ({
      age: await this.estimateAge(face),
      gender: await this.classifyGender(face),
      emotion: await this.analyzeEmotion(face),
      landmarks: await this.detectLandmarks(face),
      confidence: face.confidence
    })))
  }
  
  async enhanceImage(image, type, settings) {
    switch(type) {
      case 'upscale':
        return await this.superResolution(image, settings.factor)
      case 'denoise':
        return await this.denoising(image, settings.strength)
      case 'colorize':
        return await this.colorization(image, settings.style)
      case 'restore':
        return await this.imageRestoration(image)
      default:
        return await this.generalEnhancement(image, settings)
    }
  }
}`

    const thinking = `Analyzing uploaded image: ${file.name}... Running object detection, face analysis, OCR, color extraction, safety classification, and metadata parsing using advanced computer vision models...`

    return {
      id: Date.now().toString(),
      timestamp: new Date(),
      originalImage: imageUrl,
      analysis: mockAnalysis,
      code: analysisCode,
      thinking
    }
  }

  const generateMockAnalysis = (file: File, imageUrl: string) => {
    // Generate realistic mock analysis data
    const fileName = file.name.toLowerCase()
    const fileSize = (file.size / 1024 / 1024).toFixed(2)
    
    // Mock object detection
    const objects = [
      { name: 'person', confidence: 0.94, bbox: [100, 150, 200, 400] },
      { name: 'car', confidence: 0.87, bbox: [300, 200, 500, 350] },
      { name: 'building', confidence: 0.76, bbox: [0, 0, 800, 200] },
      { name: 'tree', confidence: 0.82, bbox: [50, 100, 150, 300] }
    ].slice(0, Math.floor(Math.random() * 4) + 1)

    // Mock face analysis
    const faces = fileName.includes('face') || fileName.includes('person') ? [
      { age: 25 + Math.floor(Math.random() * 30), gender: 'female', emotion: 'happy', confidence: 0.91 },
      { age: 30 + Math.floor(Math.random() * 25), gender: 'male', emotion: 'neutral', confidence: 0.88 }
    ].slice(0, Math.floor(Math.random() * 2) + 1) : []

    // Mock text extraction
    const text = fileName.includes('text') || fileName.includes('sign') ? [
      { text: 'STOP', confidence: 0.96, bbox: [200, 100, 300, 150] },
      { text: 'Street Name', confidence: 0.89, bbox: [100, 50, 400, 80] }
    ] : []

    // Mock color analysis
    const colors = [
      { color: 'Blue', percentage: 35.2, hex: '#4A90E2' },
      { color: 'Green', percentage: 28.7, hex: '#7ED321' },
      { color: 'White', percentage: 18.1, hex: '#FFFFFF' },
      { color: 'Gray', percentage: 12.3, hex: '#9B9B9B' },
      { color: 'Black', percentage: 5.7, hex: '#000000' }
    ]

    return {
      objects,
      faces,
      text,
      colors,
      metadata: {
        width: 1920,
        height: 1080,
        format: file.type.split('/')[1].toUpperCase(),
        size: `${fileSize} MB`,
        quality: 'High'
      },
      safety: {
        isNSFW: false,
        violence: 0.02,
        adult: 0.01,
        medical: 0.05,
        racy: 0.03
      }
    }
  }

  const handleFileDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    const files = Array.from(e.dataTransfer.files).filter(file => 
      file.type.startsWith('image/')
    )
    setSelectedFiles(files)
  }, [])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setSelectedFiles(files)
  }

  const processImages = async () => {
    if (selectedFiles.length === 0) return
    
    setIsProcessing(true)
    
    try {
      // Process first image for demo
      const analysis = await analyzeImage(selectedFiles[0])
      setCurrentAnalysis(analysis)
      setAnalysisHistory(prev => [analysis, ...prev].slice(0, 10))
    } catch (error) {
      console.error('Processing failed:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  const enhanceImage = async (type: string) => {
    if (!currentAnalysis) return
    
    setIsProcessing(true)
    
    // Mock enhancement process
    setTimeout(() => {
      const enhanced = {
        ...currentAnalysis,
        processedImage: currentAnalysis.originalImage, // In real app, this would be the enhanced image
        enhancement: {
          type: type as any,
          settings: { quality: 'high', factor: 2 }
        }
      }
      setCurrentAnalysis(enhanced)
      setIsProcessing(false)
    }, 3000)
  }

  const generateImage = async () => {
    if (!generationPrompt.trim()) return
    
    setIsProcessing(true)
    
    // Mock generation process
    setTimeout(() => {
      const generated: VisualAnalysis = {
        id: Date.now().toString(),
        timestamp: new Date(),
        originalImage: 'https://picsum.photos/512/512?random=' + Math.random(),
        analysis: generateMockAnalysis(new File([''], 'generated.jpg', { type: 'image/jpeg' }), ''),
        generation: {
          prompt: generationPrompt,
          style: 'realistic',
          model: 'DALL-E 3'
        },
        code: `// VISION's Image Generation Pipeline
class ImageGenerator {
  async generateImage(prompt, settings) {
    const enhancedPrompt = await this.enhancePrompt(prompt)
    const styleTokens = this.analyzeStyle(settings.style)
    
    const generation = await this.runDiffusionModel({
      prompt: enhancedPrompt,
      style: styleTokens,
      resolution: settings.resolution,
      steps: settings.steps,
      guidance: settings.guidance
    })
    
    return this.postProcess(generation, settings)
  }
}`,
        thinking: `Generating image from prompt: "${generationPrompt}"... Processing through diffusion model with style transfer and quality enhancement...`
      }
      
      setCurrentAnalysis(generated)
      setAnalysisHistory(prev => [generated, ...prev].slice(0, 10))
      setGenerationPrompt('')
      setIsProcessing(false)
    }, 4000)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const downloadImage = (imageUrl: string, filename: string) => {
    const link = document.createElement('a')
    link.href = imageUrl
    link.download = filename
    link.click()
  }

  const getSafetyColor = (score: number) => {
    if (score < 0.1) return 'text-green-400'
    if (score < 0.3) return 'text-yellow-400'
    if (score < 0.6) return 'text-orange-400'
    return 'text-red-400'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20" />
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
                  scale: [1, 1.05, 1],
                  rotateY: [0, 180, 360]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                <img 
                  src="https://avatars.githubusercontent.com/u/223208802?s=400&u=5249ef08c9d130551422585dd7d29c8330579c1a&v=4" 
                  alt="One Last AI Logo" 
                  className="w-16 h-16 rounded-full ring-4 ring-indigo-500/50 shadow-2xl shadow-indigo-500/25"
                />
                <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full opacity-20 blur-lg animate-pulse"></div>
                <motion.div 
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-2 -right-2"
                >
                  <Eye size={16} className="text-indigo-400" weight="fill" />
                </motion.div>
              </motion.div>
              <div>
                <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  VISION
                </h1>
                <p className="text-lg text-gray-300">Advanced Visual Intelligence & AI</p>
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
                Comprehensive visual AI platform for image analysis, enhancement, and generation. 
                Powered by cutting-edge computer vision and deep learning models! 🎨✨
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Badge variant="secondary" className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30">
                  <ScanLine className="w-4 h-4 mr-1" />
                  Object Detection
                </Badge>
                <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                  <Target className="w-4 h-4 mr-1" />
                  Face Analysis
                </Badge>
                <Badge variant="secondary" className="bg-pink-500/20 text-pink-300 border-pink-500/30">
                  <Sparkle className="w-4 h-4 mr-1" />
                  AI Enhancement
                </Badge>
                <Badge variant="secondary" className="bg-orange-500/20 text-orange-300 border-orange-500/30">
                  <Magic className="w-4 h-4 mr-1" />
                  Image Generation
                </Badge>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Main Visual Interface */}
      <div className="container mx-auto px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Tab Navigation */}
          <div className="mb-8">
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-slate-800/50 backdrop-blur-sm">
                <TabsTrigger value="analyze" className="flex items-center gap-2">
                  <ScanLine size={16} />
                  Analyze
                </TabsTrigger>
                <TabsTrigger value="enhance" className="flex items-center gap-2">
                  <Sparkle size={16} />
                  Enhance
                </TabsTrigger>
                <TabsTrigger value="generate" className="flex items-center gap-2">
                  <Magic size={16} />
                  Generate
                </TabsTrigger>
              </TabsList>

              {/* Analyze Tab */}
              <TabsContent value="analyze" className="mt-6">
                <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                      <Upload size={20} className="text-indigo-400" />
                      Image Analysis
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Upload images for comprehensive AI analysis including object detection, face analysis, and more
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* File Upload Zone */}
                    <div
                      ref={dropZoneRef}
                      onDrop={handleFileDrop}
                      onDragOver={(e) => e.preventDefault()}
                      className="border-2 border-dashed border-slate-600 rounded-xl p-8 text-center hover:border-indigo-500 transition-colors cursor-pointer"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <CloudArrowUp size={48} className="mx-auto mb-4 text-indigo-400" />
                      <p className="text-lg text-gray-300 mb-2">Drop images here or click to browse</p>
                      <p className="text-sm text-gray-500">Supports JPG, PNG, GIF, WebP up to 10MB</p>
                      <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="hidden"
                        aria-label="Upload image files"
                        title="Select image files for analysis"
                      />
                    </div>

                    {/* Selected Files */}
                    {selectedFiles.length > 0 && (
                      <div className="mt-6">
                        <h4 className="text-sm font-medium text-indigo-400 mb-3">Selected Files</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {selectedFiles.map((file, index) => (
                            <div key={index} className="bg-slate-900/50 rounded-lg p-4 border border-slate-600">
                              <div className="flex items-center gap-3">
                                <FileImage size={20} className="text-indigo-400" />
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm text-white truncate">{file.name}</p>
                                  <p className="text-xs text-gray-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="mt-4">
                          <Button
                            onClick={processImages}
                            disabled={isProcessing}
                            className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white border-0"
                          >
                            {isProcessing ? (
                              <div className="flex items-center gap-2">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Analyzing...
                              </div>
                            ) : (
                              <>
                                <ScanLine size={20} className="mr-2" />
                                Analyze Images
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Enhance Tab */}
              <TabsContent value="enhance" className="mt-6">
                <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                      <Sparkle size={20} className="text-indigo-400" />
                      Image Enhancement
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Enhance, upscale, denoise, and restore your images with AI
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      {[
                        { type: 'enhance', label: 'Enhance', icon: Sparkle, desc: 'General enhancement' },
                        { type: 'upscale', label: 'Upscale', icon: Resize, desc: '2x-4x resolution' },
                        { type: 'denoise', label: 'Denoise', icon: Eraser, desc: 'Remove noise' },
                        { type: 'colorize', label: 'Colorize', icon: Palette, desc: 'Add colors' },
                        { type: 'restore', label: 'Restore', icon: Wand, desc: 'Fix old photos' }
                      ].map(({ type, label, icon: Icon, desc }) => (
                        <Button
                          key={type}
                          variant={enhancementType === type ? "default" : "outline"}
                          onClick={() => {
                            setEnhancementType(type as any)
                            if (currentAnalysis) enhanceImage(type)
                          }}
                          disabled={!currentAnalysis || isProcessing}
                          className={`h-auto p-4 flex flex-col items-center gap-2 ${
                            enhancementType === type 
                              ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white border-0' 
                              : 'border-slate-600 text-gray-300 hover:bg-slate-700'
                          }`}
                        >
                          <Icon size={24} />
                          <div className="text-center">
                            <p className="font-medium">{label}</p>
                            <p className="text-xs opacity-70">{desc}</p>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Generate Tab */}
              <TabsContent value="generate" className="mt-6">
                <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                      <Magic size={20} className="text-indigo-400" />
                      AI Image Generation
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Create stunning images from text descriptions using advanced AI models
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-300 mb-2 block">
                          Describe the image you want to generate
                        </label>
                        <div className="flex gap-3">
                          <input
                            type="text"
                            value={generationPrompt}
                            onChange={(e) => setGenerationPrompt(e.target.value)}
                            placeholder="A futuristic city at sunset with flying cars and neon lights..."
                            className="flex-1 px-4 py-3 rounded-xl border border-slate-600 bg-slate-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            disabled={isProcessing}
                          />
                          <Button
                            onClick={generateImage}
                            disabled={!generationPrompt.trim() || isProcessing}
                            className="px-6 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white border-0"
                          >
                            {isProcessing ? (
                              <div className="flex items-center gap-2">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Generating
                              </div>
                            ) : (
                              <>
                                <Magic size={20} className="mr-2" />
                                Generate
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {['Realistic', 'Artistic', 'Anime', 'Digital Art'].map((style) => (
                          <Button
                            key={style}
                            variant="outline"
                            className="border-slate-600 text-gray-300 hover:bg-slate-700"
                          >
                            {style}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Analysis Results */}
          {currentAnalysis && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Main Results */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Image Display */}
                <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2 text-white">
                        <Image size={20} className="text-indigo-400" />
                        {currentAnalysis.generation ? 'Generated Image' : 'Analyzed Image'}
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => downloadImage(currentAnalysis.processedImage || currentAnalysis.originalImage, 'processed-image.jpg')}
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
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="relative rounded-lg overflow-hidden bg-slate-900/50">
                      <img 
                        src={currentAnalysis.processedImage || currentAnalysis.originalImage}
                        alt="Analyzed image"
                        className="w-full h-auto max-h-96 object-contain"
                      />
                      {currentAnalysis.enhancement && (
                        <div className="absolute top-4 right-4">
                          <Badge variant="secondary" className="bg-green-500/20 text-green-300 border-green-500/30">
                            <Sparkle size={12} className="mr-1" />
                            Enhanced
                          </Badge>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Analysis Details */}
                <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                      <Target size={20} className="text-indigo-400" />
                      Analysis Results
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="objects" className="w-full">
                      <TabsList className="grid w-full grid-cols-5 bg-slate-900/50">
                        <TabsTrigger value="objects">Objects</TabsTrigger>
                        <TabsTrigger value="faces">Faces</TabsTrigger>
                        <TabsTrigger value="text">Text</TabsTrigger>
                        <TabsTrigger value="colors">Colors</TabsTrigger>
                        <TabsTrigger value="safety">Safety</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="objects" className="mt-4">
                        <div className="space-y-3">
                          {currentAnalysis.analysis.objects.map((obj, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-slate-900/30 rounded-lg">
                              <div>
                                <p className="text-white font-medium">{obj.name}</p>
                                <p className="text-sm text-gray-400">Confidence: {(obj.confidence * 100).toFixed(1)}%</p>
                              </div>
                              <Progress value={obj.confidence * 100} className="w-24" />
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="faces" className="mt-4">
                        <div className="space-y-3">
                          {currentAnalysis.analysis.faces.length > 0 ? (
                            currentAnalysis.analysis.faces.map((face, index) => (
                              <div key={index} className="p-3 bg-slate-900/30 rounded-lg">
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                  <div>
                                    <span className="text-gray-400">Age:</span>
                                    <span className="text-white ml-2">{face.age} years</span>
                                  </div>
                                  <div>
                                    <span className="text-gray-400">Gender:</span>
                                    <span className="text-white ml-2">{face.gender}</span>
                                  </div>
                                  <div>
                                    <span className="text-gray-400">Emotion:</span>
                                    <span className="text-white ml-2">{face.emotion}</span>
                                  </div>
                                  <div>
                                    <span className="text-gray-400">Confidence:</span>
                                    <span className="text-white ml-2">{(face.confidence * 100).toFixed(1)}%</span>
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <p className="text-gray-400 text-center py-8">No faces detected in this image</p>
                          )}
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="text" className="mt-4">
                        <div className="space-y-3">
                          {currentAnalysis.analysis.text.length > 0 ? (
                            currentAnalysis.analysis.text.map((textItem, index) => (
                              <div key={index} className="flex items-center justify-between p-3 bg-slate-900/30 rounded-lg">
                                <div>
                                  <p className="text-white font-medium">"{textItem.text}"</p>
                                  <p className="text-sm text-gray-400">Confidence: {(textItem.confidence * 100).toFixed(1)}%</p>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => copyToClipboard(textItem.text)}
                                  className="text-gray-400 hover:text-white"
                                >
                                  <Copy size={16} />
                                </Button>
                              </div>
                            ))
                          ) : (
                            <p className="text-gray-400 text-center py-8">No text detected in this image</p>
                          )}
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="colors" className="mt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {currentAnalysis.analysis.colors.map((color, index) => (
                            <div key={index} className="flex items-center gap-3 p-3 bg-slate-900/30 rounded-lg">
                              <div 
                                className="w-8 h-8 rounded-full border-2 border-slate-600"
                                style={{ backgroundColor: color.hex }}
                              />
                              <div className="flex-1">
                                <p className="text-white font-medium">{color.color}</p>
                                <p className="text-sm text-gray-400">{color.percentage.toFixed(1)}% • {color.hex}</p>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => copyToClipboard(color.hex)}
                                className="text-gray-400 hover:text-white"
                              >
                                <Copy size={16} />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="safety" className="mt-4">
                        <div className="space-y-4">
                          <div className={`p-4 rounded-lg border ${
                            currentAnalysis.analysis.safety.isNSFW 
                              ? 'bg-red-500/10 border-red-500/30' 
                              : 'bg-green-500/10 border-green-500/30'
                          }`}>
                            <p className={`font-medium ${
                              currentAnalysis.analysis.safety.isNSFW ? 'text-red-300' : 'text-green-300'
                            }`}>
                              {currentAnalysis.analysis.safety.isNSFW ? 'Content Warning' : 'Safe Content'}
                            </p>
                            <p className="text-sm text-gray-400 mt-1">
                              {currentAnalysis.analysis.safety.isNSFW 
                                ? 'This image may contain inappropriate content'
                                : 'This image appears to be safe for general audiences'
                              }
                            </p>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            {Object.entries(currentAnalysis.analysis.safety)
                              .filter(([key]) => key !== 'isNSFW')
                              .map(([key, value]) => (
                              <div key={key} className="p-3 bg-slate-900/30 rounded-lg">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-sm text-gray-400 capitalize">{key}:</span>
                                  <span className={`text-sm font-medium ${getSafetyColor(value as number)}`}>
                                    {((value as number) * 100).toFixed(1)}%
                                  </span>
                                </div>
                                <Progress value={(value as number) * 100} className="h-2" />
                              </div>
                            ))}
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
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
                          Vision Engine
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
                        See how VISION processes visual data
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        {/* Thinking Process */}
                        <div className="bg-slate-900/50 border border-slate-600 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <Lightning size={14} className="text-indigo-400" />
                            <span className="text-xs text-indigo-400 font-medium">Processing</span>
                          </div>
                          <p className="text-xs text-gray-400 italic">{currentAnalysis.thinking}</p>
                        </div>
                        
                        {/* Code Example */}
                        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-600">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-medium text-green-400">Live Code</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyToClipboard(currentAnalysis.code)}
                              className="h-6 px-2 text-xs text-gray-400 hover:text-white"
                            >
                              <Copy size={12} className="mr-1" />
                              Copy
                            </Button>
                          </div>
                          <pre className="text-xs text-gray-300 overflow-x-auto whitespace-pre-wrap max-h-96 overflow-y-auto">
                            <code>{currentAnalysis.code}</code>
                          </pre>
                        </div>

                        {/* Metadata */}
                        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-600">
                          <h4 className="text-sm font-medium text-indigo-400 mb-3">Image Metadata</h4>
                          <div className="space-y-2 text-xs">
                            <div className="flex justify-between">
                              <span className="text-gray-400">Dimensions:</span>
                              <span className="text-white">{currentAnalysis.analysis.metadata.width}×{currentAnalysis.analysis.metadata.height}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Format:</span>
                              <span className="text-white">{currentAnalysis.analysis.metadata.format}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Size:</span>
                              <span className="text-white">{currentAnalysis.analysis.metadata.size}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Quality:</span>
                              <span className="text-white">{currentAnalysis.analysis.metadata.quality}</span>
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
