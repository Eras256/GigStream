'use client'

import { motion } from 'framer-motion'
import { Zap, Shield, DollarSign, Globe, Clock, Users, Network, Brain, Lock, Sparkles, Database, Code } from 'lucide-react'
import BlockchainNetwork from './BlockchainNetwork'

export default function FeaturesSection() {
  const features = [
    {
      icon: Zap,
      title: 'Real-Time Job Matching',
      description: 'Jobs appear instantly via Somnia Data Streams with WebSocket connections. No polling, no delays. Sub-second job posting and bid matching powered by 400k+ TPS throughput.',
      technical: 'Somnia Data Streams SDK 0.11 • WebSocket subscriptions • Sub-second finality',
      color: 'from-somnia-purple to-purple-400',
      glow: 'shadow-[0_0_30px_hsl(var(--somnia-purple)/0.5)]'
    },
    {
      icon: Shield,
      title: 'Smart Contract Escrow',
      description: 'Audited Solidity escrow contracts ensure payment security. Funds locked in multi-signature escrow until work completion. Zero disputes, zero fraud, fully on-chain.',
      technical: 'Hardhat-tested • Multi-sig escrow • Auto-release on completion • Solidity 0.8.29',
      color: 'from-mx-green to-emerald-400',
      glow: 'shadow-[0_0_30px_hsl(var(--mx-green)/0.5)]'
    },
    {
      icon: DollarSign,
      title: 'Zero Platform Fees',
      description: 'No platform fees. Workers keep 100% of earnings. Employers pay only gas fees. Built for the 56M informal economy with cost-effective transactions.',
      technical: 'Zero-fee model • Gas-optimized contracts • STT testnet tokens for testing',
      color: 'from-scroll-gold to-yellow-400',
      glow: 'shadow-[0_0_30px_hsl(var(--scroll-gold)/0.5)]'
    },
    {
      icon: Globe,
      title: 'Mexico-First Design',
      description: 'Designed for Mexican freelancers: plumbers, electricians, event crews, DJs. Local payment methods, Spanish-first UX, cultural understanding.',
      technical: 'Bilingual interface • Local payment integration • Cultural localization',
      color: 'from-cyan-400 to-blue-400',
      glow: 'shadow-[0_0_30px_hsl(188_100%_50%/0.5)]'
    },
    {
      icon: Clock,
      title: 'Instant Payments',
      description: 'Auto-release on completion via smart contract verification. No waiting, no manual approval. Smart contracts handle everything automatically with sub-second finality.',
      technical: 'Automated escrow release • Work verification • Instant settlement',
      color: 'from-pink-400 to-rose-400',
      glow: 'shadow-[0_0_30px_hsl(330_100%_70%/0.5)]'
    },
    {
      icon: Users,
      title: 'On-Chain Reputation System',
      description: 'Transparent reputation system built on-chain. Build verifiable trust with portable reputation tokens (ERC-20). Reputation increases with each completed job, creating a transparent work history.',
      technical: 'ERC-20 reputation tokens • On-chain reputation • Portable reputation • Verifiable work history',
      color: 'from-indigo-400 to-purple-400',
      glow: 'shadow-[0_0_30px_hsl(var(--somnia-purple)/0.5)]'
    },
    {
      icon: Brain,
      title: 'Google Gemini AI',
      description: 'Advanced AI integration with Google Gemini for intelligent job title suggestions, skill-based matching, automated bid recommendations, and smart job categorization. Enhanced with fallback model chain for 99.9% uptime reliability.',
      technical: 'Google Gemini API • Multi-model fallback • AI job suggestions • Smart skill matching • Real-time AI insights',
      color: 'from-somnia-cyan via-blue-400 to-purple-400',
      glow: 'shadow-[0_0_40px_hsl(188_100%_50%/0.7)]',
      featured: true
    },
    {
      icon: Network,
      title: 'Somnia Network Integration',
      description: 'Built on Somnia L1 EVM-compatible blockchain with MultiStream Consensus, IceDB, and compiled EVM to x86 for 30x performance boost.',
      technical: 'Somnia L1 • MultiStream Consensus • IceDB • 400k+ TPS • Sub-second finality',
      color: 'from-somnia-purple via-somnia-cyan to-mx-green',
      glow: 'shadow-[0_0_40px_hsl(var(--somnia-purple)/0.6)]'
    },
    {
      icon: Database,
      title: 'On-Chain Data Streams',
      description: 'Real-time job feeds, bid updates, and reputation changes streamed directly from Somnia blockchain. No database polling required.',
      technical: 'Somnia Data Streams • Real-time WebSocket • Live job feeds • Event streaming',
      color: 'from-mx-green via-somnia-cyan to-somnia-purple',
      glow: 'shadow-[0_0_30px_hsl(var(--mx-green)/0.5)]'
    }
  ]

  return (
    <section id="features" className="py-20 bg-gradient-to-b from-transparent to-somnia-dark/50 relative neural-bg overflow-hidden">
      <BlockchainNetwork />
      {/* Neural Background Effects */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-0 left-1/4 w-96 h-96 bg-somnia-purple rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-mx-green rounded-full blur-3xl"
        />
      </div>

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
            <Sparkles className="w-8 h-8 text-somnia-purple mx-auto" />
          </motion.div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6">
            <span className="neural-text text-neural-glow-lg">
              Advanced Features
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed">
            Enterprise-grade technology stack for real-time freelance work, 
            <span className="text-somnia-cyan font-semibold"> powered by Somnia Network</span> and 
            <span className="text-somnia-cyan font-semibold"> Google Gemini AI</span>
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: idx * 0.1, type: 'spring', stiffness: 100 }}
              className="group relative"
              whileHover={{ y: -8 }}
            >
              <div className={`h-full backdrop-blur-xl bg-white/5 border ${feature.featured ? 'border-somnia-cyan/40' : 'border-white/10'} rounded-3xl p-8 hover:border-somnia-purple/50 transition-all duration-500 neural-hover relative overflow-hidden ${feature.glow} group-hover:shadow-neural-glow-xl`}>
                {/* Featured Badge for Gemini */}
                {feature.featured && (
                  <div className="absolute -top-3 -right-3 px-3 py-1 bg-gradient-to-r from-somnia-cyan to-purple-400 rounded-full border-2 border-somnia-dark">
                    <span className="text-xs font-bold text-white">AI POWERED</span>
                  </div>
                )}
                
                {/* Neural Shimmer Effect */}
                <div className="neural-shimmer absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                {/* Gradient Overlay on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  <motion.div
                    className={`w-20 h-20 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-neural-glow`}
                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <feature.icon className="w-10 h-10 text-white" />
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-somnia-cyan transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-white/80 leading-relaxed mb-4 text-base">
                    {feature.description}
                  </p>
                  
                  <div className="pt-4 border-t border-white/10">
                    <p className="text-xs text-white/50 font-mono leading-relaxed">
                      {feature.technical}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Technology Stack Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 backdrop-blur-xl bg-gradient-to-r from-somnia-purple/20 to-mx-green/20 border border-somnia-purple/30 rounded-3xl p-8 md:p-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div>
              <Code className="w-12 h-12 text-somnia-cyan mx-auto mb-3" />
              <div className="text-2xl font-black text-white mb-2">Next.js 14</div>
              <div className="text-white/60 text-sm">React 18 • TypeScript</div>
            </div>
            <div>
              <Network className="w-12 h-12 text-somnia-purple mx-auto mb-3" />
              <div className="text-2xl font-black text-white mb-2">Somnia L1</div>
              <div className="text-white/60 text-sm">EVM • 400k+ TPS</div>
            </div>
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="mb-3"
              >
                <Brain className="w-12 h-12 text-somnia-cyan mx-auto drop-shadow-[0_0_20px_hsl(188_100%_50%/0.6)]" />
              </motion.div>
              <div className="text-2xl font-black neural-text mb-2">Google Gemini</div>
              <div className="text-white/80 text-sm font-semibold mb-1">AI-Powered Matching</div>
              <div className="text-white/60 text-xs">Multi-model fallback • Real-time insights</div>
            </div>
            <div>
              <Lock className="w-12 h-12 text-scroll-gold mx-auto mb-3" />
              <div className="text-2xl font-black text-white mb-2">Hardhat</div>
              <div className="text-white/60 text-sm">Solidity 0.8.29 • Tested</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

