import { motion } from 'framer-motion'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { 
  Lightbulb, 
  PaperPlaneTilt, 
  Star, 
  Sparkle, 
  Heart, 
  Rocket,
  Brain,
  MagicWand,
  Palette,
  Code,
  Users,
  Gear
} from '@phosphor-icons/react'

interface SuggestionsPageProps {
  onBack?: () => void
}

export function SuggestionsPage({ onBack }: SuggestionsPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: '',
    title: '',
    description: '',
    priority: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const suggestionCategories = [
    { id: 'new-module', label: 'New AI Module', icon: Brain, color: 'from-blue-500 to-cyan-500' },
    { id: 'feature-improvement', label: 'Feature Enhancement', icon: Gear, color: 'from-green-500 to-emerald-500' },
    { id: 'ui-ux', label: 'UI/UX Design', icon: Palette, color: 'from-purple-500 to-pink-500' },
    { id: 'integration', label: 'API Integration', icon: Code, color: 'from-orange-500 to-red-500' },
    { id: 'community', label: 'Community Feature', icon: Users, color: 'from-teal-500 to-blue-500' },
    { id: 'other', label: 'Other Ideas', icon: Magic, color: 'from-indigo-500 to-purple-500' }
  ]

  const priorityLevels = [
    { id: 'low', label: 'Nice to Have', description: 'Cool idea for future consideration', color: 'from-gray-500 to-slate-500' },
    { id: 'medium', label: 'Valuable Addition', description: 'Would improve user experience', color: 'from-yellow-500 to-orange-500' },
    { id: 'high', label: 'Game Changer', description: 'Revolutionary idea that could transform our platform', color: 'from-green-500 to-emerald-500' },
    { id: 'critical', label: 'Must Have', description: 'Essential feature missing from our platform', color: 'from-red-500 to-pink-500' }
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleCategorySelect = (categoryId: string) => {
    setFormData(prev => ({ ...prev, category: categoryId }))
  }

  const handlePrioritySelect = (priorityId: string) => {
    setFormData(prev => ({ ...prev, priority: priorityId }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Create email content
    const emailSubject = `💡 New Suggestion: ${formData.title}`
    const emailBody = `
New Suggestion Received from AI Digital Friend Platform

👤 Name: ${formData.name}
📧 Email: ${formData.email}
🏷️ Category: ${suggestionCategories.find(c => c.id === formData.category)?.label || 'Not specified'}
📊 Priority: ${priorityLevels.find(p => p.id === formData.priority)?.label || 'Not specified'}

💡 Suggestion Title: ${formData.title}

📝 Description:
${formData.description}

---
Submitted via: onelastai.com/suggestions
Time: ${new Date().toLocaleString()}
    `.trim()

    try {
      // Create mailto link
      const mailtoLink = `mailto:info@onelastai.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`
      
      // Open email client
      window.location.href = mailtoLink
      
      // Show success state
      setTimeout(() => {
        setIsSubmitting(false)
        setIsSubmitted(true)
      }, 1000)
    } catch (error) {
      console.error('Error submitting suggestion:', error)
      setIsSubmitting(false)
    }
  }

  const floatingElements = [
    { icon: Lightbulb, delay: 0, duration: 6 },
    { icon: Star, delay: 1, duration: 8 },
    { icon: Sparkles, delay: 2, duration: 7 },
    { icon: Heart, delay: 3, duration: 9 },
    { icon: Rocket, delay: 4, duration: 6 }
  ]

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-foreground pt-20 relative overflow-hidden">
        {/* Floating Animation Background */}
        <div className="absolute inset-0 overflow-hidden">
          {floatingElements.map((element, index) => {
            const IconComponent = element.icon
            return (
              <motion.div
                key={index}
                className="absolute opacity-20"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [-20, -100, -20],
                  x: [-10, 10, -10],
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: element.duration,
                  delay: element.delay,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <IconComponent size={24} className="text-white" />
              </motion.div>
            )
          })}
        </div>

        <div className="container mx-auto px-4 py-16 relative z-10">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="text-center max-w-2xl mx-auto"
          >
            <div className="relative mb-8">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center"
              >
                <PaperPlaneTilt size={40} color="white" weight="fill" />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-30 blur-xl animate-pulse"></div>
            </div>

            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              🎉 Suggestion Submitted!
            </h1>
            <p className="text-xl text-white/80 mb-8">
              Your brilliant idea has taken flight! We've received your suggestion and will review it carefully.
            </p>
            <p className="text-md text-white/60 mb-8">
              Thank you for helping us build the future of AI together. We truly value your creativity and vision!
            </p>
            
            <div className="flex gap-4 justify-center">
              <Button 
                onClick={() => {
                  setIsSubmitted(false)
                  setFormData({ name: '', email: '', category: '', title: '', description: '', priority: '' })
                }}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90"
              >
                Submit Another Idea
              </Button>
              {onBack && (
                <Button onClick={onBack} variant="outline">
                  ← Back to Home
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-foreground pt-20 relative overflow-hidden">
      {/* Floating Animation Background */}
      <div className="absolute inset-0 overflow-hidden">
        {floatingElements.map((element, index) => {
          const IconComponent = element.icon
          return (
            <motion.div
              key={index}
              className="absolute opacity-10"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-20, -100, -20],
                x: [-10, 10, -10],
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: element.duration,
                delay: element.delay,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <IconComponent size={32} className="text-white" />
            </motion.div>
          )
        })}
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-pink-500/30 to-red-500/30 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="relative">
              <div className="p-4 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500">
                <Lightbulb size={32} color="white" weight="fill" />
              </div>
              <div className="absolute -inset-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl opacity-30 blur-lg animate-ping"></div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 bg-clip-text text-transparent">
              Share Your Dreams
            </h1>
          </motion.div>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            ✨ Your imagination is the blueprint for our future. Share your ideas and help us craft the next generation of AI experiences!
          </p>
          <div className="text-md text-white/60 mt-4">
            💌 All suggestions are sent directly to <span className="text-blue-400 font-semibold">info@onelastai.com</span>
          </div>
        </motion.div>

        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">
          {/* Personal Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-black/20 border-white/10 backdrop-blur-lg">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Users size={20} />
                  👋 Tell Us About Yourself
                </CardTitle>
                <CardDescription className="text-white/60">
                  Help us know who's behind this amazing idea
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-white/80 mb-2 block">Your Name</label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your name"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-white/80 mb-2 block">Email Address</label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Category Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-black/20 border-white/10 backdrop-blur-lg">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Palette size={20} />
                  🎨 What Type of Idea Is This?
                </CardTitle>
                <CardDescription className="text-white/60">
                  Choose the category that best fits your suggestion
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {suggestionCategories.map((category, index) => {
                    const IconComponent = category.icon
                    return (
                      <motion.button
                        key={category.id}
                        type="button"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 * index }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleCategorySelect(category.id)}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                          formData.category === category.id
                            ? 'border-white/50 bg-white/20'
                            : 'border-white/20 bg-white/5 hover:border-white/30 hover:bg-white/10'
                        }`}
                      >
                        <div className={`p-2 rounded-lg bg-gradient-to-r ${category.color} w-fit mb-3`}>
                          <IconComponent size={20} color="white" />
                        </div>
                        <h3 className="font-semibold text-white mb-1">{category.label}</h3>
                        <div className="w-full h-1 bg-gradient-to-r from-white/20 to-transparent rounded"></div>
                      </motion.button>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Suggestion Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-black/20 border-white/10 backdrop-blur-lg">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Brain size={20} />
                  💭 Share Your Vision
                </CardTitle>
                <CardDescription className="text-white/60">
                  Describe your idea in detail - the more specific, the better!
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-white/80 mb-2 block">Suggestion Title</label>
                  <Input
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Give your idea a catchy title..."
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-white/80 mb-2 block">Detailed Description</label>
                  <Textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe your idea in detail. How would it work? What problem does it solve? What makes it special?"
                    rows={6}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 resize-none"
                    required
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Priority Level */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="bg-black/20 border-white/10 backdrop-blur-lg">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Star size={20} />
                  ⭐ How Important Is This?
                </CardTitle>
                <CardDescription className="text-white/60">
                  Help us understand the impact of your suggestion
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {priorityLevels.map((priority, index) => (
                    <motion.button
                      key={priority.id}
                      type="button"
                      initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      whileHover={{ scale: 1.02, y: -3 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handlePrioritySelect(priority.id)}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                        formData.priority === priority.id
                          ? 'border-white/50 bg-white/20'
                          : 'border-white/20 bg-white/5 hover:border-white/30 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${priority.color}`}></div>
                        <h3 className="font-semibold text-white">{priority.label}</h3>
                      </div>
                      <p className="text-sm text-white/60">{priority.description}</p>
                    </motion.button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:opacity-90 text-white px-8 py-6 text-lg font-semibold rounded-xl border-0 shadow-lg shadow-purple-500/25"
              >
                {isSubmitting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="flex items-center gap-2"
                  >
                    <Sparkles size={20} />
                    Sending Your Dream...
                  </motion.div>
                ) : (
                  <div className="flex items-center gap-2">
                    <PaperPlaneTilt size={20} />
                    🚀 Launch My Idea
                  </div>
                )}
              </Button>
            </motion.div>
            <p className="text-sm text-white/60 mt-4">
              Your suggestion will be sent to our team at <span className="text-blue-400">info@onelastai.com</span>
            </p>
          </motion.div>
        </form>

        {/* Back Button */}
        {onBack && (
          <div className="text-center mt-12">
            <Button onClick={onBack} variant="outline" className="border-white/20 text-white hover:bg-white/10">
              ← Back to Home
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
