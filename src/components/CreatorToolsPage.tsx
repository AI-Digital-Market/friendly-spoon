import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PenTool, FileText, Video, Music, Palette, Code } from '@phosphor-icons/react'

interface CreatorToolsPageProps {
  onBack?: () => void
}

export function CreatorToolsPage({ onBack }: CreatorToolsPageProps) {
  const tools = [
    {
      title: 'Content Writer',
      description: 'Generate high-quality written content',
      icon: FileText,
      color: 'from-blue-500 to-cyan-500',
      features: ['Blog Posts', 'Social Media', 'Marketing Copy']
    },
    {
      title: 'Video Creator',
      description: 'AI-powered video generation and editing',
      icon: Video,
      color: 'from-purple-500 to-pink-500',
      features: ['Video Scripts', 'Editing', 'Thumbnails']
    },
    {
      title: 'Music Composer',
      description: 'Create original music and soundtracks',
      icon: Music,
      color: 'from-green-500 to-emerald-500',
      features: ['Melodies', 'Beats', 'Full Tracks']
    },
    {
      title: 'Art Generator',
      description: 'Generate stunning digital artwork',
      icon: Palette,
      color: 'from-orange-500 to-red-500',
      features: ['Digital Art', 'Concepts', 'Illustrations']
    },
    {
      title: 'Code Helper',
      description: 'Assist with programming and development',
      icon: Code,
      color: 'from-indigo-500 to-purple-500',
      features: ['Code Generation', 'Debugging', 'Documentation']
    },
    {
      title: 'Design Studio',
      description: 'Create professional designs and layouts',
      icon: PenTool,
      color: 'from-pink-500 to-rose-500',
      features: ['Logos', 'Layouts', 'Branding']
    }
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500">
              <PenTool size={28} color="white" weight="fill" />
            </div>
            <h1 className="text-3xl font-bold gradient-text">Creator Tools</h1>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comprehensive suite of AI-powered tools for content creators, artists, and developers
          </p>
        </motion.div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {tools.map((tool, index) => {
            const IconComponent = tool.icon
            return (
              <motion.div
                key={tool.title}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-accent/50 transition-all duration-300 cursor-pointer group">
                  <CardHeader>
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${tool.color} w-fit mb-4`}>
                      <IconComponent size={24} color="white" />
                    </div>
                    <CardTitle className="text-lg group-hover:text-accent transition-colors">
                      {tool.title}
                    </CardTitle>
                    <CardDescription className="text-sm">
                      {tool.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-xs font-medium text-foreground uppercase tracking-wider mb-2">
                          Features
                        </h4>
                        <ul className="text-xs text-muted-foreground space-y-1">
                          {tool.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center">
                              <div className={`w-1 h-1 rounded-full bg-gradient-to-r ${tool.color} mr-2`} />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <Button 
                        className={`w-full bg-gradient-to-r ${tool.color} hover:opacity-90 text-white border-0`}
                      >
                        Launch Tool
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Quick Start Section */}
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Quick Start Creator Studio</CardTitle>
            <CardDescription>
              Tell us what you want to create and we'll guide you to the right tools
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  What would you like to create today?
                </label>
                <textarea
                  placeholder="Describe your creative project..."
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background h-24 resize-none"
                />
              </div>
              
              <div className="flex gap-2">
                <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:opacity-90 text-white border-0">
                  Get Started
                </Button>
                <Button variant="outline">
                  Browse Templates
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Back Button */}
        {onBack && (
          <div className="text-center mt-8">
            <Button onClick={onBack} variant="outline">
              ← Back to Home
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
