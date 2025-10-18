import React from 'react'
import { Card, Row, Col, Typography, Statistic } from 'antd'
import {
  AppstoreOutlined,
  DollarOutlined,
  TrophyOutlined,
} from '@ant-design/icons'

const { Title, Text } = Typography

/**
 * Componente que muestra las estadísticas rápidas de la plataforma
 */
const StatsSection = () => {
  // Estadísticas rápidas
  const stats = [
    {
      title: 'Productos Disponibles',
      value: '1000+',
      icon: <AppstoreOutlined />,
      color: '#1890ff',
    },
    {
      title: 'Precio Promedio',
      value: '$8.99',
      icon: <DollarOutlined />,
      color: '#52c41a',
    },
    {
      title: 'Más Vendido',
      value: 'Netflix',
      icon: <TrophyOutlined />,
      color: '#faad14',
    },
  ]

  return (
    <Card className="mb-8">
      <div className="text-center mb-8">
        <Title level={3} className="mb-2">
          Estadísticas
        </Title>
        <Text type="secondary" className="text-lg">
          Información rápida sobre nuestra plataforma
        </Text>
      </div>

      <Row gutter={[16, 16]}>
        {stats.map((stat, index) => (
          <Col xs={24} sm={8} key={index}>
            <Card className="text-center">
              <Statistic
                title={stat.title}
                value={stat.value}
                prefix={stat.icon}
                valueStyle={{ color: stat.color }}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </Card>
  )
}

export default StatsSection
