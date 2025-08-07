import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  CreditCard, 
  User, 
  Envelope, 
  Phone, 
  MapPin, 
  Globe,
  Lock,
  CheckCircle,
  Lightning,
  Crown,
  Rocket,
  Shield
} from '@phosphor-icons/react'

interface SubscriptionPageProps {
  onBack?: () => void
  selectedPlan?: 'basic' | 'premium' | 'enterprise'
}

export function SubscriptionPage({ onBack, selectedPlan = 'premium' }: SubscriptionPageProps) {
  const [billingData, setBillingData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    
    // Billing Address
    address: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    
    // Payment Information
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    
    // Preferences
    billingCycle: 'monthly',
    agreeToTerms: false,
    savePaymentMethod: false
  })

  const plans = {
    basic: {
      name: 'Basic',
      price: { monthly: 9.99, yearly: 99.99 },
      features: ['5 AI modules', '100 requests/month', 'Email support'],
      color: 'from-blue-500 to-cyan-500',
      icon: Lightning
    },
    premium: {
      name: 'Premium',
      price: { monthly: 19.99, yearly: 199.99 },
      features: ['All AI modules', 'Unlimited requests', 'Priority support', 'Early access'],
      color: 'from-purple-500 to-pink-500',
      icon: Crown
    },
    enterprise: {
      name: 'Enterprise',
      price: { monthly: 49.99, yearly: 499.99 },
      features: ['All modules', 'Custom integrations', 'Dedicated support', 'Team management'],
      color: 'from-orange-500 to-red-500',
      icon: Rocket
    }
  }

  const currentPlan = plans[selectedPlan]
  const currentPrice = billingData.billingCycle === 'yearly' 
    ? currentPlan.price.yearly 
    : currentPlan.price.monthly

  const handleInputChange = (field: string, value: string | boolean) => {
    setBillingData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!billingData.agreeToTerms) {
      alert('Please agree to the Terms & Conditions')
      return
    }
    // Handle subscription logic here
    console.log('Subscription:', billingData)
  }

  const countries = [
    'United States', 'Canada', 'United Kingdom', 'Germany', 'France', 
    'Australia', 'Japan', 'India', 'Brazil', 'Mexico'
  ]

  return (
    <div className="min-h-screen bg-background text-foreground pt-20">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className={`mx-auto w-16 h-16 bg-gradient-to-r ${currentPlan.color} rounded-xl flex items-center justify-center mb-4`}
            >
              <currentPlan.icon size={32} className="text-white" />
            </motion.div>
            <h1 className={`text-4xl font-bold bg-gradient-to-r ${currentPlan.color} bg-clip-text text-transparent`}>
              Subscribe to {currentPlan.name}
            </h1>
            <p className="text-muted-foreground mt-2 text-lg">
              Complete your subscription to unlock all AI-powered features
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Plan Summary */}
            <div className="lg:col-span-1">
              <Card className={`border-2 bg-gradient-to-br ${currentPlan.color.replace('to-', 'to-').replace('from-', 'from-')}/10 border-opacity-50`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl">{currentPlan.name} Plan</CardTitle>
                    <currentPlan.icon size={24} />
                  </div>
                  <CardDescription>
                    Perfect for your AI journey
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Price Toggle */}
                  <Tabs 
                    value={billingData.billingCycle} 
                    onValueChange={(value) => handleInputChange('billingCycle', value)}
                    className="w-full"
                  >
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="monthly">Monthly</TabsTrigger>
                      <TabsTrigger value="yearly">
                        Yearly
                        <Badge variant="secondary" className="ml-2 text-xs">Save 17%</Badge>
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="monthly" className="text-center mt-4">
                      <div className="text-3xl font-bold">${currentPlan.price.monthly}</div>
                      <div className="text-muted-foreground">per month</div>
                    </TabsContent>
                    <TabsContent value="yearly" className="text-center mt-4">
                      <div className="text-3xl font-bold">${currentPlan.price.yearly}</div>
                      <div className="text-muted-foreground">per year</div>
                      <div className="text-sm text-green-400">Save ${(currentPlan.price.monthly * 12 - currentPlan.price.yearly).toFixed(2)}</div>
                    </TabsContent>
                  </Tabs>

                  {/* Features */}
                  <div className="space-y-3">
                    <h4 className="font-semibold">What's included:</h4>
                    <ul className="space-y-2">
                      {currentPlan.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <CheckCircle size={16} className="text-green-400" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Security Badge */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 rounded-lg p-3">
                    <Shield size={16} className="text-green-400" />
                    <span>Secure 256-bit SSL encryption</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Billing Form */}
            <div className="lg:col-span-2">
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl">Billing Information</CardTitle>
                  <CardDescription>
                    Please provide your billing details to complete the subscription
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        <User size={20} />
                        Personal Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input
                            id="firstName"
                            type="text"
                            placeholder="Enter your first name"
                            value={billingData.firstName}
                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input
                            id="lastName"
                            type="text"
                            placeholder="Enter your last name"
                            value={billingData.lastName}
                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address *</Label>
                          <div className="relative">
                            <Envelope size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                            <Input
                              id="email"
                              type="email"
                              placeholder="your@email.com"
                              value={billingData.email}
                              onChange={(e) => handleInputChange('email', e.target.value)}
                              className="pl-10"
                              required
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number *</Label>
                          <div className="relative">
                            <Phone size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                            <Input
                              id="phone"
                              type="tel"
                              placeholder="+1 (555) 123-4567"
                              value={billingData.phone}
                              onChange={(e) => handleInputChange('phone', e.target.value)}
                              className="pl-10"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Billing Address */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        <MapPin size={20} />
                        Billing Address
                      </h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="address">Street Address *</Label>
                          <Input
                            id="address"
                            type="text"
                            placeholder="123 Main Street"
                            value={billingData.address}
                            onChange={(e) => handleInputChange('address', e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="address2">Apartment, suite, etc. (optional)</Label>
                          <Input
                            id="address2"
                            type="text"
                            placeholder="Apt 4B"
                            value={billingData.address2}
                            onChange={(e) => handleInputChange('address2', e.target.value)}
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="city">City *</Label>
                            <Input
                              id="city"
                              type="text"
                              placeholder="New York"
                              value={billingData.city}
                              onChange={(e) => handleInputChange('city', e.target.value)}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="state">State/Province *</Label>
                            <Input
                              id="state"
                              type="text"
                              placeholder="NY"
                              value={billingData.state}
                              onChange={(e) => handleInputChange('state', e.target.value)}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="zipCode">ZIP/Postal Code *</Label>
                            <Input
                              id="zipCode"
                              type="text"
                              placeholder="10001"
                              value={billingData.zipCode}
                              onChange={(e) => handleInputChange('zipCode', e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="country">Country *</Label>
                          <Select value={billingData.country} onValueChange={(value) => handleInputChange('country', value)}>
                            <SelectTrigger>
                              <div className="flex items-center gap-2">
                                <Globe size={18} className="text-muted-foreground" />
                                <SelectValue placeholder="Select your country" />
                              </div>
                            </SelectTrigger>
                            <SelectContent>
                              {countries.map((country) => (
                                <SelectItem key={country} value={country}>
                                  {country}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    {/* Payment Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        <CreditCard size={20} />
                        Payment Information
                      </h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="cardName">Name on Card *</Label>
                          <Input
                            id="cardName"
                            type="text"
                            placeholder="John Doe"
                            value={billingData.cardName}
                            onChange={(e) => handleInputChange('cardName', e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Card Number *</Label>
                          <div className="relative">
                            <CreditCard size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                            <Input
                              id="cardNumber"
                              type="text"
                              placeholder="1234 5678 9012 3456"
                              value={billingData.cardNumber}
                              onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                              className="pl-10"
                              maxLength={19}
                              required
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expiryDate">Expiry Date *</Label>
                            <Input
                              id="expiryDate"
                              type="text"
                              placeholder="MM/YY"
                              value={billingData.expiryDate}
                              onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                              maxLength={5}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvv">CVV *</Label>
                            <div className="relative">
                              <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                              <Input
                                id="cvv"
                                type="text"
                                placeholder="123"
                                value={billingData.cvv}
                                onChange={(e) => handleInputChange('cvv', e.target.value)}
                                className="pl-10"
                                maxLength={4}
                                required
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Preferences */}
                    <div className="space-y-4">
                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="savePayment"
                          checked={billingData.savePaymentMethod}
                          onCheckedChange={(checked) => handleInputChange('savePaymentMethod', checked as boolean)}
                        />
                        <Label htmlFor="savePayment" className="text-sm leading-5">
                          Save payment method for future purchases
                        </Label>
                      </div>
                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="terms"
                          checked={billingData.agreeToTerms}
                          onCheckedChange={(checked) => handleInputChange('agreeToTerms', checked as boolean)}
                          required
                        />
                        <Label htmlFor="terms" className="text-sm leading-5">
                          I agree to the{' '}
                          <a href="/terms-conditions" className="text-blue-400 hover:text-blue-300">
                            Terms & Conditions
                          </a>{' '}
                          and{' '}
                          <a href="/privacy-policy" className="text-blue-400 hover:text-blue-300">
                            Privacy Policy
                          </a>
                        </Label>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-6">
                      <Button 
                        type="submit" 
                        className={`w-full bg-gradient-to-r ${currentPlan.color} hover:opacity-90 text-white text-lg py-6`}
                        size="lg"
                      >
                        Complete Subscription - ${currentPrice}/{billingData.billingCycle === 'yearly' ? 'year' : 'month'}
                      </Button>
                      <p className="text-xs text-muted-foreground text-center mt-2">
                        You will be charged ${currentPrice} {billingData.billingCycle === 'yearly' ? 'annually' : 'monthly'}. Cancel anytime.
                      </p>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Back Button */}
          {onBack && (
            <div className="text-center">
              <Button onClick={onBack} variant="outline" className="border-border/50">
                ← Back to Home
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
