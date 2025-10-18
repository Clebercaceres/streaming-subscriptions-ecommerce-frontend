import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons'
import {
  Button,
  Input,
  Form,
  Card,
  Typography,
  Alert,
  Space,
  Row,
  Col,
} from 'antd'
import { useAuth } from '../hooks/useAuth'

const { Title, Text } = Typography

/**
 * Página de registro de usuario
 */
const Register = () => {
  const navigate = useNavigate()
  const { register } = useAuth()

  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [validation, setValidation] = useState({
    username: { valid: false, message: '' },
    email: { valid: false, message: '' },
    password: { valid: false, message: '' },
    confirmPassword: { valid: false, message: '' },
  })

  // Validación en tiempo real
  useEffect(() => {
    const values = form.getFieldsValue()
    const newValidation = { ...validation }

    // Validar username
    if (values.username) {
      if (values.username.length < 3) {
        newValidation.username = {
          valid: false,
          message: 'Mínimo 3 caracteres',
        }
      } else if (values.username.length > 50) {
        newValidation.username = {
          valid: false,
          message: 'Máximo 50 caracteres',
        }
      } else if (!/^[a-zA-Z0-9_]+$/.test(values.username)) {
        newValidation.username = {
          valid: false,
          message: 'Solo letras, números y guiones bajos',
        }
      } else {
        newValidation.username = { valid: true, message: '✓ Válido' }
      }
    } else {
      newValidation.username = { valid: false, message: '' }
    }

    // Validar email
    if (values.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(values.email)) {
        newValidation.email = { valid: false, message: 'Email inválido' }
      } else {
        newValidation.email = { valid: true, message: '✓ Válido' }
      }
    } else {
      newValidation.email = { valid: false, message: '' }
    }

    // Validar contraseña
    if (values.password) {
      const passwordValidation = validatePassword(values.password)
      newValidation.password = passwordValidation
    } else {
      newValidation.password = { valid: false, message: '' }
    }

    // Validar confirmación de contraseña
    if (values.confirmPassword) {
      if (values.password !== values.confirmPassword) {
        newValidation.confirmPassword = {
          valid: false,
          message: 'Las contraseñas no coinciden',
        }
      } else if (validation.password.valid) {
        newValidation.confirmPassword = { valid: true, message: '✓ Coincide' }
      } else {
        newValidation.confirmPassword = {
          valid: false,
          message: 'Contraseña principal inválida',
        }
      }
    } else {
      newValidation.confirmPassword = { valid: false, message: '' }
    }

    setValidation(newValidation)
  }, [form.getFieldsValue()])

  const validatePassword = password => {
    if (password.length < 8) {
      return { valid: false, message: 'Mínimo 8 caracteres' }
    }
    if (!/(?=.*[a-z])/.test(password)) {
      return {
        valid: false,
        message: 'Debe contener al menos una letra minúscula',
      }
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      return {
        valid: false,
        message: 'Debe contener al menos una letra mayúscula',
      }
    }
    if (!/(?=.*\d)/.test(password)) {
      return { valid: false, message: 'Debe contener al menos un número' }
    }
    return { valid: true, message: '✓ Contraseña segura' }
  }

  const handleSubmit = async values => {
    setLoading(true)
    try {
      console.log('🔍 [FRONTEND REGISTER] Llamando a useAuthStore.register')
      await register({
        username: values.username,
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
      })
      console.log('✅ [FRONTEND REGISTER] Registro exitoso, navegando a home')
      navigate('/')
    } catch (error) {
      console.error(
        '❌ [FRONTEND REGISTER] Error en registro:',
        error.message,
        error.response?.data
      )
      // Mostrar error en el formulario
      form.setFields([
        {
          name: 'general',
          errors: [error.response?.data?.message || 'Error en el registro'],
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <div className="text-center mb-8">
          <Title level={2} className="mb-2">
            Crear cuenta
          </Title>
          <Text type="secondary">
            O{' '}
            <Link to="/login" className="text-primary hover:text-primary/80">
              inicia sesión en tu cuenta existente
            </Link>
          </Text>
        </div>

        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          disabled={loading}
        >
          <Form.Item
            name="username"
            label="Nombre de usuario"
            rules={[
              { required: true, message: 'El nombre de usuario es requerido' },
              { min: 3, message: 'Mínimo 3 caracteres' },
              { max: 50, message: 'Máximo 50 caracteres' },
              {
                pattern: /^[a-zA-Z0-9_]+$/,
                message: 'Solo letras, números y guiones bajos',
              },
            ]}
            validateStatus={
              validation.username.valid
                ? 'success'
                : validation.username.message
                  ? 'error'
                  : ''
            }
            help={validation.username.message}
          >
            <Input
              placeholder="Ingresa tu nombre de usuario"
              disabled={loading}
            />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'El email es requerido' },
              { type: 'email', message: 'Ingresa un email válido' },
            ]}
            validateStatus={
              validation.email.valid
                ? 'success'
                : validation.email.message
                  ? 'error'
                  : ''
            }
            help={validation.email.message}
          >
            <Input placeholder="Ingresa tu email" disabled={loading} />
          </Form.Item>

          <Form.Item
            name="password"
            label="Contraseña"
            rules={[
              { required: true, message: 'La contraseña es requerida' },
              {
                validator: (_, value) => {
                  if (!value) return Promise.resolve()
                  const passwordValidation = validatePassword(value)
                  if (!passwordValidation.valid) {
                    return Promise.reject(new Error(passwordValidation.message))
                  }
                  return Promise.resolve()
                },
              },
            ]}
            validateStatus={
              validation.password.valid
                ? 'success'
                : validation.password.message
                  ? 'error'
                  : ''
            }
            help={validation.password.message}
          >
            <Input.Password
              placeholder="Ingresa tu contraseña"
              iconRender={visible =>
                visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
              }
              disabled={loading}
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Confirmar contraseña"
            rules={[
              {
                required: true,
                message: 'La confirmación de contraseña es requerida',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(
                    new Error('Las contraseñas no coinciden')
                  )
                },
              }),
            ]}
            validateStatus={
              validation.confirmPassword.valid
                ? 'success'
                : validation.confirmPassword.message
                  ? 'error'
                  : ''
            }
            help={validation.confirmPassword.message}
          >
            <Input.Password
              placeholder="Confirma tu contraseña"
              iconRender={visible =>
                visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
              }
              disabled={loading}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              size="large"
            >
              Crear cuenta
            </Button>
          </Form.Item>
        </Form>

        <div className="text-center">
          <Text type="secondary">
            ¿Ya tienes cuenta?{' '}
            <Link
              to="/login"
              className="text-primary hover:text-primary/80 font-medium"
            >
              Inicia sesión aquí
            </Link>
          </Text>
        </div>
      </Card>
    </div>
  )
}

export default Register
