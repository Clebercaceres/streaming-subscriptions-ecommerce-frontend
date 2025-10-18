import React from 'react'
import { Row, Col, Empty, Typography, Spin } from 'antd'
import ProductCard from '../ProductCard'

const { Title, Text } = Typography

/**
 * Lista de productos con diferentes modos de vista
 */
const ProductList = ({ products, loading, error, viewMode, searchQuery }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Spin size="large" tip="Cargando productos..." />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <Text type="danger" className="text-lg">
          Error al cargar productos: {error}
        </Text>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <Empty
          description={
            searchQuery
              ? `No se encontraron productos para "${searchQuery}"`
              : 'No hay productos disponibles'
          }
        />
      </div>
    )
  }

  return (
    <div>
      <Title level={4} className="mb-4">
        {searchQuery
          ? `Resultados para "${searchQuery}"`
          : 'Todos los productos'}
      </Title>

      <Row gutter={[16, 16]}>
        {products.map(product => (
          <Col
            key={product.id}
            xs={24}
            sm={viewMode === 'list' ? 24 : 12}
            lg={viewMode === 'list' ? 24 : 8}
            xl={viewMode === 'list' ? 24 : 6}
          >
            <ProductCard product={product} viewMode={viewMode} />
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default ProductList
