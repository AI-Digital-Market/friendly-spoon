import { motion } from 'framer-motion'
// Simple, icon-free version; UI kit components removed per requirement

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
      color: "from-pink-500 to-rose-500",
      category: "Relationship"
  },
    {
      id: 2,
      name: "demo-repo",
      title: "Demo Repo",
      description: "Sample codebase for HTML projects with best practices and modern development standards.",
      color: "from-blue-500 to-indigo-500",
      category: "Development"
  },
    {
      id: 3,
      name: "EmoAI",
      title: "EmoAI",
      description: "Emotionally intelligent AI assistant that understands and responds to your emotional state.",
      color: "from-purple-500 to-violet-500",
      category: "Emotional Intelligence"
  },
    {
      id: 4,
      name: "PDFMind",
      title: "PDFMind",
      description: "Smart document summarizer and analyzer for PDFs with AI-powered insights and extraction.",
      color: "from-green-500 to-emerald-500",
      category: "Productivity"
  },
    {
      id: 5,
      name: "ChatRevive",
      title: "ChatRevive",
      description: "Restores deleted or old chat histories using advanced AI recovery and reconstruction.",
      color: "from-cyan-500 to-blue-500",
      category: "Recovery"
  },
    {
      id: 6,
      name: "TokBoost",
      title: "TokBoost",
      description: "Boosts your social media engagement with AI-powered content optimization and strategies.",
      color: "from-orange-500 to-red-500",
      category: "Social Media"
  },
    {
      id: 7,
      name: "YouGen",
      title: "YouGen",
      description: "Creates personalized bio and identity profiles for social media and professional platforms.",
      color: "from-indigo-500 to-purple-500",
      category: "Personal Branding"
  },
    {
      id: 8,
      name: "AgentX",
      title: "AgentX",
      description: "Custom agent automation with human-like behavior for various digital tasks and interactions.",
      color: "from-gray-500 to-slate-500",
      category: "Automation"
  },
    {
      id: 9,
      name: "AutoChat",
      title: "AutoChat",
      description: "24/7 chatbot for any business or personal use with intelligent conversation management.",
      color: "from-teal-500 to-cyan-500",
      category: "Business"
  },
    {
      id: 10,
      name: "CVSmash",
      title: "CVSmash",
      description: "Creates high-impact CVs tailored by AI for specific job applications and industries.",
      color: "from-blue-600 to-purple-600",
      category: "Career"
  },
    {
      id: 11,
      name: "GPT-God",
      title: "GPT-God",
      description: "Advanced AI with supercharged GPT abilities for complex reasoning and problem-solving.",
      color: "from-yellow-500 to-orange-500",
      category: "AI Assistant"
  },
    {
      id: 12,
      name: "AIDoctor",
      title: "AIDoctor",
      description: "Virtual health checkups & consultations with AI-powered medical guidance and advice.",
      color: "from-green-600 to-teal-600",
      category: "Healthcare"
  },
    {
      id: 13,
      name: "AILawyer",
      title: "AILawyer",
      description: "Legal advice generator and document analyzer for various legal matters and documentation.",
      color: "from-indigo-600 to-blue-600",
      category: "Legal"
  },
    {
      id: 14,
      name: "AIRapstar",
      title: "AIRapstar",
      description: "Generate custom rap lyrics in your style with AI-powered rhythm and rhyme creation.",
      color: "from-purple-600 to-pink-600",
      category: "Music"
  },
    {
      id: 15,
      name: "AISinger",
      title: "AISinger",
      description: "AI vocalist and melody generator for creating original songs and musical compositions.",
  // icon removed
      color: "from-rose-500 to-pink-500",
      category: "Music"
    },
    {
      id: 16,
      name: "AIChef",
      title: "AIChef",
      description: "Creates recipes based on your fridge items with nutritional analysis and cooking instructions.",
      color: "from-orange-600 to-red-600",
      category: "Culinary"
  },
    {
      id: 17,
      name: "FitnessAI",
      title: "FitnessAI",
      description: "Custom gym plans and diet charts tailored to your fitness goals and dietary preferences.",
      color: "from-green-700 to-emerald-700",
      category: "Fitness"
  },
    {
      id: 18,
      name: "LoveBot",
      title: "LoveBot",
      description: "Romantic message generator & date ideas for strengthening relationships and connections.",
      color: "from-red-500 to-pink-500",
      category: "Romance"
  },
    {
      id: 19,
      name: "StockSage",
      title: "StockSage",
      description: "AI that gives you daily stock market insights with trend analysis and investment suggestions.",
      color: "from-green-500 to-blue-500",
      category: "Finance"
  },
    {
      id: 20,
      name: "CryptoWizard",
      title: "CryptoWizard",
      description: "Analyzes trends in crypto for daily trades with market predictions and portfolio optimization.",
      color: "from-orange-500 to-yellow-500",
      category: "Cryptocurrency"
  },
    {
      id: 21,
      name: "LifeCoachAI",
      title: "LifeCoachAI",
      description: "Motivational quotes & personalized guidance for personal development and goal achievement.",
      color: "from-blue-500 to-cyan-500",
      category: "Personal Development"
  },
    {
      id: 22,
      name: "StartupGenie",
      title: "StartupGenie",
      description: "Generates startup ideas with pitch decks for entrepreneurs and business innovators.",
      color: "from-purple-500 to-indigo-500",
      category: "Entrepreneurship"
  },
    {
      id: 23,
      name: "AIStylist",
      title: "AIStylist",
      description: "Outfit and fashion suggestions using AI with personalized style recommendations.",
      color: "from-pink-500 to-purple-500",
      category: "Fashion"
  },
    {
      id: 24,
      name: "EduMentor",
      title: "EduMentor",
      description: "Tutoring for school, college, and test prep with adaptive learning algorithms.",
      color: "from-blue-600 to-indigo-600",
      category: "Education"
  },
    {
      id: 25,
      name: "GameCompanion",
      title: "GameCompanion",
      description: "AI partner for online multiplayer games with strategy guidance and team coordination.",
      color: "from-green-500 to-teal-500",
      category: "Gaming"
  },
    {
      id: 26,
      name: "ResumeWizard",
      title: "ResumeWizard",
      description: "Interactive resume builder with AI-powered content optimization and formatting.",
      color: "from-indigo-500 to-blue-500",
      category: "Career"
  },
    {
      id: 27,
      name: "VoiceCloneAI",
      title: "VoiceCloneAI",
      description: "Clone your voice or celebrities' for fun with advanced voice synthesis technology.",
      color: "from-red-500 to-orange-500",
      category: "Voice Technology"
  },
    {
      id: 28,
      name: "InfluencerBoost",
      title: "InfluencerBoost",
      description: "Tools to grow followers organically with content optimization and engagement strategies.",
      color: "from-purple-600 to-pink-600",
      category: "Social Media"
  },
    {
      id: 29,
      name: "NewsGenie",
      title: "NewsGenie",
      description: "Summarizes trending news for you with personalized feeds and analysis.",
      color: "from-gray-600 to-slate-600",
      category: "News"
  },
    {
      id: 30,
      name: "BudgetBuddy",
      title: "BudgetBuddy",
      description: "Helps manage your expenses and budget with intelligent financial planning and tracking.",
      color: "from-green-600 to-emerald-600",
      category: "Finance"
  },
    {
      id: 31,
      name: "MindPeaceAI",
      title: "MindPeaceAI",
      description: "AI-led meditation and mental health tools for stress management and wellness.",
      color: "from-green-500 to-teal-500",
      category: "Mental Health"
  },
    {
      id: 32,
      name: "AIMentor",
      title: "AIMentor",
      description: "Professional career advice and resume feedback for career growth and development.",
      color: "from-blue-500 to-purple-500",
      category: "Career"
  },
    {
      id: 33,
      name: "PetTrainerAI",
      title: "PetTrainerAI",
      description: "Train your pet with AI voice commands and behavioral guidance systems.",
      color: "from-orange-500 to-red-500",
      category: "Pet Care"
  },
    {
      id: 34,
      name: "HomeDesignAI",
      title: "HomeDesignAI",
      description: "Interior design planner with 3D views and personalized decoration suggestions.",
      color: "from-indigo-500 to-purple-500",
      category: "Home Design"
  },
    {
      id: 35,
      name: "DreamDecoder",
      title: "DreamDecoder",
      description: "Interpret your dreams using AI models with psychological insights and symbolism analysis.",
      color: "from-purple-500 to-pink-500",
      category: "Psychology"
  },
    {
      id: 36,
      name: "TravelBot",
      title: "TravelBot",
      description: "Plan your trips instantly using AI with personalized itineraries and recommendations.",
      color: "from-blue-500 to-cyan-500",
      category: "Travel"
  },
    {
      id: 37,
      name: "StoryForge",
      title: "StoryForge",
      description: "AI-powered story and script writer for creative writing and content generation.",
      color: "from-orange-500 to-red-500",
      category: "Creative Writing"
  },
    {
      id: 38,
      name: "ArtMuse",
      title: "ArtMuse",
      description: "Generates digital artwork in any style with AI-powered artistic creation and customization.",
      color: "from-pink-500 to-purple-500",
      category: "Art"
  },
    {
      id: 39,
      name: "FashionFlair",
      title: "FashionFlair",
      description: "Suggests trends and outfits from Instagram with personalized fashion recommendations.",
  // icon removed
      color: "from-purple-600 to-pink-600",
      category: "Fashion"
    },
    {
      id: 40,
      name: "BizPitchAI",
      title: "BizPitchAI",
      description: "Make startup pitch decks in minutes with AI-powered presentation creation and optimization.",
      color: "from-blue-600 to-indigo-600",
      category: "Business"
  },
    {
      id: 41,
      name: "AIAgentZero",
      title: "AIAgentZero",
      description: "All-in-one personal AI assistant combining multiple AI capabilities for comprehensive support.",
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
            <div className="p-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500">
              <img src="/src/assets/images/logo.png" alt="Logo" className="h-10 w-10 rounded" />
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
              <span className="text-sm font-mono">Launch: March 2026</span>
            </div>
            <div className="flex items-center justify-center gap-2 bg-purple-500/10 rounded-lg p-3">
              <span className="text-sm">Early Adopters & Premium</span>
            </div>
            <div className="flex items-center justify-center gap-2 bg-green-500/10 rounded-lg p-3">
              <span className="text-sm">Creativity & Productivity</span>
            </div>
            <div className="flex items-center justify-center gap-2 bg-orange-500/10 rounded-lg p-3">
              <span className="text-sm">Lifestyle AI Companion</span>
            </div>
            <div className="flex items-center justify-center gap-2 bg-cyan-500/10 rounded-lg p-3 lg:col-span-2">
              <span className="text-sm font-mono">https://onelast.ai</span>
            </div>
          </div>
        </motion.div>

        {/* Categories Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <span key={category} className="px-3 py-1 rounded border border-border text-sm">
              {category}
            </span>
          ))}
        </div>

        {/* AI Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {aiModules.map((module, index) => {
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
                <div className="h-full bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm border border-border/50 hover:border-accent/50 transition-all duration-300 overflow-hidden relative rounded-xl">
                  {/* Animated Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${module.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                  <div className="pb-4 relative p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${module.color} shadow-lg group-hover:shadow-xl transition-shadow duration-300 text-white font-bold`}>AI</div>
                      <span className="text-xs rounded border border-border px-2 py-0.5">
                        {String(module.id).padStart(2, '0')}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                      {module.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {module.description}
                    </p>
                  </div>

                  <div className="pt-0 relative p-6 pt-0">
                    <div className="space-y-3">
                      <span className={`w-full inline-flex justify-center px-3 py-1 rounded border border-border bg-background/60`}>
                        {module.category}
                      </span>

                      <button 
                        className={`w-full px-4 py-2 rounded-lg bg-gradient-to-r ${module.color} text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 opacity-90 cursor-not-allowed`}
                        disabled
                      >
                        Coming Soon
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-xl">
          <div className="p-6 pb-2">
            <h3 className="text-2xl font-semibold">Join the AI Revolution</h3>
            <p className="text-base text-muted-foreground">
              Be among the first to experience the future of AI-powered lifestyle enhancement
            </p>
          </div>
          <div className="p-6 pt-2">
            <div className="max-w-md mx-auto space-y-4">
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email for early access"
                  className="flex-1 px-4 py-3 rounded-lg border border-border bg-background"
                />
                <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 text-white">
                  Get Early Access
                </button>
              </div>
              <p className="text-xs text-muted-foreground">
                🚀 March 2026 • 🔒 Premium & Early Adopters Only • 💝 41 AI Modules
              </p>
            </div>
          </div>
        </div>

        {/* Back Button */}
        {onBack && (
          <div className="text-center mt-12">
            <button onClick={onBack} className="px-6 py-3 rounded-lg border border-border hover:bg-accent/10">
              ← Back to Upcoming Modules
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
