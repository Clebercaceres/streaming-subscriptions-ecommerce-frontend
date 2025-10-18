import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { message } from 'antd'
import { api } from '../services/api'

/**
 * Hook personalizado que combina React Query con manejo de errores consistente
 * Proporciona notificaciones automáticas y manejo de errores
 */

/**
 * Hook para consultas con manejo de errores automático
 */
export const useQueryWithError = (queryKey, queryFn, options = {}) => {
  return useQuery({
    queryKey,
    queryFn,
    onError: (error) => {
      console.error('Query error:', error)
      message.error(
        error.response?.data?.message ||
        'Error al cargar los datos'
      )
    },
    ...options
  })
}

/**
 * Hook para mutaciones con manejo de errores automático y notificaciones de éxito
 */
export const useMutationWithError = (mutationFn, options = {}) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn,
    onError: (error) => {
      console.error('Mutation error:', error)
      message.error(
        error.response?.data?.message ||
        'Error al realizar la operación'
      )
    },
    onSuccess: (data, variables, context) => {
      // Llamar al onSuccess personalizado si existe
      if (options.onSuccess) {
        options.onSuccess(data, variables, context)
      }

      // Mostrar mensaje de éxito si se proporciona
      if (options.successMessage) {
        message.success(options.successMessage)
      }

      // Invalidar queries relacionadas si se especifican
      if (options.invalidateQueries) {
        options.invalidateQueries.forEach(queryKey => {
          queryClient.invalidateQueries({ queryKey })
        })
      }
    },
    ...options
  })
}

/**
 * Hook para consultas con optimismo (actualizar UI inmediatamente)
 */
export const useOptimisticQuery = (queryKey, queryFn, options = {}) => {
  const queryClient = useQueryClient()

  return useQuery({
    queryKey,
    queryFn,
    onMutate: async (newData) => {
      // Cancelar consultas salientes
      await queryClient.cancelQueries({ queryKey })

      // Guardar snapshot del valor anterior
      const previousData = queryClient.getQueryData(queryKey)

      // Aplicar actualización optimista
      if (options.optimisticUpdate) {
        queryClient.setQueryData(queryKey, options.optimisticUpdate)
      }

      return { previousData }
    },
    onError: (err, newData, context) => {
      // Revertir en caso de error
      if (context?.previousData) {
        queryClient.setQueryData(queryKey, context.previousData)
      }

      // Mostrar error
      message.error(
        err.response?.data?.message ||
        'Error al actualizar los datos'
      )
    },
    onSettled: () => {
      // Siempre refetch después de mutación
      queryClient.invalidateQueries({ queryKey })
    },
    ...options
  })
}

/**
 * Hook para manejar operaciones CRUD comunes con React Query
 */
export const useCrudOperations = (queryKey, apiEndpoint) => {
  // Crear
  const createMutation = useMutationWithError(
    (data) => api.post(apiEndpoint, data),
    {
      successMessage: 'Elemento creado exitosamente',
      invalidateQueries: [queryKey]
    }
  )

  // Leer (ya manejado por useQuery)
  const readQuery = useQueryWithError(queryKey, () =>
    api.get(apiEndpoint).then(res => res.data)
  )

  // Actualizar
  const updateMutation = useMutationWithError(
    ({ id, data }) => api.put(`${apiEndpoint}/${id}`, data),
    {
      successMessage: 'Elemento actualizado exitosamente',
      onSuccess: (data, variables) => {
        // Actualizar caché específico
        const queryClient = useQueryClient()
        queryClient.setQueryData([...queryKey, variables.id], data)
        queryClient.invalidateQueries({ queryKey })
      }
    }
  )

  // Eliminar
  const deleteMutation = useMutationWithError(
    (id) => api.delete(`${apiEndpoint}/${id}`),
    {
      successMessage: 'Elemento eliminado exitosamente',
      onSuccess: (data, id) => {
        const queryClient = useQueryClient()
        queryClient.removeQueries({ queryKey: [...queryKey, id] })
        queryClient.invalidateQueries({ queryKey })
      }
    }
  )

  return {
    create: createMutation,
    read: readQuery,
    update: updateMutation,
    delete: deleteMutation,
    isLoading: readQuery.isLoading,
    error: readQuery.error
  }
}
