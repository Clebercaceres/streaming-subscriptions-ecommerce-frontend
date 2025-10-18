import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../services/api'

/**
 * Hook personalizado para obtener productos con React Query
 */
export const useProducts = (params = {}) => {
  return useQuery({
    queryKey: ['products', params],
    queryFn: async () => {
      const response = await api.get('/products', { params })
      return response.data
    },
    staleTime: 2 * 60 * 1000, // 2 minutos
  })
}

/**
 * Hook personalizado para obtener un producto específico
 */
export const useProduct = id => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const response = await api.get(`/products/${id}`)
      return response.data
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutos
  })
}

/**
 * Hook personalizado para obtener plataformas de streaming
 */
export const useStreamingPlatforms = () => {
  return useQuery({
    queryKey: ['streaming-platforms'],
    queryFn: async () => {
      const response = await api.get('/streaming-platforms')
      return response.data
    },
    staleTime: 10 * 60 * 1000, // 10 minutos (datos que cambian poco)
  })
}

/**
 * Hook personalizado para crear un producto
 */
export const useCreateProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async productData => {
      const response = await api.post('/products', productData)
      return response.data
    },
    onSuccess: () => {
      // Invalidar y refetch queries relacionadas
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })
}

/**
 * Hook personalizado para actualizar un producto
 */
export const useUpdateProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, productData }) => {
      const response = await api.put(`/products/${id}`, productData)
      return response.data
    },
    onSuccess: (data, variables) => {
      // Actualizar el cache específico del producto
      queryClient.setQueryData(['product', variables.id], data)
      // Invalidar lista de productos
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })
}

/**
 * Hook personalizado para eliminar un producto
 */
export const useDeleteProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async id => {
      await api.delete(`/products/${id}`)
      return id
    },
    onSuccess: id => {
      // Remover del cache
      queryClient.removeQueries({ queryKey: ['product', id] })
      // Invalidar lista de productos
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })
}

/**
 * Hook personalizado para buscar productos
 */
export const useSearchProducts = searchTerm => {
  return useQuery({
    queryKey: ['products', 'search', searchTerm],
    queryFn: async () => {
      const response = await api.get('/products/search', {
        params: { q: searchTerm },
      })
      return response.data
    },
    enabled: !!searchTerm && searchTerm.length > 2,
    staleTime: 1 * 60 * 1000, // 1 minuto para búsquedas
  })
}
