'use client'

import { motion } from 'framer-motion'
import { Sparkles, Globe, Users, Link2, ArrowRight } from 'lucide-react'
import BlockchainNetwork from '@/components/gigstream/BlockchainNetwork'

export default function MSquaredSection() {
  const features = [
    {
      icon: Globe,
      title: 'Interoperable Metaverses',
      description: 'Connect multiple virtual worlds seamlessly. Assets, identities, and experiences flow freely across metaverses.',
      color: 'from-[#00D4FF] to-cyan-400'
    },
    {
      icon: Users,
      title: 'Unified Identity',
      description: 'Single identity across all connected metaverses. Your avatar, reputation, and assets follow you everywhere.',
      color: 'from-[#7B00FF] to-purple-400'
    },
    {
      icon: Link2,
      title: 'Cross-World Assets',
      description: 'NFTs and digital assets work across all connected metaverses. True ownership without boundaries.',
      color: 'from-cyan-400 to-[#00D4FF]'
    },
    {
      icon: Sparkles,
      title: 'Real-Time Synchronization',
      description: 'Changes in one metaverse reflect instantly across all connected worlds. Powered by Somnia Data Streams.',
      color: 'from-purple-400 to-pink-400'
    }
  ]

  const useCases = [
    'Virtual real estate that spans multiple worlds',
    'Cross-metaverse gaming tournaments',
    'Unified social experiences across platforms',
    'Shared economy and marketplaces',
    'Interoperable NFT collections'
  ]

  return (
    <section id="msquared" className="py-32 bg-gradient-to-b from-somnia-dark/95 to-somnia-dark relative overflow-hidden neural-bg">
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
            <Sparkles className="w-8 h-8 text-somnia-cyan mx-auto" />
          </motion.div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6">
            <span className="neural-text text-neural-glow-lg">
              MSquared
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed">
            Interoperable metaverses at scale. Connect virtual worlds, unify identities, and enable seamless cross-world experiences.
            <span className="text-somnia-cyan font-semibold"> The future of the metaverse is interconnected.</span>
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

        {/* Use Cases */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="backdrop-blur-xl bg-white/5 border border-somnia-cyan/20 rounded-3xl p-8 mb-16"
        >
          <h3 className="text-3xl font-bold text-white mb-8 text-center">Use Cases</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {useCases.map((useCase, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-start space-x-3"
              >
                <ArrowRight className="w-5 h-5 text-[#00D4FF] mt-1 flex-shrink-0" />
                <span className="text-white/80">{useCase}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Architecture */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="backdrop-blur-xl bg-white/5 border border-somnia-cyan/20 rounded-3xl p-8"
        >
          <h3 className="text-3xl font-bold text-white mb-8 text-center">How MSquared Works</h3>
          <div className="space-y-6 max-w-4xl mx-auto">
            {[
              {
                step: '1',
                title: 'Metaverse Registration',
                description: 'Metaverses register with MSquared protocol, enabling interoperability standards.'
              },
              {
                step: '2',
                title: 'Identity Unification',
                description: 'Users create unified identities that work across all connected metaverses.'
              },
              {
                step: '3',
                title: 'Asset Bridging',
                description: 'NFTs and digital assets are bridged between metaverses using Somnia cross-chain infrastructure.'
              },
              {
                step: '4',
                title: 'Real-Time Sync',
                description: 'Data Streams ensure changes propagate instantly across all connected worlds.'
              }
            ].map((item, idx) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-start space-x-4"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-[#00D4FF] to-[#7B00FF] rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-xl">{item.step}</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                  <p className="text-white/70">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

