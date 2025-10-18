import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../services/api'

/**
 * Servicios React Query para productos
 * Proporciona consultas y mutaciones optimizadas con caché inteligente
 */

// Query Keys constantes para evitar errores de tipeo
export const productKeys = {
  all: ['products'],
  list: () => [...productKeys.all, 'list'],
  detail: id => [...productKeys.all, 'detail', id],
}

/**
 * Hook para obtener productos con filtros y paginación
 */
export const useProducts = (filters = {}) => {
  return useQuery({
    queryKey: productKeys.list(filters),
    queryFn: async () => {
      const { data } = await api.get('/products', { params: filters })
      return data
    },
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos
    keepPreviousData: true, // Mantener datos anteriores mientras carga
  })
}

/**
 * Hook para obtener un producto específico por ID
 */
export const useProduct = id => {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: async () => {
      const { data } = await api.get(`/products/${id}`)
      return data
    },
    enabled: !!id, // Solo ejecutar si hay un ID válido
    staleTime: 10 * 60 * 1000, // 10 minutos para productos individuales
  })
}

/**
 * Hook para crear un nuevo producto
 */
export const useCreateProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async productData => {
      const { data } = await api.post('/products', productData)
      return data
    },
    onSuccess: () => {
      // Invalidar y refetch las consultas de productos
      queryClient.invalidateQueries({ queryKey: productKeys.list() })
    },
  })
}

/**
 * Hook para actualizar un producto
 */
export const useUpdateProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, productData }) => {
      const { data } = await api.put(`/products/${id}`, productData)
      return data
    },
    onSuccess: (data, variables) => {
      // Actualizar caché del producto específico
      queryClient.setQueryData(
        productKeys.detail(variables.id),
        data
      )
      // Invalidar listas para reflejar cambios
      queryClient.invalidateQueries({ queryKey: productKeys.list() })
    },
  })
}

/**
 * Hook para eliminar un producto
 */
export const useDeleteProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async id => {
      await api.delete(`/products/${id}`)
      return id
    },
    onSuccess: id => {
      // Remover producto del caché
      queryClient.removeQueries({ queryKey: productKeys.detail(id) })
      // Invalidar listas
      queryClient.invalidateQueries({ queryKey: productKeys.list() })
    },
  })
}

/**
 * Hook para obtener estadísticas de productos
 */
export const useProductStats = () => {
  return useQuery({
    queryKey: [...productKeys.all, 'stats'],
    queryFn: async () => {
      const { data } = await api.get('/products/stats')
      return data
    },
    staleTime: 5 * 60 * 1000, // 5 minutos
  })
}

/**
 * Hook para obtener productos por categoría
 */
export const useProductsByCategory = categoryId => {
  return useQuery({
    queryKey: [...productKeys.all, 'category', categoryId],
    queryFn: async () => {
      const { data } = await api.get(`/products/category/${categoryId}`)
      return data
    },
    enabled: !!categoryId,
    staleTime: 10 * 60 * 1000, // 10 minutos
  })
}

/**
 * Hook para obtener productos destacados
 */
export const useFeaturedProducts = (limit = 8) => {
  return useQuery({
    queryKey: [...productKeys.all, 'featured', limit],
    queryFn: async () => {
      const { data } = await api.get('/products/featured', {
        params: { limit }
      })
      return data
    },
    staleTime: 15 * 60 * 1000, // 15 minutos
  })
}

/**
 * Hook para obtener productos en oferta
 */
export const useSaleProducts = (limit = 12) => {
  return useQuery({
    queryKey: [...productKeys.all, 'sale', limit],
    queryFn: async () => {
      const { data } = await api.get('/products/sale', {
        params: { limit }
      })
      return data
    },
    staleTime: 10 * 60 * 1000, // 10 minutos
  })
}
