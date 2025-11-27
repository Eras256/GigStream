// src/app/gigstream/page.tsx - Dashboard with Live SDS Streams + AI Integration
'use client'

import { motion } from 'framer-motion'
import { useAccount } from 'wagmi'
import Link from 'next/link'
import { MapPin, DollarSign, Clock, Zap, Plus, Brain } from 'lucide-react'
import { useEffect, useState } from 'react'
import Navbar from '@/components/somnia/Navbar'
import Footer from '@/components/somnia/Footer'
import AIInsightsPanel from '@/components/gigstream/AIInsightsPanel'
import AIJobMatcher from '@/components/gigstream/AIJobMatcher'
import AIBidOptimizer from '@/components/gigstream/AIBidOptimizer'
import GeminiBot from '@/components/chatbot/GeminiBot'

export default function GigStreamDashboard() {
  const { address, isConnected } = useAccount()
  const [jobsCount, setJobsCount] = useState(0)

  useEffect(() => {
    // Mock live stream connection
    const eventSource = new EventSource('/api/streams?type=jobs')
    
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data)
      if (data.type === 'update') {
        setJobsCount(prev => prev + 1)
      }
    }

    return () => {
      eventSource.close()
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-neural-blue via-somnia-purple/20 to-mx-green/10">
      <Navbar />
      <main className="pt-20">
        {!isConnected ? (
          <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center p-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-6 max-w-md"
            >
              <h2 className="text-3xl font-bold text-white mb-4">Connect Your Wallet</h2>
              <p className="text-white/70 mb-6">Connect your wallet to access the GigStream dashboard and start finding or posting jobs.</p>
              <div className="flex justify-center">
                <appkit-button />
              </div>
            </motion.div>
          </div>
        ) : (
          <div className="p-4 md:p-8 space-y-6 md:space-y-8">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div>
                <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-white to-somnia-purple bg-clip-text text-transparent">
                  GigStream Dashboard
                </h1>
                <p className="text-white/70 mt-2 font-mono">
                  Live SDS Streams • {jobsCount} active jobs
                </p>
              </div>
              <Link href="/gigstream/post">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-somnia-purple to-mx-green rounded-2xl text-white font-bold shadow-neural-glow"
                >
                  <Plus className="w-5 h-5" />
                  <span>Post Job</span>
                </motion.button>
              </Link>
            </motion.div>

            {/* Live Jobs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((job) => (
                <motion.div
                  key={job}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="backdrop-blur-xl bg-white/5 rounded-3xl p-6 border border-white/10 shadow-neural-glow hover:shadow-neural-glow-lg transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-white">Plomero CDMX</h3>
                    <div className="w-3 h-3 bg-mx-green rounded-full animate-pulse" />
                  </div>
                  <div className="space-y-2 text-white/70 font-mono text-sm">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span>Polanco, CDMX</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-4 h-4" />
                      <span>500 STT</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>Deadline: 2 days</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* AI Features Section */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-somnia-cyan to-somnia-purple rounded-xl flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">AI-Powered Features</h2>
                  <p className="text-white/60 text-sm">Powered by Google Gemini</p>
                </div>
              </div>

              {/* AI Insights Panel */}
              <AIInsightsPanel />

              {/* AI Tools Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <AIJobMatcher />
                <AIBidOptimizer />
              </div>
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link href="/gigstream/profile">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="backdrop-blur-xl bg-gradient-to-r from-somnia-purple/20 to-mx-green/20 rounded-3xl p-8 border border-somnia-purple/30 shadow-neural-glow cursor-pointer"
                >
                  <h3 className="text-2xl font-bold text-white mb-2">My Profile</h3>
                  <p className="text-white/70 font-mono">View reputation and statistics</p>
                </motion.div>
              </Link>
              <div className="backdrop-blur-xl bg-gradient-to-r from-neural-blue/20 to-somnia-purple/20 rounded-3xl p-8 border border-neural-blue/30 shadow-neural-glow">
                <h3 className="text-2xl font-bold text-white mb-2">Live Streams</h3>
                <p className="text-white/70 font-mono">SDS active • {jobsCount} events</p>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
      <GeminiBot />
    </div>
  )
}

