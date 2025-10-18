import React from 'react'
import { Card, Row, Col, Typography } from 'antd'
import {
  ThunderboltOutlined,
  CustomerServiceOutlined,
  GlobalOutlined,
  SafetyCertificateOutlined,
} from '@ant-design/icons'
import { PLATFORM_FEATURES } from '../../utils/constants'

const { Title, Text } = Typography

/**
 * Componente que muestra las características destacadas de la plataforma
 */
const FeaturesSection = () => {
  // Función para obtener el ícono correspondiente
  const getIcon = iconName => {
    const icons = {
      thunderbolt: <ThunderboltOutlined />,
      'customer-service': <CustomerServiceOutlined />,
      global: <GlobalOutlined />,
      safety: <SafetyCertificateOutlined />,
    }
    return icons[iconName] || <GlobalOutlined />
  }

  return (
    <Card className="mb-8">
      <div className="text-center mb-8">
        <Title level={3} className="mb-2">
          ¿Por qué elegirnos?
        </Title>
        <Text type="secondary" className="text-lg">
          La mejor experiencia en acceso a plataformas de streaming
        </Text>
      </div>

      <Row gutter={[32, 32]}>
        {PLATFORM_FEATURES.map((feature, index) => (
          <Col xs={24} sm={12} md={8} lg={6} key={index}>
            <div className="text-center">
              <div
                className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-white text-2xl"
                style={{
                  backgroundColor: index === 0 ? '#1890ff' : index === 1 ? '#52c41a' : index === 2 ? '#722ed1' : '#faad14'
                }}
              >
                {getIcon(feature.icon)}
              </div>
              <Title level={4} className="mb-3">
                {feature.title}
              </Title>
              <Text type="secondary" className="text-sm">
                {feature.description}
              </Text>
            </div>
          </Col>
        ))}
      </Row>
    </Card>
  )
}

export default FeaturesSection
