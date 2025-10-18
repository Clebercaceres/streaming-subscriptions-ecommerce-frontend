import React, { useState, useEffect } from 'react'
import { Card, List, Typography, Avatar, Badge } from 'antd'
import {
  TrophyOutlined,
  StarOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons'
import { getImageWithFallback } from '../../services/imageService'

const { Title, Text } = Typography
const { Meta } = Card

/**
 * Sección de productos más vendidos
 * Ahora obtiene imágenes desde el backend con protección
 */
const BestSellers = ({ bestSellers }) => {
  if (!bestSellers || bestSellers.length === 0) {
    return null
  }

  return (
    <div className="mb-8">
      <Title level={3} className="mb-4 flex items-center gap-2">
        <TrophyOutlined className="text-yellow-500" />
        Más Vendidos
      </Title>

      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 3,
          lg: 4,
          xl: 5,
          xxl: 6,
        }}
        dataSource={bestSellers}
        renderItem={(product, index) => (
          <BestSellerItem
            key={product.id || index}
            product={product}
            index={index}
          />
        )}
      />
    </div>
  )
}

/**
 * Componente individual para cada producto más vendido
 */
const BestSellerItem = ({ product, index }) => {
  const [imageUrl, setImageUrl] = useState(null)
  const [imageLoading, setImageLoading] = useState(true)

  useEffect(() => {
    const loadImage = async () => {
      const isDev = import.meta.env.DEV
      if (isDev) setImageLoading(true)
      try {
        const url = await getImageWithFallback(product.image_url)
        if (isDev) setImageUrl(url)
      } catch (error) {
        if (isDev) setImageUrl(null)
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

  return (
    <List.Item>
      <Card hoverable className="relative" styles={{
        body: { padding: '12px' }
      }}>
        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-3">
          {imageLoading ? (
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
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
                    '🏆 BestSellers: Error de imagen para',
                    product.name,
                    ', src:',
                    e.target.src
                  )
                // Evitar ciclo infinito: solo cambiar a fallback si no es ya el fallback
                if (!e.target.src.includes('data:image/svg')) {
                  e.target.src =
                    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5YTNhZCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlbiBubyBkaXNwb25pYmxlPC90ZXh0Pjwvc3ZnPg=='
                }
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <ShoppingCartOutlined className="text-2xl text-gray-400" />
            </div>
          )}
        </div>

        {/* Badge de posición */}
        <div className="absolute top-2 left-2">
          <Badge
            count={product.position || index + 1}
            style={{
              backgroundColor: product.position <= 3 ? '#faad14' : '#d9d9d9',
              color: product.position <= 3 ? '#fff' : '#000',
              fontSize: '12px',
            }}
          />
        </div>

        <Meta
          title={
            <Text strong className="text-sm line-clamp-2">
              {product.name}
            </Text>
          }
          description={
            <div className="space-y-1">
              <Text className="text-primary font-semibold">
                ${product.price}
              </Text>
              <div className="flex items-center text-xs text-gray-500">
                <StarOutlined className="mr-1" />
                {product.sold_count} ventas
              </div>
            </div>
          }
        />
      </Card>
    </List.Item>
  )
}

export default BestSellers
