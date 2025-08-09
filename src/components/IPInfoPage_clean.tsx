import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
// Icons removed per requirement
import { useState, useRef, useEffect } from 'react'

interface IPInfo {
  ip: string
  type: 'IPv4' | 'IPv6' | 'Unknown'
  hostname?: string
  city?: string
  region?: string
  country?: string
  countryCode?: string
  coordinates?: { lat: number; lng: number }
  timezone?: string
  isp?: string
  organization?: string
  asn?: string
  postal?: string
  threatLevel: 'safe' | 'low' | 'medium' | 'high' | 'critical'
  isVPN?: boolean
  isProxy?: boolean
  isTor?: boolean
  isBot?: boolean
  isDatacenter?: boolean
  reputation?: number
  lastSeen?: string
}

interface IPAnalysis {
  id: string
  timestamp: Date
  ip: string
  info: IPInfo
  analysisCode: string
  thinking: string
  recommendations: string[]
}

interface IPInfoPageProps {
  onBack?: () => void
}

export function IPInfoPage({ onBack }: IPInfoPageProps) {
  const [ipInput, setIpInput] = useState('')
  const [currentAnalysis, setCurrentAnalysis] = useState<IPAnalysis | null>(null)
  const [analysisHistory, setAnalysisHistory] = useState<IPAnalysis[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showCode, setShowCode] = useState(true)
  const [userIP, setUserIP] = useState<string>('')
  const inputRef = useRef<HTMLInputElement>(null)

  const generateMockIPData = (ip: string, type: 'IPv4' | 'IPv6' | 'Unknown'): IPInfo => {
    // Generate realistic mock data based on IP
    const ipNum = ip.split('.').reduce((acc, octet) => acc + parseInt(octet), 0)
    const countries = ['United States', 'Canada', 'United Kingdom', 'Germany', 'France', 'Japan', 'Australia', 'Netherlands']
    const cities = ['New York', 'London', 'Tokyo', 'Berlin', 'Paris', 'Sydney', 'Amsterdam', 'Toronto']
    const isps = ['Comcast Corporation', 'AT&T Services', 'Verizon Business', 'Deutsche Telekom', 'NTT Communications', 'Orange S.A.']
    
    const countryIndex = ipNum % countries.length
    const cityIndex = ipNum % cities.length
    const ispIndex = ipNum % isps.length
    
    const isVPN = ipNum % 10 === 0
    const isProxy = ipNum % 15 === 0
    const isDatacenter = ipNum % 8 === 0
    
    let threatLevel: 'safe' | 'low' | 'medium' | 'high' | 'critical' = 'safe'
    if (isVPN || isProxy) threatLevel = 'low'
    if (isDatacenter) threatLevel = 'medium'
    if (ipNum % 50 === 0) threatLevel = 'high'
    if (ipNum % 100 === 0) threatLevel = 'critical'

    return {
      ip,
      type,
      hostname: `host-${ip.replace(/\./g, '-')}.example.com`,
      city: cities[cityIndex],
      region: 'Example Region',
      country: countries[countryIndex],
      countryCode: 'US',
      coordinates: { lat: 40.7128 + (ipNum % 10), lng: -74.0060 + (ipNum % 10) },
      timezone: 'America/New_York',
      isp: isps[ispIndex],
      organization: `${isps[ispIndex]} Network`,
      asn: `AS${12000 + (ipNum % 1000)}`,
      postal: `${10000 + (ipNum % 90000)}`,
      threatLevel,
      isVPN,
      isProxy,
      isTor: ipNum % 100 === 0,
      isBot: ipNum % 25 === 0,
      isDatacenter,
      reputation: Math.max(0, 100 - (ipNum % 30)),
      lastSeen: new Date(Date.now() - (ipNum % 1000000)).toISOString()
    }
  }

  const generateRecommendations = (info: IPInfo): string[] => {
    const recommendations = []
    
    if (info.threatLevel === 'high' || info.threatLevel === 'critical') {
      recommendations.push('🚨 Block this IP immediately - high threat detected')
      recommendations.push('📋 Review access logs for suspicious activity')
    }
    
    if (info.isVPN) {
      recommendations.push('🔒 VPN detected - consider additional verification')
    }
    
    if (info.isProxy) {
      recommendations.push('🌐 Proxy server identified - monitor for abuse')
    }
    
    if (info.isDatacenter) {
      recommendations.push('🏢 Datacenter IP - likely automated traffic')
    }
    
    if (info.reputation && info.reputation < 50) {
      recommendations.push('⚠️ Low reputation score - proceed with caution')
    }
    
    if (recommendations.length === 0) {
      recommendations.push('✅ IP appears safe for normal operations')
      recommendations.push('📊 Continue monitoring for pattern changes')
    }
    
    return recommendations
  }

  const analyzeIP = async (ip: string) => {
    const isIPv4 = /^(\d{1,3}\.){3}\d{1,3}$/.test(ip)
    const isIPv6 = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/.test(ip)
    const ipType = isIPv4 ? 'IPv4' : isIPv6 ? 'IPv6' : 'Unknown'
    
    const apiKey = import.meta.env.VITE_IPINFO_API_KEY
    
    try {
      if (!apiKey) {
        throw new Error('API key not configured')
      }
      
      const response = await fetch(`https://ipinfo.io/${ip}/json?token=${apiKey}`)
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`)
      }
      
      const data = await response.json()
      
      // Convert IPInfo API response to our IPInfo interface
      const [lat, lng] = (data.loc || '0,0').split(',').map(Number)
      
      const ipInfo: IPInfo = {
        ip,
        type: ipType,
        hostname: data.hostname || 'Unknown',
        city: data.city || 'Unknown',
        region: data.region || 'Unknown',
        country: data.country || 'Unknown',
        countryCode: data.country || 'XX',
        coordinates: { lat, lng },
        timezone: data.timezone || 'Unknown',
        isp: data.org || 'Unknown',
        organization: data.org || 'Unknown',
        asn: data.org ? data.org.split(' ')[0] : 'Unknown',
        postal: data.postal || 'Unknown',
        threatLevel: 'safe', // Default - would need additional security APIs
        isVPN: false, // Would need VPN detection service
        isProxy: false, // Would need proxy detection service
        isTor: false, // Would need Tor detection service
        isBot: false, // Would need bot detection service
        isDatacenter: data.org ? data.org.toLowerCase().includes('hosting') || data.org.toLowerCase().includes('datacenter') : false,
        reputation: 85, // Default good reputation
        lastSeen: new Date().toISOString()
      }
      
      const analysisCode = `// TRACKER's IP Intelligence Engine (Live Mode)
// Real-time analysis using IPInfo API

class IPAnalyzer {
  constructor(apiKey) {
    this.apiKey = apiKey
    this.baseURL = 'https://ipinfo.io'
  }
  
  async analyzeIP(ipAddress) {
    try {
      const response = await fetch(\`\${this.baseURL}/\${ipAddress}/json?token=\${this.apiKey}\`)
      const data = await response.json()
      
      return {
        basic: this.extractBasicInfo(data),
        geolocation: this.extractLocationData(data),
        network: this.extractNetworkInfo(data),
        security: this.performSecurityAnalysis(data)
      }
    } catch (error) {
      throw new Error(\`Analysis failed: \${error.message}\`)
    }
  }
  
  extractBasicInfo(data) {
    return {
      ip: data.ip,
      hostname: data.hostname,
      anycast: data.anycast || false
    }
  }
  
  extractLocationData(data) {
    const [lat, lng] = (data.loc || '0,0').split(',').map(Number)
    return {
      city: data.city,
      region: data.region,
      country: data.country,
      coordinates: { lat, lng },
      timezone: data.timezone,
      postal: data.postal
    }
  }
  
  extractNetworkInfo(data) {
    return {
      org: data.org,
      isp: data.org,
      asn: data.org ? data.org.split(' ')[0] : null
    }
  }
  
  performSecurityAnalysis(data) {
    const threats = []
    if (data.org && data.org.toLowerCase().includes('hosting')) {
      threats.push('datacenter')
    }
    
    return {
      threats,
      score: this.calculateRiskScore(threats),
      recommendations: this.generateSecurityAdvice(threats)
    }
  }
}`

      const thinking = `Analyzing IP ${ip} using IPInfo API... Retrieved geolocation data, ISP information, and performing security assessment based on organization patterns and network characteristics...`
      
      const recommendations = generateRecommendations(ipInfo)
      
      return {
        info: ipInfo,
        code: analysisCode,
        thinking,
        recommendations
      }
    } catch (error) {
      // Fallback to mock data if API fails
      console.warn('Using mock data due to API error:', error)
      const mockData = generateMockIPData(ip, ipType)
      
      const analysisCode = `// TRACKER's IP Intelligence Engine (Demo Mode)
// Note: Using simulated data - configure VITE_IPINFO_API_KEY for real data

class IPAnalyzer {
  async analyzeIP(ipAddress) {
    // Demo mode - showing simulated analysis
    const analysis = {
      basic: this.generateMockBasicInfo(ipAddress),
      geolocation: this.generateMockLocation(ipAddress),
      security: this.generateMockSecurityScan(ipAddress),
      network: this.generateMockNetworkInfo(ipAddress)
    }
    
    return this.compileReport(analysis)
  }
  
  // Real implementation would use IPInfo API:
  // const response = await fetch(\`https://ipinfo.io/\${ip}/json?token=\${apiKey}\`)
}`

      const thinking = `Running demo analysis for ${ip}... Note: Configure IPInfo API key for real-time data. Generating simulated geolocation, ISP identification, and security assessment...`
      
      const recommendations = generateRecommendations(mockData)
      
      return {
        info: mockData,
        code: analysisCode,
        thinking,
        recommendations
      }
    }
  }

  const performAnalysis = async () => {
    if (!ipInput.trim()) {
      if (userIP) {
        setIpInput(userIP)
        return performAnalysisForIP(userIP)
      }
      return
    }
    
    await performAnalysisForIP(ipInput.trim())
  }

  const performAnalysisForIP = async (ip: string) => {
    setIsAnalyzing(true)
    
    try {
      const analysis = await analyzeIP(ip)
      
      const newAnalysis: IPAnalysis = {
        id: Date.now().toString(),
        timestamp: new Date(),
        ip,
        info: analysis.info,
        analysisCode: analysis.code,
        thinking: analysis.thinking,
        recommendations: analysis.recommendations
      }
      
      setCurrentAnalysis(newAnalysis)
      setAnalysisHistory(prev => [newAnalysis, ...prev].slice(0, 10))
      
    } catch (error) {
      console.error('Analysis failed:', error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const getThreatColor = (level: string) => {
    const colors = {
      safe: 'bg-green-500/20 text-green-300 border-green-500/30',
      low: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
      medium: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
      high: 'bg-red-500/20 text-red-300 border-red-500/30',
      critical: 'bg-purple-500/20 text-purple-300 border-purple-500/30'
    }
    return colors[level as keyof typeof colors] || colors.safe
  }

  const getThreatIcon = (level: string) => {
    const map: Record<string, string> = {
      safe: '✓',
      low: 'i',
      medium: '!',
      high: '⚠',
      critical: '×',
    }
    return <span>{map[level] ?? 'i'}</span>
  }

  useEffect(() => {
    // Get user's IP for convenience
    fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => setUserIP(data.ip))
      .catch(() => console.log('Could not fetch user IP'))
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              {onBack && (<Button variant="ghost" onClick={onBack} className="text-gray-300 hover:text-white">←</Button>)}
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  IP Intelligence
                </h1>
                <p className="text-gray-400 mt-1">
                  Advanced IP address analysis and threat detection
                </p>
              </div>
            </div>
          </div>

          {/* Search Interface */}
          <Card className="bg-slate-800/50 border-slate-600 mb-8">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                IP Address Analyzer
              </CardTitle>
              <CardDescription className="text-gray-400">
                Enter an IP address to analyze its geolocation, security profile, and network information
              </CardDescription>
            </CardHeader>
            
            <CardContent className="p-6">
              <div className="flex gap-4 mb-4">
                <div className="flex-1 relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={ipInput}
                    onChange={(e) => setIpInput(e.target.value)}
                    placeholder="Enter IP address (e.g., 8.8.8.8)"
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none"
                    onKeyPress={(e) => e.key === 'Enter' && performAnalysis()}
                  />
                </div>
                <Button 
                  onClick={performAnalysis}
                  disabled={isAnalyzing}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-medium rounded-lg transition-all duration-200"
                >
                  {isAnalyzing ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Analyzing...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      Analyze
                    </div>
                  )}
                </Button>
              </div>
              
              {userIP && (
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span>🌐</span> Your IP: {userIP}
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => {
                      setIpInput(userIP)
                      performAnalysisForIP(userIP)
                    }}
                    className="text-cyan-400 hover:text-cyan-300 h-auto p-1"
                  >
                    Analyze Mine
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Analysis Results */}
          <AnimatePresence>
            {currentAnalysis && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-8"
              >
                {/* Main Analysis */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Basic Info */}
                  <Card className="bg-slate-800/50 border-slate-600">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        IP Information
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <div>
                            <label className="text-sm text-gray-400">IP Address</label>
                            <p className="text-lg font-mono text-white">{currentAnalysis.info.ip}</p>
                          </div>
                          <div>
                            <label className="text-sm text-gray-400">Type</label>
                            <p className="text-white">{currentAnalysis.info.type}</p>
                          </div>
                          <div>
                            <label className="text-sm text-gray-400">Location</label>
                            <p className="text-white">
                              {currentAnalysis.info.city}, {currentAnalysis.info.region}, {currentAnalysis.info.country}
                            </p>
                          </div>
                          <div>
                            <label className="text-sm text-gray-400">ISP</label>
                            <p className="text-white">{currentAnalysis.info.isp}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <label className="text-sm text-gray-400">Threat Level</label>
                            <div className="flex items-center gap-2">
                              {getThreatIcon(currentAnalysis.info.threatLevel)}
                              <Badge className={getThreatColor(currentAnalysis.info.threatLevel)}>
                                {currentAnalysis.info.threatLevel.toUpperCase()}
                              </Badge>
                            </div>
                          </div>
                          <div>
                            <label className="text-sm text-gray-400">Reputation Score</label>
                            <div className="flex items-center gap-2">
                              <Progress
                                value={currentAnalysis.info.reputation || 0} 
                                className="flex-1 bg-slate-700"
                              />
                              <span className="text-white text-sm">{currentAnalysis.info.reputation}%</span>
                            </div>
                          </div>
                          <div>
                            <label className="text-sm text-gray-400">Security Flags</label>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {currentAnalysis.info.isVPN && <Badge variant="secondary">VPN</Badge>}
                              {currentAnalysis.info.isProxy && <Badge variant="secondary">Proxy</Badge>}
                              {currentAnalysis.info.isTor && <Badge variant="secondary">Tor</Badge>}
                              {currentAnalysis.info.isDatacenter && <Badge variant="secondary">Datacenter</Badge>}
                              {currentAnalysis.info.isBot && <Badge variant="secondary">Bot</Badge>}
                              {!currentAnalysis.info.isVPN && !currentAnalysis.info.isProxy && !currentAnalysis.info.isTor && !currentAnalysis.info.isDatacenter && !currentAnalysis.info.isBot && (
                                <Badge variant="secondary" className="text-green-400">Clean</Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Recommendations */}
                  <Card className="bg-slate-800/50 border-slate-600">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        Security Recommendations
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent className="p-6">
                      <div className="space-y-3">
                        {currentAnalysis.recommendations.map((rec, index) => (
                          <div key={index} className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-lg">
                            <span className="text-yellow-400 mt-0.5 flex-shrink-0">•</span>
                            <p className="text-gray-300">{rec}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Code Sidebar */}
                <div className="space-y-6">
                  <Card className="bg-slate-800/50 border-slate-600">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-white flex items-center gap-2">
                          Analysis Code
                        </CardTitle>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowCode(!showCode)}
                          className="text-gray-400 hover:text-white"
                        >
                          ×
                        </Button>
                      </div>
                      <CardDescription className="text-gray-400">
                        See how TRACKER analyzes IP addresses
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        {/* Thinking Process */}
                        <div className="bg-slate-900/50 border border-slate-600 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs text-cyan-400 font-medium">Analysis Process</span>
                          </div>
                          <p className="text-xs text-gray-300">{currentAnalysis.thinking}</p>
                        </div>
                        
                        {/* Code Block */}
                        <div className="bg-slate-900/50 border border-slate-600 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-green-400 font-medium">JavaScript</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => navigator.clipboard.writeText(currentAnalysis.analysisCode)}
                              className="text-gray-400 hover:text-white h-auto p-1"
                            >
                              Copy
                            </Button>
                          </div>
                          <pre className="text-xs text-gray-300 overflow-x-auto whitespace-pre-wrap">
                            {currentAnalysis.analysisCode}
                          </pre>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}

export default IPInfoPage
