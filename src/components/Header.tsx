import { Button } from '@/components/ui/button'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface HeaderProps {
  onNavigateHome?: () => void
  currentPage?: string
  onNavigate?: (page: string) => void
  onNavigateAuth?: (authPage: string) => void
}

export function Header({ onNavigateHome, currentPage = 'home', onNavigate, onNavigateAuth }: HeaderProps) {
  const handleLogoClick = () => {
    if (currentPage !== 'home' && onNavigateHome) {
      onNavigateHome()
    } else {
      // Navigate to main domain if on subdomain
      window.location.href = 'https://onelastai.com'
    }
  }

  const handleNavigate = (page: string) => {
    if (onNavigate) {
      onNavigate(page)
    } else {
      window.location.href = `https://onelastai.com/${page.replace(/([A-Z])/g, '-$1').toLowerCase()}`
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div 
            className="flex items-center space-x-3 cursor-pointer"
            onClick={handleLogoClick}
          >
            <img 
              src="https://avatars.githubusercontent.com/u/223208802?s=400&u=5249ef08c9d130551422585dd7d29c8330579c1a&v=4" 
              alt="One Last AI Logo" 
              className="w-8 h-8 rounded-full ring-2 ring-blue-500/50"
            />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              One Last AI
            </span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a 
              href="https://onelastai.com" 
              className="text-gray-300 hover:text-white transition-colors"
            >
              Home
            </a>
            <a 
              href="https://blog.onelastai.com" 
              className="text-gray-300 hover:text-white transition-colors"
            >
              Blog
            </a>
            <a 
              href="https://chat.onelastai.com" 
              className="text-gray-300 hover:text-white transition-colors"
            >
              Chat
            </a>
            <a 
              href="https://creator.onelastai.com" 
              className="text-gray-300 hover:text-white transition-colors"
            >
              Creator
            </a>
            
            {/* More Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                  More
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-black/90 border-white/10">
                <DropdownMenuItem onClick={() => handleNavigate('about')} className="text-gray-300 hover:text-white">
                  About Us
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleNavigate('upcoming')} className="text-gray-300 hover:text-white">
                  Upcoming Modules
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleNavigate('contact')} className="text-gray-300 hover:text-white">
                  Contact Us
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleNavigate('support')} className="text-gray-300 hover:text-white">
                  Support
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleNavigate('suggestions')} className="text-gray-300 hover:text-white">
                  💡 Suggestions
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleNavigate('privacy')} className="text-gray-300 hover:text-white">
                  Privacy Policy
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleNavigate('terms')} className="text-gray-300 hover:text-white">
                  Terms & Conditions
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Authentication Buttons */}
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm"
                className="text-gray-300 hover:text-white"
                onClick={() => onNavigateAuth?.('auth')}
              >
                Sign In
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10"
                onClick={() => onNavigateAuth?.('auth')}
              >
                Secure Auth
              </Button>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="sm"
            className="md:hidden"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </Button>
        </div>
      </div>
    </header>
  )
}
