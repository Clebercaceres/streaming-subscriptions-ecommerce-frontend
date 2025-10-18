import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../services/api'

/**
 * Servicios React Query para perfil de usuario
 * Maneja consultas y mutaciones relacionadas con el perfil
 */

// Query Keys constantes
export const profileKeys = {
  all: ['profile'],
  detail: () => [...profileKeys.all, 'detail'],
}

/**
 * Hook para obtener el perfil del usuario actual
 */
export const useProfile = () => {
  return useQuery({
    queryKey: profileKeys.detail(),
    queryFn: async () => {
      const { data } = await api.get('/profile')
      return data
    },
    staleTime: 10 * 60 * 1000, // 10 minutos
    gcTime: 30 * 60 * 1000, // 30 minutos (perfiles cambian poco)
  })
}

/**
 * Hook para actualizar el perfil del usuario
 */
export const useUpdateProfile = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async profileData => {
      const { data } = await api.put('/profile', profileData)
      return data
    },
    onSuccess: data => {
      // Actualizar caché del perfil
      queryClient.setQueryData(profileKeys.detail(), data)
      // También actualizar el usuario en el store de auth si es necesario
      queryClient.invalidateQueries({ queryKey: ['auth'] })
    },
  })
}

/**
 * Hook para cambiar la contraseña
 */
export const useChangePassword = () => {
  return useMutation({
    mutationFn: async passwordData => {
      const { data } = await api.put('/profile/change-password', passwordData)
      return data
    },
  })
}

/**
 * Hook para subir imagen de perfil
 */
export const useUploadProfileImage = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async imageFile => {
      const formData = new FormData()
      formData.append('profileImage', imageFile)

      const { data } = await api.post('/profile/upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return data
    },
    onSuccess: data => {
      // Actualizar caché del perfil con la nueva imagen
      queryClient.setQueryData(profileKeys.detail(), oldData => ({
        ...oldData,
        user: {
          ...oldData.user,
          profileImage: data.profileImage,
        },
      }))
    },
  })
}

/**
 * Hook para obtener estadísticas del perfil
 */
export const useProfileStats = () => {
  return useQuery({
    queryKey: [...profileKeys.all, 'stats'],
    queryFn: async () => {
      const { data } = await api.get('/profile/stats')
      return data
    },
    staleTime: 5 * 60 * 1000, // 5 minutos
  })
}
