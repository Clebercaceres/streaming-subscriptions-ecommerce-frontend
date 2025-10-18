import axios from 'axios'

// Crear instancia de axios con configuración base
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor para manejar tokens automáticamente
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('auth-storage')
    if (token) {
      try {
        const parsedToken = JSON.parse(token)
        if (parsedToken.state?.token) {
          config.headers.Authorization = `Bearer ${parsedToken.state.token}`
        }
      } catch (error) {
        // Solo log en desarrollo para evitar exposición de información sensible
        if (import.meta.env.DEV) {
          console.error('Error parsing auth token:', error.message)
        }
      }
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// Interceptor para manejar respuestas y errores
api.interceptors.response.use(
  response => {
    return response
  },
  async error => {
    const originalRequest = error.config

    // Si es error 401 (no autorizado) y no hemos intentado refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const refreshToken = localStorage.getItem('auth-storage')
        if (refreshToken) {
          const parsedRefreshToken = JSON.parse(refreshToken)
          if (parsedRefreshToken.state?.refreshToken) {
            // Intentar refrescar el token
            const response = await axios.post(
              `${api.defaults.baseURL}/auth/refresh-token`,
              {
                refreshToken: parsedRefreshToken.state.refreshToken,
              }
            )

            const { token, refreshToken: newRefreshToken } = response.data.data

            // Actualizar almacenamiento local
            const currentStorage = JSON.parse(
              localStorage.getItem('auth-storage') || '{}'
            )
            currentStorage.state = {
              ...currentStorage.state,
              token,
              refreshToken: newRefreshToken,
            }
            localStorage.setItem('auth-storage', JSON.stringify(currentStorage))

            // Actualizar header y reintentar la petición original
            originalRequest.headers.Authorization = `Bearer ${token}`
            return api(originalRequest)
          }
        }
      } catch (refreshError) {
        // Si refresh falla, redirigir al login
        localStorage.removeItem('auth-storage')
        window.location.href = '/login'
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export { api }
