import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
// Removed icon imports

interface TermsConditionsPageProps {
  onBack?: () => void
}

export function TermsConditionsPage({ onBack }: TermsConditionsPageProps) {
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
            <div className="p-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500">
              {/* Removed Scale icon */}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold gradient-text">Terms & Conditions</h1>
          </div>
          <p className="text-muted-foreground">
            Please read these terms carefully before using our AI Digital Friend platform
          </p>
          <div className="text-sm text-muted-foreground mt-2">
            Last updated: August 8, 2025
          </div>
        </motion.div>

        {/* Content */}
        <div className="space-y-8">
          {/* 1. Introduction */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {/* Removed CheckCircle icon */}
                1. Introduction
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Welcome to One Last AI, an innovative AI Digital Friend platform operated by One Last AI. By accessing or using our website (onelastai.com) and its subdomains (blog.onelastai.com, ip.onelastai.com, creator.onelastai.com, chat.onelastai.com, visual.onelastai.com, mood.onelastai.com, memory.onelastai.com), you agree to be bound by these Terms & Conditions. If you do not agree to these terms, please do not use our services.
              </p>
            </CardContent>
          </Card>

          {/* 2. Eligibility */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {/* Removed FileText icon */}
                2. Eligibility
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                To use our services, you must:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Be at least 13 years of age (or 18 years in some jurisdictions)</li>
                <li>Have the legal capacity to enter into binding agreements</li>
                <li>Not be prohibited from using our services under applicable laws</li>
                <li>Provide accurate and complete information when creating an account</li>
              </ul>
              <p className="text-muted-foreground">
                By using our services, you represent and warrant that you meet these eligibility requirements.
              </p>
            </CardContent>
          </Card>

          {/* 3. User Responsibilities */}
          <Card>
            <CardHeader>
              <CardTitle>3. User Responsibilities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">As a user of our platform, you agree to:</p>
              
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-foreground">Permitted Uses:</h4>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                    <li>Use our AI modules for legitimate, lawful purposes</li>
                    <li>Provide accurate and truthful information</li>
                    <li>Maintain the confidentiality of your account credentials</li>
                    <li>Comply with all applicable laws and regulations</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-foreground">Prohibited Activities:</h4>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                    <li>Engaging in illegal activities, harassment, or abuse</li>
                    <li>Spamming, phishing, or distributing malware</li>
                    <li>Attempting to hack, reverse engineer, or compromise our systems</li>
                    <li>Violating intellectual property rights</li>
                    <li>Creating fake accounts or impersonating others</li>
                    <li>Using our services to generate harmful, offensive, or inappropriate content</li>
                    <li>Attempting to bypass security measures or access restrictions</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 4. Intellectual Property */}
          <Card>
            <CardHeader>
              <CardTitle>4. Intellectual Property</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground">Our Intellectual Property:</h4>
                  <p className="text-muted-foreground">
                    All content, features, and functionality of our platform, including but not limited to AI models, algorithms, software, text, graphics, logos, icons, images, audio clips, and video clips, are owned by One Last AI and are protected by copyright, trademark, and other intellectual property laws. You may not copy, reproduce, distribute, modify, or create derivative works without our explicit written permission.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-foreground">Your Content:</h4>
                  <p className="text-muted-foreground">
                    You retain ownership of any content you submit to our platform. However, by submitting content, you grant One Last AI a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and distribute your content solely for the purpose of providing and improving our services.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-foreground">AI-Generated Content:</h4>
                  <p className="text-muted-foreground">
                    Content generated by our AI systems is provided for your use, but you are responsible for ensuring its appropriateness and compliance with applicable laws. We make no warranties regarding AI-generated content.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 5. Privacy Policy Reference */}
          <Card>
            <CardHeader>
              <CardTitle>5. Privacy & Data Protection</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Your privacy is important to us. Our collection, use, and protection of your personal information is governed by our Privacy Policy, which is incorporated into these Terms by reference. By using our services, you consent to the collection and use of your information as described in our Privacy Policy. Please review our Privacy Policy to understand how we handle your data, especially regarding AI processing, email communications, IP logging, and other data collection practices.
              </p>
              <div className="mt-3">
                <Button variant="outline" size="sm">
                  View Privacy Policy
                </Button>
              </div>
            </CardContent>
          </Card>

                    {/* Removed AlertTriangle icon */}
          <Card>
            <CardHeader>
              <CardTitle>6. Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-yellow-500">Important Disclaimer</h4>
                    <p className="text-muted-foreground">
                      One Last AI provides services "AS IS" and "AS AVAILABLE" without warranties of any kind, either express or implied.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <p className="text-muted-foreground">
                  <strong>We are NOT responsible for:</strong>
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                  <li>Any damages arising from your use of our services</li>
                  <li>AI-generated errors, inaccuracies, or inappropriate content</li>
                  <li>Data loss or system downtime</li>
                  <li>Third-party actions or content</li>
                  <li>Interruption of services or technical issues</li>
                  <li>Financial losses or business disruptions</li>
                </ul>
                
                <p className="text-muted-foreground mt-4">
                  <strong>Limitation:</strong> Our total liability to you for any claims arising from these terms or your use of our services shall not exceed the amount you paid us (if any) in the 12 months preceding the claim, or $100, whichever is greater.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 7. Service Modification or Termination */}
          <Card>
            <CardHeader>
              <CardTitle>7. Service Modification & Termination</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-foreground">Our Rights:</h4>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                    <li>Modify, update, or discontinue any part of our services at any time</li>
                    <li>Suspend or terminate your access for violations of these terms</li>
                    <li>Remove or disable access to any content that violates our policies</li>
                    <li>Change pricing, features, or service availability</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-foreground">Termination:</h4>
                  <p className="text-muted-foreground">
                    We may terminate or suspend your account immediately, without prior notice or liability, for any reason, including breach of these terms. Upon termination, your right to use our services will cease immediately, and we may delete your account and associated data.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-foreground">Your Rights:</h4>
                  <p className="text-muted-foreground">
                    You may stop using our services at any time. Termination of your account does not relieve you of any obligations incurred prior to termination.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 8. Governing Law */}
          <Card>
            <CardHeader>
              <CardTitle>8. Governing Law & Disputes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-foreground">Governing Law:</h4>
                  <p className="text-muted-foreground">
                    These Terms & Conditions are governed by and construed in accordance with the laws of the State of California, United States, without regard to its conflict of law principles.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-foreground">Dispute Resolution:</h4>
                  <p className="text-muted-foreground">
                    Any disputes arising from these terms or your use of our services will be resolved through binding arbitration in accordance with the rules of the American Arbitration Association, conducted in California, United States.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-foreground">Jurisdiction:</h4>
                  <p className="text-muted-foreground">
                    You agree to submit to the personal jurisdiction of the courts located in California for any actions not subject to arbitration.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 9. Changes to Terms */}
          <Card>
            <CardHeader>
              <CardTitle>9. Changes to Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                We reserve the right to modify or replace these Terms & Conditions at any time at our sole discretion. If we make material changes, we will provide at least 30 days notice prior to any new terms taking effect.
              </p>
              <p className="text-muted-foreground">
                What constitutes a material change will be determined at our sole discretion. By continuing to access or use our services after those revisions become effective, you agree to be bound by the revised terms.
              </p>
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <p className="text-muted-foreground">
                  <strong>Your Responsibility:</strong> It is your responsibility to review these Terms periodically for changes. We recommend checking this page regularly to stay informed of any updates.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>10. Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                If you have any questions about these Terms & Conditions, please contact us:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-foreground">Legal Inquiries:</h4>
                    <p className="text-muted-foreground">legal@onelastai.com</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">General Support:</h4>
                    <p className="text-muted-foreground">info@onelastai.com</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-foreground">Phone:</h4>
                    <p className="text-muted-foreground">+1 (213) 772-0156</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Social Media:</h4>
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
                  <strong>Version:</strong> 2.0
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
