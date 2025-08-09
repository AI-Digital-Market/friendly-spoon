import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

interface HeroSectionProps {
  onExploreModules?: () => void
}

export function HeroSection({ onExploreModules }: HeroSectionProps) {
  return (
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
              className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-2xl glow-effect"
            >
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
            Start with 3 free requests per module, then subscribe for unlimited access to transform your AI experience.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="flex gap-4 justify-center flex-wrap"
          >
            <Button
              size="lg"
              className="px-8 py-6 text-lg bg-primary hover:bg-primary/90 glow-effect"
              onClick={onExploreModules}
            >
              Explore Modules
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-6 text-lg border-border/50 hover:border-accent/50"
            >
              Learn More
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm"
          >
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              AI-Powered Analysis
            </div>
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              Emotional Intelligence
            </div>
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              Real-time Insights
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}