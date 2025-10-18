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
  Form,
  Input,
  Select,
  message,
} from 'antd'
import {
  ShoppingCartOutlined,
  CreditCardOutlined,
  LockOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons'
import { useCart } from '../hooks/useCart'

const { Title, Text } = Typography
const { Option } = Select

/**
 * Página de checkout con diseño simple y limpio como ContactPage
 */
const CheckoutPage = () => {
  const navigate = useNavigate()
  const { items, total, clearCart } = useCart()
  const [form] = Form.useForm()

  const handleGoBack = () => {
    navigate('/cart')
  }

  const handlePayment = async (values) => {
    try {
      // Aquí iría la lógica de procesamiento de pago
      message.success('¡Pago procesado exitosamente!')
      clearCart()
      navigate('/profile')
    } catch (error) {
      message.error('Error procesando el pago')
    }
  }

  return (
    <div className="space-y-8">
      {/* Header de la página */}
      <div className="mb-8">
        <div className="flex justify-start mb-4">
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={handleGoBack}
          >
            Volver al Carrito
          </Button>
        </div>

        <div className="text-center mb-4">
          <Title level={2} className="m-0">
            Checkout
          </Title>
        </div>

        <div className="text-center">
          <Text type="secondary" className="text-lg">
            Completa tu información para procesar el pago de forma segura
          </Text>
        </div>
      </div>

      <Row gutter={[32, 32]}>
        {/* Formulario de pago */}
        <Col xs={24} lg={14}>
          <Card className="h-full">
            <div className="text-center mb-8">
              <Title level={3} className="mb-2">
                Información de Pago
              </Title>
              <Text type="secondary">
                Completa los datos para procesar tu pedido de forma segura
              </Text>
            </div>

            <Form
              form={form}
              onFinish={handlePayment}
              layout="vertical"
              className="space-y-4"
            >
              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="firstName"
                    label="Nombre"
                    rules={[
                      { required: true, message: 'El nombre es requerido' },
                    ]}
                  >
                    <Input placeholder="Tu nombre" size="large" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="lastName"
                    label="Apellido"
                    rules={[
                      { required: true, message: 'El apellido es requerido' },
                    ]}
                  >
                    <Input placeholder="Tu apellido" size="large" />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: 'El email es requerido' },
                  { type: 'email', message: 'Ingresa un email válido' },
                ]}
              >
                <Input placeholder="tu.email@ejemplo.com" size="large" />
              </Form.Item>

              <Form.Item
                name="cardNumber"
                label="Número de Tarjeta"
                rules={[
                  { required: true, message: 'El número de tarjeta es requerido' },
                  { pattern: /^\d{16}$/, message: 'Número de tarjeta inválido' }
                ]}
              >
                <Input placeholder="1234 5678 9012 3456" size="large" />
              </Form.Item>

              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="expiryDate"
                    label="Fecha de Expiración"
                    rules={[
                      { required: true, message: 'La fecha es requerida' },
                      { pattern: /^(0[1-9]|1[0-2])\/\d{2}$/, message: 'Formato MM/YY' }
                    ]}
                  >
                    <Input placeholder="MM/YY" size="large" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="cvv"
                    label="CVV"
                    rules={[
                      { required: true, message: 'El CVV es requerido' },
                      { pattern: /^\d{3,4}$/, message: 'CVV inválido' }
                    ]}
                  >
                    <Input placeholder="123" size="large" type="password" />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                name="paymentMethod"
                label="Método de Pago"
                rules={[{ required: true, message: 'Selecciona un método de pago' }]}
              >
                <Select placeholder="Seleccionar método de pago" size="large">
                  <Option value="credit">Tarjeta de Crédito</Option>
                  <Option value="debit">Tarjeta de Débito</Option>
                  <Option value="paypal">PayPal</Option>
                </Select>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  block
                  icon={<LockOutlined />}
                >
                  Pagar ${total.toFixed(2)}
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>

        {/* Resumen del pedido */}
        <Col xs={24} lg={10}>
          <Card className="sticky top-4">
            <div className="text-center mb-6">
              <Title level={3} className="mb-2">
                Resumen del Pedido
              </Title>
              <Text type="secondary">
                Revisa tu pedido antes de pagar
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
                    title="Total a Pagar"
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

                <Text type="secondary" className="text-sm block">
                  ✓ Pago seguro procesado por nuestra plataforma
                </Text>
              </>
            ) : (
              <div className="text-center py-8">
                <ShoppingCartOutlined className="text-4xl text-gray-300 mb-4" />
                <Text type="secondary">
                  No hay productos en el carrito
                </Text>
              </div>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default CheckoutPage
