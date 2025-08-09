import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
// icons removed
import { useState } from 'react'

interface SupportTicketPageProps {
  onBack?: () => void
}

export function SupportTicketPage({ onBack }: SupportTicketPageProps) {
  const [selectedModule, setSelectedModule] = useState('')
  const [selectedPriority, setSelectedPriority] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

  const modules = [
    { value: 'chat', label: 'AI Chat', color: 'from-blue-500 to-cyan-500' },
    { value: 'mood', label: 'Mood Analyzer', color: 'from-pink-500 to-rose-500' },
    { value: 'visual', label: 'Visual AI', color: 'from-purple-500 to-violet-500' },
    { value: 'creator', label: 'Creator Tools', color: 'from-orange-500 to-red-500' },
    { value: 'memory', label: 'Memory AI', color: 'from-green-500 to-emerald-500' },
    { value: 'ip', label: 'IP Tools', color: 'from-cyan-500 to-blue-500' },
    { value: 'blog', label: 'AI Blog', color: 'from-gray-500 to-slate-500' },
    { value: 'analytics', label: 'Analytics Dashboard', color: 'from-indigo-500 to-purple-500' },
    { value: 'platform', label: 'General Platform', color: 'from-blue-600 to-purple-600' },
    { value: 'account', label: 'Account & Billing', color: 'from-green-600 to-teal-600' }
  ]

  const priorities = [
    { 
      value: 'low', 
      label: 'Low', 
      description: 'General questions, feature requests',
  color: 'bg-green-500/20 text-green-400',
      eta: '2-3 business days'
    },
    { 
      value: 'medium', 
      label: 'Medium', 
      description: 'Issues affecting functionality',
  color: 'bg-yellow-500/20 text-yellow-400',
      eta: '1-2 business days'
    },
    { 
      value: 'high', 
      label: 'High', 
      description: 'Service disruptions, critical bugs',
      color: 'bg-orange-500/20 text-orange-400',
  // icon removed
      eta: '4-8 hours'
    },
    { 
      value: 'urgent', 
      label: 'Urgent', 
      description: 'Security issues, complete service outage',
  color: 'bg-red-500/20 text-red-400',
      eta: '1-2 hours'
    }
  ]

  const categories = [
    { value: 'bug', label: 'Bug Report', description: 'Something is not working correctly' },
    { value: 'feature', label: 'Feature Request', description: 'Request for new functionality' },
    { value: 'account', label: 'Account Issues', description: 'Login, billing, subscription problems' },
    { value: 'api', label: 'API Support', description: 'API integration and development help' },
    { value: 'performance', label: 'Performance Issues', description: 'Slow loading, timeouts, errors' },
    { value: 'security', label: 'Security Concerns', description: 'Privacy, data protection, security' },
    { value: 'integration', label: 'Integration Help', description: 'Help with third-party integrations' },
    { value: 'other', label: 'Other', description: 'General questions and other topics' }
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    // For now, we'll just show a success message
    alert('Support ticket submitted successfully! We\'ll get back to you soon.')
  }

  return (
    <div className="min-h-screen bg-background text-foreground pt-20">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold">
              ONE LAST AI
            </div>
            <h1 className="text-3xl md:text-4xl font-bold gradient-text">Support Ticket</h1>
          </div>
          <p className="text-muted-foreground">
            Create a support ticket and our team will help resolve your issue
          </p>
        </motion.div>

        {/* Support Form */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Create Support Ticket</CardTitle>
            <CardDescription>
              Please provide as much detail as possible to help us assist you quickly
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium">
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    placeholder="Your full name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              {/* Module Selection */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Affected Module *
                </label>
                <Select value={selectedModule} onValueChange={setSelectedModule} required>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select the module you need help with" />
                  </SelectTrigger>
                  <SelectContent>
                    {modules.map((module) => (
                      <SelectItem key={module.value} value={module.value}>
                        {module.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Category Selection */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Issue Category *
                </label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory} required>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select the type of issue" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        <div>
                          <div className="font-medium">{category.label}</div>
                          <div className="text-xs text-muted-foreground">{category.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Priority Selection */}
              <div className="space-y-3">
                <label className="block text-sm font-medium">
                  Priority Level *
                </label>
                <div className="grid md:grid-cols-2 gap-4">
                  {priorities.map((priority) => {
                    return (
                      <div
                        key={priority.value}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                          selectedPriority === priority.value
                            ? 'border-blue-500 bg-blue-500/10'
                            : 'border-border hover:border-accent/50'
                        }`}
                        onClick={() => setSelectedPriority(priority.value)}
                      >
                        <div className="flex items-start gap-3">
                          <span className="mt-0.5 inline-block w-5 h-5 rounded bg-current opacity-40" aria-hidden />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium">{priority.label}</span>
                              <Badge className={priority.color}>
                                {priority.eta}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {priority.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Subject *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  placeholder="Brief description of your issue"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Detailed Description *
                </label>
                <textarea
                  required
                  rows={8}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
                  placeholder="Please provide a detailed description of your issue, including:
• What you were trying to do
• What actually happened
• Any error messages you received
• Steps to reproduce the issue
• Your browser and device information"
                />
              </div>

              {/* File Upload */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Attachments (Optional)
                </label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <input
                    type="file"
                    multiple
                    className="hidden"
                    id="file-upload"
                    accept=".jpg,.jpeg,.png,.gif,.pdf,.txt,.log"
                  />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <div className="space-y-2">
                      <div>📎 Click to upload files or drag and drop</div>
                      <div className="text-xs">
                        Supported: Images, PDFs, text files, logs (Max 10MB per file)
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Additional Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium">
                    Browser/Platform
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    placeholder="e.g., Chrome 91, iOS Safari, Android"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium">
                    Account Email (if different)
                  </label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    placeholder="account@example.com"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit"
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:opacity-90 text-white border-0"
                disabled={!selectedModule || !selectedCategory || !selectedPriority}
              >
                Submit Support Ticket
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Before Submitting</CardTitle>
            <CardDescription>
              Quick solutions to common issues
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <h4 className="font-semibold mb-2">💡 Quick Tips</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Try refreshing the page and clearing your browser cache</li>
                  <li>• Check if the issue persists in an incognito/private window</li>
                  <li>• Ensure you have a stable internet connection</li>
                  <li>• Update your browser to the latest version</li>
                </ul>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">🔧 Common Issues</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Login problems → Check email/password</li>
                    <li>• Slow loading → Clear cache and cookies</li>
                    <li>• API errors → Check API key and limits</li>
                    <li>• Mobile issues → Update the app</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">📧 Email Support</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    All tickets are sent to: <strong>info@onelastai.com</strong>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    You'll receive an automatic confirmation and a response within the expected timeframe.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Alternative Contact */}
        <Card>
          <CardHeader>
            <CardTitle>Need Immediate Help?</CardTitle>
            <CardDescription>
              For urgent issues, you can reach us directly
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                variant="outline"
                onClick={() => window.open('https://t.me/onelastai', '_blank')}
              >
                Telegram: @onelastai
              </Button>
              <Button 
                variant="outline"
                onClick={() => window.location.href = 'tel:+12137720156'}
              >
                Phone: +1 (213) 772-0156
              </Button>
              <Button 
                variant="outline"
                onClick={() => window.location.href = 'mailto:info@onelastai.com'}
              >
                Email: info@onelastai.com
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Back Button */}
        {onBack && (
          <div className="text-center mt-12">
            <Button onClick={onBack} variant="outline">
              ← Back to Home
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
