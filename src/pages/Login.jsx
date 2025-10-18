import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import {
  EyeOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Button, Input, Form, Card, Typography, Alert, Divider } from 'antd'
import { useAuth } from '../hooks/useAuth'

const { Title, Text } = Typography

/**
 * Página de inicio de sesión
 */
const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, loading } = useAuth()

  const [form] = Form.useForm()
  const [showPassword, setShowPassword] = useState(false)

  // Obtener la ruta desde donde venía el usuario (para redirigir después del login)
  const from = location.state?.from?.pathname || '/'

  const handleSubmit = async values => {
    try {
      await login({
        email: values.email.trim(),
        password: values.password,
      })

      // Redirigir a la página desde donde venía o al home
      navigate(from, { replace: true })
    } catch (error) {
      console.error('Error en login:', error)
      // Mostrar error en el formulario
      form.setFields([
        {
          name: 'general',
          errors: [
            error.response?.data?.message || 'Error en el inicio de sesión',
          ],
        },
      ])
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <div className="text-center mb-8">
          <Title level={2} className="mb-2">
            Iniciar sesión
          </Title>
          <Text type="secondary">Ingresa tus credenciales para continuar</Text>
        </div>

        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          disabled={loading}
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'El email es requerido' },
              { type: 'email', message: 'Ingresa un email válido' },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Ingresa tu email"
              autoComplete="email"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Contraseña"
            rules={[{ required: true, message: 'La contraseña es requerida' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Ingresa tu contraseña"
              iconRender={visible =>
                visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
              }
              autoComplete="current-password"
            />
          </Form.Item>

          <div className="flex justify-end mb-4">
            <a href="#" className="text-sm hover:underline">
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              size="large"
            >
              Iniciar sesión
            </Button>
          </Form.Item>
        </Form>

        <Divider />

        <div className="text-center">
          <Text type="secondary">
            ¿No tienes cuenta?{' '}
            <Link
              to="/register"
              className="hover:underline font-medium"
            >
              Regístrate aquí
            </Link>
          </Text>
        </div>

        {/* Información adicional */}
        <div className="text-center text-sm mt-6 pt-6">
          <Text type="secondary">
            Al iniciar sesión, aceptas nuestros{' '}
            <a href="#" className="hover:underline">
              Términos de servicio
            </a>{' '}
            y{' '}
            <a href="#" className="hover:underline">
              Política de privacidad
            </a>
          </Text>
        </div>
      </Card>
    </div>
  )
}

export default Login
