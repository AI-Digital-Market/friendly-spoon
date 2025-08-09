import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Heart, 
  Calendar, 
  Lock, 
  Target, 
  Globe, 
  Link,
  User,
  FileCode,
  Brain,
  FilePdf,
  ChatCircle,
  TrendUp,
  IdentificationCard,
  Robot,
  Chats,
  Briefcase,
  Lightning,
  Stethoscope,
  Scales,
  MicrophoneStage,
  MusicNotes,
  ChefHat,
  Barbell,
  HeartBreak,
  ChartLine,
  CurrencyBtc,
  Smiley,
  Lightbulb,
  PaintBrush,
  GraduationCap,
  GameController,
  PresentationChart,
  Microphone,
  Users,
  Newspaper,
  Calculator,
  Leaf,
  Handshake,
  PawPrint,
  House,
  Eye,
  MapPin,
  BookOpen,
  Palette,
  TShirt,
  Presentation,
  UserCircle
} from '@phosphor-icons/react'

interface OneLastAIModulesPageProps {
  onBack?: () => void
}

export function OneLastAIModulesPage({ onBack }: OneLastAIModulesPageProps) {
  const aiModules = [
    {
      id: 1,
      name: "ai-girlfriend",
      title: "AI Girlfriend",
      description: "AI-powered virtual companion experience with emotional intelligence and personalized conversations.",
      icon: Heart,
      color: "from-pink-500 to-rose-500",
      category: "Relationship"
    },
    {
      id: 2,
      name: "demo-repo",
      title: "Demo Repo",
      description: "Sample codebase for HTML projects with best practices and modern development standards.",
      icon: FileCode,
      color: "from-blue-500 to-indigo-500",
      category: "Development"
    },
    {
      id: 3,
      name: "EmoAI",
      title: "EmoAI",
      description: "Emotionally intelligent AI assistant that understands and responds to your emotional state.",
      icon: Brain,
      color: "from-purple-500 to-violet-500",
      category: "Emotional Intelligence"
    },
    {
      id: 4,
      name: "PDFMind",
      title: "PDFMind",
      description: "Smart document summarizer and analyzer for PDFs with AI-powered insights and extraction.",
      icon: FilePdf,
      color: "from-green-500 to-emerald-500",
      category: "Productivity"
    },
    {
      id: 5,
      name: "ChatRevive",
      title: "ChatRevive",
      description: "Restores deleted or old chat histories using advanced AI recovery and reconstruction.",
      icon: ChatCircle,
      color: "from-cyan-500 to-blue-500",
      category: "Recovery"
    },
    {
      id: 6,
      name: "TokBoost",
      title: "TokBoost",
      description: "Boosts your social media engagement with AI-powered content optimization and strategies.",
      icon: TrendUp,
      color: "from-orange-500 to-red-500",
      category: "Social Media"
    },
    {
      id: 7,
      name: "YouGen",
      title: "YouGen",
      description: "Creates personalized bio and identity profiles for social media and professional platforms.",
      icon: IdentificationCard,
      color: "from-indigo-500 to-purple-500",
      category: "Personal Branding"
    },
    {
      id: 8,
      name: "AgentX",
      title: "AgentX",
      description: "Custom agent automation with human-like behavior for various digital tasks and interactions.",
      icon: Robot,
      color: "from-gray-500 to-slate-500",
      category: "Automation"
    },
    {
      id: 9,
      name: "AutoChat",
      title: "AutoChat",
      description: "24/7 chatbot for any business or personal use with intelligent conversation management.",
      icon: Chats,
      color: "from-teal-500 to-cyan-500",
      category: "Business"
    },
    {
      id: 10,
      name: "CVSmash",
      title: "CVSmash",
      description: "Creates high-impact CVs tailored by AI for specific job applications and industries.",
      icon: Briefcase,
      color: "from-blue-600 to-purple-600",
      category: "Career"
    },
    {
      id: 11,
      name: "GPT-God",
      title: "GPT-God",
      description: "Advanced AI with supercharged GPT abilities for complex reasoning and problem-solving.",
      icon: Lightning,
      color: "from-yellow-500 to-orange-500",
      category: "AI Assistant"
    },
    {
      id: 12,
      name: "AIDoctor",
      title: "AIDoctor",
      description: "Virtual health checkups & consultations with AI-powered medical guidance and advice.",
      icon: Stethoscope,
      color: "from-green-600 to-teal-600",
      category: "Healthcare"
    },
    {
      id: 13,
      name: "AILawyer",
      title: "AILawyer",
      description: "Legal advice generator and document analyzer for various legal matters and documentation.",
      icon: Scales,
      color: "from-indigo-600 to-blue-600",
      category: "Legal"
    },
    {
      id: 14,
      name: "AIRapstar",
      title: "AIRapstar",
      description: "Generate custom rap lyrics in your style with AI-powered rhythm and rhyme creation.",
      icon: MicrophoneStage,
      color: "from-purple-600 to-pink-600",
      category: "Music"
    },
    {
      id: 15,
      name: "AISinger",
      title: "AISinger",
      description: "AI vocalist and melody generator for creating original songs and musical compositions.",
      icon: Music,
      color: "from-rose-500 to-pink-500",
      category: "Music"
    },
    {
      id: 16,
      name: "AIChef",
      title: "AIChef",
      description: "Creates recipes based on your fridge items with nutritional analysis and cooking instructions.",
      icon: ChefHat,
      color: "from-orange-600 to-red-600",
      category: "Culinary"
    },
    {
      id: 17,
      name: "FitnessAI",
      title: "FitnessAI",
      description: "Custom gym plans and diet charts tailored to your fitness goals and dietary preferences.",
      icon: Barbell,
      color: "from-green-700 to-emerald-700",
      category: "Fitness"
    },
    {
      id: 18,
      name: "LoveBot",
      title: "LoveBot",
      description: "Romantic message generator & date ideas for strengthening relationships and connections.",
      icon: HeartBreak,
      color: "from-red-500 to-pink-500",
      category: "Romance"
    },
    {
      id: 19,
      name: "StockSage",
      title: "StockSage",
      description: "AI that gives you daily stock market insights with trend analysis and investment suggestions.",
      icon: ChartLine,
      color: "from-green-500 to-blue-500",
      category: "Finance"
    },
    {
      id: 20,
      name: "CryptoWizard",
      title: "CryptoWizard",
      description: "Analyzes trends in crypto for daily trades with market predictions and portfolio optimization.",
      icon: CurrencyBtc,
      color: "from-orange-500 to-yellow-500",
      category: "Cryptocurrency"
    },
    {
      id: 21,
      name: "LifeCoachAI",
      title: "LifeCoachAI",
      description: "Motivational quotes & personalized guidance for personal development and goal achievement.",
      icon: Smiley,
      color: "from-blue-500 to-cyan-500",
      category: "Personal Development"
    },
    {
      id: 22,
      name: "StartupGenie",
      title: "StartupGenie",
      description: "Generates startup ideas with pitch decks for entrepreneurs and business innovators.",
      icon: Lightbulb,
      color: "from-purple-500 to-indigo-500",
      category: "Entrepreneurship"
    },
    {
      id: 23,
      name: "AIStylist",
      title: "AIStylist",
      description: "Outfit and fashion suggestions using AI with personalized style recommendations.",
      icon: PaintBrush,
      color: "from-pink-500 to-purple-500",
      category: "Fashion"
    },
    {
      id: 24,
      name: "EduMentor",
      title: "EduMentor",
      description: "Tutoring for school, college, and test prep with adaptive learning algorithms.",
      icon: GraduationCap,
      color: "from-blue-600 to-indigo-600",
      category: "Education"
    },
    {
      id: 25,
      name: "GameCompanion",
      title: "GameCompanion",
      description: "AI partner for online multiplayer games with strategy guidance and team coordination.",
      icon: GameController,
      color: "from-green-500 to-teal-500",
      category: "Gaming"
    },
    {
      id: 26,
      name: "ResumeWizard",
      title: "ResumeWizard",
      description: "Interactive resume builder with AI-powered content optimization and formatting.",
      icon: PresentationChart,
      color: "from-indigo-500 to-blue-500",
      category: "Career"
    },
    {
      id: 27,
      name: "VoiceCloneAI",
      title: "VoiceCloneAI",
      description: "Clone your voice or celebrities' for fun with advanced voice synthesis technology.",
      icon: Microphone,
      color: "from-red-500 to-orange-500",
      category: "Voice Technology"
    },
    {
      id: 28,
      name: "InfluencerBoost",
      title: "InfluencerBoost",
      description: "Tools to grow followers organically with content optimization and engagement strategies.",
      icon: Users,
      color: "from-purple-600 to-pink-600",
      category: "Social Media"
    },
    {
      id: 29,
      name: "NewsGenie",
      title: "NewsGenie",
      description: "Summarizes trending news for you with personalized feeds and analysis.",
      icon: Newspaper,
      color: "from-gray-600 to-slate-600",
      category: "News"
    },
    {
      id: 30,
      name: "BudgetBuddy",
      title: "BudgetBuddy",
      description: "Helps manage your expenses and budget with intelligent financial planning and tracking.",
      icon: Calculator,
      color: "from-green-600 to-emerald-600",
      category: "Finance"
    },
    {
      id: 31,
      name: "MindPeaceAI",
      title: "MindPeaceAI",
      description: "AI-led meditation and mental health tools for stress management and wellness.",
      icon: Leaf,
      color: "from-green-500 to-teal-500",
      category: "Mental Health"
    },
    {
      id: 32,
      name: "AIMentor",
      title: "AIMentor",
      description: "Professional career advice and resume feedback for career growth and development.",
      icon: Handshake,
      color: "from-blue-500 to-purple-500",
      category: "Career"
    },
    {
      id: 33,
      name: "PetTrainerAI",
      title: "PetTrainerAI",
      description: "Train your pet with AI voice commands and behavioral guidance systems.",
      icon: PawPrint,
      color: "from-orange-500 to-red-500",
      category: "Pet Care"
    },
    {
      id: 34,
      name: "HomeDesignAI",
      title: "HomeDesignAI",
      description: "Interior design planner with 3D views and personalized decoration suggestions.",
      icon: House,
      color: "from-indigo-500 to-purple-500",
      category: "Home Design"
    },
    {
      id: 35,
      name: "DreamDecoder",
      title: "DreamDecoder",
      description: "Interpret your dreams using AI models with psychological insights and symbolism analysis.",
      icon: Eye,
      color: "from-purple-500 to-pink-500",
      category: "Psychology"
    },
    {
      id: 36,
      name: "TravelBot",
      title: "TravelBot",
      description: "Plan your trips instantly using AI with personalized itineraries and recommendations.",
      icon: MapPin,
      color: "from-blue-500 to-cyan-500",
      category: "Travel"
    },
    {
      id: 37,
      name: "StoryForge",
      title: "StoryForge",
      description: "AI-powered story and script writer for creative writing and content generation.",
      icon: BookOpen,
      color: "from-orange-500 to-red-500",
      category: "Creative Writing"
    },
    {
      id: 38,
      name: "ArtMuse",
      title: "ArtMuse",
      description: "Generates digital artwork in any style with AI-powered artistic creation and customization.",
      icon: Palette,
      color: "from-pink-500 to-purple-500",
      category: "Art"
    },
    {
      id: 39,
      name: "FashionFlair",
      title: "FashionFlair",
      description: "Suggests trends and outfits from Instagram with personalized fashion recommendations.",
      icon: Tshirt,
      color: "from-purple-600 to-pink-600",
      category: "Fashion"
    },
    {
      id: 40,
      name: "BizPitchAI",
      title: "BizPitchAI",
      description: "Make startup pitch decks in minutes with AI-powered presentation creation and optimization.",
      icon: Presentation,
      color: "from-blue-600 to-indigo-600",
      category: "Business"
    },
    {
      id: 41,
      name: "AIAgentZero",
      title: "AIAgentZero",
      description: "All-in-one personal AI assistant combining multiple AI capabilities for comprehensive support.",
      icon: UserCircle,
      color: "from-gray-600 to-slate-600",
      category: "AI Assistant"
    }
  ]

  const categories = [...new Set(aiModules.map(module => module.category))]

  return (
    <div className="min-h-screen bg-background text-foreground pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500">
              <Heart size={32} color="white" weight="fill" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold gradient-text">One Last AI</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-8">
            AI-based utility modules aimed at enhancing modern digital life. 
            Designed for creators, learners, professionals, and youth audiences.
          </p>
          
          {/* Project Details */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto mb-8">
            <div className="flex items-center justify-center gap-2 bg-blue-500/10 rounded-lg p-3">
              <Calendar size={20} className="text-blue-400" />
              <span className="text-sm font-mono">Launch: March 2026</span>
            </div>
            <div className="flex items-center justify-center gap-2 bg-purple-500/10 rounded-lg p-3">
              <Lock size={20} className="text-purple-400" />
              <span className="text-sm">Early Adopters & Premium</span>
            </div>
            <div className="flex items-center justify-center gap-2 bg-green-500/10 rounded-lg p-3">
              <Target size={20} className="text-green-400" />
              <span className="text-sm">Creativity & Productivity</span>
            </div>
            <div className="flex items-center justify-center gap-2 bg-orange-500/10 rounded-lg p-3">
              <Globe size={20} className="text-orange-400" />
              <span className="text-sm">Lifestyle AI Companion</span>
            </div>
            <div className="flex items-center justify-center gap-2 bg-cyan-500/10 rounded-lg p-3 lg:col-span-2">
              <Link size={20} className="text-cyan-400" />
              <span className="text-sm font-mono">https://onelast.ai</span>
            </div>
          </div>
        </motion.div>

        {/* Categories Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category, index) => (
            <Badge key={category} variant="outline" className="px-3 py-1">
              {category}
            </Badge>
          ))}
        </div>

        {/* AI Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {aiModules.map((module, index) => {
            const IconComponent = module.icon
            return (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.05,
                  type: "spring",
                  stiffness: 100 
                }}
                whileHover={{ 
                  scale: 1.05, 
                  rotateY: 5,
                  transition: { duration: 0.2 } 
                }}
                className="group"
              >
                <Card className="h-full bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm border-border/50 hover:border-accent/50 transition-all duration-300 overflow-hidden relative">
                  {/* Animated Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${module.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                  
                  <CardHeader className="pb-4 relative">
                    <div className="flex items-center justify-between mb-3">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${module.color} shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                        <IconComponent size={24} className="text-white" />
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {String(module.id).padStart(2, '0')}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg font-bold group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                      {module.title}
                    </CardTitle>
                    <CardDescription className="text-sm leading-relaxed">
                      {module.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="pt-0 relative">
                    <div className="space-y-3">
                      <Badge 
                        className={`w-full justify-center bg-gradient-to-r ${module.color}/20 text-${module.color.split('-')[1]}-400 border-${module.color.split('-')[1]}-500/30`}
                      >
                        {module.category}
                      </Badge>
                      
                      <Button 
                        className={`w-full bg-gradient-to-r ${module.color} hover:opacity-90 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300`}
                        disabled
                      >
                        <Heart size={14} className="mr-2" />
                        Coming Soon
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* CTA Section */}
        <Card className="text-center bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/30">
          <CardHeader>
            <CardTitle className="text-2xl">Join the AI Revolution</CardTitle>
            <CardDescription className="text-base">
              Be among the first to experience the future of AI-powered lifestyle enhancement
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="max-w-md mx-auto space-y-4">
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email for early access"
                  className="flex-1 px-4 py-3 rounded-lg border border-border bg-background"
                />
                <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 px-6">
                  Get Early Access
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                🚀 March 2026 • 🔒 Premium & Early Adopters Only • 💝 41 AI Modules
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Back Button */}
        {onBack && (
          <div className="text-center mt-12">
            <Button onClick={onBack} variant="outline" size="lg">
              ← Back to Upcoming Modules
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
