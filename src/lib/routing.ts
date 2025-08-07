// Configuration for subdomain routing and module management
export const DOMAINS = {
  MAIN: 'onelastai.com',
  BLOG: 'blog.onelastai.com',
  IP: 'ip.onelastai.com',
  CREATOR: 'creator.onelastai.com',
  CHAT: 'chat.onelastai.com',
  VISUAL: 'visual.onelastai.com',
  MOOD: 'mood.onelastai.com',
  MEMORY: 'memory.onelastai.com',
} as const

export const SUBDOMAIN_MODULES = {
  'blog': {
    title: 'AI Blog',
    description: 'Latest insights and tutorials from One Last AI',
    component: 'BlogPage'
  },
  'ip': {
    title: 'IP Tools',
    description: 'Network utilities and IP address tools',
    component: 'IPToolsPage'
  },
  'creator': {
    title: 'Creator Tools',
    description: 'AI-powered tools for content creators',
    component: 'CreatorToolsPage'
  },
  'chat': {
    title: 'AI Chat',
    description: 'Advanced conversational AI companion',
    component: 'ChatPage'
  },
  'visual': {
    title: 'Visual AI',
    description: 'Computer vision and image processing tools',
    component: 'VisualAIPage'
  },
  'mood': {
    title: 'Mood Analyzer',
    description: 'AI-powered mood detection and analysis',
    component: 'MoodAnalyzerPage'
  },
  'memory': {
    title: 'Memory AI',
    description: 'Intelligent note-taking and memory management',
    component: 'MemoryAIPage'
  },
} as const

// Utility function to detect current subdomain
export const getCurrentSubdomain = (): string | null => {
  if (typeof window === 'undefined') return null
  
  const hostname = window.location.hostname
  const parts = hostname.split('.')
  
  if (parts.length >= 3) {
    return parts[0]
  }
  
  return null
}

// Utility function to get module configuration for current subdomain
export const getCurrentModuleConfig = () => {
  const subdomain = getCurrentSubdomain()
  if (!subdomain || !(subdomain in SUBDOMAIN_MODULES)) {
    return null
  }
  
  return SUBDOMAIN_MODULES[subdomain as keyof typeof SUBDOMAIN_MODULES]
}

// Utility function to navigate to specific module
export const navigateToModule = (moduleId: string) => {
  const module = Object.entries(SUBDOMAIN_MODULES).find(([key, config]) => 
    key === moduleId || config.component.toLowerCase().includes(moduleId)
  )
  
  if (module) {
    const [subdomain] = module
    window.open(`https://${subdomain}.onelastai.com`, '_blank')
  }
}
