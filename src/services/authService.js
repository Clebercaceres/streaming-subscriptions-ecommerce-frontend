import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

/**
 * Servicio de autenticación para el frontend
 */
export const authService = {
  /**
   * Registrar nuevo usuario
   */
  async register(userData) {
    console.log('🔍 [FRONTEND] Enviando solicitud de registro:', userData)
    try {
      const response = await api.post('/auth/register', userData)
      console.log('✅ [FRONTEND] Registro exitoso:', response.data)
      return response.data
    } catch (error) {
      console.error(
        '❌ [FRONTEND] Error en registro:',
        error.message,
        error.response?.data
      )
      throw error
    }
  },

  /**
   * Iniciar sesión de usuario
   */
  async login(credentials) {
    console.log('🔍 [FRONTEND] Enviando solicitud de login:', {
      email: credentials.email,
    })
    try {
      const response = await api.post('/auth/login', credentials)
      console.log('✅ [FRONTEND] Login exitoso:', response.data)
      return response.data
    } catch (error) {
      console.error(
        '❌ [FRONTEND] Error en login:',
        error.message,
        error.response?.data
      )
      throw error
    }
  },

  /**
   * Verificar autenticación
   */
  async verifyAuth(token) {
    console.log('🔍 [FRONTEND] Verificando autenticación')
    try {
      const response = await api.get('/auth/verify', {
        headers: { Authorization: `Bearer ${token}` },
      })
      console.log('✅ [FRONTEND] Autenticación verificada:', response.data)
      return response.data
    } catch (error) {
      console.error(
        '❌ [FRONTEND] Error verificando autenticación:',
        error.message
      )
      throw error
    }
  },
}

export default authService
