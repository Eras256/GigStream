// src/components/gigstream/ProfileToggle.tsx - Profile Toggle Component
'use client'

import { motion } from 'framer-motion'
import { Briefcase, User, CheckCircle } from 'lucide-react'
import { useState, useEffect } from 'react'

type ProfileType = 'worker' | 'employer'

interface ProfileToggleProps {
  onProfileChange: (profile: ProfileType) => void
  defaultProfile?: ProfileType
}

export default function ProfileToggle({ onProfileChange, defaultProfile = 'worker' }: ProfileToggleProps) {
  const [profile, setProfile] = useState<ProfileType>(defaultProfile)

  useEffect(() => {
    // Load saved profile from localStorage
    const savedProfile = localStorage.getItem('gigstream-profile') as ProfileType
    if (savedProfile && (savedProfile === 'worker' || savedProfile === 'employer')) {
      setProfile(savedProfile)
      onProfileChange(savedProfile)
    } else {
      onProfileChange(profile)
    }
  }, [])

  const handleToggle = (newProfile: ProfileType) => {
    setProfile(newProfile)
    localStorage.setItem('gigstream-profile', newProfile)
    onProfileChange(newProfile)
  }

  return (
    <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-2 border border-white/10 inline-flex items-center space-x-2">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => handleToggle('worker')}
        className={`px-4 py-2 rounded-xl font-bold transition-all duration-300 flex items-center space-x-2 ${
          profile === 'worker'
            ? 'bg-gradient-to-r from-somnia-cyan to-mx-green text-white shadow-neural-glow'
            : 'text-white/60 hover:text-white/80'
        }`}
      >
        <User className="w-4 h-4" />
        <span>Worker</span>
        {profile === 'worker' && <CheckCircle className="w-4 h-4" />}
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => handleToggle('employer')}
        className={`px-4 py-2 rounded-xl font-bold transition-all duration-300 flex items-center space-x-2 ${
          profile === 'employer'
            ? 'bg-gradient-to-r from-somnia-purple to-mx-green text-white shadow-neural-glow'
            : 'text-white/60 hover:text-white/80'
        }`}
      >
        <Briefcase className="w-4 h-4" />
        <span>Employer</span>
        {profile === 'employer' && <CheckCircle className="w-4 h-4" />}
      </motion.button>
    </div>
  )
}

