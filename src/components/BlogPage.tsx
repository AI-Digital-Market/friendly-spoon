import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Article, BookOpen, Clock, User, Eye, Heart, Share, 
  ArrowRight, Calendar, Tag, MagnifyingGlass, Funnel,
  Lightning, Robot, Brain, Gear, Globe, Sparkle,
  Link, Image as ImageIcon, Play, Download
} from '@phosphor-icons/react'
import { useState, useRef } from 'react'

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: {
    name: string
    avatar: string
    bio: string
  }
  publishedAt: Date
  updatedAt: Date
  readTime: number
  views: number
  likes: number
  category: 'history' | 'technology' | 'future' | 'tutorials' | 'insights'
  tags: string[]
  featuredImage: string
  references: Array<{
    title: string
    url: string
    type: 'article' | 'book' | 'research' | 'video'
  }>
  sections: Array<{
    title: string
    content: string
    images?: string[]
    quotes?: Array<{
      text: string
      author: string
      source: string
    }>
  }>
}

interface BlogPageProps {
  onBack?: () => void
}

export function BlogPage({ onBack }: BlogPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set())

  // Sample blog posts
  const blogPosts: BlogPost[] = [
    {
      id: 'ai-history-complete',
      title: 'The Complete History of Artificial Intelligence: From Ancient Dreams to Modern Reality',
      slug: 'complete-history-artificial-intelligence',
      excerpt: 'Journey through 70+ years of AI development, from Turing\'s vision to today\'s LLMs and beyond.',
      content: '',
      author: {
        name: 'Dr. Sarah Chen',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b547?w=150',
        bio: 'AI Research Historian & Former MIT Professor'
      },
      publishedAt: new Date('2024-12-15'),
      updatedAt: new Date('2025-01-20'),
      readTime: 25,
      views: 12847,
      likes: 3421,
      category: 'history',
      tags: ['AI History', 'Timeline', 'Pioneers', 'Innovation'],
      featuredImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
      references: [
        {
          title: 'Computing Machinery and Intelligence - Alan Turing (1950)',
          url: 'https://academic.oup.com/mind/article/LIX/236/433/986238',
          type: 'research'
        },
        {
          title: 'Artificial Intelligence: A Modern Approach - Russell & Norvig',
          url: 'https://aima.cs.berkeley.edu/',
          type: 'book'
        },
        {
          title: 'The Dartmouth Conference on AI (1956)',
          url: 'https://web.archive.org/web/20190701015020/http://www-formal.stanford.edu/jmc/history/dartmouth/dartmouth.html',
          type: 'article'
        },
        {
          title: 'Deep Learning Revolution - Documentary',
          url: 'https://www.youtube.com/watch?v=aircAruvnKk',
          type: 'video'
        }
      ],
      sections: [
        {
          title: '1950s: The Foundation Era',
          content: 'The story of artificial intelligence begins in 1950 when Alan Turing published his groundbreaking paper "Computing Machinery and Intelligence," introducing the famous Turing Test. This period established the theoretical foundations that would guide AI research for decades to come.',
          images: ['https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400'],
          quotes: [
            {
              text: 'I propose to consider the question, "Can machines think?"',
              author: 'Alan Turing',
              source: 'Computing Machinery and Intelligence (1950)'
            }
          ]
        },
        {
          title: '1956: The Birth of AI',
          content: 'The Dartmouth Conference of 1956, organized by John McCarthy, Marvin Minsky, Nathaniel Rochester, and Claude Shannon, officially coined the term "Artificial Intelligence" and launched AI as a field of study. This historic gathering brought together the brightest minds to explore machine intelligence.',
          images: ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'],
          quotes: [
            {
              text: 'Every aspect of learning or any other feature of intelligence can in principle be so precisely described that a machine can be made to simulate it.',
              author: 'Dartmouth Conference Proposal',
              source: 'Summer Research Project on AI (1955)'
            }
          ]
        },
        {
          title: '1960s-70s: Early Programs & Expert Systems',
          content: 'The 1960s saw the development of ELIZA (1966) by Joseph Weizenbaum, one of the first chatbots, and DENDRAL (1965), an expert system for chemical analysis. This era focused on symbolic AI and knowledge representation, laying groundwork for expert systems.',
          images: ['https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400']
        },
        {
          title: '1980s: AI Winter & Expert Systems',
          content: 'Despite initial optimism, AI faced its first "winter" in the mid-1970s due to unmet expectations. However, the 1980s brought a renaissance with expert systems like MYCIN for medical diagnosis and R1/XCON for computer configuration, proving AI\'s commercial value.',
          images: ['https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400']
        },
        {
          title: '1990s: Machine Learning Renaissance',
          content: 'The 1990s marked a shift from rule-based systems to statistical approaches. IBM\'s Deep Blue defeated world chess champion Garry Kasparov in 1997, demonstrating the power of computational brute force combined with sophisticated algorithms.',
          images: ['https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400'],
          quotes: [
            {
              text: 'I could feel - I could smell - a new kind of intelligence across the table.',
              author: 'Garry Kasparov',
              source: 'After losing to Deep Blue (1997)'
            }
          ]
        },
        {
          title: '2000s: Big Data & Neural Networks Return',
          content: 'The 2000s brought massive datasets, increased computational power, and the revival of neural networks. Google\'s PageRank algorithm revolutionized web search, while machine learning became increasingly practical for real-world applications.',
          images: ['https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400']
        },
        {
          title: '2010s: Deep Learning Revolution',
          content: 'The 2010s witnessed the deep learning revolution. In 2012, AlexNet achieved breakthrough results in image recognition. Major milestones included IBM Watson winning Jeopardy! (2011), AlphaGo defeating Lee Sedol (2016), and the emergence of GANs and Transformers.',
          images: ['https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400']
        },
        {
          title: '2020s: Large Language Models & AGI Pursuit',
          content: 'The current decade has been defined by Large Language Models. GPT-3 (2020), GPT-4 (2023), and ChatGPT have brought AI to mainstream consciousness. We\'re witnessing unprecedented capabilities in natural language understanding, code generation, and multimodal AI.',
          images: ['https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400'],
          quotes: [
            {
              text: 'We are approaching a time when computers will be able to learn, reason, and communicate in ways that are indistinguishable from human intelligence.',
              author: 'Sam Altman',
              source: 'OpenAI CEO (2023)'
            }
          ]
        }
      ]
    },
    {
      id: 'neural-networks-evolution',
      title: 'The Evolution of Neural Networks: From Perceptrons to Transformers',
      slug: 'neural-networks-evolution-perceptrons-transformers',
      excerpt: 'Explore how neural networks evolved from simple perceptrons to the sophisticated architectures powering today\'s AI.',
      content: '',
      author: {
        name: 'Prof. Michael Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
        bio: 'Deep Learning Researcher & Stanford Professor'
      },
      publishedAt: new Date('2024-11-20'),
      updatedAt: new Date('2025-01-15'),
      readTime: 18,
      views: 8934,
      likes: 2156,
      category: 'technology',
      tags: ['Neural Networks', 'Deep Learning', 'Architecture', 'Transformers'],
      featuredImage: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800',
      references: [
        {
          title: 'Attention Is All You Need - Vaswani et al.',
          url: 'https://arxiv.org/abs/1706.03762',
          type: 'research'
        },
        {
          title: 'Deep Learning - Ian Goodfellow',
          url: 'https://www.deeplearningbook.org/',
          type: 'book'
        }
      ],
      sections: [
        {
          title: '1943: The First Artificial Neuron',
          content: 'Warren McCulloch and Walter Pitts published the first mathematical model of an artificial neuron, establishing the theoretical foundation for all future neural network development.',
          images: ['https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400']
        },
        {
          title: '1957: The Perceptron',
          content: 'Frank Rosenblatt introduced the perceptron, the first algorithm capable of learning from data. Despite its limitations, it sparked decades of research into artificial neural networks.',
          images: ['https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400']
        }
      ]
    },
    {
      id: 'ai-future-predictions',
      title: 'AI in 2030: Expert Predictions and Technological Horizons',
      slug: 'ai-2030-expert-predictions-technological-horizons',
      excerpt: 'Leading AI researchers share their predictions for the next decade of artificial intelligence development.',
      content: '',
      author: {
        name: 'Dr. Elena Vasquez',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150',
        bio: 'AI Futurist & Former Google Research Scientist'
      },
      publishedAt: new Date('2025-01-10'),
      updatedAt: new Date('2025-01-25'),
      readTime: 12,
      views: 15623,
      likes: 4892,
      category: 'future',
      tags: ['Future', 'Predictions', 'AGI', 'Technology'],
      featuredImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
      references: [
        {
          title: 'The Future of AI - MIT Technology Review',
          url: 'https://www.technologyreview.com/artificial-intelligence/',
          type: 'article'
        }
      ],
      sections: [
        {
          title: 'AGI Timeline Predictions',
          content: 'Leading experts predict AGI could arrive between 2027-2035, with significant variations in confidence levels and definitions.',
          images: ['https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400']
        }
      ]
    },
    {
      id: 'building-first-ai-model',
      title: 'Building Your First AI Model: A Complete Beginner\'s Guide',
      slug: 'building-first-ai-model-beginners-guide',
      excerpt: 'Step-by-step tutorial for creating your first machine learning model using Python and TensorFlow.',
      content: '',
      author: {
        name: 'Alex Thompson',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        bio: 'ML Engineer & Technical Writer'
      },
      publishedAt: new Date('2024-12-05'),
      updatedAt: new Date('2025-01-05'),
      readTime: 15,
      views: 6789,
      likes: 1834,
      category: 'tutorials',
      tags: ['Tutorial', 'Machine Learning', 'Python', 'TensorFlow'],
      featuredImage: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800',
      references: [
        {
          title: 'TensorFlow Official Documentation',
          url: 'https://www.tensorflow.org/tutorials',
          type: 'article'
        }
      ],
      sections: [
        {
          title: 'Setting Up Your Environment',
          content: 'First, we\'ll install Python, TensorFlow, and other necessary libraries for building your first AI model.',
          images: ['https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400']
        }
      ]
    },
    {
      id: 'ethics-ai-development',
      title: 'Ethics in AI Development: Navigating the Moral Landscape',
      slug: 'ethics-ai-development-moral-landscape',
      excerpt: 'Exploring the ethical challenges and responsibilities in artificial intelligence development and deployment.',
      content: '',
      author: {
        name: 'Dr. Raj Patel',
        avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150',
        bio: 'AI Ethics Researcher & Philosophy Professor'
      },
      publishedAt: new Date('2024-10-18'),
      updatedAt: new Date('2024-12-20'),
      readTime: 20,
      views: 4567,
      likes: 1289,
      category: 'insights',
      tags: ['Ethics', 'AI Safety', 'Philosophy', 'Society'],
      featuredImage: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=800',
      references: [
        {
          title: 'Weapons of Math Destruction - Cathy O\'Neil',
          url: 'https://weaponsofmathdestructionbook.com/',
          type: 'book'
        }
      ],
      sections: [
        {
          title: 'Bias in AI Systems',
          content: 'Understanding how unconscious biases can be encoded into AI systems and their impact on society.',
          images: ['https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400']
        }
      ]
    }
  ]

  const categories = [
    { id: 'all', name: 'All Posts', icon: BookOpen, count: blogPosts.length },
    { id: 'history', name: 'AI History', icon: Clock, count: blogPosts.filter(p => p.category === 'history').length },
    { id: 'technology', name: 'Technology', icon: Gear, count: blogPosts.filter(p => p.category === 'technology').length },
    { id: 'future', name: 'Future', icon: Lightning, count: blogPosts.filter(p => p.category === 'future').length },
    { id: 'tutorials', name: 'Tutorials', icon: BookOpen, count: blogPosts.filter(p => p.category === 'tutorials').length },
    { id: 'insights', name: 'Insights', icon: Brain, count: blogPosts.filter(p => p.category === 'insights').length }
  ]

  const filteredPosts = selectedCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory)

  const searchedPosts = searchQuery 
    ? filteredPosts.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : filteredPosts

  const toggleLike = (postId: string) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev)
      if (newSet.has(postId)) {
        newSet.delete(postId)
      } else {
        newSet.add(postId)
      }
      return newSet
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const openPost = (post: BlogPost) => {
    setSelectedPost(post)
  }

  const closePost = () => {
    setSelectedPost(null)
  }

  // If a post is selected, show the full article view
  if (selectedPost) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            
            {/* Back Button */}
            <Button
              onClick={closePost}
              variant="outline"
              className="mb-6 border-slate-600 text-gray-300 hover:bg-slate-800"
            >
              ← Back to Blog
            </Button>

            {/* Article Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <img 
                src={selectedPost.featuredImage}
                alt={selectedPost.title}
                className="w-full h-64 md:h-96 object-cover rounded-lg mb-6"
              />
              
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <Badge variant="secondary" className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30">
                  {selectedPost.category.charAt(0).toUpperCase() + selectedPost.category.slice(1)}
                </Badge>
                {selectedPost.tags.map(tag => (
                  <Badge key={tag} variant="outline" className="border-slate-600 text-gray-300">
                    {tag}
                  </Badge>
                ))}
              </div>

              <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                {selectedPost.title}
              </h1>

              <div className="flex items-center gap-6 text-gray-400 mb-6">
                <div className="flex items-center gap-2">
                  <img 
                    src={selectedPost.author.avatar}
                    alt={selectedPost.author.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <span>{selectedPost.author.name}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar size={16} />
                  <span>{formatDate(selectedPost.publishedAt)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={16} />
                  <span>{selectedPost.readTime} min read</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye size={16} />
                  <span>{selectedPost.views.toLocaleString()} views</span>
                </div>
              </div>

              <p className="text-xl text-gray-300 leading-relaxed">
                {selectedPost.excerpt}
              </p>
            </motion.div>

            {/* Article Content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="space-y-12"
            >
              {selectedPost.sections.map((section, index) => (
                <div key={index} className="space-y-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    {section.title}
                  </h2>
                  
                  <div className="prose prose-lg prose-invert max-w-none">
                    <p className="text-gray-300 leading-relaxed text-lg">
                      {section.content}
                    </p>
                  </div>

                  {section.images && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {section.images.map((image, imgIndex) => (
                        <img 
                          key={imgIndex}
                          src={image}
                          alt={`${section.title} illustration ${imgIndex + 1}`}
                          className="w-full h-64 object-cover rounded-lg"
                        />
                      ))}
                    </div>
                  )}

                  {section.quotes && section.quotes.map((quote, quoteIndex) => (
                    <blockquote key={quoteIndex} className="border-l-4 border-indigo-500 pl-6 my-8">
                      <p className="text-xl italic text-gray-200 mb-2">
                        "{quote.text}"
                      </p>
                      <cite className="text-gray-400">
                        — {quote.author}, {quote.source}
                      </cite>
                    </blockquote>
                  ))}
                </div>
              ))}
            </motion.div>

            {/* References */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-16 p-6 bg-slate-800/50 rounded-lg border border-slate-700"
            >
              <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
                <Link size={24} className="text-indigo-400" />
                References & Further Reading
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedPost.references.map((ref, index) => (
                  <a
                    key={index}
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-slate-900/50 rounded-lg hover:bg-slate-700/50 transition-colors"
                  >
                    <div className="text-indigo-400">
                      {ref.type === 'book' && <BookOpen size={20} />}
                      {ref.type === 'article' && <Article size={20} />}
                      {ref.type === 'research' && <Brain size={20} />}
                      {ref.type === 'video' && <Play size={20} />}
                    </div>
                    <div>
                      <p className="text-white font-medium">{ref.title}</p>
                      <p className="text-gray-400 text-sm capitalize">{ref.type}</p>
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Author Bio */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-12 p-6 bg-slate-800/50 rounded-lg border border-slate-700"
            >
              <h3 className="text-xl font-bold mb-4 text-white">About the Author</h3>
              <div className="flex items-center gap-4">
                <img 
                  src={selectedPost.author.avatar}
                  alt={selectedPost.author.name}
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h4 className="text-lg font-medium text-white">{selectedPost.author.name}</h4>
                  <p className="text-gray-400">{selectedPost.author.bio}</p>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-8 flex items-center justify-center gap-4"
            >
              <Button
                onClick={() => toggleLike(selectedPost.id)}
                variant="outline"
                className={`border-slate-600 ${
                  likedPosts.has(selectedPost.id) 
                    ? 'bg-red-500/20 text-red-300 border-red-500/30' 
                    : 'text-gray-300 hover:bg-slate-800'
                }`}
              >
                <Heart size={16} className="mr-2" weight={likedPosts.has(selectedPost.id) ? 'fill' : 'regular'} />
                {selectedPost.likes + (likedPosts.has(selectedPost.id) ? 1 : 0)}
              </Button>
              
              <Button variant="outline" className="border-slate-600 text-gray-300 hover:bg-slate-800">
                <Share size={16} className="mr-2" />
                Share
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20" />
        <div className="container mx-auto px-4 py-16 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            {/* Blog Logo & Name */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                <img 
                  src="https://avatars.githubusercontent.com/u/223208802?s=400&u=5249ef08c9d130551422585dd7d29c8330579c1a&v=4" 
                  alt="One Last AI Logo" 
                  className="w-16 h-16 rounded-full ring-4 ring-indigo-500/50 shadow-2xl shadow-indigo-500/25"
                />
                <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full opacity-20 blur-lg animate-pulse"></div>
                <motion.div 
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-2 -right-2"
                >
                  <Article size={16} className="text-indigo-400" weight="fill" />
                </motion.div>
              </motion.div>
              <div>
                <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  BLOG
                </h1>
                <p className="text-lg text-gray-300">AI Knowledge & Insights Hub</p>
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
                Explore the fascinating world of artificial intelligence through comprehensive articles, 
                historical deep-dives, and expert insights. From AI's pioneering days to future predictions.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Badge variant="secondary" className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30">
                  <BookOpen className="w-4 h-4 mr-1" />
                  Expert Articles
                </Badge>
                <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                  <Clock className="w-4 h-4 mr-1" />
                  Historical Timeline
                </Badge>
                <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                  <Brain className="w-4 h-4 mr-1" />
                  Deep Insights
                </Badge>
                <Badge variant="secondary" className="bg-green-500/20 text-green-300 border-green-500/30">
                  <Link className="w-4 h-4 mr-1" />
                  Referenced Sources
                </Badge>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Main Blog Interface */}
      <div className="container mx-auto px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Search & Filter */}
          <div className="mb-8">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Search */}
                  <div className="flex-1">
                    <div className="relative">
                      <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search articles, topics, or tags..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-600 bg-slate-900/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>

                  {/* Category Filter */}
                  <div className="flex flex-wrap gap-2">
                    {categories.map(category => {
                      const IconComponent = category.icon
                      return (
                        <Button
                          key={category.id}
                          variant={selectedCategory === category.id ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedCategory(category.id)}
                          className={`${
                            selectedCategory === category.id
                              ? 'bg-indigo-500 hover:bg-indigo-600 text-white border-indigo-500'
                              : 'border-slate-600 text-gray-300 hover:bg-slate-700'
                          }`}
                        >
                          <IconComponent size={16} className="mr-2" />
                          {category.name} ({category.count})
                        </Button>
                      )
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Blog Posts Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {searchedPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ delay: index * 0.1 }}
                  className="group cursor-pointer"
                  onClick={() => openPost(post)}
                >
                  <Card className="h-full bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-700/50 transition-all duration-300 hover:scale-105">
                    {/* Featured Image */}
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img 
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge variant="secondary" className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30">
                          {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                        </Badge>
                      </div>
                      <div className="absolute top-4 right-4 flex items-center gap-2">
                        <Badge variant="secondary" className="bg-black/20 text-white border-black/30">
                          <Clock size={12} className="mr-1" />
                          {post.readTime} min
                        </Badge>
                      </div>
                    </div>

                    <CardHeader className="pb-3">
                      <CardTitle className="text-white group-hover:text-indigo-300 transition-colors line-clamp-2">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="text-gray-400 line-clamp-3">
                        {post.excerpt}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="pt-0">
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {post.tags.slice(0, 3).map(tag => (
                          <Badge key={tag} variant="outline" className="border-slate-600 text-gray-400 text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {post.tags.length > 3 && (
                          <Badge variant="outline" className="border-slate-600 text-gray-400 text-xs">
                            +{post.tags.length - 3}
                          </Badge>
                        )}
                      </div>

                      {/* Author & Stats */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <img 
                            src={post.author.avatar}
                            alt={post.author.name}
                            className="w-6 h-6 rounded-full"
                          />
                          <span className="text-sm text-gray-400">{post.author.name}</span>
                        </div>

                        <div className="flex items-center justify-between text-sm text-gray-400">
                          <span>{formatDate(post.publishedAt)}</span>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <Eye size={14} />
                              <span>{post.views.toLocaleString()}</span>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                toggleLike(post.id)
                              }}
                              className={`flex items-center gap-1 hover:text-red-400 transition-colors ${
                                likedPosts.has(post.id) ? 'text-red-400' : ''
                              }`}
                            >
                              <Heart size={14} weight={likedPosts.has(post.id) ? 'fill' : 'regular'} />
                              <span>{post.likes + (likedPosts.has(post.id) ? 1 : 0)}</span>
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Read More */}
                      <div className="mt-4 pt-4 border-t border-slate-700">
                        <div className="flex items-center justify-between">
                          <span className="text-indigo-400 group-hover:text-indigo-300 font-medium">
                            Read Article
                          </span>
                          <ArrowRight size={16} className="text-indigo-400 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* No Results */}
          {searchedPosts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="text-gray-400 mb-4">
                <Search size={48} className="mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-2">No articles found</h3>
                <p>Try adjusting your search or filter criteria.</p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Back Button */}
        {onBack && (
          <div className="text-center mt-12">
            <Button onClick={onBack} variant="outline" className="border-slate-600 text-gray-300 hover:bg-slate-800">
              ← Back to Home
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
