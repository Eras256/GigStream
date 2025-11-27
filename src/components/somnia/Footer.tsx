'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ArrowUp, Mail, Github, Twitter, MessageCircle, Youtube, Send } from 'lucide-react'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault()
    // Newsletter signup logic
    setEmail('')
  }

  const companyLinks = [
    { name: 'About', href: '#about' },
    { name: 'Careers', href: '#careers' },
    { name: 'Blog', href: '#blog' },
    { name: 'Whitepaper PDF', href: '/whitepaper.pdf' }
  ]

  const productLinks = [
    { name: 'Technology', href: '#technology' },
    { name: 'Ecosystem', href: '#ecosystem' },
    { name: 'SOMI Token', href: '#somi' },
    { name: 'Developers', href: '#developers' },
    { name: 'Roadmap', href: '#roadmap' }
  ]

  const communityLinks = [
    { name: 'Discord', href: 'https://discord.gg/somnia', icon: MessageCircle },
    { name: 'Twitter/X', href: 'https://twitter.com/somnia_network', icon: Twitter },
    { name: 'GitHub', href: 'https://github.com/somnia-network', icon: Github },
    { name: 'YouTube', href: '#', icon: Youtube }
  ]

  const legalLinks = [
    { name: 'Privacy Policy', href: '#privacy' },
    { name: 'Terms', href: '#terms' },
    { name: 'KYC/AML', href: '#kyc' },
    { name: 'MiCA Compliance', href: '#mica' }
  ]

  return (
    <footer className="relative bg-gradient-to-b from-somnia-dark to-black border-t border-somnia-cyan/20">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Company */}
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wide text-sm">Company</h4>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-white/60 hover:text-[#00D4FF] transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wide text-sm">Product</h4>
            <ul className="space-y-2">
              {productLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-white/60 hover:text-[#00D4FF] transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wide text-sm">Community</h4>
            <ul className="space-y-2">
              {communityLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-white/60 hover:text-[#00D4FF] transition-colors text-sm"
                  >
                    <link.icon className="w-4 h-4" />
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wide text-sm">Legal</h4>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-white/60 hover:text-[#00D4FF] transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wide text-sm">Newsletter</h4>
            <form onSubmit={handleNewsletter} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-2 bg-white/10 border border-somnia-cyan/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-somnia-cyan/50 text-sm"
                required
              />
              <motion.button
                type="submit"
                className="w-full px-4 py-2 bg-gradient-to-r from-[#00D4FF] to-[#7B00FF] rounded-xl text-white font-bold text-sm flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Subscribe</span>
                <Send className="w-4 h-4" />
              </motion.button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-white/60 text-sm text-center md:text-left">
              © 2025 GigStream MX. Built on Somnia Network.
            </div>
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <span className="text-white/80 text-sm font-semibold">
                Made by <span className="text-somnia-cyan">Vaiosx</span> and <span className="text-somnia-cyan">M0nsxx</span>
              </span>
              <span className="text-white/60 text-sm">Somnia Network</span>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top - Bottom Left */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={scrollToTop}
            className="fixed bottom-8 left-8 w-14 h-14 bg-gradient-to-r from-[#00D4FF] to-[#7B00FF] rounded-full flex items-center justify-center text-white shadow-neural-glow-lg z-50"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Back to top"
          >
            <ArrowUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  )
}

