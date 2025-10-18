import React from 'react'
import HomeHeader from '../components/home/HomeHeader'
import HeroCarousel from '../components/home/HeroCarousel'
import StreamingPlatforms from '../components/home/StreamingPlatforms'
import FeaturesSection from '../components/home/FeaturesSection'

/**
 * Página de inicio con carousel y plataformas disponibles
 */
const HomePage = () => {
  return (
    <div className="space-y-8">
      {/* Header con búsqueda */}
      <HomeHeader />

      {/* Carousel de contenido destacado */}
      <HeroCarousel />

      {/* Plataformas de Streaming Disponibles */}
      <StreamingPlatforms />

      {/* Características destacadas */}
      <FeaturesSection />
    </div>
  )
}

export default HomePage
