import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useState, useEffect } from 'react'
import { 
  Robot, 
  Heart, 
  Eye, 
  MessageCircle, 
  Brain, 
  Palette, 
  ArrowDown, 
  Code, 
  Play, 
  Star,
  Crown,
  Lock,
  CheckCircle,
  X
} from '@phosphor-icons/react'

interface HomePageProps {
  onNavigate?: (page: string) => void
  onNavigateAuth?: (authPage: string) => void
  onNavigateSubscription?: (plan?: string) => void
}

export function HomePage({ onNavigate, onNavigateAuth, onNavigateSubscription }: HomePageProps) {
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false)
  const [apiDemoText, setApiDemoText] = useState('')
  const [currentDemo, setCurrentDemo] = useState(0)
  const [isTyping, setIsTyping] = useState(false)

  const modules = [
    {
      id: 'chat',
      title: 'AI Chat',
      description: 'Intelligent conversational AI that understands context and provides meaningful responses for any topic.',
      icon: MessageCircle,
      color: 'from-blue-500 to-cyan-500',
      requests: 3,
      isActive: true
    },
    {
      id: 'mood',
      title: 'Mood Analyzer',
      description: 'Advanced emotional intelligence AI that analyzes your mood and provides personalized insights.',
      icon: Heart,
      color: 'from-pink-500 to-rose-500',
      requests: 3,
      isActive: true
    },
    {
      id: 'visual',
      title: 'Visual AI',
      description: 'Powerful computer vision and image processing for analysis, generation, and enhancement.',
      icon: Eye,
      color: 'from-purple-500 to-violet-500',
      requests: 3,
      isActive: true
    },
    {
      id: 'creative',
      title: 'Creative Studio',
      description: 'AI-powered content creation for writing, design, and artistic expression with unlimited creativity.',
      icon: Palette,
      color: 'from-orange-500 to-red-500',
      requests: 3,
      isActive: true
    },
    {
      id: 'brain',
      title: 'Knowledge AI',
      description: 'Intelligent research assistant that processes information and provides comprehensive insights.',
      icon: Brain,
      color: 'from-green-500 to-emerald-500',
      requests: 3,
      isActive: true
    },
    {
      id: 'companion',
      title: 'AI Companion',
      description: 'Personal AI assistant that learns your preferences and adapts to your lifestyle needs.',
      icon: Robot,
      color: 'from-indigo-500 to-blue-500',
      requests: 3,
      isActive: true
    }
  ]

  const apiDemos = [
    {
      title: 'AI Chat Request',
      code: `fetch('/api/chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer your-api-key'
  },
  body: JSON.stringify({
    message: "Hello, how can you help me today?",
    model: "ai-chat-v2"
  })
})`,
      response: `{
  "response": "Hello! I'm here to help you with anything you need. I can assist with questions, creative tasks, analysis, or just have a friendly conversation. What would you like to explore today?",
  "model": "ai-chat-v2",
  "tokens": 45,
  "timestamp": "2026-01-15T10:30:00Z"
}`
    },
    {
      title: 'Mood Analysis Request',
      code: `fetch('/api/mood', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer your-api-key'
  },
  body: JSON.stringify({
    text: "I feel excited about the new project but a bit nervous too",
    analyze_sentiment: true
  })
})`,
      response: `{
  "mood": "mixed_positive",
  "emotions": {
    "excitement": 0.75,
    "nervousness": 0.35,
    "anticipation": 0.60
  },
  "sentiment": "positive",
  "confidence": 0.87,
  "suggestions": ["Channel excitement into action", "Practice relaxation techniques"]
}`
    },
    {
      title: 'Visual AI Request',
      code: `fetch('/api/visual', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer your-api-key'
  },
  body: JSON.stringify({
    task: "analyze",
    image_url: "https://example.com/image.jpg",
    features: ["objects", "emotions", "text"]
  })
})`,
      response: `{
  "objects": ["person", "laptop", "coffee_cup"],
  "emotions": {
    "happiness": 0.82,
    "concentration": 0.65
  },
  "text_detected": "Good morning!",
  "confidence": 0.94,
  "processing_time": "1.2s"
}`
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDemo((prev) => (prev + 1) % apiDemos.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const demo = apiDemos[currentDemo]
    const fullText = demo.code + '\n\n// Response:\n' + demo.response
    let index = 0
    setApiDemoText('')
    setIsTyping(true)

    const typeInterval = setInterval(() => {
      if (index < fullText.length) {
        setApiDemoText(fullText.slice(0, index + 1))
        index++
      } else {
        setIsTyping(false)
        clearInterval(typeInterval)
      }
    }, 30)

    return () => clearInterval(typeInterval)
  }, [currentDemo])

  const handleModuleClick = (moduleId: string) => {
    // For demo purposes, show subscription modal after 3 requests
    setShowSubscriptionModal(true)
  }

  const handleSubscribe = () => {
    // Check if user is logged in (for demo purposes, we'll assume they need to sign in)
    // In a real app, you'd check authentication state here
    onNavigateAuth?.('signin')
    setShowSubscriptionModal(false)
  }

  const handleApiContact = () => {
    onNavigate?.('contact')
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 relative pt-20">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-2xl"
              >
                <Robot size={32} color="white" weight="fill" />
              </motion.div>
              <h1 className="text-4xl md:text-6xl font-bold gradient-text">
                AI Digital Friend
              </h1>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto leading-relaxed"
            >
              Your comprehensive AI companion platform with powerful modules for chat, creativity, 
              mood analysis, visual AI, and intelligent lifestyle assistance.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-lg text-muted-foreground mb-12 max-w-3xl mx-auto"
            >
              Experience 6 specialized AI modules designed to understand, analyze, and enhance your digital life. 
              Start with 3 free requests per module, then subscribe for unlimited access.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            >
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 text-white px-8 py-3"
                onClick={() => document.getElementById('modules')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Play size={20} className="mr-2" />
                Try Free Modules
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-border hover:bg-accent px-8 py-3"
                onClick={() => setShowSubscriptionModal(true)}
              >
                <Crown size={20} className="mr-2" />
                Get Premium Access
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="flex justify-center"
            >
              <ArrowDown size={24} className="text-muted-foreground animate-bounce" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Modules Section */}
      <section id="modules" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
              AI Modules
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore our powerful AI modules. Each module includes 3 free requests to get you started.
            </p>
          </motion.div>

          {/* Module Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {modules.map((module, index) => {
              const IconComponent = module.icon
              return (
                <motion.div
                  key={module.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  className="group cursor-pointer"
                  onClick={() => handleModuleClick(module.id)}
                >
                  <Card className="h-full bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm border-border/50 hover:border-accent/50 transition-all duration-300 overflow-hidden relative">
                    {/* Animated Background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${module.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                    
                    <CardHeader className="pb-4 relative">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-r ${module.color} shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                          <IconComponent size={24} className="text-white" />
                        </div>
                        <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30">
                          {module.requests} free requests
                        </Badge>
                      </div>
                      <CardTitle className="text-xl font-bold group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                        {module.title}
                      </CardTitle>
                      <CardDescription className="text-sm leading-relaxed">
                        {module.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="pt-0 relative">
                      <Button 
                        className={`w-full bg-gradient-to-r ${module.color} hover:opacity-90 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300`}
                      >
                        <Play size={16} className="mr-2" />
                        Try Now
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* API Demo Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-background to-accent/5">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
              Developer API Access
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Integrate our AI modules into your applications with our powerful REST API.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Live Code Demo */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="bg-gradient-to-br from-gray-900 to-black border-border/50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg text-white">
                      {apiDemos[currentDemo].title}
                    </CardTitle>
                    <div className="flex gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <pre className="text-sm text-green-400 font-mono whitespace-pre-wrap h-96 overflow-auto">
                    {apiDemoText}
                    {isTyping && <span className="animate-pulse">|</span>}
                  </pre>
                </CardContent>
              </Card>
            </motion.div>

            {/* API Information */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code size={20} />
                    API Features
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle size={16} className="text-green-500" />
                    <span>RESTful API with JSON responses</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle size={16} className="text-green-500" />
                    <span>Authentication with API keys</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle size={16} className="text-green-500" />
                    <span>Real-time processing capabilities</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle size={16} className="text-green-500" />
                    <span>Comprehensive documentation</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle size={16} className="text-green-500" />
                    <span>Rate limiting and usage analytics</span>
                  </div>
                </CardContent>
              </Card>

              <Button 
                onClick={handleApiContact}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 text-white"
                size="lg"
              >
                <MessageCircle size={20} className="mr-2" />
                Contact for API Access
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">
              Ready to Transform Your AI Experience?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of users who have already discovered the power of AI Digital Friend. 
              Subscribe today for unlimited access to all modules.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg"
                onClick={() => setShowSubscriptionModal(true)}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 text-white px-8 py-3"
              >
                <Crown size={20} className="mr-2" />
                Subscribe Now
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => onNavigate?.('contact')}
                className="border-border hover:bg-accent px-8 py-3"
              >
                <MessageCircle size={20} className="mr-2" />
                Contact Us
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Subscription Modal */}
      {showSubscriptionModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card border border-border rounded-lg p-6 max-w-md w-full"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Subscription Required</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSubscriptionModal(false)}
              >
                <X size={16} />
              </Button>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3">
                <Lock size={16} className="text-yellow-500" />
                <span>You've used your free requests for this module</span>
              </div>
              <div className="flex items-center gap-3">
                <Crown size={16} className="text-purple-500" />
                <span>Subscribe for unlimited access to all modules</span>
              </div>
              <div className="flex items-center gap-3">
                <Star size={16} className="text-blue-500" />
                <span>Get priority support and new features first</span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={handleSubscribe}
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 text-white"
              >
                Subscribe
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowSubscriptionModal(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
