import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Badge } from 'antd'
import { ShoppingCartOutlined } from '@ant-design/icons'
import { useCart } from '../../hooks/useCart'

const FloatingCartIcon = () => {
  const navigate = useNavigate()
  const { itemCount } = useCart()

  const handleClick = () => {
    console.log('🛒 FloatingCartIcon: Navegando al carrito')
    navigate('/cart')
  }

  console.log('🛒 FloatingCartIcon: Renderizando con itemCount:', itemCount)

  return (
    <div className="floating-cart-container">
      <Badge
        count={itemCount}
        showZero={false}
        offset={[10, 0]}
        size="small"
      >
        <Button
          type="primary"
          shape="circle"
          size="large"
          icon={<ShoppingCartOutlined />}
          onClick={handleClick}
          className="floating-cart-icon"
        />
      </Badge>
    </div>
  )
}

export default FloatingCartIcon
