'use client'

import { motion } from 'framer-motion'
import { Map, CheckCircle, Clock, ArrowRight } from 'lucide-react'
import BlockchainNetwork from '@/components/gigstream/BlockchainNetwork'

export default function RoadmapSection() {
  const roadmapItems = [
    {
      phase: 'Q1 2024',
      status: 'completed',
      title: 'Mainnet Launch',
      description: 'Somnia mainnet goes live with MultiStream consensus and IceDB. Initial validator set established.',
      achievements: [
        'Mainnet launch with 50+ validators',
        'IceDB integration complete',
        'EVM compatibility verified',
        'Initial partnerships announced'
      ]
    },
    {
      phase: 'Q2-Q3 2024',
      status: 'completed',
      title: 'Ecosystem Growth',
      description: 'Expansion of developer tools, SDKs, and ecosystem partnerships. First major dApps launch.',
      achievements: [
        'Data Streams RPC launched',
        'Developer SDKs released',
        'Google Cloud partnership',
        'LayerZero integration',
        'First 20+ dApps deployed'
      ]
    },
    {
      phase: 'Q4 2024',
      status: 'completed',
      title: 'Data Streams & Real-Time Apps',
      description: 'Launch of Data Streams enabling reactive, real-time on-chain applications.',
      achievements: [
        'Data Streams public launch',
        'Real-time application framework',
        '100+ validators milestone',
        '400k+ TPS achieved',
        'Sub-second finality verified'
      ]
    },
    {
      phase: 'Q1 2025',
      status: 'completed',
      title: 'Enterprise Partnerships',
      description: 'Strategic partnerships with major Web3 infrastructure providers and enterprise clients.',
      achievements: [
        'Dune Analytics integration',
        'Protofire Chainlink integration',
        'Safe (Palmera) treasury management',
        'Thirdweb full-stack platform',
        'Enterprise adoption programs'
      ]
    },
    {
      phase: 'Q2-Q3 2025',
      status: 'in-progress',
      title: 'Global Expansion',
      description: 'Expanding validator network globally, enhancing cross-chain capabilities, and growing ecosystem.',
      achievements: [
        '150+ validators target',
        'Cross-chain bridge enhancements',
        'Regional developer programs',
        'Gaming ecosystem expansion',
        'DeFi protocol integrations'
      ]
    },
    {
      phase: 'Q4 2025',
      status: 'upcoming',
      title: 'Next-Gen Features',
      description: 'Advanced features including enhanced privacy, improved scalability, and new consensus optimizations.',
      achievements: [
        'Privacy-preserving transactions',
        'Enhanced MultiStream v2',
        'Advanced IceDB optimizations',
        'AI/ML integration capabilities',
        '500k+ TPS target'
      ]
    },
    {
      phase: '2026',
      status: 'upcoming',
      title: 'Mass Adoption',
      description: 'Focus on mass consumer adoption, enterprise solutions, and becoming the leading L1 for real-time applications.',
      achievements: [
        '1M+ daily active users',
        'Enterprise-grade solutions',
        'Global validator network',
        '1M+ TPS capacity',
        'Industry-leading finality'
      ]
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-6 h-6 text-green-400" />
      case 'in-progress':
        return <Clock className="w-6 h-6 text-[#00D4FF]" />
      default:
        return <ArrowRight className="w-6 h-6 text-white/40" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'from-green-500 to-emerald-400'
      case 'in-progress':
        return 'from-[#00D4FF] to-[#7B00FF]'
      default:
        return 'from-white/20 to-white/10'
    }
  }

  return (
    <section id="roadmap" className="py-32 bg-gradient-to-b from-somnia-dark to-somnia-dark/95 relative overflow-hidden neural-bg">
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
            <Map className="w-8 h-8 text-somnia-cyan mx-auto" />
          </motion.div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6">
            <span className="neural-text text-neural-glow-lg">
              Roadmap
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed">
            Our journey to becoming the fastest, most scalable EVM L1 for real-time applications.
            <span className="text-somnia-cyan font-semibold"> Building the future, one milestone at a time.</span>
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#00D4FF] via-[#7B00FF] to-white/20 transform md:-translate-x-1/2" />

          {/* Roadmap Items */}
          <div className="space-y-12">
            {roadmapItems.map((item, idx) => (
              <motion.div
                key={item.phase}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={`relative flex items-start space-x-6 md:space-x-0 ${
                  idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-6 md:left-1/2 w-4 h-4 bg-somnia-dark border-4 border-[#00D4FF] rounded-full transform md:-translate-x-1/2 z-10 flex items-center justify-center">
                  {getStatusIcon(item.status)}
                </div>

                {/* Content Card */}
                <div className={`ml-16 md:ml-0 md:w-5/12 ${idx % 2 === 0 ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'}`}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="backdrop-blur-xl bg-white/5 border border-somnia-cyan/20 rounded-3xl p-8 hover:border-somnia-cyan/50 transition-all neural-hover"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className={`px-4 py-2 bg-gradient-to-r ${getStatusColor(item.status)} rounded-full text-white font-bold text-sm`}>
                        {item.phase}
                      </span>
                      <span className="text-white/60 text-sm uppercase tracking-wide">{item.status}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                    <p className="text-white/70 mb-6 leading-relaxed">{item.description}</p>
                    <div className="space-y-2">
                      {item.achievements.map((achievement, i) => (
                        <div key={i} className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-[#00D4FF] mt-1 flex-shrink-0" />
                          <span className="text-white/60 text-sm">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Current Focus */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 backdrop-blur-xl bg-gradient-to-r from-[#00D4FF]/20 to-[#7B00FF]/20 border border-somnia-cyan/30 rounded-3xl p-8"
        >
          <h3 className="text-3xl font-bold text-white mb-4 text-center">Current Focus</h3>
          <p className="text-white/80 text-center max-w-3xl mx-auto">
            We&apos;re currently focused on expanding our validator network, enhancing cross-chain capabilities, 
            and growing our ecosystem of real-time applications. Join us in building the future of on-chain experiences.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

