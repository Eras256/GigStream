'use client'

import { motion } from 'framer-motion'
import { Users } from 'lucide-react'
import BlockchainNetwork from '@/components/gigstream/BlockchainNetwork'

export default function CommunitySection() {
  return (
    <section id="community" className="py-20 bg-gradient-to-b from-somnia-dark/95 to-somnia-dark relative overflow-hidden neural-bg">
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
            <Users className="w-8 h-8 text-somnia-cyan mx-auto" />
          </motion.div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6">
            <span className="neural-text text-neural-glow-lg">
              Community
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed">
            Join the <span className="text-somnia-cyan font-semibold">Somnia Network</span> community and 
            help build the future of decentralized applications.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
