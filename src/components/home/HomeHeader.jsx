import React from 'react'
import { Typography } from 'antd'

const { Title, Text } = Typography

/**
 * Componente del header de la página principal
 */
const HomeHeader = () => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div>
        <Title level={2} className="mb-2">
          Plataforma de Streaming
        </Title>
        <Text type="secondary">
          Tu puerta de acceso al mejor entretenimiento digital
        </Text>
      </div>
    </div>
  )
}

export default HomeHeader
