import React from 'react'
import { Button, Badge } from 'antd'
import { MenuOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import ThemeToggle from '../common/ThemeToggle'
import { useCart } from '../../hooks/useCart'

/**
 * Header móvil con botón hamburguesa
 * Se muestra solo en dispositivos móviles y tablets
 */
const MobileHeader = ({ onMenuClick }) => {
  const { itemCount, toggleCartVisibility } = useCart()

  return (
    <div className="px-4 py-3 flex items-center justify-between bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center space-x-3">
        {/* Botón hamburguesa para abrir el menú */}
        <Button
          type="text"
          icon={<MenuOutlined />}
          onClick={onMenuClick}
          className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          size="large"
        />
      </div>

      <div className="flex-1 text-center">
        <h1 className="text-lg font-semibold text-gray-900 dark:text-white m-0">
          Plataforma Streaming
        </h1>
      </div>

      <div className="flex items-center space-x-2">
        {/* Toggle de tema oscuro */}
        <ThemeToggle size="large" />

        {/* Carrito de compras - muestra el contador */}
        <Badge count={itemCount} showZero={false}>
          <Button
            type="text"
            icon={<ShoppingCartOutlined />}
            onClick={toggleCartVisibility}
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            size="large"
          />
        </Badge>
      </div>
    </div>
  )
}

export default MobileHeader
