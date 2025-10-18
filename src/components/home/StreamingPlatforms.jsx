import React from 'react'
import { Card, Row, Col, Typography } from 'antd'
import { GlobalOutlined } from '@ant-design/icons'
import { STREAMING_PLATFORMS } from '../../utils/constants'

const { Title, Text } = Typography

/**
 * Componente que muestra las plataformas de streaming disponibles
 */
const StreamingPlatforms = () => {
  // Función para obtener colores del tema de Ant Design
  const getPlatformColors = (platformName) => {
    const colorMap = {
      'Netflix': '#ff0000',
      'Disney+': '#113cc0',
      'HBO Max': '#5c1d8a',
      'Amazon Prime': '#232f3e',
      'Apple TV+': '#000000',
      'Crunchyroll': '#f47521',
      'Paramount+': '#0066cc',
      'Peacock': '#000000',
      'YouTube Premium': '#ff0000',
      'Spotify': '#1db954',
    }
    return colorMap[platformName] || '#1890ff'
  }

  return (
    <Card className="mb-8">
      <div className="text-center mb-8">
        <Title level={3} className="mb-2">
          Plataformas Disponibles
        </Title>
        <Text type="secondary" className="text-lg">
          Accede a tus plataformas de streaming favoritas con las mejores
          ofertas
        </Text>
      </div>

      <Row gutter={[24, 24]} justify="center">
        {STREAMING_PLATFORMS.map((platform, index) => (
          <Col xs={12} sm={8} md={6} lg={4} key={index}>
            <Card
              hoverable
              className="text-center h-full transition-all duration-300 hover:shadow-lg"
              styles={{
                body: { padding: '20px 16px' }
              }}
            >
              <div className="mb-3">
                <div
                  className="w-16 h-16 mx-auto rounded-full flex items-center justify-center text-white text-2xl"
                  style={{
                    backgroundColor: getPlatformColors(platform.name)
                  }}
                >
                  {platform.icon === 'Prime' ? (
                    <GlobalOutlined />
                  ) : (
                    <span className="font-bold">{platform.icon}</span>
                  )}
                </div>
              </div>
              <Title level={5} className="mb-2">
                {platform.name}
              </Title>
              <Text type="secondary" className="text-sm block mb-2">
                {platform.description}
              </Text>
              <div className="flex items-center justify-center space-x-2">
                <Text strong className="text-primary">
                  Desde ${platform.price}
                </Text>
                <Text type="secondary" className="text-xs">
                  /mes
                </Text>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </Card>
  )
}

export default StreamingPlatforms
