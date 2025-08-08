import { useState, useEffect, createContext, useContext } from 'react'

interface User {
  id: string
  email?: string
  phone?: string
  created_at?: string
  last_login_at?: string
  login_count?: number
  user_metadata?: Record<string, any>
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  signIn: (identifier: string) => Promise<void>
  signOut: () => Promise<void>
  getAuthToken: () => Promise<string | null>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const usePassageAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [passage, setPassage] = useState<any>(null)

  useEffect(() => {
    const initPassage = async () => {
      try {
        const { Passage } = await import('@passageidentity/passage-js')
        const appId = import.meta.env.VITE_PASSAGE_APP_ID
        
        if (!appId) {
          console.error('Passage App ID not configured')
          setIsLoading(false)
          return
        }

        const passageInstance = new Passage(appId)
        setPassage(passageInstance)

        // Check if user is already authenticated
        const result = await passageInstance.currentUser.userInfo()
        if (result) {
          setUser(result)
        }
      } catch (error) {
        console.error('Failed to initialize Passage:', error)
      } finally {
        setIsLoading(false)
      }
    }

    initPassage()
  }, [])

  const signIn = async (identifier: string) => {
    if (!passage) {
      throw new Error('Passage not initialized')
    }

    try {
      setIsLoading(true)
      
      // For email/phone authentication with Passage
      const authResult = await passage.auth.login(identifier)
      
      if (authResult) {
        const userData = await passage.currentUser.userInfo()
        setUser(userData)
      }
    } catch (error) {
      console.error('Sign in failed:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const signOut = async () => {
    if (!passage) {
      throw new Error('Passage not initialized')
    }

    try {
      setIsLoading(true)
      await passage.auth.signOut()
      setUser(null)
    } catch (error) {
      console.error('Sign out failed:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const getAuthToken = async (): Promise<string | null> => {
    if (!passage) {
      return null
    }

    try {
      return await passage.session.getAuthToken()
    } catch (error) {
      console.error('Failed to get auth token:', error)
      return null
    }
  }

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    signIn,
    signOut,
    getAuthToken,
    passage
  }
}

export { AuthContext }
export type { User, AuthContextType }
