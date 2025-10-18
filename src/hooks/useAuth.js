// ✅ versión corregida de useAuth.js
import { useAuthStore } from '../store'

/**
 * Hook personalizado para usar la autenticación
 * Proporciona acceso al estado de autenticación y métodos relacionados
 */
export const useAuth = () => {
  const {
    user,
    token,
    isAuthenticated,
    loading,
    error,
    login,
    register,
    logout,
    updateProfile,
    refreshToken,
    verifyAuth,
    clearError,
  } = useAuthStore()

  return {
    // Estado
    user,
    token,
    isAuthenticated,
    loading,
    error,

    // Acciones
    login,
    register,
    logout,
    updateProfile,
    refreshToken,
    verifyAuth,
    clearError,

    // Utilidades
    isAdmin: user?.role === 'admin',
    isLoading: loading,
    hasError: !!error,
  }
}
