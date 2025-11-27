'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, ArrowUp, Zap, TrendingUp, Users, Activity } from 'lucide-react'

export default function HeroSection() {
  const [tps, setTps] = useState(412000)
  const [staked, setStaked] = useState(12500000)
  const [validators, setValidators] = useState(102)

  useEffect(() => {
    // Simulate live metrics updates
    const interval = setInterval(() => {
      setTps(prev => prev + Math.floor(Math.random() * 1000) - 500)
      setStaked(prev => prev + Math.floor(Math.random() * 10000))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const metrics = [
    { icon: Activity, value: `${(tps / 1000).toFixed(0)}k+`, label: 'TPS', color: 'from-[#00D4FF] to-[#7B00FF]' },
    { icon: Zap, value: '<1s', label: 'Finality', color: 'from-[#7B00FF] to-[#00D4FF]' },
    { icon: Users, value: `${validators}+`, label: 'Validators', color: 'from-[#00D4FF] to-cyan-400' },
    { icon: TrendingUp, value: `${(staked / 1000000).toFixed(1)}M`, label: 'SOMI Staked', color: 'from-[#7B00FF] to-purple-400' }
  ]

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-somnia-dark via-purple-900/20 to-cyan-900/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,212,255,0.1),transparent_50%)]" />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00D4FF] rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#7B00FF] rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight"
          >
            <span className="bg-gradient-to-r from-[#00D4FF] via-[#7B00FF] to-[#00D4FF] bg-clip-text text-transparent animate-gradient">
              Somnia: The Fastest EVM L1
            </span>
            <br />
            <span className="text-white">for Real-Time Worlds</span>
          </motion.h1>

          {/* Subheadline with Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-3 mb-8"
          >
            {metrics.map((metric, idx) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + idx * 0.1 }}
                className="px-4 py-2 backdrop-blur-xl bg-white/5 border border-somnia-cyan/30 rounded-full"
              >
                <div className="flex items-center space-x-2">
                  <metric.icon className={`w-4 h-4 bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`} />
                  <span className="text-white font-bold">{metric.value}</span>
                  <span className="text-white/60 text-sm">{metric.label}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Power mass-consumer apps at Web2 scale with Web3 ownership.
            <br />
            <span className="text-[#00D4FF]">Gaming, metaverses, social</span> – fully on-chain, real-time performance.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link href="#developers">
              <motion.button
                className="group px-8 py-4 bg-gradient-to-r from-[#00D4FF] to-[#7B00FF] rounded-2xl text-white font-bold text-lg shadow-neural-glow-lg flex items-center space-x-2"
                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(0,212,255,0.5)' }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Build on Somnia</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
            <Link href="#somi">
              <motion.button
                className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 rounded-2xl text-white font-bold text-lg transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Stake SOMI Now
              </motion.button>
            </Link>
          </motion.div>

          {/* Live Metrics Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
          >
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="backdrop-blur-xl bg-white/5 border border-somnia-cyan/20 rounded-2xl p-4"
              >
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <metric.icon className={`w-5 h-5 bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`} />
                  <span className="text-2xl font-black text-white">{metric.value}</span>
                </div>
                <p className="text-white/60 text-sm uppercase tracking-wide">{metric.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center space-y-2 text-white/60"
        >
          <span className="text-sm uppercase tracking-wide">Scroll</span>
          <ArrowUp className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  )
}

