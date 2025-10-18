import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../../services/api'

/**
 * Hook personalizado para obtener el perfil del usuario
 */
export const useUserProfile = () => {
  return useQuery({
    queryKey: ['user-profile'],
    queryFn: async () => {
      const response = await api.get('/auth/profile')
      return response.data
    },
    staleTime: 5 * 60 * 1000, // 5 minutos
  })
}

/**
 * Hook personalizado para actualizar el perfil del usuario
 */
export const useUpdateProfile = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async profileData => {
      const response = await api.put('/auth/profile', profileData)
      return response.data
    },
    onSuccess: data => {
      // Actualizar el cache del perfil
      queryClient.setQueryData(['user-profile'], data)
      // También actualizar el usuario en el store de Zustand si es necesario
    },
  })
}

/**
 * Hook personalizado para subir imagen de perfil
 */
export const useUploadProfileImage = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async imageFile => {
      const formData = new FormData()
      formData.append('image', imageFile)

      const response = await api.post('/auth/profile/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return response.data
    },
    onSuccess: data => {
      // Actualizar el cache del perfil con la nueva imagen
      queryClient.setQueryData(['user-profile'], oldData => ({
        ...oldData,
        user: {
          ...oldData.user,
          profileImage: data.imageUrl,
        },
      }))
    },
  })
}
