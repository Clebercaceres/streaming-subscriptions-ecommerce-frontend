import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Button,
  Badge,
  Card,
  Avatar,
  Typography,
  Space,
  Divider,
  Empty,
} from 'antd'
import {
  ShoppingCartOutlined,
  PlusOutlined,
  MinusOutlined,
  DeleteOutlined,
} from '@ant-design/icons'
import { useCart } from '../../hooks/useCart'
import { getImageWithFallback } from '../../services/imageService'

const { Text, Title } = Typography

/**
 * Carrito flotante que se muestra arriba del botón de WhatsApp
 * Muestra productos con controles de cantidad y navegación al carrito
 */
const FloatingCart = () => {
  const navigate = useNavigate()
  const {
    items,
    itemCount,
    total,
    isVisible,
    hideCart,
    updateQuantity,
    removeFromCart,
    showCart,
  } = useCart()
  const [itemImages, setItemImages] = React.useState({})

  // Mostrar carrito automáticamente si tiene productos al cargar el componente
  React.useEffect(() => {
    if (items.length > 0 && !isVisible) {
      console.log(
        '🛒 FLOATING CART DEBUG - Componente cargado con productos, mostrando carrito automáticamente'
      )
      showCart()
    }
  }, []) // Solo se ejecuta al montar el componente

  // Cargar imágenes protegidas para todos los items del carrito flotante
  React.useEffect(() => {
    console.log('🛒 FLOATING CART DEBUG - useEffect ejecutado:', {
      itemsLength: items.length,
      isVisible,
      shouldLoad: items.length > 0 && isVisible,
    })

    const loadItemImages = async () => {
      if (import.meta.env.DEV) {
        console.log(
          '🛒 FLOATING CART DEBUG - Cargando imágenes para items flotantes:',
          items.map(item => ({
            id: item.id,
            name: item.name,
            image_url: item.image_url,
          }))
        )
      }

      const imagePromises = items.map(async item => {
        if (!item.image_url || item.image_url === 'netflix.jpeg') {
          return { [item.id]: null }
        }

        try {
          const imageUrl = await getImageWithFallback(item.image_url)
          if (import.meta.env.DEV) {
            console.log(
              `🛒 FLOATING CART DEBUG - Imagen cargada para ${item.name}:`,
              imageUrl
            )
          }
          return { [item.id]: imageUrl }
        } catch (error) {
          if (import.meta.env.DEV) {
            console.error(
              `🛒 FLOATING CART DEBUG - Error cargando imagen para ${item.name}:`,
              error
            )
          }
          return { [item.id]: null }
        }
      })

      const images = await Promise.all(imagePromises)
      const imageMap = images.reduce((acc, img) => ({ ...acc, ...img }), {})

      if (import.meta.env.DEV) {
        console.log(
          '🛒 FLOATING CART DEBUG - Mapa de imágenes flotante final:',
          imageMap
        )
      }

      setItemImages(imageMap)
    }

    if (items.length > 0 && isVisible) {
      console.log('🛒 FLOATING CART DEBUG - Ejecutando loadItemImages')
      loadItemImages()
    } else if (items.length === 0) {
      console.log('🛒 FLOATING CART DEBUG - No hay items, limpiando imágenes')
      setItemImages({})
    } else {
      console.log(
        '🛒 FLOATING CART DEBUG - Carrito oculto pero con items, manteniendo imágenes'
      )
      // No limpiar imágenes si hay items pero el carrito está oculto
    }
  }, [items, isVisible])

  const handleGoToCart = () => {
    hideCart()
    navigate('/cart')
  }

  const handleGoToCheckout = () => {
    hideCart()
    navigate('/checkout')
  }

  // Prevenir que los clicks en botones internos cierren el carrito
  const handleButtonClick = (e, action) => {
    e.stopPropagation()
    action()
  }

  const handleCardClick = e => {
    // Prevenir que el click dentro del carrito se propague y lo cierre
    e.stopPropagation()
  }

  // Manejar clicks fuera del carrito para cerrarlo
  React.useEffect(() => {
    if (!isVisible) return

    console.log(
      '🛒 FLOATING CART DEBUG - Agregando event listener para click fuera'
    )

    const handleClickOutside = event => {
      const cartElement = document.querySelector('.floating-cart-card')
      if (cartElement && !cartElement.contains(event.target)) {
        console.log(
          '🛒 FLOATING CART DEBUG - Click detectado fuera del carrito, cerrando'
        )
        hideCart()
      }
    }

    // Agregar event listener inmediatamente sin timeout
    document.addEventListener('click', handleClickOutside, true)

    return () => {
      console.log(
        '🛒 FLOATING CART DEBUG - Removiendo event listener para click fuera'
      )
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [isVisible, hideCart])

  // Si no hay items, ocultar automáticamente el carrito
  React.useEffect(() => {
    if (items.length === 0) {
      console.log('🛒 FLOATING CART DEBUG - No hay items, ocultando carrito')
      hideCart()
    }
  }, [items.length, hideCart])

  return (
    <div className="fixed bottom-20 right-6 z-40">
      <Card
        className="floating-cart-card shadow-lg border-gray-200 dark:border-gray-700"
        style={{
          width: '320px',
          maxHeight: '400px',
          backgroundColor: 'var(--bg-color)',
          borderRadius: '12px',
        }}
        styles={{
          body: {
            padding: '16px',
            maxHeight: '320px',
            overflow: 'hidden',
          },
        }}
        onClick={handleCardClick}
      >
        {/* Header del carrito */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <ShoppingCartOutlined className="text-lg" />
            <Text strong className="text-gray-900 dark:text-white">
              Carrito de Compras
            </Text>
          </div>
          <Badge
            count={itemCount}
            showZero
            style={{
              backgroundColor: 'var(--primary-color)',
            }}
          />
        </div>

        {/* Lista de productos */}
        <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
          {items.length === 0 ? (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="Tu carrito está vacío"
              className="py-4"
            />
          ) : (
            items.map(item => (
              <div
                key={item.id}
                className="flex items-center space-x-3 p-2 rounded-lg bg-gray-50 dark:bg-gray-800"
              >
                {/* Imagen del producto */}
                <Avatar
                  src={itemImages[item.id]}
                  size={48}
                  shape="square"
                  className="bg-gray-200 dark:bg-gray-600"
                  alt={item.name}
                >
                  {item.name.charAt(0).toUpperCase()}
                </Avatar>

                {/* Información del producto */}
                <div className="flex-1 min-w-0">
                  <Text
                    className="text-gray-900 dark:text-white font-medium block truncate"
                    style={{ fontSize: '14px' }}
                  >
                    {item.name}
                  </Text>
                  <Text
                    className="text-gray-600 dark:text-gray-400"
                    style={{ fontSize: '12px' }}
                  >
                    ${item.price.toFixed(2)}
                  </Text>
                </div>

                {/* Controles de cantidad */}
                <div className="flex items-center space-x-1">
                  <Button
                    type="text"
                    size="small"
                    icon={<MinusOutlined />}
                    onClick={e => {
                      e.stopPropagation()
                      updateQuantity(item.id, item.quantity - 1)
                    }}
                    disabled={item.quantity <= 1}
                    className="text-gray-600 dark:text-gray-400 hover:text-red-500"
                  />
                  <Text className="text-gray-900 dark:text-white px-2 min-w-[24px] text-center">
                    {item.quantity}
                  </Text>
                  <Button
                    type="text"
                    size="small"
                    icon={<PlusOutlined />}
                    onClick={e => {
                      e.stopPropagation()
                      updateQuantity(item.id, item.quantity + 1)
                    }}
                    className="text-gray-600 dark:text-gray-400 hover:text-green-500"
                  />
                </div>

                {/* Botón eliminar */}
                <Button
                  type="text"
                  size="small"
                  icon={<DeleteOutlined />}
                  onClick={e => {
                    e.stopPropagation()
                    removeFromCart(item.id)
                  }}
                  className="text-gray-400 hover:text-red-500"
                />
              </div>
            ))
          )}
        </div>

        {/* Total y acciones */}
        {items.length > 0 && (
          <>
            <Divider className="my-3" />

            <div className="space-y-3">
              {/* Total */}
              <div className="flex items-center justify-between">
                <Text strong className="text-gray-900 dark:text-white">
                  Total:
                </Text>
                <Text
                  strong
                  className="text-lg text-gray-900 dark:text-white"
                  style={{ color: 'var(--primary-color)' }}
                >
                  ${total.toFixed(2)}
                </Text>
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  )
}

export default FloatingCart
