// src/components/gigstream/MarketplaceSearch.tsx - Marketplace Search Component
'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, Store, ArrowRight, Zap } from 'lucide-react'
import Link from 'next/link'

export default function MarketplaceSearch() {
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/gigstream/marketplace?search=${encodeURIComponent(searchQuery.trim())}`)
    } else {
      router.push('/gigstream/marketplace')
    }
  }

  return (
    <section className="relative py-12 bg-gradient-to-b from-transparent via-somnia-purple/10 to-transparent">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="backdrop-blur-xl bg-white/5 rounded-3xl p-8 md:p-10 border border-white/10 shadow-neural-glow relative overflow-hidden">
            {/* Background gradient effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-somnia-purple/20 via-somnia-cyan/20 to-mx-green/20 opacity-50 blur-3xl" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-somnia-cyan to-somnia-purple rounded-2xl flex items-center justify-center">
                  <Store className="w-8 h-8 text-white" />
                </div>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-black text-white text-center mb-3">
                Explore the <span className="bg-gradient-to-r from-somnia-cyan to-mx-green bg-clip-text text-transparent">Jobs Marketplace</span>
              </h2>
              <p className="text-white/70 text-center mb-8 text-lg">
                Browse all available jobs from any user. Find opportunities instantly with real-time updates.
              </p>

              <form onSubmit={handleSearch} className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 w-6 h-6 text-white/50" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search jobs by title, location, skills..."
                    className="w-full pl-16 pr-6 py-5 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 backdrop-blur-xl focus:outline-none focus:border-somnia-purple/50 focus:ring-2 focus:ring-somnia-purple/30 text-lg"
                  />
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 px-8 py-5 bg-gradient-to-r from-somnia-purple via-somnia-cyan to-mx-green rounded-2xl text-white font-bold text-lg shadow-neural-glow flex items-center justify-center space-x-2"
                  >
                    <Search className="w-5 h-5" />
                    <span>Search Jobs</span>
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                  
                  <Link href="/gigstream/marketplace">
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-8 py-5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl text-white font-bold text-lg transition-all flex items-center justify-center space-x-2"
                    >
                      <Zap className="w-5 h-5" />
                      <span>View All Jobs</span>
                    </motion.button>
                  </Link>
                </div>
              </form>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-white/60">
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-somnia-cyan" />
                  <span>Real-time updates</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Store className="w-4 h-4 text-mx-green" />
                  <span>All jobs from any user</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Search className="w-4 h-4 text-somnia-purple" />
                  <span>Instant search</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

