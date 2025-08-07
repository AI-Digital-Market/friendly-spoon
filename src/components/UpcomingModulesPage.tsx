import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Rocket, 
  Clock, 
  Lightbulb, 
  Globe, 
  Code, 
  Database,
  Shield,
  Zap,
  Palette,
  BookOpen,
  HeadCircuit,
  Microphone,
  Heart,
  Brain,
  Skull,
  Bug,
  Lock,
  Eye
} from '@phosphor-icons/react'

interface UpcomingModulesPageProps {
  onBack?: () => void
}

export function UpcomingModulesPage({ onBack }: UpcomingModulesPageProps) {
  return (
    <div className="min-h-screen bg-background text-foreground pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500">
              <Rocket size={28} color="white" weight="fill" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold gradient-text">Upcoming Modules</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover the exciting AI modules coming to the One Last AI platform
          </p>
        </motion.div>

        {/* Two Main Sections */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* One Last AI Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="cursor-pointer"
            onClick={() => window.location.href = '/upcoming-modules/onelastai'}
          >
            <Card className="h-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/30 hover:border-blue-400 transition-all duration-300 transform hover:scale-105">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500">
                    <Heart size={28} color="white" weight="fill" />
                  </div>
                  <CardTitle className="text-2xl gradient-text">One Last AI</CardTitle>
                </div>
                <CardDescription className="text-base">
                  Revolutionizing the relationship between AI and human life through 41 intelligent, 
                  compassionate modules that enhance creativity, productivity, and personal growth. 
                  From AI girlfriends and emotional intelligence assistants to fitness trainers and career mentors, 
                  these tools understand human needs and provide personalized support for every aspect of daily life. 
                  Each module learns from user interactions to deliver increasingly tailored experiences, 
                  making technology feel more human and relationships with AI more meaningful and beneficial.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-blue-400">
                    <Clock size={16} />
                    <span className="text-sm font-mono">Launch: March 2026</span>
                  </div>
                  <div className="flex items-center gap-2 text-purple-400">
                    <Brain size={16} />
                    <span className="text-sm">41 AI Lifestyle Modules</span>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 text-white">
                    Explore AI Modules →
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* One Man Army Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="cursor-pointer"
            onClick={() => window.location.href = '/upcoming-modules/onemanarmy'}
          >
            <Card className="h-full bg-gradient-to-br from-red-500/10 to-orange-500/10 border-red-500/30 hover:border-red-400 transition-all duration-300 transform hover:scale-105">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-red-500 to-orange-500">
                    <Skull size={28} color="white" weight="fill" />
                  </div>
                  <CardTitle className="text-2xl bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                    One Man Army
                  </CardTitle>
                </div>
                <CardDescription className="text-base">
                  Advanced AI-powered cybersecurity suite featuring 50 specialized agents for ethical hacking, penetration testing, 
                  and red team operations. Each module simulates real-world attack vectors in controlled environments, 
                  enabling cybersecurity professionals to understand threat landscapes, test defensive strategies, 
                  and train the next generation of ethical hackers. From packet sniffing to social engineering simulation, 
                  these tools bridge the gap between theoretical knowledge and practical cybersecurity expertise.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-red-400">
                    <Shield size={16} />
                    <span className="text-sm font-mono">Launch: October 1, 2026</span>
                  </div>
                  <div className="flex items-center gap-2 text-orange-400">
                    <Bug size={16} />
                    <span className="text-sm">50 Security & Red Team Modules</span>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:opacity-90 text-white">
                    Explore Security Tools →
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          <Card className="text-center bg-gradient-to-br from-blue-500/5 to-purple-500/5">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-blue-400">41+</div>
              <div className="text-sm text-muted-foreground">AI Lifestyle Tools</div>
            </CardContent>
          </Card>
          <Card className="text-center bg-gradient-to-br from-purple-500/5 to-pink-500/5">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-purple-400">24/7</div>
              <div className="text-sm text-muted-foreground">AI Availability</div>
            </CardContent>
          </Card>
          <Card className="text-center bg-gradient-to-br from-red-500/5 to-orange-500/5">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-red-400">Pro</div>
              <div className="text-sm text-muted-foreground">Security Suite</div>
            </CardContent>
          </Card>
          <Card className="text-center bg-gradient-to-br from-green-500/5 to-emerald-500/5">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-400">2026</div>
              <div className="text-sm text-muted-foreground">Launch Year</div>
            </CardContent>
          </Card>
        </div>

        {/* Innovation Areas */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb size={20} />
              Innovation Focus Areas
            </CardTitle>
            <CardDescription>
              Key areas of research and development driving our future modules
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold">AI-Human Synergy</h4>
                <p className="text-sm text-muted-foreground">
                  Creating seamless collaboration between artificial intelligence and human creativity
                </p>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold">Lifestyle Integration</h4>
                <p className="text-sm text-muted-foreground">
                  AI tools that naturally fit into daily routines and enhance quality of life
                </p>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold">Ethical Security</h4>
                <p className="text-sm text-muted-foreground">
                  Advanced cybersecurity with strong ethical foundations and responsible disclosure
                </p>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold">Privacy-First Design</h4>
                <p className="text-sm text-muted-foreground">
                  All tools built with privacy and data protection as core principles
                </p>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold">Adaptive Learning</h4>
                <p className="text-sm text-muted-foreground">
                  AI that learns and evolves with user preferences and behaviors
                </p>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold">Cross-Platform Unity</h4>
                <p className="text-sm text-muted-foreground">
                  Seamless experiences across all devices and platforms
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Back Button */}
        {onBack && (
          <div className="text-center mt-12">
            <Button onClick={onBack} variant="outline">
              ← Back to Home
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
