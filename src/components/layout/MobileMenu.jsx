import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Drawer, Menu, Button, Typography, Badge, Avatar, Divider } from 'antd'
import {
  HomeOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  ProductOutlined,
  PhoneOutlined,
  HistoryOutlined,
  CreditCardOutlined,
  GiftOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import { useAuth } from '../../hooks/useAuth'
import { useCart } from '../../hooks/useCart'

const { Title, Text } = Typography

/**
 * Menú móvil desplegable que combina navegación y elementos del header
 * Se muestra como un drawer desde la derecha con botón hamburguesa
 */
const MobileMenu = ({ visible, onClose }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout } = useAuth()
  const { itemCount } = useCart()

  // Items del menú de navegación (del sidebar original)
  const navigationItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: 'Inicio',
      onClick: () => {
        navigate('/')
        onClose()
      },
    },
    {
      key: '/products',
      icon: <ProductOutlined />,
      label: 'Productos',
      onClick: () => {
        navigate('/products')
        onClose()
      },
    },
    {
      key: '/cart',
      icon: <ShoppingCartOutlined />,
      label: 'Carrito',
      onClick: () => {
        navigate('/cart')
        onClose()
      },
    },
    {
      type: 'divider',
    },
    {
      key: '/contact',
      icon: <PhoneOutlined />,
      label: 'Contáctanos',
      onClick: () => {
        navigate('/contact')
        onClose()
      },
    },
    {
      key: '/profile',
      icon: <UserOutlined />,
      label: 'Perfil',
      onClick: () => {
        navigate('/profile')
        onClose()
      },
    },
    {
      key: '/orders',
      icon: <HistoryOutlined />,
      label: 'Mis Compras',
      onClick: () => {
        navigate('/orders')
        onClose()
      },
    },
    {
      key: '/payment',
      icon: <CreditCardOutlined />,
      label: 'Métodos de Pago',
      onClick: () => {
        navigate('/payment')
        onClose()
      },
    },
    {
      key: '/rewards',
      icon: <GiftOutlined />,
      label: 'Recompensas',
      onClick: () => {
        navigate('/rewards')
        onClose()
      },
    },
    {
      key: '/help',
      icon: <QuestionCircleOutlined />,
      label: 'Ayuda',
      onClick: () => {
        navigate('/help')
        onClose()
      },
    },
  ]

  // Items del menú de usuario (del header original)
  const userMenuItems = [
    {
      key: 'profile-mobile',
      icon: <UserOutlined />,
      label: 'Perfil',
      onClick: () => {
        navigate('/profile')
        onClose()
      },
    },
    {
      key: 'settings-mobile',
      icon: <SettingOutlined />,
      label: 'Configuración',
      onClick: () => {
        // Aquí puedes agregar navegación a configuración si existe
        onClose()
      },
    },
    {
      type: 'divider',
    },
    {
      key: 'logout-mobile',
      icon: <LogoutOutlined />,
      label: 'Cerrar sesión',
      onClick: () => {
        logout()
        onClose()
      },
    },
  ]

  return (
    <Drawer
      title={
        <div className="flex items-center justify-between w-full">
          <Title level={4} className="m-0 text-gray-900 dark:text-white">
            Plataforma Streaming
          </Title>
        </div>
      }
      placement="right"
      onClose={onClose}
      open={visible}
      width={280}
      closable={false}
      className="mobile-menu-drawer"
      styles={{
        body: {
          padding: 0,
          backgroundColor: 'var(--bg-color)',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }
      }}
      headerStyle={{
        padding: '16px 16px 0 16px',
        borderBottom: '1px solid var(--border-color)',
        backgroundColor: 'var(--bg-color)',
      }}
      footerStyle={{
        borderTop: '1px solid var(--border-color)',
        backgroundColor: 'var(--bg-color)',
      }}
      maskStyle={{
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
      }}
    >
      <div className="flex flex-col h-full">
        {/* Información del usuario - fija en la parte superior */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="flex items-center space-x-3 mb-3">
            <Avatar icon={<UserOutlined />} className="bg-gray-200 dark:bg-gray-600" />
            <div className="flex-1 min-w-0">
              <Text className="text-gray-900 dark:text-white font-medium block truncate">
                {user?.username || 'Usuario'}
              </Text>
              <Text type="secondary" className="text-sm block truncate">
                {user?.email || 'usuario@email.com'}
              </Text>
            </div>
          </div>

          {/* Carrito de compras */}
          <Badge count={itemCount} showZero={false}>
            <Button
              type="text"
              icon={<ShoppingCartOutlined />}
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white w-full justify-start"
              onClick={() => {
                navigate('/cart')
                onClose()
              }}
            >
              Carrito de compras
            </Button>
          </Badge>
        </div>

        {/* Menú de navegación - área scrollable */}
        <div className="flex-1 overflow-y-auto bg-white dark:bg-gray-800">
          <div className="p-2">
            <Menu
              mode="inline"
              selectedKeys={[location.pathname]}
              items={navigationItems}
              className="border-none bg-transparent"
              style={{
                background: 'transparent',
              }}
            />
          </div>
        </div>

        {/* Footer del menú móvil - fijo en la parte inferior */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-800 mt-auto">
          <Text type="secondary" className="text-sm mb-3 block text-center">
            ¿Necesitas ayuda?
          </Text>
          <Button
            type="primary"
            size="small"
            block
            icon={<PhoneOutlined />}
            onClick={() => {
              navigate('/contact')
              onClose()
            }}
          >
            Contáctanos
          </Button>
        </div>
      </div>
    </Drawer>
  )
}

export default MobileMenu
