import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, Heart, Brain, Target, Trophy, Sparkle } from '@phosphor-icons/react'

interface AboutUsPageProps {
  onBack?: () => void
}

export function AboutUsPage({ onBack }: AboutUsPageProps) {
  const teamRegions = [
    {
      country: "🇦🇪 UAE",
      role: "Innovation Hub",
      description: "Leading AI research and development initiatives",
      icon: Brain
    },
    {
      country: "🇬🇧 UK", 
      role: "Technical Excellence",
      description: "Platform architecture and engineering excellence",
      icon: Target
    },
    {
      country: "🇺🇸 USA",
      role: "Product & Design",
      description: "User experience and market strategy",
      icon: Heart
    }
  ]

  const coreValues = [
    {
      title: "🧩 Modular",
      description: "Plug-and-play flexibility that adapts to your unique needs and workflows"
    },
    {
      title: "💬 Intuitive", 
      description: "User-friendly interfaces designed for everyone, regardless of technical expertise"
    },
    {
      title: "🧠 Clever",
      description: "Deep integration of cutting-edge AI/ML tools with intelligent automation"
    },
    {
      title: "🤝 Friendly",
      description: "Like a real companion, not a cold machine - warm, understanding, and supportive"
    }
  ]

  const milestones = [
    { 
      year: "2023", 
      event: "Grand Pa United™ envisions global AI collaboration",
      detail: "The legendary minds come together with a shared vision" 
    },
    { 
      year: "2024", 
      event: "Cross-continental team formation",
      detail: "UAE, UK, and USA teams unite under Chaudhary Mumtaz & Sons leadership" 
    },
    { 
      year: "2024", 
      event: "First AI modules development begins",
      detail: "Emotion-aware chat and visual intelligence prototypes created" 
    },
    { 
      year: "2025", 
      event: "AI Digital Friend platform launch",
      detail: "Complete ecosystem of 8 specialized AI modules goes live" 
    },
    { 
      year: "2025", 
      event: "Community-first expansion",
      detail: "Growing globally while maintaining personal touch and human-aware design" 
    }
  ]

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
            <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500">
              <Users size={28} color="white" weight="fill" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold gradient-text">About One Last AI</h1>
          </div>
          <div className="text-lg font-semibold text-blue-400 mb-4">
            Crafted by the legendary minds of Grand Pa United™
          </div>
          <div className="text-xl text-muted-foreground mb-6">
            🇦🇪 UAE • 🇬🇧 UK • 🇺🇸 USA
          </div>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            AI Digital Friend is the result of a truly global collaboration — a visionary team born out of friendship, shared ambition, and a passion for meaningful technology. United across borders, we've combined our strengths from the UAE, UK, and USA to build something more than just a tool — <strong>a digital companion that understands and supports you</strong>.
          </p>
          <p className="text-md text-muted-foreground max-w-3xl mx-auto mt-4">
            At the heart of this project is the leadership and inspiration of <strong>Chaudhary Mumtaz & Sons</strong>, whose belief in innovation and community-first thinking shaped this journey.
          </p>
        </motion.div>

        {/* Global Team Collaboration */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Our Global Team</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {teamRegions.map((region, index) => {
              const IconComponent = region.icon
              return (
                <motion.div
                  key={region.country}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="text-center h-full">
                    <CardHeader>
                      <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 w-fit mx-auto mb-4">
                        <IconComponent size={24} color="white" />
                      </div>
                      <CardTitle className="text-xl">{region.country}</CardTitle>
                      <CardDescription className="text-sm font-medium text-blue-400">
                        {region.role}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {region.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target size={20} />
                🎯 Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                We're building smart, human-friendly AI modules — not just to impress, but to actually help real people in their day-to-day lives. Whether it's emotion-aware chat, visual intelligence, or memory-enhanced agents, every module is built with purpose and care.
              </p>
              <p className="text-muted-foreground mt-3">
                We believe that AI shouldn't be just smart — it should also be approachable, adaptive, and most importantly, human-aware.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkle size={20} />
                💡 Why AI Digital Friend?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                Because we're not chasing trends; we're designing tools that people actually need and love to use. Our approach is rooted in genuine human connection and understanding.
              </p>
              <p className="text-muted-foreground mt-3">
                Every interaction should feel natural, every feature should solve real problems, and every user should feel heard and supported.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Core Values - Updated */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="text-center">What Makes Us Different</CardTitle>
            <CardDescription className="text-center">
              Every module is built to embody these core principles
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {coreValues.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-lg border bg-card/50"
                >
                  <div className="text-2xl">{value.title.split(' ')[0]}</div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {value.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Timeline */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="text-center">Our Journey</CardTitle>
            <CardDescription className="text-center">
              The story of how legendary minds came together across continents
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {milestones.map((milestone, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="flex-shrink-0 w-16 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-sm font-bold text-white">
                    {milestone.year}
                  </div>
                  <div className="flex-grow">
                    <p className="font-medium text-foreground">{milestone.event}</p>
                    <p className="text-sm text-muted-foreground mt-1">{milestone.detail}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Modules Overview */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle>Our AI Digital Friend Ecosystem</CardTitle>
            <CardDescription>
              Eight specialized modules designed to be your comprehensive digital companion
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-lg border bg-card/50">
                <h4 className="font-semibold mb-2">💬 AI Chat</h4>
                <p className="text-sm text-muted-foreground">Emotion-aware conversations that understand context and sentiment</p>
              </div>
              <div className="p-4 rounded-lg border bg-card/50">
                <h4 className="font-semibold mb-2">👁️ Visual AI</h4>
                <p className="text-sm text-muted-foreground">Advanced image processing and visual intelligence capabilities</p>
              </div>
              <div className="p-4 rounded-lg border bg-card/50">
                <h4 className="font-semibold mb-2">🎨 Creator Tools</h4>
                <p className="text-sm text-muted-foreground">Content creation suite for creative minds and professionals</p>
              </div>
              <div className="p-4 rounded-lg border bg-card/50">
                <h4 className="font-semibold mb-2">🧠 Memory AI</h4>
                <p className="text-sm text-muted-foreground">Intelligent note-taking and knowledge management system</p>
              </div>
              <div className="p-4 rounded-lg border bg-card/50">
                <h4 className="font-semibold mb-2">😊 Mood Analyzer</h4>
                <p className="text-sm text-muted-foreground">Emotional intelligence and wellness tracking companion</p>
              </div>
              <div className="p-4 rounded-lg border bg-card/50">
                <h4 className="font-semibold mb-2">🌐 IP Tools</h4>
                <p className="text-sm text-muted-foreground">Network utilities and diagnostic tools for tech enthusiasts</p>
              </div>
              <div className="p-4 rounded-lg border bg-card/50">
                <h4 className="font-semibold mb-2">📝 Blog</h4>
                <p className="text-sm text-muted-foreground">Community insights, tutorials, and AI-powered content</p>
              </div>
              <div className="p-4 rounded-lg border bg-card/50">
                <h4 className="font-semibold mb-2">📊 Analytics</h4>
                <p className="text-sm text-muted-foreground">Platform metrics and performance monitoring dashboard</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Philosophy & Approach */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle>Our Philosophy</CardTitle>
            <CardDescription>
              Building AI that enhances human potential, not replaces it
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-blue-400">🤝 Human-First Design</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  We start with understanding human needs, emotions, and behaviors. Our AI is designed to complement and enhance human capabilities, not replace the human touch.
                </p>
                <h4 className="font-semibold mb-3 text-green-400">🌍 Global Perspective</h4>
                <p className="text-sm text-muted-foreground">
                  Our cross-continental team brings diverse perspectives, ensuring our AI understands and serves users from different cultures, backgrounds, and contexts.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-purple-400">⚡ Practical Innovation</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  We believe in innovation that solves real problems. Every feature we build addresses genuine user needs and pain points, not just technological possibilities.
                </p>
                <h4 className="font-semibold mb-3 text-orange-400">🔒 Trust & Transparency</h4>
                <p className="text-sm text-muted-foreground">
                  Built with privacy by design and transparent AI practices. Users should understand how their AI companion works and trust it with their personal data.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Technology Stack */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle>Powered by Cutting-Edge Technology</CardTitle>
            <CardDescription>
              World-class infrastructure supporting our global AI platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold mb-2 text-blue-400">🧠 AI & Machine Learning</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Advanced Neural Networks</li>
                  <li>• Natural Language Processing</li>
                  <li>• Computer Vision & Image AI</li>
                  <li>• Sentiment Analysis & Emotion Recognition</li>
                  <li>• Memory-Enhanced AI Agents</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-green-400">🏗️ Platform Technology</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Cloud-Native Architecture</li>
                  <li>• Microservices Design</li>
                  <li>• Real-time Processing</li>
                  <li>• Auto-Scaling Infrastructure</li>
                  <li>• Global CDN Distribution</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-purple-400">🔐 Security & Privacy</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• End-to-End Encryption</li>
                  <li>• GDPR & CCPA Compliance</li>
                  <li>• Zero-Trust Security Model</li>
                  <li>• Privacy by Design Principles</li>
                  <li>• Regular Security Audits</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact CTA */}
        <Card className="text-center">
          <CardHeader>
            <CardTitle>Want to Learn More?</CardTitle>
            <CardDescription>
              Get in touch with our team to discuss partnerships, careers, or general inquiries
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90"
                onClick={() => window.location.href = '/contact-us'}
              >
                Contact Us
              </Button>
              <Button 
                variant="outline"
                onClick={() => window.location.href = '/support-ticket'}
              >
                Get Support
              </Button>
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
