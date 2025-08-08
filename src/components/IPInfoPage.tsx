import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { 
  MagnifyingGlass, Globe, MapPin, Shield, Warning, CheckCircle, 
  Code, Lightning, Copy, Download, Share, Info, 
  DesktopTower, WifiHigh, Buildings, Flag, Clock,
  Eye, Lock, X, ArrowRight, Sparkle
} from '@phosphor-icons/react'
import { useState, useRef, useEffect } from 'react'

interface IPInfo {
  ip: string
  type: 'IPv4' | 'IPv6'
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

  // Get user's IP on component mount
  useEffect(() => {
    // Simulate getting user's IP (in real app, you'd call an API)
    const simulatedUserIP = '203.0.113.45'
    setUserIP(simulatedUserIP)
  }, [])

  // Comprehensive IP Analysis Engine
  const analyzeIP = async (ip: string): Promise<{ info: IPInfo; code: string; thinking: string; recommendations: string[] }> => {
    // Validate IP format
    const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
    const ipv6Regex = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/
    
    let ipType: 'IPv4' | 'IPv6' = 'IPv4'
    if (!ipv4Regex.test(ip)) {
      if (ipv6Regex.test(ip)) {
        ipType = 'IPv6'
      } else {
        throw new Error('Invalid IP address format')
      }
    }

    // Simulate comprehensive IP analysis (in real app, you'd call multiple APIs)
    const mockData = generateMockIPData(ip, ipType)
    
    const analysisCode = `// TRACKER's IP Intelligence Engine
class IPAnalyzer {
  async analyzeIP(ipAddress) {
    const analysis = {
      basic: await this.getBasicInfo(ipAddress),
      geolocation: await this.getGeolocation(ipAddress),
      security: await this.securityScan(ipAddress),
      network: await this.networkAnalysis(ipAddress),
      reputation: await this.reputationCheck(ipAddress)
    }
    
    return this.compileReport(analysis)
  }
  
  async securityScan(ip) {
    const threats = await Promise.all([
      this.checkVPN(ip),
      this.checkProxy(ip),
      this.checkTorExit(ip),
      this.checkBotnet(ip),
      this.checkMalware(ip),
      this.checkDatacenter(ip)
    ])
    
    return {
      threatLevel: this.calculateThreatLevel(threats),
      vulnerabilities: this.identifyVulnerabilities(threats),
      recommendations: this.generateSecurityAdvice(threats)
    }
  }
  
  compileReport(analysis) {
    return {
      summary: this.createSummary(analysis),
      details: this.formatDetails(analysis),
      visualization: this.createMap(analysis.geolocation),
      alerts: this.generateAlerts(analysis.security)
    }
  }
}`

    const thinking = `Initiating deep IP analysis for ${ip}... Running geolocation lookup, ISP identification, security threat assessment, VPN/Proxy detection, reputation scoring, and network topology analysis...`
    
    const recommendations = generateRecommendations(mockData)
    
    return {
      info: mockData,
      code: analysisCode,
      thinking,
      recommendations
    }
  }

