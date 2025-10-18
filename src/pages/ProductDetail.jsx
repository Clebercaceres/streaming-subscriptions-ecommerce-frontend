import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, ShoppingCart, Star } from 'lucide-react'
import { useProductStore } from '../store'
import {
  Button,
  Card,
  Badge,
  Spin,
  Typography,
  Divider,
  Row,
  Col,
} from 'antd'

const { Title, Text, Paragraph } = Typography

/**
 * Página de detalle de producto
 */
const ProductDetail = () => {
  const { id } = useParams()
  const { product, loading, error, fetchProductById } = useProductStore()

  useEffect(() => {
    if (id) {
      fetchProductById(id)
    }
  }, [id, fetchProductById])

  const formatPrice = price => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD',
    }).format(price)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Spin size="large" tip="Cargando producto..." />
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="text-center py-12">
        <Text type="danger" className="text-lg mb-4 block">
          {error || 'Producto no encontrado'}
        </Text>
        <Button type="primary">
          Volver al catálogo
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-gray-600">
        <Button type="link" href="/" className="p-0 h-auto">
          Inicio
        </Button>
        <span>/</span>
        <span className="text-gray-900">{product.name}</span>
      </div>

      <Row gutter={[24, 24]}>
        {/* Imagen del producto */}
        <Col xs={24} lg={12}>
          <Card>
            <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
              {product.image_url ? (
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  Sin imagen
                </div>
              )}
            </div>
          </Card>
        </Col>

        {/* Información del producto */}
        <Col xs={24} lg={12}>
          <div className="space-y-6">
            <div>
              <Title level={1} className="mb-2">
                {product.name}
              </Title>

              <div className="flex items-center space-x-4 mb-4">
                <Text strong className="text-2xl text-primary">
                  {formatPrice(product.price)}
                </Text>
                <Badge className="flex items-center space-x-1">
                  <Star className="w-4 h-4" />
                  <span>{product.sold_count} ventas</span>
                </Badge>
              </div>
            </div>

            <Card>
              <div className="space-y-4">
                <div>
                  <Title level={4} className="mb-2">
                    Descripción
                  </Title>
                  <Paragraph className="text-gray-600">
                    {product.description || 'Sin descripción disponible'}
                  </Paragraph>
                </div>

                <div className="flex space-x-3">
                  <Button type="primary" className="flex-1 flex items-center justify-center space-x-2">
                    <ShoppingCart className="w-5 h-5" />
                    <span>Comprar ahora</span>
                  </Button>
                  <Button>Agregar al carrito</Button>
                </div>
              </div>
            </Card>

            {/* Información adicional */}
            <Card>
              <Title level={4} className="mb-3">
                Información del producto
              </Title>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <Text type="secondary">ID del producto:</Text>
                  <Text strong>#{product.id}</Text>
                </div>
                <Divider className="my-2" />
                <div className="flex justify-between">
                  <Text type="secondary">Precio:</Text>
                  <Text strong>{formatPrice(product.price)}</Text>
                </div>
                <Divider className="my-2" />
                <div className="flex justify-between">
                  <Text type="secondary">Ventas totales:</Text>
                  <Text strong>{product.sold_count}</Text>
                </div>
              </div>
            </Card>
          </div>
        </Col>
      </Row>

      {/* Productos relacionados (placeholder) */}
      <Card>
        <Title level={3} className="mb-4">
          Productos relacionados
        </Title>
        <div className="text-center py-8 text-gray-600">
          Los productos relacionados aparecerán aquí próximamente.
        </div>
      </Card>
    </div>
  )
}

export default ProductDetail
