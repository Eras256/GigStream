'use client'

import { motion } from 'framer-motion'
import { Database, Zap, DollarSign, BarChart3, ArrowRight } from 'lucide-react'
import BlockchainNetwork from '@/components/gigstream/BlockchainNetwork'

export default function IceDBSection() {
  const features = [
    {
      icon: Zap,
      title: 'Ultra-Low Latency',
      description: '15-100ns read/write operations. Deterministic performance reports ensure predictable execution times.',
      metric: '15-100ns',
      color: 'from-[#00D4FF] to-cyan-400'
    },
    {
      icon: Database,
      title: 'Deterministic Performance',
      description: 'Every operation has a guaranteed execution time, enabling precise gas pricing based on actual resource usage.',
      metric: '100% Predictable',
      color: 'from-[#7B00FF] to-purple-400'
    },
    {
      icon: DollarSign,
      title: 'Sub-Cent Gas Fees',
      description: 'Resource-based gas pricing ensures transactions cost less than a cent, making micro-transactions viable.',
      metric: '<$0.01',
      color: 'from-cyan-400 to-[#00D4FF]'
    },
    {
      icon: BarChart3,
      title: 'Optimized Storage',
      description: 'IceDB is specifically designed for blockchain workloads, providing optimal performance for state management.',
      metric: '10x Faster',
      color: 'from-purple-400 to-pink-400'
    }
  ]

  const benefits = [
    'Predictable transaction costs based on actual resource consumption',
    'Ultra-low latency enables real-time applications',
    'Deterministic execution times for better UX',
    'Cost-effective micro-transactions and high-frequency operations',
    'Optimized for blockchain-specific workloads'
  ]

  return (
    <section id="icedb" className="py-32 bg-gradient-to-b from-somnia-dark/95 to-somnia-dark relative overflow-hidden neural-bg">
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
            <Database className="w-8 h-8 text-somnia-cyan mx-auto" />
          </motion.div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6">
            <span className="neural-text text-neural-glow-lg">
              IceDB Database
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed">
            High-performance database engine designed specifically for blockchain workloads.
            <span className="text-somnia-cyan font-semibold"> Enabling sub-cent gas fees and deterministic performance.</span>
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
              <div className={`inline-block px-3 py-1 bg-gradient-to-r ${feature.color} rounded-full mb-4`}>
                <span className="text-white font-bold text-sm">{feature.metric}</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
              <p className="text-white/70 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Benefits List */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="backdrop-blur-xl bg-white/5 border border-somnia-cyan/20 rounded-3xl p-8 mb-16"
        >
          <h3 className="text-3xl font-bold text-white mb-8 text-center">Key Benefits</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {benefits.map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-start space-x-3"
              >
                <ArrowRight className="w-5 h-5 text-[#00D4FF] mt-1 flex-shrink-0" />
                <span className="text-white/80">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Performance Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="backdrop-blur-xl bg-white/5 border border-somnia-cyan/20 rounded-3xl p-8"
        >
          <h3 className="text-3xl font-bold text-white mb-8 text-center">Performance Comparison</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { name: 'IceDB', latency: '15-100ns', gas: '<$0.01', color: 'from-[#00D4FF] to-[#7B00FF]' },
              { name: 'Traditional DB', latency: '1-10ms', gas: '$0.10-1.00', color: 'from-white/20 to-white/10' },
              { name: 'Cloud Storage', latency: '10-100ms', gas: '$0.50-5.00', color: 'from-white/20 to-white/10' }
            ].map((db, idx) => (
              <div key={db.name} className="text-center">
                <div className={`h-32 bg-gradient-to-t ${db.color} rounded-t-xl mb-4`} />
                <p className="text-white font-bold text-xl mb-2">{db.name}</p>
                <div className="space-y-2 text-sm">
                  <p className="text-white/70">Latency: <span className="text-[#00D4FF]">{db.latency}</span></p>
                  <p className="text-white/70">Gas Cost: <span className="text-[#00D4FF]">{db.gas}</span></p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

