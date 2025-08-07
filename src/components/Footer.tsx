import { motion } from 'framer-motion'
import { 
  ChatCircle, 
  Eye, 
  PaintBrush, 
  Brain, 
  SmileySad, 
  Globe, 
  Article, 
  ChartBar,
  Heart,
  Phone,
  EnvelopeSimple,
  MapPin,
  TelegramLogo,
  User,
  FileText,
  Shield,
  Question,
  Lightbulb,
  GithubLogo
} from '@phosphor-icons/react'

export function Footer() {
  const handleNavigation = (page: string) => {
    const path = `/${page.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '')}`
    window.location.href = path
  }

  const handleAgentNavigation = (subdomain: string) => {
    window.location.href = `https://${subdomain}.onelastai.com`
  }

  const aiAgents = [
    { name: 'AI Chat', subdomain: 'chat', icon: ChatCircle, description: 'Intelligent conversations', color: 'from-blue-500 to-cyan-500' },
    { name: 'Visual AI', subdomain: 'visual', icon: Eye, description: 'Image processing', color: 'from-purple-500 to-pink-500' },
    { name: 'Creator Tools', subdomain: 'creator', icon: PaintBrush, description: 'Content creation', color: 'from-orange-500 to-red-500' },
    { name: 'Memory AI', subdomain: 'memory', icon: Brain, description: 'Knowledge management', color: 'from-green-500 to-emerald-500' },
    { name: 'Mood Analyzer', subdomain: 'mood', icon: SmileySad, description: 'Emotional intelligence', color: 'from-yellow-500 to-orange-500' },
    { name: 'IP Tools', subdomain: 'ip', icon: Globe, description: 'Network utilities', color: 'from-indigo-500 to-purple-500' },
    { name: 'Blog', subdomain: 'blog', icon: Article, description: 'Insights & tutorials', color: 'from-teal-500 to-blue-500' },
    { name: 'Analytics', subdomain: 'analytics', icon: ChartBar, description: 'Performance metrics', color: 'from-rose-500 to-pink-500' }
  ]

  const companyLinks = [
    { name: 'About Us', page: 'about-us', icon: User },
    { name: 'Upcoming Modules', page: 'upcoming-modules', icon: Brain },
    { name: 'Contact Us', page: 'contact-us', icon: Phone },
    { name: 'Support Ticket', page: 'support-ticket', icon: Question },
    { name: '💡 Suggestions', page: 'suggestions', icon: Lightbulb }
  ]

  const legalLinks = [
    { name: 'Privacy Policy', page: 'privacy-policy', icon: Shield },
    { name: 'Terms & Conditions', page: 'terms-conditions', icon: FileText }
  ]

  return (
    <footer className="relative z-10 bg-gradient-to-br from-slate-900 via-black to-slate-800 border-t border-border/20">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 animate-pulse"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.3),transparent_50%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(255,119,198,0.3),transparent_50%)]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Header Section */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-center gap-4 mb-6"
            >
              <div className="relative">
                <img 
                  src="https://avatars.githubusercontent.com/u/223208802?s=400&u=5249ef08c9d130551422585dd7d29c8330579c1a&v=4" 
                  alt="One Last AI Logo" 
                  className="w-12 h-12 rounded-full ring-4 ring-blue-500/50 shadow-lg shadow-blue-500/25"
                />
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-20 blur-lg animate-pulse"></div>
              </div>
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  One Last AI
                </h2>
                <p className="text-sm text-muted-foreground">AI Digital Friend Platform</p>
              </div>
            </motion.div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Crafted by the legendary minds of <span className="text-blue-400 font-semibold">Grand Pa United™</span>
            </p>
            <div className="text-sm text-muted-foreground mt-2">
              🇦🇪 UAE • 🇬🇧 UK • 🇺🇸 USA
            </div>
          </div>

          {/* AI Agents Grid */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              🤖 AI Digital Friend Modules
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
              {aiAgents.map((agent, index) => {
                const IconComponent = agent.icon
                return (
                  <motion.button
                    key={agent.subdomain}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAgentNavigation(agent.subdomain)}
                    className="group relative p-4 rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-border/30 hover:border-blue-500/50 transition-all duration-300"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r ${agent.color} opacity-0 group-hover:opacity-20 rounded-xl transition-opacity duration-300`}></div>
                    <div className="relative z-10">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${agent.color} w-fit mx-auto mb-2`}>
                        <IconComponent size={20} color="white" weight="fill" />
                      </div>
                      <h4 className="text-xs font-semibold text-white mb-1">{agent.name}</h4>
                      <p className="text-[10px] text-muted-foreground">{agent.description}</p>
                    </div>
                  </motion.button>
                )
              })}
            </div>
          </div>

          {/* Main Footer Grid */}
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Brand & Contact */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div>
                <h4 className="font-bold text-lg text-white mb-3">Get in Touch</h4>
                <div className="space-y-3">
                  <a 
                    href="mailto:info@onelastai.com"
                    className="flex items-center gap-3 text-muted-foreground hover:text-blue-400 transition-colors group"
                  >
                    <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 group-hover:from-blue-400 group-hover:to-cyan-400 transition-all">
                      <EnvelopeSimple size={16} color="white" />
                    </div>
                    <span className="text-sm">info@onelastai.com</span>
                  </a>
                  <a 
                    href="tel:+12137720156"
                    className="flex items-center gap-3 text-muted-foreground hover:text-green-400 transition-colors group"
                  >
                    <div className="p-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 group-hover:from-green-400 group-hover:to-emerald-400 transition-all">
                      <Phone size={16} color="white" />
                    </div>
                    <span className="text-sm">+1 (213) 772-0156</span>
                  </a>
                  <a 
                    href="https://t.me/onelastai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-muted-foreground hover:text-purple-400 transition-colors group"
                  >
                    <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 group-hover:from-purple-400 group-hover:to-pink-400 transition-all">
                      <TelegramLogo size={16} color="white" />
                    </div>
                    <span className="text-sm">@onelastai</span>
                  </a>
                  <a 
                    href="https://line.me/ti/p/@onelastai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-muted-foreground hover:text-orange-400 transition-colors group"
                  >
                    <div className="p-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 group-hover:from-orange-400 group-hover:to-red-400 transition-all">
                      <Heart size={16} color="white" />
                    </div>
                    <span className="text-sm">LINE: @onelastai</span>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Quick Access AI Modules */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-4"
            >
              <h4 className="font-bold text-lg text-white">Quick Access</h4>
              <ul className="space-y-2">
                {aiAgents.slice(0, 4).map((agent) => (
                  <li key={agent.subdomain}>
                    <button 
                      onClick={() => handleAgentNavigation(agent.subdomain)}
                      className="text-sm text-muted-foreground hover:text-white transition-colors flex items-center gap-2 group"
                    >
                      <div className={`p-1 rounded bg-gradient-to-r ${agent.color} opacity-80 group-hover:opacity-100 transition-opacity`}>
                        <agent.icon size={12} color="white" />
                      </div>
                      {agent.name}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Company */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              <h4 className="font-bold text-lg text-white">Company</h4>
              <ul className="space-y-2">
                {companyLinks.map((link) => (
                  <li key={link.page}>
                    <button 
                      onClick={() => handleNavigation(link.page)}
                      className="text-sm text-muted-foreground hover:text-white transition-colors flex items-center gap-2 group"
                    >
                      <div className="p-1 rounded bg-gradient-to-r from-slate-600 to-slate-700 group-hover:from-blue-500 group-hover:to-purple-500 transition-all">
                        <link.icon size={12} color="white" />
                      </div>
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Legal & Resources */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-4"
            >
              <h4 className="font-bold text-lg text-white">Legal & Support</h4>
              <ul className="space-y-2">
                {legalLinks.map((link) => (
                  <li key={link.page}>
                    <button 
                      onClick={() => handleNavigation(link.page)}
                      className="text-sm text-muted-foreground hover:text-white transition-colors flex items-center gap-2 group"
                    >
                      <div className="p-1 rounded bg-gradient-to-r from-slate-600 to-slate-700 group-hover:from-red-500 group-hover:to-pink-500 transition-all">
                        <link.icon size={12} color="white" />
                      </div>
                      {link.name}
                    </button>
                  </li>
                ))}
                <li>
                  <a 
                    href="mailto:support@onelastai.com" 
                    className="text-sm text-muted-foreground hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <div className="p-1 rounded bg-gradient-to-r from-slate-600 to-slate-700 group-hover:from-green-500 group-hover:to-emerald-500 transition-all">
                      <EnvelopeSimple size={12} color="white" />
                    </div>
                    Help Center
                  </a>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Social Media Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="border-t border-border/30 pt-8 mb-8"
          >
            <div className="flex justify-center items-center gap-6">
              <a 
                href="https://t.me/onelastai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative p-3 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 hover:from-blue-500 hover:to-cyan-500 transition-all duration-300"
              >
                <TelegramLogo size={20} className="text-blue-400 group-hover:text-white transition-colors" weight="fill" />
                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  Telegram
                </span>
              </a>
              <a 
                href="https://line.me/ti/p/@onelastai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative p-3 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 hover:from-green-500 hover:to-emerald-500 transition-all duration-300"
              >
                <Heart size={20} className="text-green-400 group-hover:text-white transition-colors" weight="fill" />
                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs text-green-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  LINE
                </span>
              </a>
              <a 
                href="mailto:info@onelastai.com"
                className="group relative p-3 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 hover:from-purple-500 hover:to-pink-500 transition-all duration-300"
              >
                <EnvelopeSimple size={20} className="text-purple-400 group-hover:text-white transition-colors" weight="fill" />
                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  Email
                </span>
              </a>
              <a 
                href="tel:+12137720156"
                className="group relative p-3 rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 hover:from-orange-500 hover:to-red-500 transition-all duration-300"
              >
                <Phone size={20} className="text-orange-400 group-hover:text-white transition-colors" weight="fill" />
                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs text-orange-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  Phone
                </span>
              </a>
            </div>
          </motion.div>
          
          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center space-y-2"
          >
            <div className="h-px bg-gradient-to-r from-transparent via-border/50 to-transparent mb-6"></div>
            
            {/* Developer Credits */}
            <div className="flex justify-between items-center mb-6 px-4">
              {/* Left Developer */}
              <div className="flex items-center gap-3">
                <img 
                  src="https://avatars.githubusercontent.com/u/173241551?v=4" 
                  alt="Developer" 
                  className="w-8 h-8 rounded-full ring-2 ring-blue-500/50"
                />
                <div className="flex items-center gap-2">
                  <a 
                    href="https://github.com/MY-Checkmate"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    <GithubLogo size={16} weight="fill" />
                  </a>
                  <a 
                    href="mailto:info@mycheckmate.dev"
                    className="text-gray-400 hover:text-purple-400 transition-colors"
                  >
                    📧
                  </a>
                </div>
              </div>

              {/* Center - Claude Sonnet King */}
              <div className="flex items-center gap-2">
                <span className="text-2xl">👑</span>
                <span className="text-sm font-semibold bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                  Claude Sonnet King
                </span>
              </div>

              {/* Right Developer */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <a 
                    href="mailto:dev@axeyaxe.com"
                    className="text-gray-400 hover:text-purple-400 transition-colors"
                  >
                    📧
                  </a>
                  <a 
                    href="https://github.com/1-ManArmy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    <GithubLogo size={16} weight="fill" />
                  </a>
                </div>
                <img 
                  src="https://avatars.githubusercontent.com/u/159474286?v=4" 
                  alt="Developer" 
                  className="w-8 h-8 rounded-full ring-2 ring-purple-500/50"
                />
              </div>
            </div>

            <p className="text-sm text-muted-foreground">
              &copy; 2025 <span className="text-blue-400 font-semibold">One Last AI</span> • All rights reserved
            </p>
            <p className="text-xs text-muted-foreground">
              🤖 AI Digital Friend Platform • Powered by Advanced Machine Learning • 
              <span className="text-blue-400"> Crafted by Grand Pa United™</span>
            </p>
            <p className="text-xs text-muted-foreground">
              Intelligent • Modular • Human-Friendly • Global
            </p>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  )
}