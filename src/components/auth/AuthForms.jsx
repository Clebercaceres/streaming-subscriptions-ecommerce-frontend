import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Button, Checkbox, Typography, Alert } from 'antd'
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons'

const { Title, Text } = Typography

/**
 * Formulario de login reutilizable
 */
export const LoginForm = ({
  onSubmit,
  loading = false,
  error = null,
  className = '',
}) => {
  const [form] = Form.useForm()

  return (
    <div className={`login-form ${className}`}>
      <div className="text-center mb-6">
        <Title level={2}>Iniciar Sesión</Title>
        <Text type="secondary">
          Ingresa tus credenciales para acceder a tu cuenta
        </Text>
      </div>

      {error && (
        <Alert
          message="Error de autenticación"
          description={error}
          type="error"
          showIcon
          className="mb-4"
        />
      )}

      <Form form={form} onFinish={onSubmit} layout="vertical" size="large">
        <Form.Item
          name="email"
          rules={[
            { required: true, message: 'Por favor ingresa tu email' },
            { type: 'email', message: 'Ingresa un email válido' },
          ]}
        >
          <Input
            prefix={<MailOutlined />}
            placeholder="Correo electrónico"
            autoComplete="email"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            { required: true, message: 'Por favor ingresa tu contraseña' },
            {
              min: 6,
              message: 'La contraseña debe tener al menos 6 caracteres',
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Contraseña"
            autoComplete="current-password"
          />
        </Form.Item>

        <Form.Item>
          <div className="flex justify-between items-center">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Recordarme</Checkbox>
            </Form.Item>
            <Button type="link" className="p-0">
              ¿Olvidaste tu contraseña?
            </Button>
          </div>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block className="dark:bg-blue-600 dark:border-blue-600 dark:text-white">
            Iniciar Sesión
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.string,
  className: PropTypes.string,
}

/**
 * Formulario de registro reutilizable
 */
export const RegisterForm = ({
  onSubmit,
  loading = false,
  error = null,
  className = '',
}) => {
  const [form] = Form.useForm()

  return (
    <div className={`register-form ${className}`}>
      <div className="text-center mb-6">
        <Title level={2}>Crear Cuenta</Title>
        <Text type="secondary">
          Regístrate para acceder a todas las funcionalidades
        </Text>
      </div>

      {error && (
        <Alert
          message="Error de registro"
          description={error}
          type="error"
          showIcon
          className="mb-4"
        />
      )}

      <Form form={form} onFinish={onSubmit} layout="vertical" size="large">
        <Form.Item
          name="name"
          rules={[
            { required: true, message: 'Por favor ingresa tu nombre' },
            { min: 2, message: 'El nombre debe tener al menos 2 caracteres' },
          ]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Nombre completo"
            autoComplete="name"
          />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[
            { required: true, message: 'Por favor ingresa tu email' },
            { type: 'email', message: 'Ingresa un email válido' },
          ]}
        >
          <Input
            prefix={<MailOutlined />}
            placeholder="Correo electrónico"
            autoComplete="email"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            { required: true, message: 'Por favor ingresa tu contraseña' },
            {
              min: 8,
              message: 'La contraseña debe tener al menos 8 caracteres',
            },
            {
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
              message:
                'La contraseña debe contener al menos una mayúscula, una minúscula y un número',
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Contraseña"
            autoComplete="new-password"
          />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          rules={[
            { required: true, message: 'Por favor confirma tu contraseña' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('Las contraseñas no coinciden'))
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Confirmar contraseña"
            autoComplete="new-password"
          />
        </Form.Item>

        <Form.Item
          name="terms"
          valuePropName="checked"
          rules={[
            {
              required: true,
              message: 'Debes aceptar los términos y condiciones',
            },
          ]}
        >
          <Checkbox>
            Acepto los{' '}
            <Button type="link" className="p-0">
              términos y condiciones
            </Button>
          </Checkbox>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block className="dark:bg-blue-600 dark:border-blue-600 dark:text-white">
            Crear Cuenta
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

RegisterForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.string,
  className: PropTypes.string,
}

export default LoginForm
