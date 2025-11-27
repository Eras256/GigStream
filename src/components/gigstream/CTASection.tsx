'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Rocket } from 'lucide-react'
import { useAccount } from 'wagmi'
import BlockchainNetwork from './BlockchainNetwork'

export default function CTASection() {
  const { isConnected } = useAccount()

  return (
    <section id="cta" className="py-20 bg-gradient-to-b from-somnia-dark to-somnia-dark/95 relative overflow-hidden neural-bg">
      <BlockchainNetwork />
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="backdrop-blur-xl bg-gradient-to-r from-somnia-purple/20 via-somnia-cyan/20 to-mx-green/20 border border-somnia-purple/30 rounded-3xl p-10 md:p-12 neural-hover relative overflow-hidden group">
            <div className="neural-shimmer absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <motion.div
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="mb-6 relative z-10"
            >
              <Rocket className="w-16 h-16 text-mx-green mx-auto mb-4 drop-shadow-[0_0_20px_hsl(var(--mx-green)/0.6)]" />
            </motion.div>
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 neural-text">
                Ready to Get Started?
              </h2>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                {isConnected ? (
                  <Link href="/gigstream">
                    <motion.button
                      className="group px-10 py-5 bg-gradient-to-r from-somnia-purple via-somnia-cyan to-mx-green rounded-2xl text-white font-bold text-lg shadow-neural-glow-xl flex items-center space-x-3 neural-hover"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        backgroundSize: '200% 200%',
                        animation: 'neuralFlow 3s ease infinite',
                      }}
                    >
                      <span>Go to Dashboard</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  </Link>
                ) : (
                  <>
                    <appkit-button />
                    <Link href="/gigstream">
                      <motion.button
                        className="px-10 py-5 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 rounded-2xl text-white font-bold text-lg transition-all neural-hover"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Browse Jobs
                      </motion.button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
