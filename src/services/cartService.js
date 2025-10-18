import { api } from './api'

/**
 * Servicio para manejar operaciones del carrito con el backend
 */
export const cartService = {
  /**
   * Obtener carrito del servidor
   */
  async getCart() {
    try {
      const response = await api.get('/cart')
      return response.data
    } catch (error) {
      console.error('Error obteniendo carrito del servidor:', error)
      throw error
    }
  },

  /**
   * Agregar producto al carrito en el servidor
   */
  async addToCart(productId, quantity = 1) {
    try {
      const response = await api.post('/cart/add', { productId, quantity })
      return response.data
    } catch (error) {
      console.error('Error agregando producto al carrito:', error)
      throw error
    }
  },

  /**
   * Actualizar cantidad de producto en el carrito del servidor
   */
  async updateQuantity(productId, quantity) {
    try {
      const response = await api.put(`/cart/update/${productId}`, { quantity })
      return response.data
    } catch (error) {
      console.error('Error actualizando cantidad en carrito:', error)
      throw error
    }
  },

  /**
   * Eliminar producto del carrito del servidor
   */
  async removeFromCart(productId) {
    try {
      const response = await api.delete(`/cart/remove/${productId}`)
      return response.data
    } catch (error) {
      console.error('Error eliminando producto del carrito:', error)
      throw error
    }
  },

  /**
   * Vaciar carrito completo del servidor
   */
  async clearCart() {
    try {
      const response = await api.delete('/cart/clear')
      return response.data
    } catch (error) {
      console.error('Error vaciando carrito:', error)
      throw error
    }
  },

  /**
   * Sincronizar carrito local con el servidor
   */
  async syncCart(items) {
    try {
      const response = await api.post('/cart/sync', { items })
      return response.data
    } catch (error) {
      console.error('Error sincronizando carrito:', error)
      throw error
    }
  }
}
