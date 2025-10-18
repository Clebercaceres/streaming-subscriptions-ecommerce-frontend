import React from 'react'
import { Card, Row, Col, Typography, Input, Button, Form } from 'antd'
import {
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
  SendOutlined,
} from '@ant-design/icons'

const { Title, Text } = Typography

/**
 * Página de contacto independiente
 */
const ContactPage = () => {
  const [form] = Form.useForm()

  const handleSubmit = values => {
    console.log('Formulario de contacto enviado:', values)
    // Aquí iría la lógica para enviar el formulario
    alert('¡Gracias por tu mensaje! Te contactaremos pronto.')
    form.resetFields()
  }

  return (
    <div className="space-y-8">
      {/* Header de la página */}
      <div className="text-center mb-8">
        <Title level={2} className="mb-4">
          Contáctanos
        </Title>
        <Text type="secondary" className="text-lg">
          ¿Tienes preguntas? Estamos aquí para ayudarte las 24 horas del día
        </Text>
      </div>

      <Row gutter={[32, 32]}>
        {/* Información de contacto */}
        <Col xs={24} md={12}>
          <Card className="h-full">
            <div className="text-center mb-8">
              <Title level={3} className="mb-2">
                Información de Contacto
              </Title>
              <Text type="secondary">
                Elige el método que prefieras para comunicarte con nosotros
              </Text>
            </div>

            <div className="space-y-8">
              {/* Teléfono */}
              <div className="flex items-center space-x-4 p-4 rounded-lg border">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#52c41a', color: 'white' }}>
                  <PhoneOutlined className="text-xl" />
                </div>
                <div>
                  <Title level={5} className="mb-1">
                    Teléfono
                  </Title>
                  <Text type="secondary" className="text-sm">
                    Llámanos para soporte inmediato
                  </Text>
                  <div className="mt-2">
                    <Text strong className="text-lg" style={{ color: '#52c41a' }}>
                      +1 (555) 123-4567
                    </Text>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center space-x-4 p-4 rounded-lg border">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#1890ff', color: 'white' }}>
                  <MailOutlined className="text-xl" />
                </div>
                <div>
                  <Title level={5} className="mb-1">
                    Email
                  </Title>
                  <Text type="secondary" className="text-sm">
                    Envíanos un mensaje detallado
                  </Text>
                  <div className="mt-2">
                    <Text strong className="text-lg" style={{ color: '#1890ff' }}>
                      soporte@plataformastreaming.com
                    </Text>
                  </div>
                </div>
              </div>

              {/* Horario */}
              <div className="flex items-center space-x-4 p-4 rounded-lg border">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#722ed1', color: 'white' }}>
                  <ClockCircleOutlined className="text-xl" />
                </div>
                <div>
                  <Title level={5} className="mb-1">
                    Horario de Atención
                  </Title>
                  <Text type="secondary" className="text-sm">
                    Atención al cliente disponible
                  </Text>
                  <div className="mt-2">
                    <Text strong className="text-lg" style={{ color: '#722ed1' }}>
                      24/7 - 365 días
                    </Text>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </Col>

        {/* Formulario de contacto */}
        <Col xs={24} md={12}>
          <Card>
            <div className="text-center mb-6">
              <Title level={3} className="mb-2">
                Envíanos un Mensaje
              </Title>
              <Text type="secondary">
                Completa el formulario y te responderemos lo antes posible
              </Text>
            </div>

            <Form
              form={form}
              onFinish={handleSubmit}
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
                name="subject"
                label="Asunto"
                rules={[{ required: true, message: 'El asunto es requerido' }]}
              >
                <Input placeholder="¿En qué podemos ayudarte?" size="large" />
              </Form.Item>

              <Form.Item
                name="message"
                label="Mensaje"
                rules={[{ required: true, message: 'El mensaje es requerido' }]}
              >
                <Input.TextArea
                  placeholder="Describe tu consulta o problema en detalle..."
                  rows={6}
                  size="large"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  block
                  icon={<SendOutlined />}
                >
                  Enviar Mensaje
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>

      {/* Información adicional */}
      <Card className="border">
        <div className="text-center">
          <Title level={4} className="mb-4">
            ¿Necesitas ayuda inmediata?
          </Title>
          <Text type="secondary" className="mb-6 block">
            Nuestro equipo de soporte está disponible 24/7 para resolver
            cualquier duda o problema que tengas.
          </Text>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              type="primary"
              size="large"
              icon={<PhoneOutlined />}
            >
              Llamar Ahora: +1 (555) 123-4567
            </Button>
            <Button
              size="large"
              icon={<MailOutlined />}
            >
              soporte@plataformastreaming.com
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default ContactPage
