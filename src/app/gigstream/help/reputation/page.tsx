// src/app/gigstream/help/reputation/page.tsx - Reputation System Help Page
'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, CheckCircle, UserPlus, TrendingUp, HelpCircle, Info, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import Navbar from '@/components/somnia/Navbar'
import Footer from '@/components/somnia/Footer'

export default function ReputationHelpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neural-blue via-somnia-purple/20 to-mx-green/10">
      <Navbar />
      <main className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-6">
          {/* Back Button */}
          <Link href="/gigstream">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors mb-4"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Dashboard</span>
            </motion.button>
          </Link>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="backdrop-blur-xl bg-white/5 rounded-3xl p-8 border border-white/10 shadow-neural-glow"
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-somnia-cyan to-mx-green rounded-2xl flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-black text-white mb-2">Reputation System</h1>
                <p className="text-white/70">Learn how to build and maintain your on-chain reputation</p>
              </div>
            </div>
          </motion.div>

          {/* How It Works */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="backdrop-blur-xl bg-white/5 rounded-3xl p-8 border border-white/10 shadow-neural-glow"
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
              <Info className="w-6 h-6 text-somnia-cyan" />
              <span>How It Works</span>
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                Your reputation is stored on-chain and represents your track record of completed jobs. 
                It&apos;s a transparent, verifiable way for employers to assess your reliability.
              </p>
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <h3 className="text-lg font-bold text-white mb-3">Reputation Points</h3>
                <ul className="space-y-2 list-disc list-inside">
                  <li>You earn <span className="text-mx-green font-bold">+1 reputation point</span> for each completed job</li>
                  <li>Reputation is permanent and cannot be removed</li>
                  <li>All reputation is stored on the Somnia blockchain</li>
                  <li>Anyone can verify your reputation score on-chain</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Getting Started */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="backdrop-blur-xl bg-white/5 rounded-3xl p-8 border border-white/10 shadow-neural-glow"
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
              <UserPlus className="w-6 h-6 text-somnia-cyan" />
              <span>Getting Started (New Workers)</span>
            </h2>
            <div className="space-y-4">
              <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-2xl p-6">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold text-yellow-400 mb-2">No Minimum Reputation Required</h3>
                    <p className="text-white/90">
                      You can place bids on jobs with any reputation level. Employers will decide who to accept based on your reputation, bid, and experience.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">Two Ways to Get Started:</h3>
                
                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-somnia-cyan/20 rounded-xl flex items-center justify-center">
                      <span className="text-somnia-cyan font-bold">1</span>
                    </div>
                    <h4 className="text-lg font-bold text-white">Direct Assignment</h4>
                  </div>
                  <p className="text-white/80 mb-3">
                    Ask an employer to assign you directly to a job. This bypasses the bidding system and is perfect for new workers.
                  </p>
                  <ul className="space-y-2 text-white/70 text-sm list-disc list-inside ml-4">
                    <li>Contact employers directly or through the platform</li>
                    <li>Employers can assign you without requiring bids</li>
                    <li>Complete the job to earn your first reputation point</li>
                    <li>Repeat until you reach 10 points</li>
                  </ul>
                </div>

                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-somnia-purple/20 rounded-xl flex items-center justify-center">
                      <span className="text-somnia-purple font-bold">2</span>
                    </div>
                    <h4 className="text-lg font-bold text-white">Initial Reputation Grant</h4>
                  </div>
                  <p className="text-white/80 mb-3">
                    Platform administrators can grant initial reputation to verified users. Contact support if you&apos;re a trusted worker from another platform.
                  </p>
                  <p className="text-white/60 text-sm">
                    Note: This is typically reserved for verified professionals or users migrating from other platforms.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Building Reputation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="backdrop-blur-xl bg-white/5 rounded-3xl p-8 border border-white/10 shadow-neural-glow"
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
              <TrendingUp className="w-6 h-6 text-mx-green" />
              <span>Building Your Reputation</span>
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                  <div className="text-3xl font-bold text-mx-green mb-2">10+</div>
                  <div className="text-white/70 text-sm">Can place bids</div>
                </div>
                <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                  <div className="text-3xl font-bold text-somnia-cyan mb-2">25+</div>
                  <div className="text-white/70 text-sm">Experienced worker</div>
                </div>
                <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                  <div className="text-3xl font-bold text-somnia-purple mb-2">50+</div>
                  <div className="text-white/70 text-sm">Top performer</div>
                </div>
              </div>
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <h3 className="text-lg font-bold text-white mb-3">Tips for Success</h3>
                <ul className="space-y-2 text-white/80">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-mx-green flex-shrink-0 mt-0.5" />
                    <span>Complete jobs on time and with quality work</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-mx-green flex-shrink-0 mt-0.5" />
                    <span>Communicate clearly with employers</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-mx-green flex-shrink-0 mt-0.5" />
                    <span>Build a consistent track record</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-mx-green flex-shrink-0 mt-0.5" />
                    <span>Your reputation is permanent and verifiable on-chain</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* FAQ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="backdrop-blur-xl bg-white/5 rounded-3xl p-8 border border-white/10 shadow-neural-glow"
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
              <HelpCircle className="w-6 h-6 text-somnia-cyan" />
              <span>Frequently Asked Questions</span>
            </h2>
            <div className="space-y-4">
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <h3 className="text-lg font-bold text-white mb-2">Can I lose reputation points?</h3>
                <p className="text-white/80">
                  No, reputation points are permanent once earned. They represent your completed work history and cannot be removed.
                </p>
              </div>
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <h3 className="text-lg font-bold text-white mb-2">What if I cancel a job?</h3>
                <p className="text-white/80">
                  Cancelling a job does not affect your reputation. Only completed jobs add to your reputation score.
                </p>
              </div>
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <h3 className="text-lg font-bold text-white mb-2">How do employers see my reputation?</h3>
                <p className="text-white/80">
                  Employers can view your on-chain reputation score when reviewing bids or considering direct assignments. 
                  Your reputation is transparent and verifiable on the blockchain.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

