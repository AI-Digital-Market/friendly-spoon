import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Heart, 
  Brain, 
  ChartLine, 
  Camera, 
  MessageCircle, 
  Users, 
  Bot, 
  Sparkles, 
  ChartBar,
  NetworkX,
  PenTool,
  FileText,
  Eye,
  Memory
} from '@phosphor-icons/react'

const modules = [
  {
    id: 'chat',
    title: 'AI Chat',
    description: 'Advanced conversational AI companion for natural conversations and assistance.',
    subdomain: 'chat.onelastai.com',
    features: ['Natural Language', 'Context Awareness', 'Multi-Modal'],
    icon: MessageCircle,
    status: 'Available',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'mood',
    title: 'Mood Analyzer',
    description: 'AI-powered mood detection and emotional intelligence analysis.',
    subdomain: 'mood.onelastai.com',
    features: ['Emotion Recognition', 'Sentiment Analysis', 'Wellness Insights'],
    icon: Heart,
    status: 'Available',
    color: 'from-pink-500 to-rose-500'
  },
  {
    id: 'visual',
    title: 'Visual AI',
    description: 'Computer vision and image processing capabilities for visual content creation.',
    subdomain: 'visual.onelastai.com',
    features: ['Image Generation', 'Object Detection', 'Style Transfer'],
    icon: Eye,
    status: 'Available',
    color: 'from-purple-500 to-violet-500'
  },
  {
    id: 'creator',
    title: 'Creator Tools',
    description: 'Comprehensive suite of AI-powered tools for content creators and artists.',
    subdomain: 'creator.onelastai.com',
    features: ['Content Generation', 'Design Tools', 'Creative AI'],
    icon: PenTool,
    status: 'Available',
    color: 'from-orange-500 to-red-500'
  },
  {
    id: 'memory',
    title: 'Memory AI',
    description: 'Intelligent note-taking and memory management with AI-powered organization.',
    subdomain: 'memory.onelastai.com',
    features: ['Smart Notes', 'Knowledge Graph', 'Memory Recall'],
    icon: Memory,
    status: 'Available',
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 'ip',
    title: 'IP Tools',
    description: 'Network utilities and IP address tools for developers and network administrators.',
    subdomain: 'ip.onelastai.com',
    features: ['IP Lookup', 'Network Analysis', 'Security Tools'],
    icon: NetworkX,
    status: 'Available',
    color: 'from-cyan-500 to-blue-500'
  },
  {
    id: 'blog',
    title: 'AI Blog',
    description: 'Latest insights, tutorials, and updates from the One Last AI community.',
    subdomain: 'blog.onelastai.com',
    features: ['AI News', 'Tutorials', 'Community Posts'],
    icon: FileText,
    status: 'Available',
    color: 'from-gray-500 to-slate-500'
  },
  {
    id: 'analytics',
    title: 'Analytics Dashboard',
    description: 'Comprehensive analytics and monitoring for API usage and platform metrics.',
    subdomain: 'analytics.onelastai.com',
    features: ['Usage Metrics', 'Performance Monitoring', 'Real-time Data'],
    icon: ChartBar,
    status: 'Available',
    color: 'from-indigo-500 to-purple-500'
  }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Available': return 'bg-green-500/20 text-green-400 border-green-500/30'
    case 'Beta': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
    case 'Coming Soon': return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
    case 'Development': return 'bg-purple-500/20 text-purple-400 border-purple-500/30'
    default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
  }
}

interface ModulesSectionProps {
  onModuleSelect?: (moduleId: string) => void
}

export function ModulesSection({ onModuleSelect }: ModulesSectionProps) {
  const handleModuleClick = (module: any) => {
    if (module.status === 'Available') {
      // Navigate to the subdomain
      window.open(`https://${module.subdomain}`, '_blank')
    } else if (onModuleSelect) {
      onModuleSelect(module.id)
    }
  }

  return (
    <section id="modules-section" className="py-16 px-4 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Available Modules Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
            AI Digital Friend Modules
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Explore our comprehensive suite of AI-powered tools and services. Each module is designed to enhance your digital experience and productivity.
          </p>
        </motion.div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {modules.map((module, index) => {
            const IconComponent = module.icon
            return (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-accent/50 transition-all duration-300 glow-effect group cursor-pointer">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className={`p-2.5 rounded-lg bg-gradient-to-r ${module.color}`}>
                        <IconComponent size={20} className="text-white" />
                      </div>
                      <Badge className={getStatusColor(module.status)}>
                        {module.status}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
                      {module.title}
                    </CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                      {module.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      <div className="text-xs text-accent font-mono bg-accent/10 px-2 py-1 rounded">
                        {module.subdomain}
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="text-xs font-medium text-foreground uppercase tracking-wider">Features</h4>
                        <ul className="text-xs text-muted-foreground space-y-1">
                          {module.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center">
                              <div className={`w-1 h-1 rounded-full bg-gradient-to-r ${module.color} mr-2`} />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Button 
                        className={`w-full text-sm bg-gradient-to-r ${module.color} hover:opacity-90 text-white border-0`}
                        disabled={module.status !== 'Available'}
                        onClick={() => handleModuleClick(module)}
                      >
                        {module.status === 'Available' ? (
                          <>
                            <Sparkles size={14} className="mr-2" />
                            Launch Module
                          </>
                        ) : module.status === 'Beta' ? (
                          <>
                            <Sparkles size={14} className="mr-2" />
                            Join Beta
                          </>
                        ) : module.status === 'Development' ? (
                          'In Development'
                        ) : (
                          'Coming Soon'
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Coming Soon Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground">
            Each module is accessible via its dedicated subdomain. More specialized AI modules are in development.
          </p>
        </motion.div>
      </div>
    </section>
  )
}