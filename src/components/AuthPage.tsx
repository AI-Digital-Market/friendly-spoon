import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  User, Lock, Shield, CheckCircle, X, Envelope, Phone, 
  Key, ArrowRight, Eye, EyeSlash
} from '@phosphor-icons/react'
import { useAuth } from '../hooks/useAuth'

interface AuthPageProps {
  onBack?: () => void
  onAuthSuccess?: () => void
}

export function AuthPage({ onBack, onAuthSuccess }: AuthPageProps) {
  const { user, isLoading, isAuthenticated, signIn, signOut } = useAuth()
  const [identifier, setIdentifier] = useState('')
  const [isSigningIn, setIsSigningIn] = useState(false)
  const [error, setError] = useState('')
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')

  useEffect(() => {
    // If user is already authenticated, call success callback
    if (isAuthenticated && user && onAuthSuccess) {
      onAuthSuccess()
    }
  }, [isAuthenticated, user, onAuthSuccess])

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!identifier.trim()) {
      setError('Please enter your email or phone number')
      return
    }

    setIsSigningIn(true)
    setError('')

    try {
      await signIn(identifier.trim())
      
      // Success handling
      if (onAuthSuccess) {
        onAuthSuccess()
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please try again.')
    } finally {
      setIsSigningIn(false)
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (err: any) {
      setError(err.message || 'Sign out failed')
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Initializing authentication...</p>
        </div>
      </div>
    )
  }

  // If user is authenticated, show user info
  if (isAuthenticated && user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                {onBack && (
                  <Button variant="ghost" onClick={onBack} className="text-gray-300 hover:text-white">
                    <ArrowRight size={20} className="rotate-180" />
                  </Button>
                )}
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    Account Dashboard
                  </h1>
                  <p className="text-gray-400 mt-1">
                    Manage your OneLastAI account
                  </p>
                </div>
              </div>
            </div>

            {/* User Info Card */}
            <Card className="bg-slate-800/50 border-slate-600 mb-6">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <User size={20} className="text-green-400" />
                  Profile Information
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Your account details and authentication status
                </CardDescription>
              </CardHeader>
              
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Status</span>
                    <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                      <CheckCircle size={14} className="mr-1" />
                      Authenticated
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">User ID</span>
                    <span className="text-white font-mono text-sm">{user.id}</span>
                  </div>
                  
                  {user.email && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Email</span>
                      <span className="text-white">{user.email}</span>
                    </div>
                  )}
                  
                  {user.phone && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Phone</span>
                      <span className="text-white">{user.phone}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Member Since</span>
                    <span className="text-white">
                      {user.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Login Count</span>
                    <span className="text-white">{user.login_count || 0}</span>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-slate-600">
                  <Button 
                    onClick={handleSignOut}
                    variant="outline"
                    className="w-full border-red-500/30 text-red-400 hover:bg-red-500/10"
                  >
                    <Lock size={16} className="mr-2" />
                    Sign Out
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    )
  }

  // Authentication form
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              {onBack && (
                <Button variant="ghost" onClick={onBack} className="text-gray-300 hover:text-white">
                  <ArrowRight size={20} className="rotate-180" />
                </Button>
              )}
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  {mode === 'signin' ? 'Sign In' : 'Sign Up'}
                </h1>
                <p className="text-gray-400 mt-1">
                  Access your OneLastAI account
                </p>
              </div>
            </div>
          </div>

          {/* Auth Card */}
          <Card className="bg-slate-800/50 border-slate-600">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield size={20} className="text-cyan-400" />
                Secure Authentication
              </CardTitle>
              <CardDescription className="text-gray-400">
                Powered by Passage (1Password) for maximum security
              </CardDescription>
            </CardHeader>
            
            <CardContent className="p-6">
              <form onSubmit={handleAuth} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email or Phone Number
                  </label>
                  <div className="relative">
                    <Envelope size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      placeholder="Enter your email or phone"
                      className="w-full pl-10 pr-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none"
                      required
                    />
                  </div>
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-red-500/10 border border-red-500/30 rounded-lg p-3"
                  >
                    <div className="flex items-center gap-2">
                      <X size={16} className="text-red-400" />
                      <span className="text-red-300 text-sm">{error}</span>
                    </div>
                  </motion.div>
                )}

                <Button 
                  type="submit"
                  disabled={isSigningIn}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-medium py-3"
                >
                  {isSigningIn ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {mode === 'signin' ? 'Signing In...' : 'Creating Account...'}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Key size={16} />
                      {mode === 'signin' ? 'Sign In' : 'Sign Up'}
                    </div>
                  )}
                </Button>
              </form>

              <div className="mt-6 pt-6 border-t border-slate-600 text-center">
                <p className="text-gray-400 text-sm mb-3">
                  {mode === 'signin' ? "Don't have an account?" : "Already have an account?"}
                </p>
                <Button
                  variant="ghost"
                  onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
                  className="text-cyan-400 hover:text-cyan-300"
                >
                  {mode === 'signin' ? 'Create Account' : 'Sign In Instead'}
                </Button>
              </div>

              {/* Security Notice */}
              <div className="mt-6 pt-6 border-t border-slate-600">
                <div className="flex items-start gap-3 bg-slate-900/50 rounded-lg p-3">
                  <Shield size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-green-300 text-sm font-medium mb-1">
                      Enterprise-Grade Security
                    </h4>
                    <p className="text-gray-400 text-xs">
                      Your authentication is secured by Passage (1Password), featuring biometric login, 
                      passwordless authentication, and SOC2 compliance.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default AuthPage
