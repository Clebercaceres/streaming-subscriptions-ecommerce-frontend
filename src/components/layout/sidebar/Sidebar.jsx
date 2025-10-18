import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Menu, Layout, Button, Typography, Divider } from 'antd'
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
} from '@ant-design/icons'
import { useTheme } from '../../../hooks/useTheme'

const { Sider } = Layout
const { Title, Text } = Typography

/**
 * Sidebar de navegación principal
 * Componente reutilizable con toda la lógica de navegación
 */
const Sidebar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { isDarkMode } = useTheme()

  // Items del menú de navegación
  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: 'Inicio',
      onClick: () => navigate('/'),
    },
    {
      key: '/products',
      icon: <ProductOutlined />,
      label: 'Productos',
      onClick: () => navigate('/products'),
    },
    {
      key: '/cart',
      icon: <ShoppingCartOutlined />,
      label: 'Carrito',
      onClick: () => navigate('/cart'),
    },
    {
      type: 'divider',
    },
    {
      key: '/contact',
      icon: <PhoneOutlined />,
      label: 'Contáctanos',
      onClick: () => navigate('/contact'),
    },
    {
      key: '/profile',
      icon: <UserOutlined />,
      label: 'Perfil',
      onClick: () => navigate('/profile'),
    },
    {
      key: '/orders',
      icon: <HistoryOutlined />,
      label: 'Mis Compras',
      onClick: () => navigate('/orders'),
    },
    {
      key: '/payment',
      icon: <CreditCardOutlined />,
      label: 'Métodos de Pago',
      onClick: () => navigate('/payment'),
    },
    {
      key: '/rewards',
      icon: <GiftOutlined />,
      label: 'Recompensas',
      onClick: () => navigate('/rewards'),
    },
    {
      key: '/help',
      icon: <QuestionCircleOutlined />,
      label: 'Ayuda',
      onClick: () => navigate('/help'),
    },
  ]

  return (
    <Sider
      width={280}
      className="hidden lg:block bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 sidebar-bg"
      style={{
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 1000,
      }}
    >
      {/* Título del sidebar */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <Title level={4} className="m-0 text-gray-900 dark:text-white">
          Plataforma Streaming
        </Title>
      </div>

      {/* Menú de navegación - ocupa el espacio disponible dejando sitio para el footer */}
      <div className="flex-1 p-4 pb-20 overflow-y-auto">
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          className="border-none bg-transparent"
          style={{
            background: 'transparent',
            color: 'inherit'
          }}
          theme={isDarkMode ? 'dark' : 'light'}
        />
      </div>

      {/* Footer del sidebar - posicionado en la parte inferior */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="text-center">
          <Text type="secondary" className="text-sm mb-3 block">
            ¿Necesitas ayuda?
          </Text>
          <Button
            type="primary"
            size="small"
            block
            icon={<PhoneOutlined />}
            onClick={() => navigate('/contact')}
          >
            Contáctanos
          </Button>
        </div>
      </div>
    </Sider>
  )
}

export default Sidebar
