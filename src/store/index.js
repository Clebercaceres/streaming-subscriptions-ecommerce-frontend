import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { api } from '../services/api'
import { clearImageTokenCache } from '../services/imageService'
import { cartService } from '../services/cartService'

// Store de autenticación
export const useAuthStore = create(
  devtools(
    persist(
      (set, get) => ({
        user: null,
        token: null,
        refreshToken: null,
        isAuthenticated: false,
        loading: false,
        error: null,

        // Acciones de autenticación
        login: async credentials => {
          set({ loading: true, error: null })
          try {
            const response = await api.post('/auth/login', credentials)
            const { user, token, refreshToken } = response.data.data

            set({
              user,
              token,
              refreshToken,
              isAuthenticated: true,
              loading: false,
            })

            // Configurar token en el cliente API
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`

            // Sincronizar carrito del servidor al iniciar sesión
            try {
              const cartStore = JSON.parse(localStorage.getItem('cart-storage') || '{}')
              if (cartStore.state?.items?.length > 0) {
                // Si hay items en localStorage, sincronizar con servidor
                const { useCartStore } = await import('./index')
                await useCartStore.getState().syncCartWithServer()
              } else {
                // Si no hay items locales, obtener carrito del servidor
                const { useCartStore } = await import('./index')
                await useCartStore.getState().syncWithServer()
              }
            } catch (error) {
              console.error('Error sincronizando carrito al iniciar sesión:', error)
            }

            return response.data
          } catch (error) {
            set({
              loading: false,
              error:
                error.response?.data?.message || 'Error en el inicio de sesión',
            })
            throw error
          }
        },

        register: async userData => {
          set({ loading: true, error: null })
          try {
            const response = await api.post('/auth/register', userData)
            const { user, token, refreshToken } = response.data.data

            set({
              user,
              token,
              refreshToken,
              isAuthenticated: true,
              loading: false,
            })

            // Configurar token en el cliente API
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`

            return response.data
          } catch (error) {
            set({
              loading: false,
              error: error.response?.data?.message || 'Error en el registro',
            })
            throw error
          }
        },

        logout: () => {
          // Sincronizar carrito con servidor antes de cerrar sesión
          try {
            const cartStore = JSON.parse(localStorage.getItem('cart-storage') || '{}')
            if (cartStore.state?.items?.length > 0) {
              const { useCartStore } = require('./index')
              useCartStore.getState().syncCartWithServer()
            }
          } catch (error) {
            console.error('Error sincronizando carrito al cerrar sesión:', error)
          }

          // Eliminar tokens del almacenamiento persistente
          localStorage.removeItem('auth-storage')

          set({
            user: null,
            token: null,
            refreshToken: null,
            isAuthenticated: false,
            error: null,
          })

          // Limpiar cache de tokens de imágenes
          clearImageTokenCache()

          // Eliminar token del cliente API
          delete api.defaults.headers.common['Authorization']
        },

        updateProfile: async updateData => {
          set({ loading: true, error: null })
          try {
            const response = await api.put('/user/profile', updateData)
            const updatedUser = response.data.data

            set({
              user: updatedUser,
              loading: false,
            })

            return response.data
          } catch (error) {
            set({
              loading: false,
              error:
                error.response?.data?.message || 'Error actualizando perfil',
            })
            throw error
          }
        },

        refreshToken: async () => {
          const { refreshToken } = get()
          if (!refreshToken) {
            throw new Error('No hay refresh token disponible')
          }

          try {
            const response = await api.post('/auth/refresh-token', {
              refreshToken,
            })
            const { token, refreshToken: newRefreshToken } = response.data.data

            set({
              token,
              refreshToken: newRefreshToken,
            })

            // Actualizar token en el cliente API
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`

            return response.data
          } catch (error) {
            // Si falla el refresh, cerrar sesión
            get().logout()
            throw error
          }
        },

        // Verificar autenticación al cargar la app
        verifyAuth: async () => {
          const { token } = get()
          if (!token) {
            set({ loading: false })
            return
          }

          set({ loading: true })
          try {
            await api.get('/auth/verify', {
              headers: { Authorization: `Bearer ${token}` },
            })
            set({ isAuthenticated: true, loading: false })
          } catch (error) {
            // Si el token no es válido, intentar refresh
            try {
              await get().refreshToken()
              set({ isAuthenticated: true, loading: false })
            } catch (refreshError) {
              // Si refresh falla, cerrar sesión
              get().logout()
              set({ loading: false })
            }
          }
        },

        clearError: () => set({ error: null }),
      }),
      {
        name: 'auth-storage',
        partialize: state => ({
          user: state.user,
          token: state.token,
          refreshToken: state.refreshToken,
          isAuthenticated: state.isAuthenticated,
        }),
      }
    ),
    { name: 'AuthStore' }
  )
)

// Store de productos
export const useProductStore = create(
  devtools(
    (set, get) => ({
      products: [],
      product: null,
      loading: false,
      error: null,
      filters: {
        sort: 'name_asc',
        search: '',
        limit: 20,
        offset: 0,
      },
      totalCount: 0,
      bestSellers: [],

      // Acciones de productos
      fetchProducts: async (customFilters = {}) => {
        set({ loading: true, error: null })

        const currentFilters = { ...get().filters, ...customFilters }
        set({ filters: currentFilters })

        try {
          const response = await api.get('/products', {
            params: currentFilters,
          })

          set({
            products: response.data.data,
            totalCount: response.data.count,
            loading: false,
          })

          return response.data
        } catch (error) {
          set({
            loading: false,
            error:
              error.response?.data?.message || 'Error obteniendo productos',
          })
          throw error
        }
      },

      fetchProductById: async id => {
        set({ loading: true, error: null })

        try {
          const response = await api.get(`/products/${id}`)

          set({
            product: response.data.data,
            loading: false,
          })

          return response.data
        } catch (error) {
          set({
            loading: false,
            error: error.response?.data?.message || 'Error obteniendo producto',
          })
          throw error
        }
      },

      searchProducts: async (query, limit = 20) => {
        set({ loading: true, error: null })

        try {
          const response = await api.get('/products/search', {
            params: { q: query, limit },
          })

          set({
            products: response.data.data,
            loading: false,
          })

          return response.data
        } catch (error) {
          set({
            loading: false,
            error: error.response?.data?.message || 'Error buscando productos',
          })
          throw error
        }
      },

      fetchBestSellers: async (limit = 10) => {
        try {
          const response = await api.get('/products/best-sellers', {
            params: { limit },
          })

          set({
            bestSellers: response.data.data,
          })

          return response.data
        } catch (error) {
          set({
            error:
              error.response?.data?.message ||
              'Error obteniendo productos más vendidos',
          })
          throw error
        }
      },

      updateFilters: newFilters => {
        set({ filters: { ...get().filters, ...newFilters } })
      },

      clearProducts: () => {
        set({
          products: [],
          product: null,
          totalCount: 0,
          error: null,
        })
      },

      clearError: () => set({ error: null }),
    }),
    { name: 'ProductStore' }
  )
)

// Store de carrito (para futuras funcionalidades)
export const useCartStore = create(
  devtools(
    persist(
      (set, get) => ({
        items: [],
        isVisible: false, // Inicialmente oculto
        total: 0,
        itemCount: 0,
        loading: false,
        error: null,

        // Sincronizar carrito local con servidor
        syncCartWithServer: async () => {
          try {
            const { items } = get()
            await cartService.syncCart(items)
            console.log('✅ Carrito sincronizado con servidor')
          } catch (error) {
            console.error('Error sincronizando carrito con servidor:', error)
          }
        },

        addToCart: async product => {
          set({ loading: true, error: null })
          try {
            console.log('🛒 CART DEBUG - Producto recibido:', {
              id: product.id,
              name: product.name,
              image_url: product.image_url,
              price: product.price,
              description: product.description
            })

            const items = get().items
            const existingItem = items.find(item => item.id === product.id)

            let newItems
            if (existingItem) {
              newItems = items.map(item =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              )
            } else {
              newItems = [...items, { ...product, quantity: 1 }]
            }

            console.log('🛒 CART DEBUG - Items después de agregar:', newItems.map(item => ({
              id: item.id,
              name: item.name,
              image_url: item.image_url,
              quantity: item.quantity
            })))

            const total = newItems.reduce(
              (sum, item) => sum + item.price * item.quantity,
              0
            )
            const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0)

            set({
              items: newItems,
              total,
              itemCount,
              loading: false,
              isVisible: true, // Mostrar automáticamente el carrito flotante
            })

            // Si el usuario está autenticado, sincronizar con el servidor
            try {
              if (localStorage.getItem('auth-storage')) {
                const authData = JSON.parse(localStorage.getItem('auth-storage'))
                if (authData.state?.isAuthenticated) {
                  await cartService.syncCart(newItems)
                }
              }
            } catch (error) {
              console.error('Error sincronizando con servidor:', error)
            }
          } catch (error) {
            set({
              loading: false,
              error: 'Error agregando producto al carrito',
            })
          }
        },

        removeFromCart: async productId => {
          const items = get().items.filter(item => item.id !== productId)
          const total = items.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          )
          const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

          set({
            items,
            total,
            itemCount,
            isVisible: items.length === 0 ? false : get().isVisible, // Ocultar si no quedan productos
          })

          // Si el usuario está autenticado, sincronizar con el servidor
          try {
            if (localStorage.getItem('auth-storage')) {
              const authData = JSON.parse(localStorage.getItem('auth-storage'))
              if (authData.state?.isAuthenticated) {
                await cartService.syncCart(items)
              }
            }
          } catch (error) {
            console.error('Error sincronizando con servidor:', error)
          }
        },

        updateQuantity: async (productId, quantity) => {
          if (quantity <= 0) {
            get().removeFromCart(productId)
            return
          }

          const items = get().items.map(item =>
            item.id === productId ? { ...item, quantity } : item
          )
          const total = items.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          )
          const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

          set({
            items,
            total,
            itemCount,
          })

          // Si el usuario está autenticado, sincronizar con el servidor
          try {
            if (localStorage.getItem('auth-storage')) {
              const authData = JSON.parse(localStorage.getItem('auth-storage'))
              if (authData.state?.isAuthenticated) {
                await cartService.syncCart(items)
              }
            }
          } catch (error) {
            console.error('Error sincronizando con servidor:', error)
          }
        },

        clearCart: async () => {
          set({
            items: [],
            total: 0,
            itemCount: 0,
            isVisible: false, // Ocultar el carrito flotante cuando se vacía
          })

          // Si el usuario está autenticado, sincronizar con el servidor
          try {
            if (localStorage.getItem('auth-storage')) {
              const authData = JSON.parse(localStorage.getItem('auth-storage'))
              if (authData.state?.isAuthenticated) {
                await cartService.clearCart()
              }
            }
          } catch (error) {
            console.error('Error sincronizando con servidor:', error)
          }
        },

        toggleCartVisibility: () => {
          set(state => ({ isVisible: !state.isVisible }))
        },

        hideCart: () => {
          set({ isVisible: false })
        },

        showCart: () => {
          set({ isVisible: true })
        },
      }),
      {
        name: 'cart-storage',
        partialize: (state) => ({
          items: state.items,
          total: state.total,
          itemCount: state.itemCount,
          isVisible: state.isVisible, // Persistir explícitamente la visibilidad
        }),
      }
    ),
    { name: 'CartStore' }
  )
)
