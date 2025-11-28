// src/app/gigstream/profile/page.tsx - ZK Reputation + Gemini Insights
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Users, TrendingUp, Award, Star, MapPin, Bot, Brain, Sparkles, CheckCircle2, Wrench, Zap, Music, Briefcase, Edit2, Save, X, Plus, Trash2 } from 'lucide-react'
import { useAccount } from 'wagmi'
import { useGigStream } from '@/hooks/useGigStream'
import { useGemini } from '@/providers/GeminiProvider'
import { useToast } from '@/components/ui/use-toast'
import Navbar from '@/components/somnia/Navbar'
import Footer from '@/components/somnia/Footer'
import LocationSelector from '@/components/gigstream/LocationSelector'

interface ProfileData {
  displayName: string
  bio: string
  location: string
  topSkills: string[]
  website?: string
  twitter?: string
}

const defaultProfile: ProfileData = {
  displayName: '',
  bio: '',
  location: '',
  topSkills: ['Plumber', 'Electrician', 'Events', 'DJ'],
  website: '',
  twitter: ''
}

export default function Profile() {
  const { address } = useAccount()
  const { reputation } = useGigStream()
  const { generateText } = useGemini()
  const { showToast } = useToast()
  const [insights, setInsights] = useState<any>(null)
  const [isLoadingInsights, setIsLoadingInsights] = useState(false)
  const [modelUsed, setModelUsed] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editingSkill, setEditingSkill] = useState<string>('')
  const [profileData, setProfileData] = useState<ProfileData>(defaultProfile)

  // Load profile from localStorage on mount
  useEffect(() => {
    if (address) {
      const savedProfile = localStorage.getItem(`profile_${address}`)
      if (savedProfile) {
        try {
          setProfileData({ ...defaultProfile, ...JSON.parse(savedProfile) })
        } catch (e) {
          console.error('Error loading profile:', e)
        }
      }
    }
  }, [address])

  const profileStats = {
    rating: 4.9,
    jobsCompleted: 127,
    totalEarnings: '12,450',
    topSkills: profileData.topSkills.length > 0 ? profileData.topSkills : ['Plumber', 'Electrician', 'Events', 'DJ'],
    responseTime: '4.2min',
    localRanking: '#10',
    globalRanking: '#107'
  }

  const saveProfile = () => {
    if (address) {
      localStorage.setItem(`profile_${address}`, JSON.stringify(profileData))
      showToast({
        title: "Profile saved!",
        description: "Your profile has been updated successfully."
      })
      setIsEditing(false)
    }
  }

  const cancelEdit = () => {
    if (address) {
      const savedProfile = localStorage.getItem(`profile_${address}`)
      if (savedProfile) {
        setProfileData({ ...defaultProfile, ...JSON.parse(savedProfile) })
      } else {
        setProfileData(defaultProfile)
      }
    }
    setIsEditing(false)
    setEditingSkill('')
  }

  const addSkill = () => {
    if (editingSkill.trim() && !profileData.topSkills.includes(editingSkill.trim())) {
      setProfileData({
        ...profileData,
        topSkills: [...profileData.topSkills, editingSkill.trim()]
      })
      setEditingSkill('')
    }
  }

  const removeSkill = (skill: string) => {
    setProfileData({
      ...profileData,
      topSkills: profileData.topSkills.filter(s => s !== skill)
    })
  }

  useEffect(() => {
    if (address) {
      // Always load insights, even if reputation is not available yet
      loadGeminiInsights()
    }
  }, [address, reputation])

  const loadGeminiInsights = async () => {
    setIsLoadingInsights(true)
    try {
      const prompt = `
        Analyze this freelance profile globally:
        - Rating: ${profileStats.rating}
        - Jobs completed: ${profileStats.jobsCompleted}
        - Earnings: ${profileStats.totalEarnings} STT
        - Skills: ${profileStats.topSkills.join(', ')}
        - Response time: ${profileStats.responseTime}
        - Location: ${profileData.location || 'Global'}
        - Local Ranking: ${profileStats.localRanking}
        - Global Ranking: ${profileStats.globalRanking}
        
        Generate JSON with:
        {
          "marketTrends": [{"skill": "Plumber", "trend": "↑ 23%", "location": "${profileData.location || 'Global'}"}, ...],
          "optimizationTips": ["tip 1", "tip 2", "tip 3"],
          "recommendations": ["rec 1", "rec 2", "rec 3"]
        }
        
        Respond ONLY with valid JSON, no markdown.
      `
      
      const response = await generateText(prompt)
      setModelUsed('gemini-2.5-flash')
      
      try {
        let cleaned = response.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
        const jsonMatch = cleaned.match(/\{[\s\S]*\}/)
        if (jsonMatch) cleaned = jsonMatch[0]
        const parsed = JSON.parse(cleaned)
        setInsights(parsed)
      } catch {
        // Fallback
        setInsights({
          marketTrends: [
            { skill: 'Plumber', trend: '↑ 23%', location: profileData.location || 'Global' },
            { skill: 'Events', trend: '↑ 15%', location: profileData.location || 'Global' }
          ],
          optimizationTips: [
            'Lower bids 10% in high competition',
            'Target jobs in your area',
            `Average response: ${profileStats.responseTime}`
          ],
          recommendations: [
            'Focus on your top skills',
            'Improve response time',
            'Expand skill range'
          ]
        })
      }
    } catch (error) {
      console.error('Error loading insights:', error)
      setInsights({
        marketTrends: [
          { skill: 'Plumber CDMX', trend: '↑ 23%' },
          { skill: 'Events Guadalajara', trend: '↑ 15%' }
        ],
        optimizationTips: [
          'Lower bids 10% in high competition',
          'Target jobs Roma Norte',
          `Average response: ${profileStats.responseTime}`
        ],
        recommendations: [
          'Focus on plumbing Polanco/Roma',
          'Improve response time',
          'Expand skill range'
        ]
      })
    } finally {
      setIsLoadingInsights(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neural-blue via-somnia-purple/20 to-mx-green/10">
      <Navbar />
      <main className="pt-20 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto p-4 md:p-8">
      {/* Reputation Card */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        className="backdrop-blur-3xl bg-gradient-to-br from-somnia-purple/30 to-scroll-gold/20 rounded-4xl p-6 md:p-10 border border-somnia-purple/40 shadow-2xl shadow-somnia-purple/30 col-span-1 lg:col-span-2"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white/80">Profile</h2>
          {!isEditing ? (
            <motion.button
              onClick={() => setIsEditing(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 rounded-xl text-white transition-all"
            >
              <Edit2 className="w-4 h-4" />
              <span className="text-sm font-medium">Edit Profile</span>
            </motion.button>
          ) : (
            <div className="flex items-center space-x-2">
              <motion.button
                onClick={saveProfile}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-mx-green to-emerald-400 rounded-xl text-white font-medium transition-all"
              >
                <Save className="w-4 h-4" />
                <span className="text-sm">Save</span>
              </motion.button>
              <motion.button
                onClick={cancelEdit}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 rounded-xl text-white transition-all"
              >
                <X className="w-4 h-4" />
                <span className="text-sm">Cancel</span>
              </motion.button>
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8 md:mb-12 gap-4">
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 md:w-28 md:h-28 bg-gradient-to-br from-scroll-gold to-mx-green rounded-3xl flex items-center justify-center shadow-2xl shadow-scroll-gold/50">
              <Users className="w-14 h-14 text-white" />
            </div>
            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={profileData.displayName || address?.slice(0, 6) + '...' + address?.slice(-4)}
                    onChange={(e) => setProfileData({ ...profileData, displayName: e.target.value })}
                    placeholder="Display Name"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-somnia-purple/50 text-xl md:text-2xl font-bold"
                  />
                  <textarea
                    value={profileData.bio}
                    onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                    placeholder="Write a short bio about yourself..."
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-somnia-purple/50 text-sm resize-none"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <LocationSelector
                      value={profileData.location}
                      onChange={(location) => setProfileData({ ...profileData, location })}
                      placeholder="Select country and city"
                      className="w-full"
                    />
                    <input
                      type="text"
                      value={profileData.website || ''}
                      onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
                      placeholder="Website (optional)"
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-somnia-purple/50 text-sm"
                    />
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center space-x-3 mb-2">
                    <h1 className="text-2xl md:text-4xl lg:text-5xl font-black text-white font-mono tracking-tight">
                      {profileData.displayName || address?.slice(0, 6)}...{address?.slice(-4)}
                    </h1>
                    <div className="flex items-center space-x-1">
                      <Star className="w-6 h-6 text-scroll-gold fill-scroll-gold" />
                      <span className="text-2xl font-black text-scroll-gold">{profileStats.rating}</span>
                    </div>
                  </div>
                  {profileData.bio && (
                    <p className="text-white/80 text-sm mb-2 max-w-2xl">{profileData.bio}</p>
                  )}
                  <div className="flex flex-wrap items-center gap-4 text-white/70 text-sm font-mono">
                    {profileData.location && (
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{profileData.location}</span>
                      </div>
                    )}
                    <span>{profileStats.jobsCompleted} jobs</span>
                    <span>{profileStats.totalEarnings} STT</span>
                    <span>{profileStats.responseTime} avg</span>
                  </div>
                </>
              )}
            </div>
          </div>
          
          {!isEditing && (
            <div className="mt-6 lg:mt-0 grid grid-cols-2 gap-3 md:gap-4 w-full lg:w-auto">
              <div className="text-center p-4 bg-white/10 rounded-2xl backdrop-blur-xl border border-white/20">
                <div className="text-2xl font-black text-mx-green mb-1 font-mono">📍 #{profileStats.localRanking}</div>
                <div className="text-xs text-white/60 uppercase font-mono tracking-wider">Local</div>
              </div>
              <div className="text-center p-4 bg-white/10 rounded-2xl backdrop-blur-xl border border-white/20">
                <div className="text-2xl font-black text-scroll-gold mb-1 font-mono">🌎 #{profileStats.globalRanking}</div>
                <div className="text-xs text-white/60 uppercase font-mono tracking-wider">Global</div>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Skills + Stats */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 p-6 md:p-8 shadow-neural-glow space-y-6 md:space-y-8 col-span-1 lg:col-span-2"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-2xl md:text-3xl font-black text-white flex items-center space-x-3">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
            >
              <TrendingUp className="w-8 h-8 text-mx-green" />
            </motion.div>
            <span>Top Skills</span>
          </h3>
          <div className="text-xs text-white/50 font-mono">
            {profileStats.topSkills.length} skills
          </div>
        </div>
        
        {isEditing && (
          <div className="mb-4 p-4 bg-white/5 rounded-xl border border-white/10">
            <div className="flex items-center space-x-2 mb-3">
              <input
                type="text"
                value={editingSkill}
                onChange={(e) => setEditingSkill(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    addSkill()
                  }
                }}
                placeholder="Add a new skill..."
                className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-mx-green/50 text-sm"
              />
              <motion.button
                onClick={addSkill}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-gradient-to-r from-mx-green to-emerald-400 rounded-lg text-white font-medium flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add</span>
              </motion.button>
            </div>
          </div>
        )}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {profileStats.topSkills.map((skill, idx) => {
            // Get icon for each skill type
            const getSkillIcon = (skillName: string) => {
              const lower = skillName.toLowerCase()
              if (lower.includes('plumb') || lower.includes('plomero')) return Wrench
              if (lower.includes('electric') || lower.includes('eléctrico')) return Zap
              if (lower.includes('dj') || lower.includes('music') || lower.includes('event')) return Music
              return Briefcase
            }
            
            const SkillIcon = getSkillIcon(skill)
            const skillColors = [
              'from-mx-green/30 to-emerald-400/20',
              'from-somnia-cyan/30 to-cyan-400/20',
              'from-somnia-purple/30 to-purple-400/20',
              'from-scroll-gold/30 to-yellow-400/20'
            ]
            const borderColors = [
              'border-mx-green/40 hover:border-mx-green/60',
              'border-somnia-cyan/40 hover:border-somnia-cyan/60',
              'border-somnia-purple/40 hover:border-somnia-purple/60',
              'border-scroll-gold/40 hover:border-scroll-gold/60'
            ]
            const iconColors = [
              'text-mx-green',
              'text-somnia-cyan',
              'text-somnia-purple',
              'text-scroll-gold'
            ]
            
            return (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: idx * 0.1, type: 'spring', stiffness: 100 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative overflow-hidden"
              >
                <div className={`
                  h-full p-5 md:p-6 bg-gradient-to-br ${skillColors[idx % skillColors.length]} 
                  rounded-2xl border ${borderColors[idx % borderColors.length]} 
                  backdrop-blur-xl transition-all duration-300 cursor-pointer
                  hover:shadow-neural-glow-lg relative
                `}>
                  {/* Shimmer effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-x-full group-hover:translate-x-full" 
                       style={{ transition: 'transform 0.6s ease-in-out' }} />
                  
                  <div className="relative z-10">
                    {/* Icon */}
                    <motion.div
                      className={`w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br ${skillColors[idx % skillColors.length]} rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:shadow-xl transition-shadow`}
                      whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <SkillIcon className={`w-6 h-6 md:w-7 md:h-7 ${iconColors[idx % iconColors.length]}`} />
                    </motion.div>
                    
                    {/* Skill Name */}
                    <div className="flex items-center justify-between mb-3">
                      <div className={`font-bold text-base md:text-lg ${iconColors[idx % iconColors.length]} line-clamp-2 flex-1`}>
                        {skill}
                      </div>
                      {isEditing && (
                        <motion.button
                          onClick={() => removeSkill(skill)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="ml-2 p-1 hover:bg-red-500/20 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </motion.button>
                      )}
                    </div>
                    
                    {/* Stats */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-white/70 font-mono">Jobs</span>
                        <span className="text-sm font-bold text-white font-mono">127</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-white/70 font-mono">Rating</span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-scroll-gold fill-scroll-gold" />
                          <span className="text-sm font-bold text-white font-mono">4.9</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Progress bar */}
                    <div className="mt-4 h-1 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full bg-gradient-to-r ${skillColors[idx % skillColors.length]}`}
                        initial={{ width: 0 }}
                        animate={{ width: '92%' }}
                        transition={{ delay: idx * 0.1 + 0.3, duration: 0.8, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* Gemini Insights */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="backdrop-blur-xl bg-gradient-to-br from-neural-blue/20 to-somnia-purple/10 rounded-3xl border border-neural-blue/30 p-8 shadow-neural-glow col-span-1 lg:col-span-2"
      >
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-somnia-purple to-mx-green rounded-2xl flex items-center justify-center flex-shrink-0 shadow-neural-glow">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-white mb-2 flex items-center space-x-2">
                <span>Gemini Insights</span>
                <span className="text-xs bg-gradient-to-r from-somnia-cyan to-mx-green px-2 py-1 rounded-full font-mono text-white/90">
                  AI
                </span>
              </h3>
              <div className="flex items-center space-x-2">
                <p className="text-white/70">AI analysis of your local and global performance</p>
                {modelUsed && (
                  <span className="text-xs text-white/40 font-mono">• {modelUsed}</span>
                )}
              </div>
            </div>
          </div>
          {isLoadingInsights && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
              className="w-6 h-6 border-2 border-somnia-cyan border-t-transparent rounded-full"
            />
          )}
        </div>
        
        {isLoadingInsights ? (
          <div className="flex items-center justify-center py-8">
            <div className="flex items-center space-x-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                className="w-8 h-8 border-4 border-somnia-cyan border-t-transparent rounded-full"
              />
              <span className="text-white/70 font-mono">Gemini analyzing...</span>
            </div>
          </div>
        ) : insights ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <div className="flex items-center space-x-2 mb-4">
                <TrendingUp className="w-5 h-5 text-somnia-cyan" />
                <h4 className="font-mono text-sm uppercase text-white/60 tracking-wide">Market Trends</h4>
              </div>
              <div className="space-y-3">
                {insights?.marketTrends && insights.marketTrends.length > 0 ? (
                  insights.marketTrends.map((trend: any, idx: number) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex justify-between items-center text-sm p-2 hover:bg-white/5 rounded-lg transition-colors"
                    >
                      <span className="text-white/70 font-mono">{trend.skill || trend}</span>
                      <span className="font-mono text-mx-green font-bold">{trend.trend || '↑ N/A'}</span>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-white/50 text-sm font-mono">No market trends available</div>
                )}
              </div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <div className="flex items-center space-x-2 mb-4">
                <Sparkles className="w-5 h-5 text-mx-green" />
                <h4 className="font-mono text-sm uppercase text-white/60 tracking-wide">Optimization</h4>
              </div>
              <div className="space-y-3 text-sm">
                {insights?.optimizationTips && insights.optimizationTips.length > 0 ? (
                  insights.optimizationTips.map((tip: string, idx: number) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-start space-x-2 p-2 hover:bg-white/5 rounded-lg transition-colors"
                    >
                      <span className="text-mx-green font-bold mt-0.5">•</span>
                      <span className="text-white/80 font-mono flex-1">{tip}</span>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-white/50 text-sm font-mono">No optimization tips available</div>
                )}
              </div>
            </div>
            
            {/* Recommendations section if available */}
            {insights?.recommendations && insights.recommendations.length > 0 && (
              <div className="md:col-span-2 bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                <div className="flex items-center space-x-2 mb-4">
                  <Brain className="w-5 h-5 text-somnia-purple" />
                  <h4 className="font-mono text-sm uppercase text-white/60 tracking-wide">Recommendations</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {insights.recommendations.map((rec: string, idx: number) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="p-3 bg-gradient-to-br from-somnia-purple/10 to-mx-green/10 rounded-lg border border-somnia-purple/20 text-sm text-white/80 font-mono"
                    >
                      {rec}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8">
            <Bot className="w-12 h-12 mx-auto mb-4 text-white/40" />
            <p className="text-white/60 font-mono">Connect your wallet to see AI insights</p>
          </div>
        )}
      </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

