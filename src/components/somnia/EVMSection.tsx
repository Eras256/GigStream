'use client'

import { motion } from 'framer-motion'
import { Code, Zap, CheckCircle, Rocket, ArrowRight } from 'lucide-react'
import BlockchainNetwork from '@/components/gigstream/BlockchainNetwork'

export default function EVMSection() {
  const features = [
    {
      icon: Code,
      title: 'EVM Bytecode Compilation',
      description: 'Solidity, Vyper, Yul, and Huff contracts compile to EVM bytecode, then to x86 native code for 30x faster execution.',
      color: 'from-[#00D4FF] to-cyan-400'
    },
    {
      icon: Zap,
      title: '30x Performance Boost',
      description: 'Native x86 execution eliminates EVM interpretation overhead, delivering Web2-like performance with Web3 ownership.',
      color: 'from-[#7B00FF] to-purple-400'
    },
    {
      icon: CheckCircle,
      title: 'Full Compatibility',
      description: '100% EVM compatibility means existing tools, libraries, and contracts work without modification.',
      color: 'from-cyan-400 to-[#00D4FF]'
    },
    {
      icon: Rocket,
      title: 'Zero Migration',
      description: 'Deploy existing Ethereum contracts directly to Somnia. No code changes required.',
      color: 'from-purple-400 to-pink-400'
    }
  ]

  const tools = [
    'Hardhat',
    'Foundry',
    'Truffle',
    'Remix IDE',
    'OpenZeppelin',
    'Ethers.js',
    'Web3.js',
    'Viem',
    'Wagmi',
    'MetaMask',
    'WalletConnect',
    'The Graph'
  ]

  const benefits = [
    'Use existing Solidity codebases without modification',
    'Leverage familiar development tools and frameworks',
    'Access to extensive Ethereum ecosystem libraries',
    'Native x86 execution for maximum performance',
    'Seamless migration from Ethereum and EVM chains'
  ]

  return (
    <section id="evm" className="py-32 bg-gradient-to-b from-somnia-dark to-somnia-dark/95 relative overflow-hidden neural-bg">
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
            <Code className="w-8 h-8 text-somnia-cyan mx-auto" />
          </motion.div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6">
            <span className="neural-text text-neural-glow-lg">
              EVM Compatibility
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed">
            Full EVM compatibility with 30x performance boost through native x86 compilation.
            <span className="text-somnia-cyan font-semibold"> Build with familiar tools, deploy with unmatched speed.</span>
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

        {/* Compatible Tools */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="backdrop-blur-xl bg-white/5 border border-somnia-cyan/20 rounded-3xl p-8 mb-16"
        >
          <h3 className="text-3xl font-bold text-white mb-8 text-center">Compatible Tools & Libraries</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {tools.map((tool, idx) => (
              <motion.div
                key={tool}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="backdrop-blur-xl bg-white/5 border border-somnia-cyan/20 rounded-xl p-4 text-center hover:border-somnia-cyan/50 transition-all"
              >
                <span className="text-white font-medium text-sm">{tool}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Benefits */}
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
                <CheckCircle className="w-5 h-5 text-[#00D4FF] mt-1 flex-shrink-0" />
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
              { name: 'Somnia (x86)', speed: '30x', tps: '400k+', color: 'from-[#00D4FF] to-[#7B00FF]' },
              { name: 'Ethereum L2', speed: '1x', tps: '2-5k', color: 'from-white/20 to-white/10' },
              { name: 'Ethereum L1', speed: '0.1x', tps: '15', color: 'from-white/20 to-white/10' }
            ].map((chain, idx) => (
              <div key={chain.name} className="text-center">
                <div className={`h-32 bg-gradient-to-t ${chain.color} rounded-t-xl mb-4`} />
                <p className="text-white font-bold text-xl mb-2">{chain.name}</p>
                <div className="space-y-2 text-sm">
                  <p className="text-white/70">Speed: <span className="text-[#00D4FF]">{chain.speed}</span></p>
                  <p className="text-white/70">TPS: <span className="text-[#00D4FF]">{chain.tps}</span></p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