  const generateMockIPData = (ip: string, type: 'IPv4' | 'IPv6'): IPInfo => {
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

  const performAnalysis = async () => {
    if (!ipInput.trim()) {
      // Use user's IP if no input provided
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
    switch (level) {
      case 'safe': return <CheckCircle size={16} className="text-green-400" />
      case 'low': return <Info size={16} className="text-yellow-400" />
      case 'medium': return <Warning size={16} className="text-orange-400" />
      case 'high': return <Warning size={16} className="text-red-400" />
      case 'critical': return <X size={16} className="text-purple-400" />
      default: return <CheckCircle size={16} className="text-green-400" />
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20" />
        <div className="container mx-auto px-4 py-16 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            {/* Agent Logo & Name */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="relative"
              >
                <img 
                  src="https://avatars.githubusercontent.com/u/223208802?s=400&u=5249ef08c9d130551422585dd7d29c8330579c1a&v=4" 
                  alt="One Last AI Logo" 
                  className="w-16 h-16 rounded-full ring-4 ring-cyan-500/50 shadow-2xl shadow-cyan-500/25"
                />
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full opacity-20 blur-lg animate-pulse"></div>
                <motion.div 
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-2 -right-2"
                >
                  <Eye size={16} className="text-cyan-400" weight="fill" />
                </motion.div>
              </motion.div>
              <div>
                <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  TRACKER
                </h1>
                <p className="text-lg text-gray-300">IP Intelligence & Security Analysis</p>
              </div>
            </div>

            {/* Hero Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="max-w-3xl mx-auto mb-8"
            >
              <p className="text-xl text-gray-300 mb-4">
                Comprehensive IP address intelligence with geolocation, ISP details, security analysis, 
                and threat detection. Get detailed insights about any IP address instantly! 🌍
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Badge variant="secondary" className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30">
                  <Globe className="w-4 h-4 mr-1" />
                  Geolocation
                </Badge>
                <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                  <Shield className="w-4 h-4 mr-1" />
                  Security Scan
                </Badge>
                <Badge variant="secondary" className="bg-green-500/20 text-green-300 border-green-500/30">
                  <WifiHigh className="w-4 h-4 mr-1" />
                  ISP Detection
                </Badge>
                <Badge variant="secondary" className="bg-orange-500/20 text-orange-300 border-orange-500/30">
                  <Code className="w-4 h-4 mr-1" />
                  API Ready
                </Badge>
              </div>
            </motion.div>

            {/* Quick User IP Display */}
            {userIP && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="mb-8"
              >
                <Card className="inline-block bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                  <CardContent className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Eye size={20} className="text-cyan-400" />
                      <div className="text-left">
                        <p className="text-sm text-gray-400">Your IP Address</p>
                        <p className="text-lg font-mono text-white">{userIP}</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setIpInput(userIP)
                          performAnalysisForIP(userIP)
                        }}
                        className="border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10"
                      >
                        Analyze
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Main IP Analysis Interface */}
      <div className="container mx-auto px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          
          {/* IP Input Section */}
          <div className="mb-8">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <MagnifyingGlass size={20} className="text-cyan-400" />
                  IP Address Lookup
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Enter any IPv4 or IPv6 address to get comprehensive analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <input
                      ref={inputRef}
                      type="text"
                      value={ipInput}
                      onChange={(e) => setIpInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && !isAnalyzing && performAnalysis()}
                      placeholder="Enter IP address (e.g., 8.8.8.8 or 2001:4860:4860::8888)"
                      className="w-full px-4 py-3 rounded-xl border border-slate-600 bg-slate-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent font-mono"
                      disabled={isAnalyzing}
                    />
                  </div>
                  
                  <Button
                    onClick={performAnalysis}
                    disabled={isAnalyzing}
                    className="px-8 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white border-0"
                  >
                    {isAnalyzing ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Analyzing
                      </div>
                    ) : (
                      <>
                        <MagnifyingGlass size={20} className="mr-2" />
                        Analyze
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Analysis Results */}
          {currentAnalysis && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Main Results */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* IP Overview */}
                <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2 text-white">
                        <Globe size={20} className="text-cyan-400" />
                        IP Overview
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className={getThreatColor(currentAnalysis.info.threatLevel)}>
                          {getThreatIcon(currentAnalysis.info.threatLevel)}
                          {currentAnalysis.info.threatLevel.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm text-gray-400">IP Address</label>
                          <div className="flex items-center gap-2 mt-1">
                            <p className="text-lg font-mono text-white">{currentAnalysis.info.ip}</p>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyToClipboard(currentAnalysis.info.ip)}
                              className="h-6 px-2 text-gray-400 hover:text-white"
                            >
                              <Copy size={12} />
                            </Button>
                          </div>
                        </div>
                        
                        <div>
                          <label className="text-sm text-gray-400">Type</label>
                          <p className="text-white mt-1">{currentAnalysis.info.type}</p>
                        </div>
                        
                        {currentAnalysis.info.hostname && (
                          <div>
                            <label className="text-sm text-gray-400">Hostname</label>
                            <p className="text-white mt-1 font-mono text-sm break-all">{currentAnalysis.info.hostname}</p>
                          </div>
                        )}
                        
                        <div>
                          <label className="text-sm text-gray-400">Reputation Score</label>
                          <div className="mt-1">
                            <div className="flex items-center gap-2">
                              <Progress value={currentAnalysis.info.reputation || 0} className="flex-1" />
                              <span className="text-white text-sm">{currentAnalysis.info.reputation || 0}/100</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm text-gray-400">Location</label>
                          <div className="flex items-center gap-2 mt-1">
                            <MapPin size={16} className="text-cyan-400" />
                            <p className="text-white">
                              {currentAnalysis.info.city}, {currentAnalysis.info.region}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <Flag size={16} className="text-cyan-400" />
                            <p className="text-white">{currentAnalysis.info.country}</p>
                          </div>
                        </div>
                        
                        <div>
                          <label className="text-sm text-gray-400">ISP</label>
                          <div className="flex items-center gap-2 mt-1">
                            <WifiHigh size={16} className="text-cyan-400" />
                            <p className="text-white">{currentAnalysis.info.isp}</p>
                          </div>
                        </div>
                        
                        <div>
                          <label className="text-sm text-gray-400">Organization</label>
                          <div className="flex items-center gap-2 mt-1">
                            <Buildings size={16} className="text-cyan-400" />
                            <p className="text-white">{currentAnalysis.info.organization}</p>
                          </div>
                        </div>
                        
                        {currentAnalysis.info.timezone && (
                          <div>
                            <label className="text-sm text-gray-400">Timezone</label>
                            <div className="flex items-center gap-2 mt-1">
                              <Clock size={16} className="text-cyan-400" />
                              <p className="text-white">{currentAnalysis.info.timezone}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Security Analysis */}
                <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                      <Shield size={20} className="text-cyan-400" />
                      Security Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                      <div className={`p-3 rounded-lg border ${currentAnalysis.info.isVPN ? 'bg-orange-500/10 border-orange-500/30' : 'bg-green-500/10 border-green-500/30'}`}>
                        <div className="flex items-center gap-2">
                          <Lock size={16} className={currentAnalysis.info.isVPN ? "text-orange-400" : "text-green-400"} />
                          <span className="text-sm text-gray-300">VPN</span>
                        </div>
                        <p className={`text-sm mt-1 ${currentAnalysis.info.isVPN ? 'text-orange-300' : 'text-green-300'}`}>
                          {currentAnalysis.info.isVPN ? 'Detected' : 'Not detected'}
                        </p>
                      </div>
                      
                      <div className={`p-3 rounded-lg border ${currentAnalysis.info.isProxy ? 'bg-orange-500/10 border-orange-500/30' : 'bg-green-500/10 border-green-500/30'}`}>
                        <div className="flex items-center gap-2">
                          <Globe size={16} className={currentAnalysis.info.isProxy ? "text-orange-400" : "text-green-400"} />
                          <span className="text-sm text-gray-300">Proxy</span>
                        </div>
                        <p className={`text-sm mt-1 ${currentAnalysis.info.isProxy ? 'text-orange-300' : 'text-green-300'}`}>
                          {currentAnalysis.info.isProxy ? 'Detected' : 'Not detected'}
                        </p>
                      </div>
                      
                      <div className={`p-3 rounded-lg border ${currentAnalysis.info.isTor ? 'bg-red-500/10 border-red-500/30' : 'bg-green-500/10 border-green-500/30'}`}>
                        <div className="flex items-center gap-2">
                          <Eye size={16} className={currentAnalysis.info.isTor ? "text-red-400" : "text-green-400"} />
                          <span className="text-sm text-gray-300">Tor</span>
                        </div>
                        <p className={`text-sm mt-1 ${currentAnalysis.info.isTor ? 'text-red-300' : 'text-green-300'}`}>
                          {currentAnalysis.info.isTor ? 'Exit node' : 'Not detected'}
                        </p>
                      </div>
                      
                      <div className={`p-3 rounded-lg border ${currentAnalysis.info.isBot ? 'bg-yellow-500/10 border-yellow-500/30' : 'bg-green-500/10 border-green-500/30'}`}>
                        <div className="flex items-center gap-2">
                          <DesktopTower size={16} className={currentAnalysis.info.isBot ? "text-yellow-400" : "text-green-400"} />
                          <span className="text-sm text-gray-300">Bot</span>
                        </div>
                        <p className={`text-sm mt-1 ${currentAnalysis.info.isBot ? 'text-yellow-300' : 'text-green-300'}`}>
                          {currentAnalysis.info.isBot ? 'Detected' : 'Not detected'}
                        </p>
                      </div>
                      
                      <div className={`p-3 rounded-lg border ${currentAnalysis.info.isDatacenter ? 'bg-blue-500/10 border-blue-500/30' : 'bg-green-500/10 border-green-500/30'}`}>
                        <div className="flex items-center gap-2">
                          <Buildings size={16} className={currentAnalysis.info.isDatacenter ? "text-blue-400" : "text-green-400"} />
                          <span className="text-sm text-gray-300">Datacenter</span>
                        </div>
                        <p className={`text-sm mt-1 ${currentAnalysis.info.isDatacenter ? 'text-blue-300' : 'text-green-300'}`}>
                          {currentAnalysis.info.isDatacenter ? 'Hosting' : 'Residential'}
                        </p>
                      </div>
                    </div>
                    
                    {/* Recommendations */}
                    <div>
                      <h4 className="text-sm font-medium text-cyan-400 mb-3">Security Recommendations</h4>
                      <div className="space-y-2">
                        {currentAnalysis.recommendations.map((rec, index) => (
                          <div key={index} className="flex items-start gap-2 p-2 bg-slate-900/30 rounded">
                            <ArrowRight size={14} className="text-cyan-400 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-300">{rec}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Code Analysis */}
              <div className="lg:col-span-1">
                {showCode && (
                  <Card className="h-fit bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                    <CardHeader className="border-b border-slate-700">
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2 text-white">
                          <Code size={20} className="text-green-400" />
                          Analysis Engine
                        </CardTitle>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowCode(!showCode)}
                          className="text-gray-400 hover:text-white"
                        >
                          <X size={16} />
                        </Button>
                      </div>
                      <CardDescription className="text-gray-400">
                        See how TRACKER analyzes IP addresses
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="p-6">
                      <Tabs defaultValue="current" className="h-full">
                        <TabsList className="grid w-full grid-cols-2 bg-slate-900/50">
                          <TabsTrigger value="current" className="text-gray-300">Current</TabsTrigger>
                          <TabsTrigger value="history" className="text-gray-300">History</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="current" className="mt-4">
                          <div className="space-y-4">
                            {/* Thinking Process */}
                            <div className="bg-slate-900/50 border border-slate-600 rounded-lg p-3">
                              <div className="flex items-center gap-2 mb-2">
                                <Lightning size={14} className="text-cyan-400" />
                                <span className="text-xs text-cyan-400 font-medium">Analysis Process</span>
                              </div>
                              <p className="text-xs text-gray-400 italic">{currentAnalysis.thinking}</p>
                            </div>
                            
                            {/* Code Example */}
                            <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-600">
                              <div className="flex items-center justify-between mb-3">
                                <span className="text-sm font-medium text-green-400">Live Code</span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => copyToClipboard(currentAnalysis.analysisCode)}
                                  className="h-6 px-2 text-xs text-gray-400 hover:text-white"
                                >
                                  <Copy size={12} className="mr-1" />
                                  Copy
                                </Button>
                              </div>
                              <pre className="text-xs text-gray-300 overflow-x-auto whitespace-pre-wrap max-h-96 overflow-y-auto">
                                <code>{currentAnalysis.analysisCode}</code>
                              </pre>
                            </div>
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="history" className="mt-4">
                          <div className="space-y-3">
                            <h4 className="text-sm font-medium text-cyan-400">Recent Analyses</h4>
                            {analysisHistory.slice(0, 5).map((analysis) => (
                              <div key={analysis.id} className="bg-slate-900/30 rounded p-3 border border-slate-700">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-sm font-mono text-white">{analysis.ip}</span>
                                  <Badge variant="secondary" className={`text-xs ${getThreatColor(analysis.info.threatLevel)}`}>
                                    {analysis.info.threatLevel}
                                  </Badge>
                                </div>
                                <p className="text-xs text-gray-400">{analysis.timestamp.toLocaleString()}</p>
                                <p className="text-xs text-gray-400 mt-1">{analysis.info.city}, {analysis.info.country}</p>
                              </div>
                            ))}
                          </div>
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          )}

          {/* Show Code Toggle for Mobile */}
          {!showCode && currentAnalysis && (
            <div className="mt-6 text-center">
              <Button
                variant="outline"
                onClick={() => setShowCode(true)}
                className="border-slate-600 text-gray-300 hover:bg-slate-800"
              >
                <Code size={16} className="mr-2" />
                Show Analysis Engine
              </Button>
            </div>
          )}
        </div>

        {/* Back Button */}
        {onBack && (
          <div className="text-center mt-8">
            <Button onClick={onBack} variant="outline" className="border-slate-600 text-gray-300 hover:bg-slate-800">
              ← Back to Home
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
