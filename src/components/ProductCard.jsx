import React, { useState, useEffect, memo } from 'react'
import { Link } from 'react-router-dom'
import {
  ShoppingCartOutlined,
  StarOutlined,
  ShoppingOutlined,
} from '@ant-design/icons'
import { Card, Button, Badge, Typography, Space, Row, Col, Tooltip } from 'antd'
import PropTypes from 'prop-types'
import { useCart } from '../hooks/useCart'
import { getImageWithFallback } from '../services/imageService'

const { Title, Text, Paragraph } = Typography
const { Meta } = Card

// Función para generar el fallback SVG de imagen no disponible
const getFallbackImageSvg = () => {
  const svgContent =
    'PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4' +
    '8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5P' +
    'SI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5YTNh' +
    'ZCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlbiBubyBkaXNwb25pYmxlPC90ZXh0Pjwvc3ZnPg=='

  return `data:image/svg+xml;base64,${btoa(svgContent)}`
}

/**
 * Tarjeta de producto reutilizable con Ant Design
 * Optimizada con React.memo para evitar re-renders innecesarios
 */
const ProductCard = memo(({ product, viewMode = 'grid' }) => {
  const { addToCart } = useCart()
  const [imageUrl, setImageUrl] = useState(null)
  const [imageLoading, setImageLoading] = useState(true)

  const handleAddToCart = e => {
    e.preventDefault()
    e.stopPropagation()

    // Asegurar que el producto tenga todas las propiedades necesarias para el carrito
    const productForCart = {
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image_url || 'netflix.jpeg', // Usar la ruta relativa original
      description: product.description || '',
      sold_count: product.sold_count || 0,
    }

    if (import.meta.env.DEV) {
      console.log('🛒 PRODUCTCARD DEBUG - Producto enviado al carrito:', {
        id: productForCart.id,
        name: productForCart.name,
        image_url: productForCart.image_url,
        price: productForCart.price,
        original_product_image_url: product.image_url
      })
    }

    addToCart(productForCart)
  }

  const formatPrice = price => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD',
    }).format(price)
  }

  // Cargar imagen protegida cuando cambie el producto
  useEffect(() => {
    const loadImage = async () => {
      const isDev = import.meta.env.DEV
      if (isDev) setImageLoading(true)
      try {
        const url = await getImageWithFallback(product.image_url)
        if (isDev) setImageUrl(url)
      } catch (error) {
        if (isDev)
          console.error(
            '🖼️ ProductCard: Error cargando imagen para',
            product.name,
            ':',
            error
          )
        setImageUrl(null)
      } finally {
        if (isDev) setImageLoading(false)
      }
    }

    if (product.image_url) {
      loadImage()
    } else {
      if (import.meta.env.DEV) setImageLoading(false)
    }
  }, [product.image_url, product.name])

  if (viewMode === 'list') {
    return (
      <Card
        hoverable
        className="hover:shadow-md transition-all duration-300"
        styles={{
          body: { padding: '16px' }
        }}
      >
        <Row gutter={16} align="middle">
          {/* Imagen */}
          <Col xs={24} sm={6} md={4}>
            <div className="w-full aspect-video bg-gray-100 rounded-lg overflow-hidden">
              {imageLoading ? (
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : imageUrl ? (
                <img
                  src={imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={e => {
                    if (import.meta.env.DEV)
                      console.error(
                        '🖼️ ProductCard: Error de imagen para',
                        product.name,
                        ', src:',
                        e.target.src
                      )
                    // Evitar ciclo infinito: solo cambiar a fallback si no es ya el fallback
                    if (!e.target.src.includes('data:image/svg')) {
                      e.target.src = getFallbackImageSvg()
                    }
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                  <ShoppingCartOutlined className="text-4xl text-gray-400" />
                </div>
              )}
            </div>
          </Col>

          {/* Información */}
          <Col xs={24} sm={12} md={14}>
            <Link to={`/products/${product.id}`}>
              <Title
                level={4}
                className="mb-2 hover:text-primary transition-colors"
              >
                {product.name}
              </Title>
            </Link>
            <Paragraph
              className="text-gray-600 mb-2"
              ellipsis={{ rows: 2, tooltip: product.description }}
            >
              {product.description || 'Sin descripción disponible'}
            </Paragraph>

            <Space size="middle">
              <Text strong className="text-lg text-primary">
                {formatPrice(product.price)}
              </Text>
              <Badge
                count={`${product.sold_count || 0} ventas`}
                style={{ backgroundColor: '#52c41a' }}
              />
            </Space>
          </Col>

          {/* Acciones */}
          <Col xs={24} sm={6} md={6} className="text-right">
            <Space direction="vertical" className="w-full">
              <Button
                type="primary"
                icon={<ShoppingCartOutlined />}
                onClick={handleAddToCart}
                block
                className="dark:bg-blue-600 dark:border-blue-600 dark:text-white"
              >
                Agregar al Carrito
              </Button>
              <Link to={`/products/${product.id}`}>
                <Button block>Ver Detalles</Button>
              </Link>
            </Space>
          </Col>
        </Row>
      </Card>
    )
  }

  return (
    <Card
      hoverable
      className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
      cover={
        <Link to={`/products/${product.id}`}>
          <div className="aspect-video bg-gray-100 relative overflow-hidden">
            {imageLoading ? (
              <div className="w-full h-full flex items-center justify-center bg-gray-200">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : imageUrl ? (
              <img
                src={imageUrl}
                alt={product.name}
                className={
                  'w-full h-full object-cover transition-transform duration-300 hover:scale-105'
                }
                loading="lazy"
                onError={e => {
                  if (import.meta.env.DEV)
                    console.error(
                      '🖼️ ProductCard: Error de imagen para',
                      product.name,
                      ', src:',
                      e.target.src
                    )
                  // Evitar ciclo infinito: solo cambiar a fallback si no es ya el fallback
                  if (!e.target.src.includes('data:image/svg')) {
                    e.target.src = getFallbackImageSvg()
                  }
                }}
              />
            ) : (
              <div
                className={
                  'w-full h-full flex items-center justify-center text-gray-400 bg-gray-50'
                }
              >
                Sin imagen
              </div>
            )}

            {/* Badge de ventas */}
            <div className="absolute top-3 right-3">
              <Badge
                count={`${product.sold_count || 0} ventas`}
                style={{
                  backgroundColor: '#1890ff',
                  color: 'white',
                  fontSize: '11px',
                }}
              />
            </div>
          </div>
        </Link>
      }
      actions={[
        <Tooltip title="Agregar al carrito" key="cart">
          <Button
            type="primary"
            shape="circle"
            icon={<ShoppingCartOutlined />}
            onClick={handleAddToCart}
            className="dark:bg-blue-600 dark:border-blue-600 dark:text-white"
          />
        </Tooltip>,
        <Tooltip title="Ver detalles" key="view">
          <Link to={`/products/${product.id}`}>
            <Button shape="circle" icon={<StarOutlined />} />
          </Link>
        </Tooltip>,
      ]}
    >
      <Meta
        title={
          <Link to={`/products/${product.id}`}>
            <Title
              level={5}
              className="mb-0 hover:text-primary transition-colors"
            >
              {product.name}
            </Title>
          </Link>
        }
        description={
          <div>
            <Paragraph
              className="text-gray-600 mb-2"
              ellipsis={{ rows: 2, tooltip: product.description }}
            >
              {product.description || 'Sin descripción disponible'}
            </Paragraph>
            <div className="flex items-center justify-between">
              <Text strong className="text-lg text-primary">
                {formatPrice(product.price)}
              </Text>
              <Text type="secondary" className="text-sm">
                <ShoppingOutlined className="mr-1" />
                {product.sold_count || 0} vendidos
              </Text>
            </div>
          </div>
        }
      />
    </Card>
  )
})

ProductCard.displayName = 'ProductCard'

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    price: PropTypes.number.isRequired,
    image_url: PropTypes.string,
    sold_count: PropTypes.number,
  }).isRequired,
  viewMode: PropTypes.oneOf(['grid', 'list']),
}

export default ProductCard
