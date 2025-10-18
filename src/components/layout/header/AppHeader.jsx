import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Badge, Dropdown, Avatar, Typography } from 'antd'
import {
  ShoppingCartOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import { useAuth } from '../../../hooks/useAuth'
import { useCart } from '../../../hooks/useCart'
import ThemeToggle from '../../common/ThemeToggle'

const { Text } = Typography

/**
 * Header de la aplicación
 * Contiene carrito de compras, toggle de tema y menú de usuario
 * Ahora es un componente simple que se renderiza dentro de un contenedor fijo
 */
const AppHeader = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const { itemCount, toggleCartVisibility } = useCart()

  // Elementos del menú desplegable del usuario
  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Perfil',
      onClick: () => navigate('/profile'),
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Configuración',
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Cerrar sesión',
      onClick: logout,
    },
  ]

  return (
    <div className="px-6 py-4 flex items-center justify-end bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 header-bg">
      <div className="flex items-center space-x-4">
        {/* Toggle de tema oscuro */}
        <ThemeToggle size="large" />

        {/* Carrito de compras */}
        <Badge count={itemCount} showZero={false}>
          <Button
            type="text"
            icon={<ShoppingCartOutlined />}
            onClick={() => navigate('/cart')}
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          />
        </Badge>

        {/* Menú de usuario */}
        <Dropdown
          menu={{
            items: userMenuItems,
          }}
          placement="bottomRight"
          arrow
        >
          <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 px-3 py-2 rounded-lg transition-colors">
            <Avatar icon={<UserOutlined />} className="bg-gray-200 dark:bg-gray-600" />
            <span className="text-gray-700 dark:text-gray-300">{user?.username || 'Usuario'}</span>
          </div>
        </Dropdown>
      </div>
    </div>
  )
}

export default AppHeader
