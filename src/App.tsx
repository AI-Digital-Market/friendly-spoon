import { useState } from 'react'
import { ParticleBackground } from '@/components/ParticleBackground'
import { Header } from '@/components/Header'
import { HomePage } from '@/components/HomePage'
import { Footer } from '@/components/Footer'
import { MoodAnalyzerPage } from '@/components/MoodAnalyzerPage'
import { PrivacyPolicyPage } from '@/components/PrivacyPolicyPage'
import { TermsConditionsPage } from '@/components/TermsConditionsPage'
import { AboutUsPage } from '@/components/AboutUsPage'
import { UpcomingModulesPage } from '@/components/UpcomingModulesPage'
import { OneLastAIModulesPage } from '@/components/OneLastAIModulesPage'
import { OneManArmyPage } from '@/components/OneManArmyPage'
import { ContactUsPage } from '@/components/ContactUsPage'
import { SupportTicketPage } from '@/components/SupportTicketPage'
import { SuggestionsPage } from '@/components/SuggestionsPage'
import { SignInPage } from '@/components/SignInPage'
import { SignUpPage } from '@/components/SignUpPage'
import { ForgotPasswordPage } from '@/components/ForgotPasswordPage'
import { ResetPasswordPage } from '@/components/ResetPasswordPage'
import { SubscriptionPage } from '@/components/SubscriptionPage'
import { CinematicPage } from '@/components/CinematicPage'
import { BlogPage } from '@/components/BlogPage'
import { MemoryPage } from '@/components/MemoryPage'
import { Toaster } from '@/components/ui/sonner'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  // Get current path to determine page
  const currentPath = window.location.pathname.toLowerCase()
  
  // Determine current page based on URL path
  let activePage = 'home'
  if (currentPath.includes('/privacy-policy')) activePage = 'privacy'
  else if (currentPath.includes('/terms-conditions')) activePage = 'terms'
  else if (currentPath.includes('/about-us')) activePage = 'about'
  else if (currentPath.includes('/upcoming-modules/onelastai')) activePage = 'onelastai'
  else if (currentPath.includes('/upcoming-modules/onemanarmy')) activePage = 'onemanarmy'
  else if (currentPath.includes('/upcoming-modules')) activePage = 'upcoming'
  else if (currentPath.includes('/contact-us')) activePage = 'contact'
  else if (currentPath.includes('/support-ticket')) activePage = 'support'
  else if (currentPath.includes('/suggestions')) activePage = 'suggestions'
  else if (currentPath.includes('/signin')) activePage = 'signin'
  else if (currentPath.includes('/signup')) activePage = 'signup'
  else if (currentPath.includes('/forgot-password')) activePage = 'forgotpassword'
  else if (currentPath.includes('/reset-password')) activePage = 'resetpassword'
  else if (currentPath.includes('/subscription')) activePage = 'subscription'
  else if (currentPage !== 'home') activePage = currentPage

  const handleModuleSelect = (moduleId: string) => {
    if (moduleId === 'mood') {
      setCurrentPage('mood')
    } else if (moduleId === 'analytics') {
      setCurrentPage('analytics')
    } else if (moduleId === 'cinematic') {
      setCurrentPage('cinematic')
    } else if (moduleId === 'blog') {
      setCurrentPage('blog')
    } else if (moduleId === 'memory') {
      setCurrentPage('memory')
    }
    // Other modules will navigate to their respective subdomains
  }

  const handleBackToHome = () => {
    setCurrentPage('home')
    window.history.pushState({}, '', '/')
  }

  const handleNavigation = (page: string) => {
    setCurrentPage(page)
    window.history.pushState({}, '', `/${page.replace(/([A-Z])/g, '-$1').toLowerCase()}`)
  }

  const handleAuthNavigation = (authPage: string) => {
    setCurrentPage(authPage)
    window.history.pushState({}, '', `/${authPage}`)
  }

  const handleSignUpFromSignIn = () => {
    setCurrentPage('signup')
    window.history.pushState({}, '', '/signup')
  }

  const handleSignInFromSignUp = () => {
    setCurrentPage('signin')
    window.history.pushState({}, '', '/signin')
  }

  const handleForgotPassword = () => {
    setCurrentPage('forgotpassword')
    window.history.pushState({}, '', '/forgot-password')
  }

  const handleResetPassword = (token?: string) => {
    setCurrentPage('resetpassword')
    window.history.pushState({}, '', `/reset-password${token ? `?token=${token}` : ''}`)
  }

  const handleSubscription = (plan?: string) => {
    setCurrentPage('subscription')
    window.history.pushState({}, '', `/subscription${plan ? `?plan=${plan}` : ''}`)
  }

  const scrollToModules = () => {
    const modulesSection = document.querySelector('#modules-section')
    if (modulesSection) {
      modulesSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Route to different pages based on activePage
  if (activePage === 'privacy') {
    return (
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <ParticleBackground />
        <Header onNavigateHome={handleBackToHome} currentPage="privacy" onNavigate={handleNavigation} onNavigateAuth={handleAuthNavigation} />
        <PrivacyPolicyPage onBack={handleBackToHome} />
        <Footer />
        <Toaster position="top-right" theme="dark" />
      </div>
    )
  }

  if (activePage === 'terms') {
    return (
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <ParticleBackground />
        <Header onNavigateHome={handleBackToHome} currentPage="terms" onNavigate={handleNavigation} onNavigateAuth={handleAuthNavigation} />
        <TermsConditionsPage onBack={handleBackToHome} />
        <Footer />
        <Toaster position="top-right" theme="dark" />
      </div>
    )
  }

  if (activePage === 'about') {
    return (
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <ParticleBackground />
        <Header onNavigateHome={handleBackToHome} currentPage="about" onNavigate={handleNavigation} onNavigateAuth={handleAuthNavigation} />
        <AboutUsPage onBack={handleBackToHome} />
        <Footer />
        <Toaster position="top-right" theme="dark" />
      </div>
    )
  }

  if (activePage === 'upcoming') {
    return (
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <ParticleBackground />
        <Header onNavigateHome={handleBackToHome} currentPage="upcoming" onNavigate={handleNavigation} onNavigateAuth={handleAuthNavigation} />
        <UpcomingModulesPage onBack={handleBackToHome} />
        <Footer />
        <Toaster position="top-right" theme="dark" />
      </div>
    )
  }

  if (activePage === 'onelastai') {
    return (
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <ParticleBackground />
        <Header onNavigateHome={handleBackToHome} currentPage="onelastai" onNavigate={handleNavigation} onNavigateAuth={handleAuthNavigation} />
        <OneLastAIModulesPage onBack={() => {
          setCurrentPage('upcoming')
          window.history.pushState({}, '', '/upcoming-modules')
        }} />
        <Footer />
        <Toaster position="top-right" theme="dark" />
      </div>
    )
  }

  if (activePage === 'onemanarmy') {
    return (
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <ParticleBackground />
        <Header onNavigateHome={handleBackToHome} currentPage="onemanarmy" onNavigate={handleNavigation} onNavigateAuth={handleAuthNavigation} />
        <OneManArmyPage onBack={() => {
          setCurrentPage('upcoming')
          window.history.pushState({}, '', '/upcoming-modules')
        }} />
        <Footer />
        <Toaster position="top-right" theme="dark" />
      </div>
    )
  }

  if (activePage === 'contact') {
    return (
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <ParticleBackground />
        <Header onNavigateHome={handleBackToHome} currentPage="contact" onNavigate={handleNavigation} onNavigateAuth={handleAuthNavigation} />
        <ContactUsPage onBack={handleBackToHome} />
        <Footer />
        <Toaster position="top-right" theme="dark" />
      </div>
    )
  }

  if (activePage === 'support') {
    return (
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <ParticleBackground />
        <Header onNavigateHome={handleBackToHome} currentPage="support" onNavigate={handleNavigation} onNavigateAuth={handleAuthNavigation} />
        <SupportTicketPage onBack={handleBackToHome} />
        <Footer />
        <Toaster position="top-right" theme="dark" />
      </div>
    )
  }

  if (activePage === 'suggestions') {
    return (
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <ParticleBackground />
        <Header onNavigateHome={handleBackToHome} currentPage="suggestions" onNavigate={handleNavigation} onNavigateAuth={handleAuthNavigation} />
        <SuggestionsPage onBack={handleBackToHome} />
        <Footer />
        <Toaster position="top-right" theme="dark" />
      </div>
    )
  }

  if (activePage === 'signin') {
    return (
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <ParticleBackground />
        <SignInPage 
          onBack={handleBackToHome}
          onNavigateSignUp={handleSignUpFromSignIn}
          onNavigateForgotPassword={handleForgotPassword}
        />
        <Toaster position="top-right" theme="dark" />
      </div>
    )
  }

  if (activePage === 'signup') {
    return (
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <ParticleBackground />
        <SignUpPage 
          onBack={handleBackToHome}
          onNavigateSignIn={handleSignInFromSignUp}
        />
        <Toaster position="top-right" theme="dark" />
      </div>
    )
  }

  if (activePage === 'forgotpassword') {
    return (
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <ParticleBackground />
        <ForgotPasswordPage 
          onBack={handleBackToHome}
          onNavigateSignIn={handleSignInFromSignUp}
        />
        <Toaster position="top-right" theme="dark" />
      </div>
    )
  }

  if (activePage === 'resetpassword') {
    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get('token')
    
    return (
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <ParticleBackground />
        <ResetPasswordPage 
          onBack={handleBackToHome}
          onNavigateSignIn={handleSignInFromSignUp}
          token={token || undefined}
        />
        <Toaster position="top-right" theme="dark" />
      </div>
    )
  }

  if (activePage === 'subscription') {
    const urlParams = new URLSearchParams(window.location.search)
    const plan = urlParams.get('plan') as 'basic' | 'premium' | 'enterprise' | undefined
    
    return (
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <ParticleBackground />
        <SubscriptionPage 
          onBack={handleBackToHome}
          selectedPlan={plan || 'premium'}
        />
        <Toaster position="top-right" theme="dark" />
      </div>
    )
  }

  if (currentPage === 'mood') {
    return (
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <ParticleBackground />
        <Header onNavigateHome={handleBackToHome} currentPage="mood" onNavigate={handleNavigation} onNavigateAuth={handleAuthNavigation} />
        <MoodAnalyzerPage onBack={handleBackToHome} />
        <Footer />
        <Toaster position="top-right" theme="dark" />
      </div>
    )
  }

  if (currentPage === 'cinematic') {
    return (
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <ParticleBackground />
        <Header onNavigateHome={handleBackToHome} currentPage="cinematic" onNavigate={handleNavigation} onNavigateAuth={handleAuthNavigation} />
        <CinematicPage onBack={handleBackToHome} />
        <Footer />
        <Toaster position="top-right" theme="dark" />
      </div>
    )
  }

  if (currentPage === 'blog') {
    return (
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <ParticleBackground />
        <Header onNavigateHome={handleBackToHome} currentPage="blog" onNavigate={handleNavigation} onNavigateAuth={handleAuthNavigation} />
        <BlogPage onBack={handleBackToHome} />
        <Footer />
        <Toaster position="top-right" theme="dark" />
      </div>
    )
  }

  if (currentPage === 'memory') {
    return (
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <ParticleBackground />
        <Header onNavigateHome={handleBackToHome} currentPage="memory" onNavigate={handleNavigation} onNavigateAuth={handleAuthNavigation} />
        <MemoryPage onBack={handleBackToHome} />
        <Footer />
        <Toaster position="top-right" theme="dark" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <ParticleBackground />
        <Header onNavigateHome={handleBackToHome} currentPage="home" onNavigate={handleNavigation} onNavigateAuth={handleAuthNavigation} />      <main className="relative z-10">
        <HomePage 
          onNavigate={handleNavigation} 
          onNavigateAuth={handleAuthNavigation}
          onNavigateSubscription={handleSubscription}
          onModuleSelect={handleModuleSelect}
        />
        <Footer />
      </main>
      
      <Toaster 
        position="top-right"
        theme="dark"
        toastOptions={{
          style: {
            background: 'oklch(0.18 0.12 240)',
            border: '1px solid oklch(0.3 0.15 240)',
            color: 'oklch(0.92 0 0)',
          }
        }}
      />
    </div>
  )
}

export default App