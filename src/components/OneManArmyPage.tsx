import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Skull, 
  Calendar, 
  Lock, 
  Target, 
  Globe, 
  Link,
  Shield,
  Bug,
  Eye,
  Crosshair,
  Detective,
  Sword,
  Binoculars,
  FingerprintSimple,
  Router,
  Key,
  Ghost,
  Lightning,
  Spider,
  Database,
  Terminal,
  Virus,
  Warning,
  Processor,
  Fire,
  Knife,
  Radioactive,
  Atom,
  Alien,
  Nuclear,
  Skull as SkullIcon,
  ShieldWarning,
  Password,
  Envelope,
  FileX,
  MouseSimple,
  Usb,
  CloudArrowDown,
  CircuitBoard,
  Worm,
  UserX,
  HandGrabbing,
  Fish,
  Timer,
  Keyhole,
  EyeSlash,
  MagnifyingGlass
} from '@phosphor-icons/react'

interface OneManArmyPageProps {
  onBack?: () => void
}

export function OneManArmyPage({ onBack }: OneManArmyPageProps) {
  const cyberModules = [
    {
      id: 1,
      name: "ai_giant_sniffer",
      title: "AI Giant Sniffer",
      description: "Advanced AI-powered packet sniffer for deep traffic inspection and network analysis.",
      icon: Eye,
      color: "from-red-500 to-orange-500",
      category: "Network Analysis"
    },
    {
      id: 2,
      name: "antiforensicai",
      title: "AntiForensicAI",
      description: "Removes digital footprints and evades forensic tools for testing detection capabilities.",
      icon: EyeSlash,
      color: "from-gray-500 to-slate-500",
      category: "Anti-Forensics"
    },
    {
      id: 3,
      name: "blackmamba",
      title: "Black Mamba",
      description: "Stealth payload injector using encrypted delivery mechanisms for penetration testing.",
      icon: Knife,
      color: "from-black to-gray-600",
      category: "Payload Injection"
    },
    {
      id: 4,
      name: "black_sea_leviathan",
      title: "Black Sea Leviathan",
      description: "Dark web reconnaissance and monitoring bot for threat intelligence gathering.",
      icon: Alien,
      color: "from-indigo-600 to-purple-600",
      category: "Dark Web Intel"
    },
    {
      id: 5,
      name: "bruteforcex",
      title: "BruteForceX",
      description: "Automated AI-based brute-force login attack tester for security assessment.",
      icon: Lightning,
      color: "from-yellow-500 to-orange-500",
      category: "Authentication Testing"
    },
    {
      id: 6,
      name: "c2relay",
      title: "C2 Relay",
      description: "Command & Control relay module for red-team emulation and testing.",
      icon: Router,
      color: "from-blue-600 to-indigo-600",
      category: "Command & Control"
    },
    {
      id: 7,
      name: "c2sim",
      title: "C2 Simulator",
      description: "Simulates full C2 server behaviors for test environments and training.",
      icon: Terminal,
      color: "from-green-600 to-teal-600",
      category: "Command & Control"
    },
    {
      id: 8,
      name: "cyber_detective_cid",
      title: "Cyber Detective CID",
      description: "AI agent to trace cyber footprints and analyze Criminal Investigation Department data.",
      icon: Detective,
      color: "from-purple-500 to-violet-500",
      category: "Digital Forensics"
    },
    {
      id: 9,
      name: "cyber_intelligence_detective",
      title: "Cyber Intelligence Detective",
      description: "Collects and correlates cyber intelligence feeds for threat analysis.",
      icon: MagnifyingGlass,
      color: "from-cyan-500 to-blue-500",
      category: "Threat Intelligence"
    },
    {
      id: 10,
      name: "enhanced_auto_hunter",
      title: "Enhanced Auto Hunter",
      description: "Detects vulnerabilities in live targets autonomously using AI-driven scanning.",
      icon: Crosshair,
      color: "from-red-600 to-pink-600",
      category: "Vulnerability Scanning"
    },
    {
      id: 11,
      name: "formsnatchai",
      title: "FormSnatchAI",
      description: "Captures form input data for simulation and security analysis purposes.",
      icon: HandGrabbing,
      color: "from-orange-500 to-red-500",
      category: "Data Capture"
    },
    {
      id: 12,
      name: "fxinterceptorai",
      title: "FX InterceptorAI",
      description: "Intercepts API and JS-based data exfiltration for security testing.",
      icon: Shield,
      color: "from-blue-500 to-purple-500",
      category: "API Security"
    },
    {
      id: 13,
      name: "ghostscrollai",
      title: "GhostScrollAI",
      description: "Social media and blog auto-scroller for intelligence gathering operations.",
      icon: Ghost,
      color: "from-gray-400 to-slate-400",
      category: "OSINT"
    },
    {
      id: 14,
      name: "intercept_proxy",
      title: "Intercept Proxy",
      description: "Man-in-the-middle proxy for encrypted traffic testing and analysis.",
      icon: Router,
      color: "from-indigo-500 to-blue-500",
      category: "Network Interception"
    },
    {
      id: 15,
      name: "johnnyai",
      title: "JohnnyAI",
      description: "AI bot for simulating real-user behavior across web applications.",
      icon: Bug,
      color: "from-green-500 to-emerald-500",
      category: "Behavior Simulation"
    },
    {
      id: 16,
      name: "keyloggerx",
      title: "KeyloggerX",
      description: "Simulated keylogger for keyboard activity testing and monitoring.",
      icon: Key,
      color: "from-yellow-600 to-orange-600",
      category: "Keystroke Monitoring"
    },
    {
      id: 17,
      name: "lateralmover",
      title: "Lateral Mover",
      description: "Simulates lateral movement across networks for penetration testing.",
      icon: Sword,
      color: "from-red-500 to-pink-500",
      category: "Network Penetration"
    },
    {
      id: 18,
      name: "logwiper",
      title: "Log Wiper",
      description: "Cleans and manipulates logs for forensics testing and evasion techniques.",
      icon: FileX,
      color: "from-gray-500 to-red-500",
      category: "Log Manipulation"
    },
    {
      id: 19,
      name: "magecart_injectx",
      title: "Magecart InjectX",
      description: "Detects and simulates Magecart-style attacks for e-commerce security testing.",
      icon: Warning,
      color: "from-orange-600 to-red-600",
      category: "Web Skimming"
    },
    {
      id: 20,
      name: "mailsnatcher",
      title: "Mail Snatcher",
      description: "Email traffic interceptor and analyzer for communication security testing.",
      icon: Envelope,
      color: "from-blue-600 to-cyan-600",
      category: "Email Security"
    },
    {
      id: 21,
      name: "metamorph_ai",
      title: "Metamorph AI",
      description: "Polymorphic engine for payload shape-shifting and evasion testing.",
      icon: Atom,
      color: "from-purple-600 to-pink-600",
      category: "Payload Morphing"
    },
    {
      id: 22,
      name: "network_phantom_scanner",
      title: "Network Phantom Scanner",
      description: "Stealth network scanning module for reconnaissance operations.",
      icon: Ghost,
      color: "from-gray-600 to-indigo-600",
      category: "Network Scanning"
    },
    {
      id: 23,
      name: "professorai",
      title: "ProfessorAI",
      description: "AI-based tutor and advisory agent for cybersecurity training and education.",
      icon: Shield,
      color: "from-green-600 to-blue-600",
      category: "Education"
    },
    {
      id: 24,
      name: "payload_injector",
      title: "Payload Injector",
      description: "Delivers test payloads into live or emulated targets for security assessment.",
      icon: Radioactive,
      color: "from-yellow-500 to-red-500",
      category: "Payload Delivery"
    },
    {
      id: 25,
      name: "reversex_ai",
      title: "ReverseX AI",
      description: "Reverse engineering assistant for binary deconstruction and analysis.",
      icon: Processor,
      color: "from-cyan-600 to-purple-600",
      category: "Reverse Engineering"
    },
    {
      id: 26,
      name: "socialhack_master",
      title: "SocialHack Master",
      description: "Simulates social engineering techniques for awareness and training.",
      icon: Fish,
      color: "from-pink-500 to-red-500",
      category: "Social Engineering"
    },
    {
      id: 27,
      name: "backdoor_bender",
      title: "Backdoor Bender",
      description: "Tests persistence mechanisms using stealthy backdoors and access methods.",
      icon: Keyhole,
      color: "from-red-600 to-orange-600",
      category: "Persistence Testing"
    },
    {
      id: 28,
      name: "stealthrat_ai",
      title: "StealthRAT AI",
      description: "Remote access tool for ethical red-team simulations and testing.",
      icon: Eye,
      color: "from-gray-700 to-red-700",
      category: "Remote Access"
    },
    {
      id: 29,
      name: "spyglass_ai",
      title: "Spyglass AI",
      description: "Automated surveillance through web scraping and intelligence gathering.",
      icon: Binoculars,
      color: "from-blue-500 to-indigo-500",
      category: "Surveillance"
    },
    {
      id: 30,
      name: "browser_spyder",
      title: "Browser Spyder",
      description: "Simulates browser-based exploits and client-side attack vectors.",
      icon: Spider,
      color: "from-purple-500 to-red-500",
      category: "Browser Exploitation"
    },
    {
      id: 31,
      name: "dns_tunnel_ai",
      title: "DNS Tunnel AI",
      description: "Emulates DNS tunneling attacks for covert communication testing.",
      icon: Router,
      color: "from-cyan-500 to-blue-500",
      category: "DNS Tunneling"
    },
    {
      id: 32,
      name: "packet_sniff_ai",
      title: "Packet Sniff AI",
      description: "Captures and decodes packet-level data for network analysis.",
      icon: Eye,
      color: "from-green-500 to-cyan-500",
      category: "Packet Analysis"
    },
    {
      id: 33,
      name: "rce_exploiter",
      title: "RCE Exploiter",
      description: "Performs Remote Code Execution testing in controlled environments.",
      icon: Terminal,
      color: "from-red-500 to-pink-500",
      category: "Code Execution"
    },
    {
      id: 34,
      name: "rootkit_genie",
      title: "Rootkit Genie",
      description: "Simulated rootkit behavior for detection and response testing.",
      icon: Nuclear,
      color: "from-orange-600 to-red-600",
      category: "Rootkit Simulation"
    },
    {
      id: 35,
      name: "trojanfabricator",
      title: "Trojan Fabricator",
      description: "Builds and analyzes Trojan file behavior for malware research.",
      icon: Virus,
      color: "from-purple-600 to-red-600",
      category: "Malware Analysis"
    },
    {
      id: 36,
      name: "ai_breach_lab",
      title: "AI Breach Lab",
      description: "Full AI suite to simulate system breaches and attack scenarios.",
      icon: Fire,
      color: "from-red-600 to-orange-600",
      category: "Breach Simulation"
    },
    {
      id: 37,
      name: "darknet_explorer",
      title: "Darknet Explorer",
      description: "Maps and monitors dark web content for threat intelligence.",
      icon: Alien,
      color: "from-black to-purple-600",
      category: "Dark Web"
    },
    {
      id: 38,
      name: "hookmaster_ai",
      title: "HookMaster AI",
      description: "Injects JavaScript hooks for tracking and behavior analysis.",
      icon: Bug,
      color: "from-yellow-500 to-orange-500",
      category: "Code Injection"
    },
    {
      id: 39,
      name: "tokenstealer",
      title: "Token Stealer",
      description: "Simulates token stealing vectors for authentication security testing.",
      icon: Password,
      color: "from-blue-500 to-purple-500",
      category: "Token Security"
    },
    {
      id: 40,
      name: "clipboardghost",
      title: "Clipboard Ghost",
      description: "Clipboard data interceptor for sensitive information leakage testing.",
      icon: Ghost,
      color: "from-gray-500 to-blue-500",
      category: "Data Interception"
    },
    {
      id: 41,
      name: "usb_infect_ai",
      title: "USB Infect AI",
      description: "Simulates USB-based payload drops and autorun exploitation.",
      icon: Usb,
      color: "from-green-500 to-blue-500",
      category: "USB Security"
    },
    {
      id: 42,
      name: "remote_exec_ai",
      title: "Remote Exec AI",
      description: "Remotely executes ethical test scripts for penetration testing.",
      icon: CloudArrowDown,
      color: "from-cyan-500 to-purple-500",
      category: "Remote Execution"
    },
    {
      id: 43,
      name: "exploit_injector",
      title: "Exploit Injector",
      description: "Injects exploits in live or sandbox applications for vulnerability testing.",
      icon: Radioactive,
      color: "from-yellow-600 to-red-600",
      category: "Exploit Testing"
    },
    {
      id: 44,
      name: "wormx_ai",
      title: "WormX AI",
      description: "Models worm-like self-replication for network propagation testing.",
      icon: Worm,
      color: "from-green-600 to-yellow-600",
      category: "Worm Simulation"
    },
    {
      id: 45,
      name: "credential_stuffer",
      title: "Credential Stuffer",
      description: "Automated credential stuffing simulator for authentication testing.",
      icon: UserX,
      color: "from-red-500 to-orange-500",
      category: "Credential Testing"
    },
    {
      id: 46,
      name: "sessionhijacker",
      title: "Session Hijacker",
      description: "Tests session token capture and reuse for web application security.",
      icon: HandGrabbing,
      color: "from-purple-500 to-pink-500",
      category: "Session Security"
    },
    {
      id: 47,
      name: "phishbot",
      title: "PhishBot",
      description: "Auto-generates phishing email simulations for awareness training.",
      icon: Fish,
      color: "from-blue-500 to-red-500",
      category: "Phishing Simulation"
    },
    {
      id: 48,
      name: "persistence_engine",
      title: "Persistence Engine",
      description: "Tests various persistence strategies for advanced threat simulation.",
      icon: Timer,
      color: "from-orange-500 to-red-500",
      category: "Persistence Testing"
    },
    {
      id: 49,
      name: "keyclone_ai",
      title: "KeyClone AI",
      description: "AI-driven keystroke replicator for behavioral analysis and testing.",
      icon: Key,
      color: "from-yellow-500 to-orange-500",
      category: "Keystroke Analysis"
    },
    {
      id: 50,
      name: "invisible_listener",
      title: "Invisible Listener",
      description: "Background listener for port surveillance and network monitoring.",
      icon: EyeSlash,
      color: "from-gray-600 to-black",
      category: "Network Monitoring"
    }
  ]

  const categories = [...new Set(cyberModules.map(module => module.category))]

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
            <div className="p-4 rounded-xl bg-gradient-to-r from-red-500 to-orange-500">
              <Skull size={32} color="white" weight="fill" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              One Man Army
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-8">
            AI-Cybersecurity agents designed for ethical testing, education, and youth cybersecurity awareness. 
            Empowering responsible researchers with cutting-edge security tools.
          </p>
          
          {/* Project Details */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto mb-8">
            <div className="flex items-center justify-center gap-2 bg-red-500/10 rounded-lg p-3">
              <Calendar size={20} className="text-red-400" />
              <span className="text-sm font-mono">Launch: 1st October 2026</span>
            </div>
            <div className="flex items-center justify-center gap-2 bg-orange-500/10 rounded-lg p-3">
              <Lock size={20} className="text-orange-400" />
              <span className="text-sm">Premium Users (1+ Year)</span>
            </div>
            <div className="flex items-center justify-center gap-2 bg-yellow-500/10 rounded-lg p-3">
              <Target size={20} className="text-yellow-400" />
              <span className="text-sm">Educational & Testing</span>
            </div>
            <div className="flex items-center justify-center gap-2 bg-red-600/10 rounded-lg p-3">
              <ShieldWarning size={20} className="text-red-400" />
              <span className="text-sm">Youth Cybersecurity</span>
            </div>
            <div className="flex items-center justify-center gap-2 bg-orange-600/10 rounded-lg p-3 lg:col-span-2">
              <Link size={20} className="text-orange-400" />
              <span className="text-sm font-mono">https://onemanarmy.ai</span>
            </div>
          </div>

          {/* Warning Notice */}
          <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-lg p-4 max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Warning size={20} className="text-red-400" />
              <span className="font-semibold text-red-400">Educational Use Only</span>
            </div>
            <p className="text-sm text-muted-foreground">
              All modules are designed for ethical testing, education, and awareness. 
              Use only in authorized environments with proper permissions.
            </p>
          </div>
        </motion.div>

        {/* Categories Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category, index) => (
            <Badge key={category} variant="outline" className="px-3 py-1 border-red-500/30 text-red-400">
              {category}
            </Badge>
          ))}
        </div>

        {/* Cyber Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {cyberModules.map((module, index) => {
            const IconComponent = module.icon
            return (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.03,
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
                <Card className="h-full bg-gradient-to-br from-red-500/5 to-orange-500/5 backdrop-blur-sm border-red-500/20 hover:border-red-400/50 transition-all duration-300 overflow-hidden relative">
                  {/* Animated Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${module.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                  
                  <CardHeader className="pb-4 relative">
                    <div className="flex items-center justify-between mb-3">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${module.color} shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                        <IconComponent size={24} className="text-white" />
                      </div>
                      <Badge variant="outline" className="text-xs border-red-500/30 text-red-400">
                        {String(module.id).padStart(2, '0')}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg font-bold group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-red-400 group-hover:to-orange-400 group-hover:bg-clip-text transition-all duration-300">
                      {module.title}
                    </CardTitle>
                    <CardDescription className="text-sm leading-relaxed">
                      {module.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="pt-0 relative">
                    <div className="space-y-3">
                      <Badge 
                        className="w-full justify-center bg-red-500/20 text-red-400 border-red-500/30"
                      >
                        {module.category}
                      </Badge>
                      
                      <Button 
                        className={`w-full bg-gradient-to-r ${module.color} hover:opacity-90 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300`}
                        disabled
                      >
                        <Skull size={14} className="mr-2" />
                        October 2026
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* CTA Section */}
        <Card className="text-center bg-gradient-to-br from-red-500/10 to-orange-500/10 border-red-500/30">
          <CardHeader>
            <CardTitle className="text-2xl">Join the Cybersecurity Elite</CardTitle>
            <CardDescription className="text-base">
              Premium members with 1+ years get exclusive access to advanced cybersecurity tools
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="max-w-md mx-auto space-y-4">
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email for premium access"
                  className="flex-1 px-4 py-3 rounded-lg border border-border bg-background"
                />
                <Button className="bg-gradient-to-r from-red-500 to-orange-500 hover:opacity-90 px-6">
                  Get Premium
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                🚀 October 2026 • 🔒 1+ Year Premium Required • ⚡ 50 Security Modules
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Back Button */}
        {onBack && (
          <div className="text-center mt-12">
            <Button onClick={onBack} variant="outline" size="lg" className="border-red-500/30 text-red-400 hover:bg-red-500/10">
              ← Back to Upcoming Modules
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
