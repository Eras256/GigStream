'use client'

import { motion } from 'framer-motion'
import { Gamepad2, Zap, Users, Trophy, ArrowRight } from 'lucide-react'
import BlockchainNetwork from '@/components/gigstream/BlockchainNetwork'

export default function ChunkedV2Section() {
  const features = [
    {
      icon: Gamepad2,
      title: 'Real-Time Gaming',
      description: 'Fully on-chain games with sub-second latency. Every action, every interaction, fully verifiable on Somnia.',
      color: 'from-[#00D4FF] to-cyan-400'
    },
    {
      icon: Zap,
      title: 'High-Frequency Updates',
      description: 'Handle thousands of game state updates per second. Perfect for competitive gaming and real-time strategy.',
      color: 'from-[#7B00FF] to-purple-400'
    },
    {
      icon: Users,
      title: 'Massive Multiplayer',
      description: 'Support thousands of concurrent players in a single game instance. No compromises on performance.',
      color: 'from-cyan-400 to-[#00D4FF]'
    },
    {
      icon: Trophy,
      title: 'On-Chain Tournaments',
      description: 'Run competitive tournaments with provably fair outcomes. All results recorded on-chain.',
      color: 'from-purple-400 to-pink-400'
    }
  ]

  const capabilities = [
    'Real-time game state synchronization',
    'On-chain asset ownership and trading',
    'Provably fair game mechanics',
    'Cross-game asset interoperability',
    'Decentralized tournament infrastructure'
  ]

  return (
    <section id="chunked" className="py-32 bg-gradient-to-b from-somnia-dark to-somnia-dark/95 relative overflow-hidden neural-bg">
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
            <Gamepad2 className="w-8 h-8 text-somnia-cyan mx-auto" />
          </motion.div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6">
            <span className="neural-text text-neural-glow-lg">
              Chunked V2
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed">
            Real-time gaming infrastructure on Somnia. Build fully on-chain games with Web2 performance.
            <span className="text-somnia-cyan font-semibold"> The future of blockchain gaming.</span>
          </p>
        </motion.div>

        {/* Key Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="backdrop-blur-xl bg-white/5 border border-somnia-cyan/20 rounded-3xl p-8 hover:border-somnia-cyan/50 transition-all neural-hover"
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
              <p className="text-white/70 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Capabilities */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="backdrop-blur-xl bg-white/5 border border-somnia-cyan/20 rounded-3xl p-8 mb-16"
        >
          <h3 className="text-3xl font-bold text-white mb-8 text-center">Key Capabilities</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {capabilities.map((capability, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-start space-x-3"
              >
                <ArrowRight className="w-5 h-5 text-[#00D4FF] mt-1 flex-shrink-0" />
                <span className="text-white/80">{capability}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Game Types */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="backdrop-blur-xl bg-white/5 border border-somnia-cyan/20 rounded-3xl p-8"
        >
          <h3 className="text-3xl font-bold text-white mb-8 text-center">Supported Game Types</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { type: 'Real-Time Strategy', description: 'RTS games with instant state updates', color: 'from-[#00D4FF] to-[#7B00FF]' },
              { type: 'Battle Royale', description: 'Massive multiplayer competitive games', color: 'from-[#7B00FF] to-purple-400' },
              { type: 'MMORPG', description: 'Persistent worlds with thousands of players', color: 'from-cyan-400 to-[#00D4FF]' }
            ].map((game, idx) => (
              <div key={game.type} className="text-center">
                <div className={`h-32 bg-gradient-to-t ${game.color} rounded-t-xl mb-4`} />
                <p className="text-white font-bold text-xl mb-2">{game.type}</p>
                <p className="text-white/70 text-sm">{game.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

