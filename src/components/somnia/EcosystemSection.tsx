'use client'

import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import BlockchainNetwork from '@/components/gigstream/BlockchainNetwork'

export default function EcosystemSection() {
  return (
    <section id="ecosystem" className="py-16 bg-gradient-to-b from-somnia-dark/95 to-somnia-dark relative neural-bg overflow-hidden">
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
            <Sparkles className="w-8 h-8 text-somnia-cyan mx-auto" />
          </motion.div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6">
            <span className="neural-text text-neural-glow-lg">
              Ecosystem
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed">
            Built on <span className="text-somnia-cyan font-semibold">Somnia Network</span> - 
            The high-performance L1 blockchain powering the future of decentralized applications.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
