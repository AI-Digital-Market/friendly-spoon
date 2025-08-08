import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function PassageTest() {
  const testPassage = async () => {
    try {
      const { Passage } = await import('@passageidentity/passage-js')
      const appId = import.meta.env.VITE_PASSAGE_APP_ID
      
      console.log('Passage App ID:', appId)
      
      if (!appId) {
        console.error('❌ Passage App ID not found!')
        return
      }
      
      const passage = new Passage(appId)
      console.log('✅ Passage initialized successfully!')
      console.log('Passage instance:', passage)
      
      // Test current user
      try {
        const user = await passage.currentUser.userInfo()
        console.log('Current user:', user)
      } catch (err) {
        console.log('No current user (expected if not logged in)')
      }
      
    } catch (error) {
      console.error('❌ Passage test failed:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-8">
      <Card className="max-w-md mx-auto bg-slate-800/50 border-slate-600">
        <CardHeader>
          <CardTitle className="text-white">Passage Integration Test</CardTitle>
          <CardDescription className="text-gray-400">
            Test Passage authentication setup
          </CardDescription>
        </CardHeader>
        
        <CardContent className="p-6">
          <Button 
            onClick={testPassage}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
          >
            Test Passage Setup
          </Button>
          
          <div className="mt-4 p-3 bg-slate-900/50 rounded-lg">
            <p className="text-xs text-gray-300">
              App ID: {import.meta.env.VITE_PASSAGE_APP_ID || 'Not configured'}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default PassageTest
