'use client'

import { motion } from 'framer-motion'
import { Target, Globe, Zap, Users, Sparkles, TrendingUp } from 'lucide-react'
import BlockchainNetwork from './BlockchainNetwork'

export default function WhatWeDoSection() {
  const missions = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'Democratize access to work opportunities for Mexico\'s 56 million informal workers. Bridge the gap between traditional economy and Web3 innovation.',
      color: 'from-somnia-purple to-purple-400'
    },
    {
      icon: Globe,
      title: 'The Problem',
      description: '56M workers lack formal job security. Traditional platforms charge 20-30% fees. Payment delays. No reputation portability. Limited to urban areas.',
      color: 'from-red-400 to-orange-400'
    },
    {
      icon: Zap,
      title: 'Our Solution',
      description: 'Real-time job matching via Somnia Data Streams. Zero fees. Instant payments. Portable reputation. Accessible to all 56M workers across Mexico.',
      color: 'from-mx-green to-emerald-400'
    },
    {
      icon: Users,
      title: 'The Impact',
      description: 'Unlock $10B informal economy. Enable financial inclusion. Build on-chain reputation. Create sustainable income streams for millions.',
      color: 'from-scroll-gold to-yellow-400'
    }
  ]

  return (
    <section id="what-we-do" className="py-20 bg-gradient-to-b from-somnia-dark/95 to-somnia-dark relative neural-bg overflow-hidden">
      <BlockchainNetwork />
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block mb-4"
          >
            <TrendingUp className="w-8 h-8 text-mx-green mx-auto" />
          </motion.div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6">
            <span className="neural-text text-neural-glow-lg">
              What We Do
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed">
            Transforming Mexico&apos;s informal economy through 
            <span className="text-somnia-cyan font-semibold"> blockchain technology</span> and real-time job matching.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {missions.map((mission, idx) => (
            <motion.div
              key={mission.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative"
            >
              <div className="h-full backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-10 hover:border-somnia-purple/50 transition-all duration-500 hover:shadow-neural-glow-xl neural-hover relative overflow-hidden group">
                <div className="neural-shimmer absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className={`absolute inset-0 bg-gradient-to-br ${mission.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  <motion.div
                    className={`w-20 h-20 bg-gradient-to-br ${mission.color} rounded-2xl flex items-center justify-center mb-6 shadow-neural-glow`}
                    whileHover={{ scale: 1.15, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <mission.icon className="w-10 h-10 text-white" />
                  </motion.div>
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 group-hover:text-somnia-cyan transition-colors">
                    {mission.title}
                  </h3>
                  <p className="text-white/80 leading-relaxed text-lg">
                    {mission.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Stats Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 backdrop-blur-xl bg-gradient-to-r from-somnia-purple/20 via-somnia-cyan/20 to-mx-green/20 border border-somnia-purple/30 rounded-3xl p-12 neural-hover"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative"
            >
              <div className="text-6xl font-black neural-text mb-2">56M+</div>
              <div className="text-white/80 text-lg uppercase tracking-wide font-bold mb-1">Informal Workers</div>
              <div className="text-white/60 text-sm">Mexico&apos;s informal economy</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative"
            >
              <div className="text-6xl font-black neural-text mb-2">$10B</div>
              <div className="text-white/80 text-lg uppercase tracking-wide font-bold mb-1">Market Size</div>
              <div className="text-white/60 text-sm">Annual opportunity</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative"
            >
              <div className="text-6xl font-black neural-text mb-2">&lt;2s</div>
              <div className="text-white/80 text-lg uppercase tracking-wide font-bold mb-1">Job Matching</div>
              <div className="text-white/60 text-sm">Sub-second finality</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

