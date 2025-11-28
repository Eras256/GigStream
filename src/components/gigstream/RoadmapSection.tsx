'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, Circle, ArrowRight, Calendar, Rocket, Users, Globe, Zap } from 'lucide-react'
import BlockchainNetwork from './BlockchainNetwork'
import { cn } from '@/lib/utils'

export default function RoadmapSection() {
  const roadmap = [
    {
      phase: 'Q1 2025',
      status: 'completed',
      title: 'Launch & Beta',
      description: 'GigStream beta launch on Somnia testnet. Initial user testing with 1,000 workers worldwide.',
      milestones: [
        'Smart contract deployment',
        'Gemini AI integration',
        'Basic job posting & bidding',
        'Wallet connection (Reown AppKit)',
        'Testnet launch'
      ],
      icon: Rocket,
      color: 'from-mx-green to-emerald-400'
    },
    {
      phase: 'Q2 2025',
      status: 'in-progress',
      title: 'Global Expansion',
      description: 'Scale to 10,000+ workers worldwide. Add multi-language support and local payment methods.',
      milestones: [
        'Spanish UI/UX complete',
        'Local payment integration',
        'Reputation system launch',
        'Mobile app beta',
        '10K+ active users'
      ],
      icon: Globe,
      color: 'from-somnia-purple to-purple-400'
    },
    {
      phase: 'Q3 2025',
      status: 'upcoming',
      title: 'AI & Automation',
      description: 'Advanced Gemini AI features. Automated matching, skill verification, and smart escrow optimization.',
      milestones: [
        'AI-powered skill matching',
        'Automated bid recommendations',
        'Smart contract upgrades',
        'ZK reputation system',
        '50K+ users'
      ],
      icon: Zap,
      color: 'from-somnia-cyan to-cyan-400'
    },
    {
      phase: 'Q4 2025',
      status: 'upcoming',
      title: 'LATAM Expansion',
      description: 'Expand to Colombia, Argentina, and Brazil. Multi-chain support and cross-border payments.',
      milestones: [
        'Multi-country support',
        'Cross-chain bridges',
        'Multi-currency payments',
        '500K+ users',
        'Mainnet launch'
      ],
      icon: Users,
      color: 'from-scroll-gold to-yellow-400'
    }
  ]

  return (
    <section id="roadmap" className="py-32 bg-gradient-to-b from-somnia-dark/95 to-somnia-dark relative neural-bg overflow-hidden">
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
            <Calendar className="w-8 h-8 text-somnia-purple mx-auto" />
          </motion.div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6">
            <span className="neural-text text-neural-glow-lg">
              Roadmap
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed">
            Building the future of freelance work in Latin America, 
            <span className="text-somnia-cyan font-semibold"> one milestone at a time</span>
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-mx-green via-somnia-purple to-scroll-gold transform -translate-x-1/2 opacity-30" />

          <div className="space-y-16 lg:space-y-24">
            {roadmap.map((item, idx) => (
              <motion.div
                key={item.phase}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className={cn(
                  'relative',
                  idx % 2 === 0 ? 'lg:pr-1/2 lg:pl-0' : 'lg:pl-1/2 lg:pr-0'
                )}
              >
                {/* Timeline Dot */}
                <div className="hidden lg:block absolute left-1/2 top-8 transform -translate-x-1/2 z-10">
                  <motion.div
                    className={cn(
                      'w-6 h-6 rounded-full border-4 border-somnia-dark',
                      item.status === 'completed' && 'bg-mx-green shadow-neural-glow',
                      item.status === 'in-progress' && 'bg-somnia-purple shadow-neural-glow animate-pulse',
                      item.status === 'upcoming' && 'bg-white/20'
                    )}
                    whileHover={{ scale: 1.3 }}
                  />
                </div>

                <div className={cn(
                  'backdrop-blur-xl bg-white/5 border rounded-3xl p-8 lg:p-10 neural-hover relative overflow-hidden group',
                  item.status === 'completed' ? 'border-mx-green/30' : 
                  item.status === 'in-progress' ? 'border-somnia-purple/30 shadow-neural-glow' : 
                  'border-white/10'
                )}>
                  <div className="neural-shimmer absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="relative z-10">
                    {/* Phase Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        <motion.div
                          className={cn(
                            'w-16 h-16 bg-gradient-to-br rounded-2xl flex items-center justify-center shadow-neural-glow',
                            item.color
                          )}
                          whileHover={{ rotate: 360, scale: 1.1 }}
                          transition={{ duration: 0.6 }}
                        >
                          <item.icon className="w-8 h-8 text-white" />
                        </motion.div>
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-sm font-mono text-white/60 uppercase tracking-wider">
                              {item.phase}
                            </span>
                            {item.status === 'completed' && (
                              <CheckCircle2 className="w-5 h-5 text-mx-green" />
                            )}
                            {item.status === 'in-progress' && (
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                              >
                                <Circle className="w-5 h-5 text-somnia-purple fill-somnia-purple" />
                              </motion.div>
                            )}
                          </div>
                          <h3 className="text-3xl font-bold text-white">{item.title}</h3>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-white/80 text-lg mb-6 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Milestones */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {item.milestones.map((milestone, mIdx) => (
                        <motion.div
                          key={mIdx}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.2 + mIdx * 0.05 }}
                          className="flex items-center space-x-3 p-3 bg-white/5 rounded-xl border border-white/10 hover:border-somnia-purple/30 transition-all"
                        >
                          <ArrowRight className={cn(
                            'w-4 h-4 flex-shrink-0',
                            item.status === 'completed' ? 'text-mx-green' :
                            item.status === 'in-progress' ? 'text-somnia-purple' :
                            'text-white/40'
                          )} />
                          <span className="text-white/80 text-sm">{milestone}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 backdrop-blur-xl bg-gradient-to-r from-somnia-purple/20 via-somnia-cyan/20 to-mx-green/20 border border-somnia-purple/30 rounded-3xl p-8 md:p-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-black neural-text mb-2">1K+</div>
              <div className="text-white/80 text-sm mb-1">Beta Users</div>
              <div className="text-white/60 text-xs">Q1 2025</div>
            </div>
            <div>
              <div className="text-4xl font-black neural-text mb-2">10K+</div>
              <div className="text-white/80 text-sm mb-1">Target Users</div>
              <div className="text-white/60 text-xs">Q2 2025</div>
            </div>
            <div>
              <div className="text-4xl font-black neural-text mb-2">50K+</div>
              <div className="text-white/80 text-sm mb-1">Projected Users</div>
              <div className="text-white/60 text-xs">Q3 2025</div>
            </div>
            <div>
              <div className="text-4xl font-black neural-text mb-2">500K+</div>
              <div className="text-white/80 text-sm mb-1">LATAM Expansion</div>
              <div className="text-white/60 text-xs">Q4 2025</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

