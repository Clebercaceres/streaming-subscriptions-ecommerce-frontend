import { api } from './api'

/**
 * Servicio para obtener imágenes protegidas desde el backend
 */

// Cache de tokens para evitar múltiples requests
const tokenCache = new Map()

/**
 * Generar URL con token para imagen protegida
 */
export const getProtectedImageUrl = async imagePath => {
  if (!imagePath) return null

  // Solo log en desarrollo
  const isDev = import.meta.env.MODE === 'development'
  if (isDev) console.log('🔍 Solicitando imagen protegida para:', imagePath)

  try {
    // Verificar si ya tenemos un token válido para esta imagen
    const cached = tokenCache.get(imagePath)
    if (cached && cached.expires > Date.now()) {
      if (isDev) console.log('✅ Usando token cacheado para:', imagePath)
      // Asegurar que la URL cacheada sea absoluta
      const absoluteCachedUrl = cached.imageUrl.startsWith('http')
        ? cached.imageUrl
        : `${import.meta.env.VITE_IMAGES_URL || 'http://localhost:5001'}${
            cached.imageUrl
          }`
      if (isDev) console.log('🔗 URL absoluta desde cache:', absoluteCachedUrl)
      return absoluteCachedUrl
    }

    if (isDev)
      console.log('🔄 Solicitando nuevo token al backend para:', imagePath)

    // Solicitar nuevo token al backend
    const response = await api.get(
      `/images/token/${encodeURIComponent(imagePath)}`
    )
    if (isDev) console.log('✅ Token recibido del backend:', response.data)

    // Convertir URL relativa a absoluta
    const absoluteUrl = response.data.imageUrl.startsWith('http')
      ? response.data.imageUrl
      : `${import.meta.env.VITE_IMAGES_URL || 'http://localhost:5001'}${
          response.data.imageUrl
        }`

    if (isDev) console.log('🔗 URL absoluta generada:', absoluteUrl)

    // Cachear el token
    tokenCache.set(imagePath, {
      imageUrl: absoluteUrl,
      expires: new Date(response.data.expires).getTime(),
    })

    return absoluteUrl
  } catch (error) {
    if (isDev) {
      console.error('❌ Error obteniendo token de imagen:', error)
      console.error('Error details:', error.response?.data || error.message)
    }

    // Fallback a URL sin protección (para desarrollo)
    const fallbackUrl = `${
      import.meta.env.VITE_IMAGES_URL || 'http://localhost:5001'
    }/images/${imagePath}`
    if (isDev) console.log('🔄 Usando fallback sin protección:', fallbackUrl)
    return fallbackUrl
  }
}

/**
 * Servicio para obtener imágenes de productos con protección
 */
export const getProductImageUrl = async imageName => {
  if (!imageName) return null
  return getProtectedImageUrl(`products/${imageName}`)
}

/**
 * Servicio para obtener imágenes del carousel con protección
 */
export const getCarouselImageUrl = async imageName => {
  if (!imageName) return null

  // Solo log en desarrollo
  const isDev = import.meta.env.MODE === 'development'
  if (isDev) {
    console.log('🔍 Solicitando imagen de carousel para:', imageName)
  }

  // Las imágenes del carousel están en /images/products/ junto con las imágenes de productos
  const base = import.meta.env.VITE_IMAGES_URL || 'http://localhost:5001/images'
  const directUrl = `${base}/${imageName}`

  if (isDev) {
    console.log('🔍 Verificando existencia de imagen de carousel:', directUrl)
  }

  // Verificar que la imagen existe antes de devolver la URL
  try {
    const exists = await checkImageExists(directUrl)
    if (exists) {
      if (isDev) {
        console.log('✅ Imagen de carousel existe:', directUrl)
      }
      return directUrl
    } else {
      if (isDev) {
        console.log('❌ Imagen de carousel no existe, usando fallback')
      }
      return `${base}/products/carousel-1.jpeg` // Fallback a la primera imagen del carousel
    }
  } catch (error) {
    if (isDev) console.error('❌ Error verificando imagen de carousel:', error)
    // Devolver URL directa de todos modos
    return directUrl
  }
}

/**
 * Función para verificar si una imagen existe
 */
export const checkImageExists = async imageUrl => {
  try {
    const response = await fetch(imageUrl, { method: 'HEAD' })
    return response.ok
  } catch {
    return false
  }
}

/**
 * Obtener imagen con fallback (con protección)
 */
export const getImageWithFallback = async (
  imageName,
  fallbackImage = 'netflix.jpeg'
) => {
  // Solo log en desarrollo
  const isDev = import.meta.env.MODE === 'development'
  if (isDev) {
    console.log('🔍 Solicitando imagen con fallback para:', imageName)
  }

  // Por ahora, usar URLs directas sin protección para debugging
  const base = import.meta.env.VITE_IMAGES_URL || 'http://localhost:5001/images'
  const directUrl = `${base}/products/${imageName || fallbackImage}`

  if (isDev) {
    console.log('🔍 Verificando existencia de imagen:', directUrl)
  }

  // Verificar que la imagen existe antes de devolver la URL
  try {
    const exists = await checkImageExists(directUrl)
    if (exists) {
      if (isDev) {
        console.log('✅ Imagen existe:', directUrl)
      }
      return directUrl
    } else {
      if (isDev) {
        console.log('❌ Imagen no existe, usando fallback:', fallbackImage)
      }
      const fallbackUrl = `${base}/products/${fallbackImage}`
      return fallbackUrl
    }
  } catch (error) {
    if (isDev) {
      console.error('❌ Error verificando imagen:', error)
    }
    // Devolver URL directa de todos modos
    return directUrl
  }
}

// Función para limpiar el cache de imágenes y forzar recarga
export const clearImageTokenCache = () => {
  tokenCache.clear()
}

/**
 * Pre-cargar tokens para múltiples imágenes (para mejorar rendimiento)
 */
export const preloadImageTokens = async imagePaths => {
  const promises = imagePaths.map(path => getProtectedImageUrl(path))
  return Promise.allSettled(promises)
}

// Función para limpiar el cache desde la consola del navegador
if (typeof window !== 'undefined') {
  window.clearImageCache = () => {
    tokenCache.clear()
    window.location.reload()
  }
}
