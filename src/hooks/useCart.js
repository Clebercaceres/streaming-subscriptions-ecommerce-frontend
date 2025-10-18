import { useCartStore } from '../store'

/**
 * Hook personalizado para usar el carrito de compras
 * Proporciona acceso al estado del carrito y métodos para manipular productos
 */
export const useCart = () => {
  const {
    items,
    isVisible,
    total,
    itemCount,
    loading,
    error,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleCartVisibility,
    hideCart,
    showCart,
  } = useCartStore()

  return {
    // Estado
    items,
    isVisible,
    total,
    itemCount,
    loading,
    error,

    // Acciones
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleCartVisibility,
    hideCart,
    showCart,
  }
}
