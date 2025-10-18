import { useState } from 'react'
import {
  Card,
  Form,
  Input,
  Button,
  Row,
  Col,
  Typography,
  Divider,
  Statistic,
  Avatar,
  Space,
  message,
} from 'antd'
import {
  UserOutlined,
  EditOutlined,
  LockOutlined,
  CalendarOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
  SaveOutlined,
  ReloadOutlined,
} from '@ant-design/icons'
import { useAuth } from '../hooks/useAuth'

const { Title, Text } = Typography

/**
 * Página de perfil de usuario con Ant Design
 */
const Profile = () => {
  const { user, updateProfile, loading } = useAuth()
  const [form] = Form.useForm()
  const [isEditing, setIsEditing] = useState(false)

  const handleSubmit = async values => {
    try {
      await updateProfile(values)
      setIsEditing(false)
      message.success('Perfil actualizado correctamente')
    } catch (error) {
      message.error('Error al actualizar el perfil')
      console.error('Error actualizando perfil:', error)
    }
  }

  const handleEdit = () => {
    setIsEditing(true)
    form.setFieldsValue({
      username: user?.username,
      email: user?.email,
    })
  }

  const handleCancel = () => {
    setIsEditing(false)
    form.resetFields()
  }

  return (
    <div className="space-y-6">
      {/* Header de la página */}
      <div className="flex items-center justify-between">
        <div>
          <Title level={2} className="mb-2">
            Mi Perfil
          </Title>
          <Text type="secondary" className="text-base">
            Gestiona tu información personal y configuración de cuenta
          </Text>
        </div>
        <Avatar size={64} icon={<UserOutlined />} className="bg-primary" />
      </div>

      <Row gutter={[24, 24]}>
        {/* Información del perfil */}
        <Col xs={24} lg={16}>
          <Card
            title={
              <Space>
                <EditOutlined />
                Información Personal
              </Space>
            }
            extra={
              !isEditing ? (
                <Button
                  type="primary"
                  icon={<EditOutlined />}
                  onClick={handleEdit}
                >
                  Editar
                </Button>
              ) : null
            }
          >
            {isEditing ? (
              <Form
                form={form}
                onFinish={handleSubmit}
                layout="vertical"
                initialValues={{
                  username: user?.username,
                  email: user?.email,
                }}
              >
                <Form.Item
                  name="username"
                  label="Nombre de Usuario"
                  rules={[
                    {
                      required: true,
                      message: 'El nombre de usuario es requerido',
                    },
                    { min: 3, message: 'Debe tener al menos 3 caracteres' },
                  ]}
                >
                  <Input placeholder="Ingresa tu nombre de usuario" />
                </Form.Item>

                <Form.Item
                  name="email"
                  label="Correo Electrónico"
                  rules={[
                    { required: true, message: 'El email es requerido' },
                    { type: 'email', message: 'Ingresa un email válido' },
                  ]}
                >
                  <Input placeholder="Ingresa tu correo electrónico" />
                </Form.Item>

                <Form.Item>
                  <Space>
                    <Button
                      type="primary"
                      htmlType="submit"
                      icon={<SaveOutlined />}
                      loading={loading}
                    >
                      Guardar Cambios
                    </Button>
                    <Button onClick={handleCancel} icon={<ReloadOutlined />}>
                      Cancelar
                    </Button>
                  </Space>
                </Form.Item>
              </Form>
            ) : (
              <Space
                direction="vertical"
                size="large"
                style={{ width: '100%' }}
              >
                <div>
                  <Text type="secondary" className="block mb-1">
                    Nombre de Usuario
                  </Text>
                  <Text strong className="text-lg">
                    {user?.username || 'No disponible'}
                  </Text>
                </div>

                <div>
                  <Text type="secondary" className="block mb-1">
                    Correo Electrónico
                  </Text>
                  <Text strong className="text-lg">
                    {user?.email || 'No disponible'}
                  </Text>
                </div>

                <Divider />

                <div>
                  <Button type="default" icon={<LockOutlined />} block>
                    Cambiar Contraseña
                  </Button>
                </div>
              </Space>
            )}
          </Card>
        </Col>

        {/* Información de la cuenta */}
        <Col xs={24} lg={8}>
          <Card
            title={
              <Space>
                <UserOutlined />
                Información de Cuenta
              </Space>
            }
          >
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <div>
                <Text type="secondary" className="block">
                  Estado de la Cuenta
                </Text>
                <div className="flex items-center mt-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                  <Text strong className="text-green-600">
                    Activa
                  </Text>
                </div>
              </div>

              <div>
                <Text type="secondary" className="block">
                  Miembro Desde
                </Text>
                <div className="flex items-center mt-1">
                  <CalendarOutlined className="mr-2 text-gray-400" />
                  <Text strong>
                    {user?.created_at
                      ? new Date(user.created_at).toLocaleDateString('es-ES', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })
                      : 'No disponible'}
                  </Text>
                </div>
              </div>
            </Space>
          </Card>

          {/* Estadísticas */}
          <Card
            title={
              <Space>
                <ShoppingCartOutlined />
                Estadísticas
              </Space>
            }
            className="mt-6"
          >
            <Row gutter={16}>
              <Col span={12}>
                <Statistic
                  title="Productos Comprados"
                  value={0}
                  prefix={<ShoppingCartOutlined />}
                  valueStyle={{ fontSize: '18px' }}
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="Total Gastado"
                  value={0}
                  prefix="$"
                  suffix=".00"
                  valueStyle={{ fontSize: '18px' }}
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Profile
