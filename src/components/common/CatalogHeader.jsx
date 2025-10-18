import React from 'react'
import { Card, Row, Col, Statistic, Typography } from 'antd'
import {
  AppstoreOutlined,
  TrophyOutlined,
  DollarOutlined,
  ShoppingOutlined,
} from '@ant-design/icons'

const { Title } = Typography

/**
 * Header con estadísticas del catálogo
 */
const CatalogHeader = ({ totalCount, bestSellers }) => {
  const stats = [
    {
      title: 'Productos Disponibles',
      value: totalCount,
      icon: <AppstoreOutlined />,
    },
    {
      title: 'Más Vendidos',
      value: bestSellers?.length || 0,
      icon: <TrophyOutlined />,
    },
    {
      title: 'Precio Promedio',
      value: 29.99,
      prefix: '$',
      icon: <DollarOutlined />,
    },
    {
      title: 'Categorías',
      value: 8,
      icon: <ShoppingOutlined />,
    },
  ]

  return (
    <div className="mb-6">
      <Title level={2} className="mb-6">
        Catálogo de Productos
      </Title>

      <Row gutter={16}>
        {stats.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card className="text-center">
              <Statistic
                title={stat.title}
                value={stat.value}
                prefix={stat.prefix}
                valueStyle={{
                  fontSize: '24px',
                  fontWeight: 'bold'
                }}
                suffix={stat.suffix}
              />
              <div className="text-2xl mt-2">
                {stat.icon}
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default CatalogHeader
