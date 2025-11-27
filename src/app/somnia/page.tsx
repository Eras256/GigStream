'use client'

import Navbar from '@/components/somnia/Navbar'
import HeroSection from '@/components/somnia/HeroSection'
import TechnologySection from '@/components/somnia/TechnologySection'
import MultiStreamSection from '@/components/somnia/MultiStreamSection'
import IceDBSection from '@/components/somnia/IceDBSection'
import EVMSection from '@/components/somnia/EVMSection'
import EcosystemSection from '@/components/somnia/EcosystemSection'
import MSquaredSection from '@/components/somnia/MSquaredSection'
import ChunkedV2Section from '@/components/somnia/ChunkedV2Section'
import JitterSection from '@/components/somnia/JitterSection'
import SOMITokenSection from '@/components/somnia/SOMITokenSection'
import DevelopersSection from '@/components/somnia/DevelopersSection'
import RoadmapSection from '@/components/somnia/RoadmapSection'
import CommunitySection from '@/components/somnia/CommunitySection'
import Footer from '@/components/somnia/Footer'

export default function SomniaLandingPage() {
  return (
    <div className="min-h-screen bg-somnia-dark">
      <Navbar />
      <main>
        <HeroSection />
        <TechnologySection />
        <MultiStreamSection />
        <IceDBSection />
        <EVMSection />
        <EcosystemSection />
        <MSquaredSection />
        <ChunkedV2Section />
        <JitterSection />
        <SOMITokenSection />
        <DevelopersSection />
        <RoadmapSection />
        <CommunitySection />
      </main>
      <Footer />
    </div>
  )
}

