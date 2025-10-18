import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Card,
  Button,
  Typography,
  Row,
  Col,
  Avatar,
  Space,
  Divider,
  Empty,
  Statistic,
} from 'antd'
import {
  ShoppingCartOutlined,
  PlusOutlined,
  MinusOutlined,
  DeleteOutlined,
  CreditCardOutlined,
} from '@ant-design/icons'
import { useCart } from '../hooks/useCart'

const { Title, Text } = Typography

/**
 * Página del carrito de compras con diseño simple y limpio como ContactPage
 */
const CartPage = () => {
  const navigate = useNavigate()
  const { items, total, updateQuantity, removeFromCart, clearCart } = useCart()

  const handleGoToCheckout = () => {
    navigate('/checkout')
  }

  return (
    <div className="space-y-8">
      {/* Header de la página */}
      <div className="text-center mb-8">
        <Title level={2} className="mb-4">
          Carrito de Compras
        </Title>
        <Text type="secondary" className="text-lg">
          Revisa tus productos antes de proceder al pago
        </Text>
      </div>

      <Row gutter={[32, 32]}>
        {/* Lista de productos */}
        <Col xs={24} lg={16}>
          <Card className="h-full">
            <div className="text-center mb-8">
              <Title level={3} className="mb-2">
                Productos en tu Carrito
              </Title>
              <Text type="secondary">
                Gestiona las cantidades y elimina productos según necesites
              </Text>
            </div>

            {items.length === 0 ? (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="Tu carrito está vacío"
                className="py-12"
              >
                <Button
                  type="primary"
                  onClick={() => navigate('/products')}
                  icon={<ShoppingCartOutlined />}
                >
                  Explorar Productos
                </Button>
              </Empty>
            ) : (
              <div className="space-y-4">
                {items.map(item => (
                  <Card key={item.id} size="small" className="border relative">
                    {/* Botón eliminar en esquina superior derecha */}
                    <Button
                      type="text"
                      danger
                      size="small"
                      icon={<DeleteOutlined />}
                      onClick={() => removeFromCart(item.id)}
                      className="absolute top-2 right-2"
                    />

                    <Row align="middle" gutter={16}>
                      {/* Imagen del producto */}
                      <Col xs={6} sm={4}>
                        <Avatar
                          src={item.image_url ? `http://localhost:5001/images/products/${item.image_url}` : undefined}
                          size={64}
                          shape="square"
                          className="bg-gray-200"
                          alt={item.name}
                        >
                          {item.name.charAt(0).toUpperCase()}
                        </Avatar>
                      </Col>

                      {/* Información del producto */}
                      <Col xs={12} sm={14}>
                        <Title level={5} className="mb-1">
                          {item.name}
                        </Title>
                        <Text type="secondary" className="text-sm">
                          ${item.price.toFixed(2)} c/u
                        </Text>
                      </Col>

                      {/* Controles de cantidad */}
                      <Col xs={6} sm={6}>
                        <div className="flex items-center justify-center space-x-2">
                          <Button
                            type="text"
                            size="small"
                            icon={<MinusOutlined />}
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          />
                          <Text className="px-2 min-w-[32px] text-center">
                            {item.quantity}
                          </Text>
                          <Button
                            type="text"
                            size="small"
                            icon={<PlusOutlined />}
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          />
                        </div>
                      </Col>
                    </Row>

                    {/* Subtotal en la parte inferior */}
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <div className="flex items-center justify-between">
                        <Text type="secondary">
                          Subtotal: ${(item.price * item.quantity).toFixed(2)}
                        </Text>
                      </div>
                    </div>
                  </Card>
                ))}

                {/* Botón de limpiar carrito */}
                {items.length > 0 && (
                  <div className="text-center pt-4">
                    <Button
                      danger
                      onClick={clearCart}
                      icon={<DeleteOutlined />}
                      className="w-full sm:w-auto"
                    >
                      Vaciar Carrito
                    </Button>
                  </div>
                )}
              </div>
            )}
          </Card>
        </Col>

        {/* Resumen del pedido */}
        <Col xs={24} lg={8}>
          <Card className="sticky top-4">
            <div className="text-center mb-6">
              <Title level={3} className="mb-2">
                Resumen del Pedido
              </Title>
              <Text type="secondary">
                Revisa el total antes de proceder
              </Text>
            </div>

            {items.length > 0 ? (
              <>
                {/* Lista de productos en resumen */}
                <div className="space-y-3 mb-4 max-h-48 overflow-y-auto order-summary-scroll">
                  {items.map(item => (
                    <div key={item.id} className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <Avatar
                          src={item.image_url ? `http://localhost:5001/images/products/${item.image_url}` : undefined}
                          size={32}
                          shape="square"
                          className="bg-gray-200"
                          alt={item.name}
                        >
                          {item.name.charAt(0).toUpperCase()}
                        </Avatar>
                        <div>
                          <Text className="block truncate max-w-[120px]">
                            {item.name}
                          </Text>
                          <Text type="secondary">
                            x{item.quantity}
                          </Text>
                        </div>
                      </div>
                      <Text>
                        ${(item.price * item.quantity).toFixed(2)}
                      </Text>
                    </div>
                  ))}
                </div>

                <Divider />

                {/* Total */}
                <div className="flex items-center justify-between mb-6">
                  <Statistic
                    title="Total"
                    value={total}
                    precision={2}
                    prefix="$"
                    valueStyle={{
                      fontSize: '24px',
                      fontWeight: 'bold',
                      color: '#1890ff',
                    }}
                  />
                </div>

                {/* Botones de acción */}
                <Space direction="vertical" className="w-full">
                  <Button
                    type="primary"
                    block
                    size="large"
                    onClick={handleGoToCheckout}
                    icon={<CreditCardOutlined />}
                  >
                    Proceder al Pago
                  </Button>

                  <Button
                    block
                    size="large"
                    onClick={() => navigate('/products')}
                  >
                    Continuar Comprando
                  </Button>
                </Space>
              </>
            ) : (
              <div className="text-center py-8">
                <ShoppingCartOutlined className="text-4xl text-gray-300 mb-4" />
                <Text type="secondary">
                  Tu carrito está vacío
                </Text>
              </div>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default CartPage
