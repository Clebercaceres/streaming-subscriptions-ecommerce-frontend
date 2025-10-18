import React, { useState, useEffect } from 'react'
import { Card, Carousel, Typography, Spin } from 'antd'
import { getCarouselImageUrl } from '../../services/imageService'
import { CAROUSEL_CONTENT } from '../../utils/constants'
import '../../assets/carousel.css'

const { Title, Text } = Typography

/**
 * Componente del carousel principal con contenido destacado
 */
const HeroCarousel = () => {
  const [carouselImages, setCarouselImages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadImages = async () => {
      const isDev = import.meta.env.DEV
      if (isDev) console.log('🎠 HeroCarousel: Cargando imágenes del carousel')
      setLoading(true)

      try {
        const imagePromises = CAROUSEL_CONTENT.map(async (item) => {
          if (isDev) console.log('🎠 HeroCarousel: Cargando imagen para', item.title)
          const imageUrl = await getCarouselImageUrl(item.image)
          return {
            ...item,
            loadedImageUrl: imageUrl
          }
        })

        const imagesWithUrls = await Promise.all(imagePromises)
        setCarouselImages(imagesWithUrls)
        if (isDev) console.log('🎠 HeroCarousel: Todas las imágenes cargadas exitosamente')
      } catch (error) {
        if (isDev) console.error('🎠 HeroCarousel: Error cargando imágenes del carousel:', error)
        // Usar imágenes con URLs básicas como fallback
        setCarouselImages(CAROUSEL_CONTENT.map(item => ({
          ...item,
          loadedImageUrl: `http://localhost:5001/images/${item.image}`
        })))
      } finally {
        setLoading(false)
      }
    }

    loadImages()
  }, [])

  if (loading) {
    return (
      <Card className="mb-8">
        <div className="h-96 flex items-center justify-center">
          <Spin size="large" tip="Cargando imágenes del carousel..." />
        </div>
      </Card>
    )
  }

  return (
    <Card className="mb-8">
      <Carousel
        autoplay
        autoplaySpeed={4000}
        effect="fade"
        dots={{ className: 'custom-dots' }}
      >
        {carouselImages.map((item, index) => (
          <div key={index} className="relative">
            <div className="h-96 bg-gray-100 rounded-lg relative overflow-hidden">
              {/* Imagen de fondo desde el backend */}
              <img
                src={item.loadedImageUrl}
                alt={item.title}
                className="w-full h-full object-cover"
                onError={e => {
                  if (import.meta.env.DEV) console.error('🎠 HeroCarousel: Error cargando imagen:', item.title, e.target.src)
                  e.target.src =
                    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwMCIgaGVpZ2h0PSI0MDAiIHZpZXdCb3g9IjAgMCAxMDAwIDQwMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwMCIgaGVpZ2h0PSI0MDAiIGZpbGw9IiNmM2Y0ZjYiLz48dGV4dCB4PSI1MDAiIHk9IjIwMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjI0IiBmaWxsPSIjOTlhM2FkIj5JbWFnZW4gbm8gZGlzcG9uaWJsZTwvdGV4dD48L3N2Zz4='
                }}
              />

              {/* Overlay con texto */}
              <div className="absolute inset-0 bg-black bg-opacity-40" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white p-8 max-w-4xl">
                  <Title
                    level={1}
                    className="text-white mb-4 text-5xl font-bold"
                  >
                    {item.title}
                  </Title>
                  <Text className="text-white text-xl mb-2 block">
                    {item.description}
                  </Text>
                  <Text className="text-white/80 text-lg">
                    {item.subtitle}
                  </Text>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </Card>
  )
}

export default HeroCarousel
