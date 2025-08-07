import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield, Lock, Eye, FileText } from '@phosphor-icons/react'

interface PrivacyPolicyPageProps {
  onBack?: () => void
}

export function PrivacyPolicyPage({ onBack }: PrivacyPolicyPageProps) {
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
            <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600">
              <Shield size={28} color="white" weight="fill" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold gradient-text">Privacy Policy</h1>
          </div>
          <p className="text-muted-foreground">
            Your privacy and data security are our top priorities
          </p>
          <div className="text-sm text-muted-foreground mt-2">
            Last updated: August 8, 2025
          </div>
        </motion.div>

        {/* Content */}
        <div className="space-y-8">
          {/* Introduction */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield size={20} />
                Introduction
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                At One Last AI, your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our AI Digital Friend platform, website (onelastai.com), and associated subdomains (blog.onelastai.com, ip.onelastai.com, creator.onelastai.com, chat.onelastai.com, visual.onelastai.com, mood.onelastai.com, memory.onelastai.com).
              </p>
              <p className="text-muted-foreground mt-3">
                By using our services, you agree to the collection and use of information in accordance with this policy.
              </p>
            </CardContent>
          </Card>

          {/* 1. Information We Collect */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText size={20} />
                1. Information We Collect
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                We may collect the following types of information when you use our AI Digital Friend platform:
              </p>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground">Personal Information:</h4>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                    <li>Name and email address (if you register or contact us)</li>
                    <li>Account preferences and settings</li>
                    <li>Profile information you choose to provide</li>
                    <li>Communication history with our support team</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-foreground">AI Inputs:</h4>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                    <li>Text or data you enter when using our AI Chat module</li>
                    <li>Images uploaded to our Visual AI module</li>
                    <li>Content created through our Creator Tools</li>
                    <li>Mood analysis inputs and responses</li>
                    <li>Notes and data stored in Memory AI</li>
                    <li>Network data processed through IP Tools</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-foreground">Technical Data:</h4>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                    <li>IP address and approximate location data</li>
                    <li>Browser type, version, and operating system</li>
                    <li>Device information and screen resolution</li>
                    <li>Referring URLs and navigation patterns</li>
                    <li>Time and date of access</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-foreground">Payment Data:</h4>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                    <li>Billing information processed through Stripe or similar third-party services</li>
                    <li>Transaction history and payment status</li>
                    <li><em>Note: We do not store your credit card details on our servers</em></li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-foreground">Usage Data:</h4>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                    <li>Feature usage analytics and interaction patterns</li>
                    <li>Performance metrics and error logs</li>
                    <li>API usage statistics</li>
                    <li>Session duration and frequency data</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 2. How We Use Your Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye size={20} />
                2. How We Use Your Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                We use the collected information to:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-foreground">Service Delivery:</h4>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                    <li>Provide and maintain our AI Digital Friend services</li>
                    <li>Process your requests and deliver personalized AI experiences</li>
                    <li>Enable communication between AI modules</li>
                    <li>Store and retrieve your data across sessions</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Improvement & Support:</h4>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                    <li>Respond to user queries, feedback, and support requests</li>
                    <li>Improve website functionality and user experience</li>
                    <li>Enhance our AI algorithms and model performance</li>
                    <li>Develop new features and modules</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Security & Compliance:</h4>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                    <li>Monitor usage and detect technical issues</li>
                    <li>Prevent fraud and ensure platform security</li>
                    <li>Comply with legal obligations and regulations</li>
                    <li>Enforce our Terms & Conditions</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Communication:</h4>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                    <li>Send important updates about our services</li>
                    <li>Notify you about new features and modules</li>
                    <li>Provide technical support and assistance</li>
                    <li>Send security alerts and notices</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 3. Sharing with Third Parties */}
          <Card>
            <CardHeader>
              <CardTitle>3. Sharing with Third Parties</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                We may share your information with trusted third-party services to provide our AI Digital Friend platform:
              </p>
              <div className="space-y-4">
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                  <h4 className="font-semibold text-foreground mb-2">AI & Processing Partners:</h4>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                    <li><strong>OpenAI:</strong> For processing AI prompts and generating responses</li>
                    <li><strong>AI Model Providers:</strong> For specialized AI tasks across different modules</li>
                    <li><strong>Cloud AI Services:</strong> For image processing, text analysis, and other AI operations</li>
                  </ul>
                </div>
                
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                  <h4 className="font-semibold text-foreground mb-2">Infrastructure & Security:</h4>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                    <li><strong>Stripe:</strong> For secure payment processing</li>
                    <li><strong>Cloudflare:</strong> For site security, CDN, and DDoS protection</li>
                    <li><strong>Hosting Providers:</strong> For secure server infrastructure and data storage</li>
                    <li><strong>MongoDB Atlas:</strong> For storing user data securely</li>
                  </ul>
                </div>
                
                <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                  <h4 className="font-semibold text-foreground mb-2">Analytics & Communication:</h4>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                    <li><strong>Analytics Services:</strong> For usage tracking and performance monitoring</li>
                    <li><strong>Email Providers:</strong> For sending notifications and support communications</li>
                    <li><strong>Support Tools:</strong> For customer service and technical assistance</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <p className="text-muted-foreground">
                  <strong>Important:</strong> All third parties are required to respect your data and comply with relevant privacy regulations including GDPR, CCPA, and other applicable laws.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 4. Data Security */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock size={20} />
                4. Data Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                We implement industry-standard security practices to protect your information:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground">Technical Safeguards:</h4>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                    <li>HTTPS encryption for all data transmission</li>
                    <li>End-to-end encryption for sensitive data</li>
                    <li>Regular security audits and vulnerability assessments</li>
                    <li>Multi-factor authentication and access controls</li>
                    <li>Secure API endpoints with rate limiting</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground">Data Handling:</h4>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                    <li>Data minimization and retention policies</li>
                    <li>Regular automated backups with encryption</li>
                    <li>Secure cloud infrastructure with redundancy</li>
                    <li>Staff training on data protection best practices</li>
                    <li>Incident response and breach notification procedures</li>
                  </ul>
                </div>
              </div>
              <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="text-muted-foreground">
                  <strong>Disclaimer:</strong> However, no method of transmission over the Internet or electronic storage is 100% secure. We cannot guarantee absolute security of your data.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 5. Your Rights */}
          <Card>
            <CardHeader>
              <CardTitle>5. Your Rights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Depending on your jurisdiction (including GDPR, CCPA, and other privacy laws), you may have the following rights:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-foreground">Data Access & Control:</h4>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                    <li>Access your personal information</li>
                    <li>Correct inaccurate or incomplete data</li>
                    <li>Request data deletion ("right to be forgotten")</li>
                    <li>Export your data in a portable format</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Processing Control:</h4>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                    <li>Restrict or object to data processing</li>
                    <li>Withdraw consent (where applicable)</li>
                    <li>Opt-out of marketing communications</li>
                    <li>File complaints with data protection authorities</li>
                  </ul>
                </div>
              </div>
              <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <p className="text-muted-foreground">
                  You can contact us at <strong>privacy@onelastai.com</strong> to exercise these rights. We will respond to your request within the legally required timeframe.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 6. Cookies */}
          <Card>
            <CardHeader>
              <CardTitle>6. Cookies & Tracking</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                We may use cookies and similar tracking technologies to:
              </p>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-foreground">Essential Cookies:</h4>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                    <li>Remember user preferences and settings</li>
                    <li>Maintain user sessions and authentication</li>
                    <li>Enable core platform functionality</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Analytics Cookies:</h4>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                    <li>Analyze traffic patterns and user behavior</li>
                    <li>Monitor performance and detect issues</li>
                    <li>Improve user experience across all modules</li>
                  </ul>
                </div>
              </div>
              <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                <p className="text-muted-foreground">
                  <strong>Cookie Control:</strong> You can control or delete cookies through your browser settings. Note that disabling certain cookies may affect platform functionality.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 7. Children's Privacy */}
          <Card>
            <CardHeader>
              <CardTitle>7. Children's Privacy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
                <p className="text-muted-foreground">
                  Our AI Digital Friend service is not intended for children under 13 years of age. We do not knowingly collect personal information from anyone under this age. If you are a parent or guardian and believe your child has provided us with personal information, please contact us at <strong>privacy@onelastai.com</strong> and we will take steps to remove such information from our systems.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 8. Changes to This Policy */}
          <Card>
            <CardHeader>
              <CardTitle>8. Changes to This Policy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-muted-foreground">
                We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors.
              </p>
              <div className="space-y-2">
                <p className="text-muted-foreground">
                  <strong>Notification:</strong> Updates will be posted on this page with a revised "Last Updated" date.
                </p>
                <p className="text-muted-foreground">
                  <strong>Material Changes:</strong> For significant changes, we will provide additional notice through email or prominent website notifications.
                </p>
                <p className="text-muted-foreground">
                  <strong>Your Responsibility:</strong> We encourage you to review this Privacy Policy periodically to stay informed about how we protect your information.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 9. Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>9. Contact Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-foreground">📧 Privacy Inquiries:</h4>
                    <p className="text-muted-foreground">privacy@onelastai.com</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">🛡️ Data Protection Officer:</h4>
                    <p className="text-muted-foreground">dpo@onelastai.com</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">📞 Phone:</h4>
                    <p className="text-muted-foreground">+1 (213) 772-0156</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-foreground">🏢 Business Name:</h4>
                    <p className="text-muted-foreground">One Last AI</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">🌐 Website:</h4>
                    <p className="text-muted-foreground">onelastai.com</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">💬 Social Media:</h4>
                    <div className="text-muted-foreground">
                      <div>Telegram: @onelastai</div>
                      <div>LINE: @onelastai</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t">
                <p className="text-sm text-muted-foreground">
                  <strong>Effective Date:</strong> August 8, 2025<br/>
                  <strong>Last Updated:</strong> August 8, 2025<br/>
                  <strong>Version:</strong> 2.0<br/>
                  <strong>Policy Scope:</strong> All One Last AI services and subdomains
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

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
