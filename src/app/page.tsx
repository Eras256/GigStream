'use client'

import Navbar from '@/components/somnia/Navbar'
import Footer from '@/components/somnia/Footer'
import HeroSection from '@/components/gigstream/HeroSection'
import FeaturesSection from '@/components/gigstream/FeaturesSection'
import BenefitsSection from '@/components/gigstream/BenefitsSection'
import HowItWorksSection from '@/components/gigstream/HowItWorksSection'
import WhatWeDoSection from '@/components/gigstream/WhatWeDoSection'
// Somnia Network Sections - Integrated
import TechnologySection from '@/components/somnia/TechnologySection'
import MultiStreamSection from '@/components/somnia/MultiStreamSection'
import CTASection from '@/components/gigstream/CTASection'
import GeminiBot from '@/components/chatbot/GeminiBot'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neural-blue via-somnia-purple/20 to-mx-green/10">
      <Navbar />
      <main>
        {/* GigStream Sections */}
        <HeroSection />
        <FeaturesSection />
        <BenefitsSection />
        <HowItWorksSection />
        <WhatWeDoSection />
        
        {/* Somnia Network - Consolidated Key Features */}
        <TechnologySection />
        <MultiStreamSection />
        
        {/* Final CTA */}
        <CTASection />
      </main>
      <Footer />
      <GeminiBot />
    </div>
  )
}

