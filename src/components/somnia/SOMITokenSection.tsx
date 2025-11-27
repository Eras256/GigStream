'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Coins, TrendingUp, Flame, Users, ArrowRight, Sparkles } from 'lucide-react'
import BlockchainNetwork from '@/components/gigstream/BlockchainNetwork'

export default function SOMITokenSection() {
  const [apy, setApy] = useState(12.5)
  const [stakeAmount, setStakeAmount] = useState(10000)

  const tokenomics = [
    { label: 'Ecosystem', value: 30, color: 'from-[#00D4FF] to-cyan-400' },
    { label: 'Staking Rewards', value: 20, color: 'from-[#7B00FF] to-purple-400' },
    { label: 'Foundation', value: 15, color: 'from-purple-400 to-pink-400' },
    { label: 'Team', value: 15, color: 'from-pink-400 to-red-400' },
    { label: 'Advisors', value: 10, color: 'from-red-400 to-orange-400' },
    { label: 'Public Sale', value: 10, color: 'from-orange-400 to-yellow-400' }
  ]

  const annualRewards = (stakeAmount * apy) / 100

  return (
    <section id="somi" className="py-32 bg-gradient-to-b from-somnia-dark to-somnia-dark/95 relative overflow-hidden neural-bg">
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
            <Coins className="w-8 h-8 text-scroll-gold mx-auto" />
          </motion.div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6">
            <span className="neural-text text-neural-glow-lg">
              SOMI Token
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed">
            Fixed 1B supply. Staking. Governance. 
            <span className="text-somnia-cyan font-semibold"> Deflationary economics</span> with 50% fee burn.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Tokenomics Chart */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="backdrop-blur-xl bg-white/5 border border-somnia-cyan/20 rounded-3xl p-8"
          >
            <h3 className="text-3xl font-bold text-white mb-8">Token Allocation</h3>
            <div className="space-y-4">
              {tokenomics.map((item, idx) => (
                <div key={item.label} className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium">{item.label}</span>
                    <span className="text-white/60">{item.value}%</span>
                  </div>
                  <div className="h-4 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.value}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1, duration: 0.8 }}
                      className={`h-full bg-gradient-to-r ${item.color} rounded-full`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Token Utility */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="backdrop-blur-xl bg-white/5 border border-somnia-cyan/20 rounded-3xl p-8"
          >
            <h3 className="text-3xl font-bold text-white mb-8">Token Utility</h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#00D4FF] to-[#7B00FF] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Coins className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">Staking</h4>
                  <p className="text-white/70">5M SOMI minimum per validator. Earn rewards from network fees.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#7B00FF] to-purple-400 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Flame className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">Fees (50% Burn)</h4>
                  <p className="text-white/70">Half of all transaction fees are permanently burned, making SOMI deflationary.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-[#00D4FF] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">Governance</h4>
                  <p className="text-white/70">Token House + Councils. Vote on protocol upgrades and parameters.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Staking Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="backdrop-blur-xl bg-white/5 border border-somnia-cyan/20 rounded-3xl p-8 mb-16"
        >
          <h3 className="text-3xl font-bold text-white mb-8 text-center">Staking Calculator</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <label className="block text-white/70 mb-2">Stake Amount (SOMI)</label>
              <input
                type="number"
                value={stakeAmount}
                onChange={(e) => setStakeAmount(Number(e.target.value))}
                className="w-full px-4 py-3 bg-white/10 border border-somnia-cyan/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-somnia-cyan/50"
                placeholder="10000"
              />
            </div>
            <div>
              <label className="block text-white/70 mb-2">APY (%)</label>
              <input
                type="number"
                value={apy}
                onChange={(e) => setApy(Number(e.target.value))}
                className="w-full px-4 py-3 bg-white/10 border border-somnia-cyan/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-somnia-cyan/50"
                placeholder="12.5"
              />
            </div>
          </div>
          <div className="mt-8 text-center">
            <div className="inline-block backdrop-blur-xl bg-gradient-to-r from-[#00D4FF]/20 to-[#7B00FF]/20 border border-somnia-cyan/30 rounded-2xl p-6">
              <p className="text-white/70 mb-2">Annual Rewards</p>
              <p className="text-4xl font-black bg-gradient-to-r from-[#00D4FF] to-[#7B00FF] bg-clip-text text-transparent">
                {annualRewards.toLocaleString()} SOMI
              </p>
            </div>
          </div>
        </motion.div>

        {/* Economics Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-block backdrop-blur-xl bg-white/5 border border-somnia-cyan/20 rounded-3xl p-8 max-w-3xl">
            <h3 className="text-2xl font-bold text-white mb-4">Deflationary Economics</h3>
            <p className="text-white/70 mb-6">
              50% of fees → burn. Stakers earn remaining 50%. Fixed 1B supply ensures scarcity.
            </p>
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-[#00D4FF] to-[#7B00FF] rounded-xl text-white font-bold flex items-center space-x-2 mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Delegate Now</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

