import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
// icons removed

interface ContactUsPageProps {
  onBack?: () => void
}

export function ContactUsPage({ onBack }: ContactUsPageProps) {
  const contactMethods = [
    {
      title: "Email",
      value: "info@onelastai.com",
      description: "Send us an email for general inquiries and support",
      
      action: "mailto:info@onelastai.com",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Phone",
      value: "+1 (213) 772-0156",
      description: "Call us during business hours for urgent matters",
      
      action: "tel:+12137720156",
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Telegram",
      value: "@onelastai",
      description: "Connect with us on Telegram for quick responses",
      
      action: "https://t.me/onelastai",
      color: "from-blue-400 to-blue-600"
    },
    {
      title: "LINE",
      value: "@onelastai",
      description: "Chat with us on LINE for personalized support",
      
      action: "https://line.me/ti/p/@onelastai",
      color: "from-green-400 to-green-600"
    }
  ]

  const officeHours = [
    { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM PST" },
    { day: "Saturday", hours: "10:00 AM - 4:00 PM PST" },
    { day: "Sunday", hours: "Closed" },
    { day: "Emergency Support", hours: "24/7 via Email & Telegram" }
  ]

  const departments = [
    {
      name: "General Inquiries",
      email: "info@onelastai.com",
      description: "General questions about our platform and services"
    },
    {
      name: "Technical Support",
      email: "support@onelastai.com",
      description: "Technical issues, bugs, and platform assistance"
    },
    {
      name: "Business & Partnerships",
      email: "business@onelastai.com",
      description: "Partnership opportunities and business inquiries"
    },
    {
      name: "Media & Press",
      email: "press@onelastai.com",
      description: "Media inquiries and press-related questions"
    },
    {
      name: "Privacy & Legal",
      email: "legal@onelastai.com",
      description: "Privacy concerns and legal matters"
    },
    {
      name: "Careers",
      email: "careers@onelastai.com",
      description: "Job opportunities and career inquiries"
    }
  ]

  const handleContactClick = (action: string) => {
    if (action.startsWith('mailto:') || action.startsWith('tel:')) {
      window.location.href = action
    } else {
      window.open(action, '_blank')
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold">ONE LAST AI</div>
            <h1 className="text-3xl md:text-4xl font-bold gradient-text">Contact Us</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get in touch with our team. We're here to help with any questions or support you need.
          </p>
        </motion.div>

        {/* Quick Contact Methods */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactMethods.map((method, index) => {
            return (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card 
                  className="h-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-accent/50 transition-all duration-300 cursor-pointer group"
                  onClick={() => handleContactClick(method.action)}
                >
                  <CardHeader className="text-center">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${method.color} w-fit mx-auto mb-4 text-white font-bold`}>AI</div>
                    <CardTitle className="text-lg group-hover:text-accent transition-colors">
                      {method.title}
                    </CardTitle>
                    <div className="font-mono text-sm text-blue-400">
                      {method.value}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground text-center">
                      {method.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Contact Form */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">Send us a Message</CardTitle>
            <CardDescription>
              Fill out the form below and we'll get back to you as soon as possible
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
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

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium">
                    Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium">
                    Company (Optional)
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    placeholder="Your company name"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Subject *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  placeholder="Brief description of your inquiry"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Message *
                </label>
                <textarea
                  required
                  rows={6}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
                  placeholder="Please describe your question or request in detail..."
                />
              </div>

              <Button 
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 text-white border-0"
              >
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Department Contacts */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Department Contacts
            </CardTitle>
            <CardDescription>
              Reach out to specific departments for faster assistance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {departments.map((dept, index) => (
                <div key={index} className="space-y-2">
                  <h4 className="font-semibold">{dept.name}</h4>
                  <a 
                    href={`mailto:${dept.email}`}
                    className="text-blue-400 hover:text-blue-300 transition-colors font-mono text-sm"
                  >
                    {dept.email}
                  </a>
                  <p className="text-sm text-muted-foreground">
                    {dept.description}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Office Hours */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Office Hours
              </CardTitle>
              <CardDescription>
                When you can expect to hear back from us
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {officeHours.map((schedule, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="font-medium">{schedule.day}</span>
                    <span className="text-muted-foreground">{schedule.hours}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Response Times
              </CardTitle>
              <CardDescription>
                Average response times by contact method
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Email</span>
                  <span className="text-muted-foreground">Within 24 hours</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Phone</span>
                  <span className="text-muted-foreground">Immediate</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Telegram</span>
                  <span className="text-muted-foreground">Within 2 hours</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">LINE</span>
                  <span className="text-muted-foreground">Within 4 hours</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Support Options */}
        <Card className="text-center">
          <CardHeader>
            <CardTitle>Need Technical Support?</CardTitle>
            <CardDescription>
              For technical issues and platform support, use our dedicated support system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:opacity-90"
                onClick={() => window.location.href = '/support-ticket'}
              >
                Create Support Ticket
              </Button>
              <Button 
                variant="outline"
                onClick={() => window.open('https://t.me/onelastai', '_blank')}
              >
                Quick Chat on Telegram
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
