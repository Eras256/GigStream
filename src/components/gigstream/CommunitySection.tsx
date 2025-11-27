'use client'

import { motion } from 'framer-motion'
import { MessageCircle, Twitter, Github, Youtube, Users, Award, TrendingUp, Sparkles } from 'lucide-react'
import Link from 'next/link'
import BlockchainNetwork from './BlockchainNetwork'
import { cn } from '@/lib/utils'

export default function CommunitySection() {
  const socialLinks = [
    {
      name: 'Discord',
      href: 'https://discord.gg/somnia',
      icon: MessageCircle,
      description: 'Join 10,000+ builders',
      color: 'from-indigo-500 to-purple-500',
      members: '10K+'
    },
    {
      name: 'Twitter/X',
      href: 'https://twitter.com/somnia_network',
      icon: Twitter,
      description: 'Latest updates & news',
      color: 'from-blue-400 to-cyan-400',
      members: '25K+'
    },
    {
      name: 'GitHub',
      href: 'https://github.com/somnia-network',
      icon: Github,
      description: 'Open source code',
      color: 'from-gray-600 to-gray-800',
      members: '500+'
    },
    {
      name: 'YouTube',
      href: '#',
      icon: Youtube,
      description: 'Tutorials & demos',
      color: 'from-red-500 to-pink-500',
      members: '5K+'
    }
  ]

  const communityStats = [
    { icon: Users, value: '40K+', label: 'Community Members', color: 'from-somnia-cyan to-cyan-400' },
    { icon: MessageCircle, value: '50K+', label: 'Monthly Messages', color: 'from-somnia-purple to-purple-400' },
    { icon: TrendingUp, value: '200+', label: 'Daily Active Users', color: 'from-mx-green to-emerald-400' },
    { icon: Award, value: '100+', label: 'Contributors', color: 'from-scroll-gold to-yellow-400' }
  ]

  const events = [
    {
      title: 'Somnia Data Streams Hackathon',
      date: 'Winner 2025',
      description: 'GigStream MX won first place in the Somnia Data Streams Hackathon',
      badge: '🏆 Winner'
    },
    {
      title: 'Mexico Web3 Summit',
      date: 'Q2 2025',
      description: 'Presenting GigStream MX at the largest Web3 event in Mexico',
      badge: '📅 Upcoming'
    },
    {
      title: 'LATAM Blockchain Conference',
      date: 'Q3 2025',
      description: 'Expanding GigStream to Colombia, Argentina, and Brazil',
      badge: '🌎 Planned'
    }
  ]

  return (
    <section id="community" className="py-32 bg-gradient-to-b from-somnia-dark to-somnia-dark/95 relative neural-bg overflow-hidden">
      <BlockchainNetwork />
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block mb-4"
          >
            <Users className="w-8 h-8 text-somnia-cyan mx-auto" />
          </motion.div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6">
            <span className="neural-text text-neural-glow-lg">
              Community
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed">
            Join thousands of workers, employers, and builders shaping the future of 
            <span className="text-somnia-cyan font-semibold"> freelance work in Latin America</span>
          </p>
        </motion.div>

        {/* Community Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {communityStats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 text-center neural-hover"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <motion.div
                className={cn(
                  'w-12 h-12 bg-gradient-to-br rounded-xl flex items-center justify-center mx-auto mb-4 shadow-neural-glow',
                  stat.color
                )}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <stat.icon className="w-6 h-6 text-white" />
              </motion.div>
              <div className="text-3xl font-black neural-text mb-1">{stat.value}</div>
              <div className="text-white/70 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-white mb-8 text-center">Join Our Community</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {socialLinks.map((social, idx) => (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 neural-hover relative overflow-hidden"
              >
                <div className={cn(
                  'absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity',
                  social.color
                )} />
                <div className="relative z-10">
                  <motion.div
                    className={cn(
                      'w-16 h-16 bg-gradient-to-br rounded-2xl flex items-center justify-center mb-4 shadow-neural-glow',
                      social.color
                    )}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <social.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <h4 className="text-xl font-bold text-white mb-2">{social.name}</h4>
                  <p className="text-white/70 text-sm mb-3">{social.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/60 font-mono">{social.members}</span>
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <Sparkles className="w-4 h-4 text-somnia-cyan" />
                    </motion.div>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Events & News */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="backdrop-blur-xl bg-white/5 border border-somnia-purple/30 rounded-3xl p-8 md:p-12"
        >
          <h3 className="text-3xl font-bold text-white mb-8 text-center">Events & Milestones</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {events.map((event, idx) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 neural-hover"
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-xs font-mono text-white/60 uppercase tracking-wider">
                    {event.date}
                  </span>
                  <span className="px-2 py-1 bg-gradient-to-r from-somnia-purple/20 to-mx-green/20 border border-somnia-purple/30 rounded-full text-xs text-white/80">
                    {event.badge}
                  </span>
                </div>
                <h4 className="text-xl font-bold text-white mb-3">{event.title}</h4>
                <p className="text-white/70 text-sm leading-relaxed">{event.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

