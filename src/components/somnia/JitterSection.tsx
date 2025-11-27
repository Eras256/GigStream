'use client'

import { motion } from 'framer-motion'
import { Coins, TrendingUp, Zap, BarChart3, ArrowRight } from 'lucide-react'
import BlockchainNetwork from '@/components/gigstream/BlockchainNetwork'

export default function JitterSection() {
  const features = [
    {
      icon: Zap,
      title: 'High-Frequency Trading',
      description: 'Execute trades at microsecond latency. Perfect for arbitrage, market making, and algorithmic trading strategies.',
      color: 'from-[#00D4FF] to-cyan-400'
    },
    {
      icon: TrendingUp,
      title: 'Sub-Second Finality',
      description: 'Trade with confidence knowing transactions finalize in less than one second. No waiting for confirmations.',
      color: 'from-[#7B00FF] to-purple-400'
    },
    {
      icon: Coins,
      title: 'Ultra-Low Fees',
      description: 'Sub-cent transaction costs enable profitable micro-trades and high-frequency strategies previously impossible.',
      color: 'from-cyan-400 to-[#00D4FF]'
    },
    {
      icon: BarChart3,
      title: 'Real-Time Analytics',
      description: 'Monitor markets, track positions, and analyze performance with real-time data streams from Somnia.',
      color: 'from-purple-400 to-pink-400'
    }
  ]

  const strategies = [
    'Arbitrage across multiple DEXs',
    'Market making with tight spreads',
    'Flash loan strategies',
    'Liquidity provision optimization',
    'Cross-chain arbitrage'
  ]

  return (
    <section id="jitter" className="py-32 bg-gradient-to-b from-somnia-dark/95 to-somnia-dark relative overflow-hidden neural-bg">
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
            <Coins className="w-8 h-8 text-somnia-cyan mx-auto" />
          </motion.div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6">
            <span className="neural-text text-neural-glow-lg">
              Jitter
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed">
            High-frequency trading DeFi on Somnia. Execute strategies at Web2 speeds with Web3 ownership.
            <span className="text-somnia-cyan font-semibold"> Professional trading infrastructure for DeFi.</span>
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

        {/* Trading Strategies */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="backdrop-blur-xl bg-white/5 border border-somnia-cyan/20 rounded-3xl p-8 mb-16"
        >
          <h3 className="text-3xl font-bold text-white mb-8 text-center">Supported Trading Strategies</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {strategies.map((strategy, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-start space-x-3"
              >
                <ArrowRight className="w-5 h-5 text-[#00D4FF] mt-1 flex-shrink-0" />
                <span className="text-white/80">{strategy}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Performance Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="backdrop-blur-xl bg-white/5 border border-somnia-cyan/20 rounded-3xl p-8"
        >
          <h3 className="text-3xl font-bold text-white mb-8 text-center">Performance Metrics</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { metric: 'Latency', value: '<1ms', color: 'from-[#00D4FF] to-[#7B00FF]' },
              { metric: 'TPS', value: '400k+', color: 'from-[#7B00FF] to-purple-400' },
              { metric: 'Finality', value: '<1s', color: 'from-cyan-400 to-[#00D4FF]' },
              { metric: 'Gas Cost', value: '<$0.01', color: 'from-purple-400 to-pink-400' }
            ].map((item, idx) => (
              <div key={item.metric} className="text-center">
                <div className={`h-24 bg-gradient-to-t ${item.color} rounded-t-xl mb-4`} />
                <p className="text-white font-bold text-lg mb-1">{item.metric}</p>
                <p className="text-[#00D4FF] font-bold text-xl">{item.value}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

