'use client'

import { motion } from 'framer-motion'
import { Code, Book, Github, MessageCircle, ExternalLink, Zap, Sparkles } from 'lucide-react'
import Link from 'next/link'
import BlockchainNetwork from '@/components/gigstream/BlockchainNetwork'

export default function DevelopersSection() {
  const tools = [
    {
      name: 'Data Streams RPC',
      description: 'Real-time data streaming API',
      icon: Zap,
      color: 'from-[#00D4FF] to-cyan-400'
    },
    {
      name: 'SDKs',
      description: 'JavaScript, Python, Go',
      icon: Code,
      color: 'from-[#7B00FF] to-purple-400'
    },
    {
      name: 'Testnets',
      description: 'Shannon Testnet live',
      icon: Zap,
      color: 'from-cyan-400 to-[#00D4FF]'
    },
    {
      name: 'Faucet',
      description: 'Get test tokens instantly',
      icon: Zap,
      color: 'from-purple-400 to-pink-400'
    }
  ]

  const quickstarts = [
    { name: 'Remix IDE', icon: Code, href: 'https://remix.ethereum.org' },
    { name: 'VSCode', icon: Code, href: '#' },
    { name: 'Hardhat', icon: Code, href: '#' },
    { name: 'Foundry', icon: Code, href: '#' }
  ]

  return (
    <section id="developers" className="py-32 bg-gradient-to-b from-somnia-dark/95 to-somnia-dark relative neural-bg overflow-hidden">
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
              Developers
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed">
            EVM Compatible: Use Solidity, Hardhat, Foundry as-is. 
            <span className="text-somnia-cyan font-semibold"> Build on GigStream MX with familiar tools.</span>
          </p>
        </motion.div>

        {/* Quickstart Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-white mb-8 text-center">Quickstart</h3>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {quickstarts.map((item, idx) => (
              <motion.a
                key={item.name}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 backdrop-blur-xl bg-white/5 border border-somnia-cyan/20 rounded-xl text-white font-medium hover:border-somnia-cyan/50 transition-all flex items-center space-x-2"
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
                <ExternalLink className="w-4 h-4" />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {tools.map((tool, idx) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="backdrop-blur-xl bg-white/5 border border-somnia-cyan/20 rounded-2xl p-6 hover:border-somnia-cyan/50 transition-all"
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${tool.color} rounded-xl flex items-center justify-center mb-4`}>
                <tool.icon className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">{tool.name}</h4>
              <p className="text-white/70 text-sm">{tool.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Resources */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="backdrop-blur-xl bg-white/5 border border-somnia-cyan/20 rounded-3xl p-8"
        >
          <h3 className="text-3xl font-bold text-white mb-8 text-center">Resources</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a
              href="https://docs.somnia.network"
              target="_blank"
              className="group backdrop-blur-xl bg-white/5 border border-somnia-cyan/20 rounded-xl p-6 hover:border-somnia-cyan/50 transition-all"
            >
              <Book className="w-8 h-8 text-[#00D4FF] mb-4 group-hover:scale-110 transition-transform" />
              <h4 className="text-xl font-bold text-white mb-2">Documentation</h4>
              <p className="text-white/70 text-sm">Complete developer guides</p>
            </a>
            <a
              href="https://github.com/somnia-network"
              target="_blank"
              className="group backdrop-blur-xl bg-white/5 border border-somnia-cyan/20 rounded-xl p-6 hover:border-somnia-cyan/50 transition-all"
            >
              <Github className="w-8 h-8 text-[#00D4FF] mb-4 group-hover:scale-110 transition-transform" />
              <h4 className="text-xl font-bold text-white mb-2">GitHub</h4>
              <p className="text-white/70 text-sm">Open source repositories</p>
            </a>
            <a
              href="https://discord.gg/somnia"
              target="_blank"
              className="group backdrop-blur-xl bg-white/5 border border-somnia-cyan/20 rounded-xl p-6 hover:border-somnia-cyan/50 transition-all"
            >
              <MessageCircle className="w-8 h-8 text-[#00D4FF] mb-4 group-hover:scale-110 transition-transform" />
              <h4 className="text-xl font-bold text-white mb-2">Discord #dev-support</h4>
              <p className="text-white/70 text-sm">Get help from the community</p>
            </a>
          </div>
        </motion.div>

        {/* RPC Endpoints */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 backdrop-blur-xl bg-white/5 border border-somnia-cyan/20 rounded-3xl p-8"
        >
          <h3 className="text-2xl font-bold text-white mb-6">Somnia RPC Endpoints</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
              <span className="text-white/70 font-mono text-sm">Mainnet</span>
              <code className="text-[#00D4FF] font-mono">https://rpc.somnia.network</code>
            </div>
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
              <span className="text-white/70 font-mono text-sm">Testnet</span>
              <code className="text-[#00D4FF] font-mono">https://somnia-testnet.rpc.grove.city</code>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

