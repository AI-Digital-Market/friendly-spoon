import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Eye, Camera, Image, Wand2 } from '@phosphor-icons/react'

interface VisualAIPageProps {
  onBack?: () => void
}

export function VisualAIPage({ onBack }: VisualAIPageProps) {
  const tools = [
    {
      title: 'Image Generation',
      description: 'Create stunning images from text descriptions',
      icon: Image,
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Object Detection',
      description: 'Identify and analyze objects in images',
      icon: Eye,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Style Transfer',
      description: 'Apply artistic styles to your images',
      icon: Wand2,
      color: 'from-orange-500 to-red-500'
    },
    {
      title: 'Image Enhancement',
      description: 'Improve image quality with AI',
      icon: Camera,
      color: 'from-green-500 to-emerald-500'
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
            <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-violet-500">
              <Eye size={28} color="white" weight="fill" />
            </div>
            <h1 className="text-3xl font-bold gradient-text">Visual AI</h1>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Powerful computer vision and image processing capabilities powered by advanced AI
          </p>
        </motion.div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
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
                  <CardHeader className="text-center">
                    <div className={`mx-auto p-3 rounded-xl bg-gradient-to-r ${tool.color} mb-4`}>
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
                    <Button 
                      className={`w-full bg-gradient-to-r ${tool.color} hover:opacity-90 text-white border-0`}
                    >
                      Try Tool
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Demo Section */}
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>AI Image Studio</CardTitle>
            <CardDescription>
              Upload an image or describe what you want to create
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-border rounded-lg p-12 text-center">
              <Camera size={48} className="mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground mb-4">
                Drag and drop an image here, or click to select
              </p>
              <Button variant="outline">Select Image</Button>
            </div>
            
            <div className="mt-6">
              <label className="block text-sm font-medium mb-2">
                Or describe what you want to create:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="A beautiful sunset over mountains..."
                  className="flex-1 px-3 py-2 rounded-lg border border-border bg-background"
                />
                <Button className="bg-gradient-to-r from-purple-500 to-violet-500 hover:opacity-90 text-white border-0">
                  Generate
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
