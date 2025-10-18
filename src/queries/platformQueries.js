import { useQuery } from '@tanstack/react-query'
import { api } from '../services/api'

/**
 * Servicios React Query para plataformas de streaming
 * Maneja consultas optimizadas para datos de plataformas
 */

// Query Keys constantes
export const platformKeys = {
  all: ['platforms'],
  list: () => [...platformKeys.all, 'list'],
  detail: id => [...platformKeys.all, 'detail', id],
  categories: () => [...platformKeys.all, 'categories'],
  trending: () => [...platformKeys.all, 'trending'],
}

/**
 * Hook para obtener todas las plataformas disponibles
 */
export const usePlatforms = (filters = {}) => {
  return useQuery({
    queryKey: platformKeys.list(filters),
    queryFn: async () => {
      const { data } = await api.get('/platforms', { params: filters })
      return data
    },
    staleTime: 15 * 60 * 1000, // 15 minutos (plataformas cambian poco)
    gcTime: 60 * 60 * 1000, // 1 hora
  })
}

/**
 * Hook para obtener plataforma específica por ID
 */
export const usePlatform = id => {
  return useQuery({
    queryKey: platformKeys.detail(id),
    queryFn: async () => {
      const { data } = await api.get(`/platforms/${id}`)
      return data
    },
    enabled: !!id,
    staleTime: 30 * 60 * 1000, // 30 minutos
  })
}

/**
 * Hook para obtener categorías de plataformas
 */
export const usePlatformCategories = () => {
  return useQuery({
    queryKey: platformKeys.categories(),
    queryFn: async () => {
      const { data } = await api.get('/platforms/categories')
      return data
    },
    staleTime: 60 * 60 * 1000, // 1 hora (categorías son estáticas)
  })
}

/**
 * Hook para obtener plataformas en tendencia
 */
export const useTrendingPlatforms = (limit = 10) => {
  return useQuery({
    queryKey: [...platformKeys.trending(), limit],
    queryFn: async () => {
      const { data } = await api.get('/platforms/trending', {
        params: { limit }
      })
      return data
    },
    staleTime: 10 * 60 * 1000, // 10 minutos
  })
}

/**
 * Hook para obtener estadísticas de plataformas
 */
export const usePlatformStats = () => {
  return useQuery({
    queryKey: [...platformKeys.all, 'stats'],
    queryFn: async () => {
      const { data } = await api.get('/platforms/stats')
      return data
    },
    staleTime: 15 * 60 * 1000, // 15 minutos
  })
}

/**
 * Hook para obtener plataformas por categoría
 */
export const usePlatformsByCategory = categoryId => {
  return useQuery({
    queryKey: [...platformKeys.all, 'category', categoryId],
    queryFn: async () => {
      const { data } = await api.get(`/platforms/category/${categoryId}`)
      return data
    },
    enabled: !!categoryId,
    staleTime: 20 * 60 * 1000, // 20 minutos
  })
}

/**
 * Hook para obtener plataformas populares
 */
export const usePopularPlatforms = (limit = 10) => {
  return useQuery({
    queryKey: [...platformKeys.all, 'popular', limit],
    queryFn: async () => {
      const { data } = await api.get('/platforms/popular', {
        params: { limit }
      })
      return data
    },
    staleTime: 12 * 60 * 1000, // 12 minutos
  })
}

/**
 * Hook para obtener plataformas nuevas
 */
export const useNewPlatforms = (limit = 6) => {
  return useQuery({
    queryKey: [...platformKeys.all, 'new', limit],
    queryFn: async () => {
      const { data } = await api.get('/platforms/new', {
        params: { limit }
      })
      return data
    },
    staleTime: 8 * 60 * 1000, // 8 minutos
  })
}
