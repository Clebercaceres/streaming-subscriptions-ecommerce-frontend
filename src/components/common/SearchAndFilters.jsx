import React, { useState } from 'react'
import {
  SearchOutlined,
  FilterOutlined,
  AppstoreOutlined,
  BarsOutlined,
  CloseOutlined,
} from '@ant-design/icons'
import { Input, Button, Select, Row, Col, Form, Drawer } from 'antd'
import { useProductStore } from '../../store'

const { Search } = Input
const { Option } = Select

/**
 * Barra de búsqueda y controles de filtro
 */
const SearchAndFilters = ({
  searchQuery,
  setSearchQuery,
  viewMode,
  setViewMode,
  showFilters,
  setShowFilters,
  priceRange,
  setPriceRange,
  selectedProduct,
  setSelectedProduct,
  onApplyFilters,
  onClearFilters,
  onSearch,
}) => {
  const { bestSellers } = useProductStore()

  return (
    <>
      <Row gutter={16} className="mb-6">
        {/* Búsqueda */}
        <Col xs={24} sm={12} lg={8}>
          <Form onSubmitCapture={onSearch}>
            <Search
              placeholder="Buscar productos..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onSearch={onSearch}
              enterButton={<SearchOutlined />}
              size="large"
            />
          </Form>
        </Col>

        {/* Controles de vista y filtros */}
        <Col xs={24} sm={12} lg={16}>
          <div className="flex justify-end items-center gap-3">
            {/* Toggle de vista */}
            <div className="flex border rounded-lg">
              <Button
                type={viewMode === 'grid' ? 'primary' : 'text'}
                icon={<AppstoreOutlined />}
                onClick={() => setViewMode('grid')}
                size="middle"
              />
              <Button
                type={viewMode === 'list' ? 'primary' : 'text'}
                icon={<BarsOutlined />}
                onClick={() => setViewMode('list')}
                size="middle"
              />
            </div>

            {/* Botón de filtros */}
            <Button
              type="default"
              icon={<FilterOutlined />}
              onClick={() => setShowFilters(true)}
              size="middle"
            >
              Filtros
            </Button>
          </div>
        </Col>
      </Row>

      {/* Drawer de filtros */}
      <Drawer
        title="Filtros de búsqueda"
        placement="right"
        onClose={() => setShowFilters(false)}
        open={showFilters}
        width={320}
      >
        <div className="space-y-6">
          {/* Filtro por precio */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Rango de precio
            </label>
            <div className="flex gap-2">
              <Input
                placeholder="Mín"
                value={priceRange.min}
                onChange={e =>
                  setPriceRange(prev => ({ ...prev, min: e.target.value }))
                }
                type="number"
              />
              <Input
                placeholder="Máx"
                value={priceRange.max}
                onChange={e =>
                  setPriceRange(prev => ({ ...prev, max: e.target.value }))
                }
                type="number"
              />
            </div>
          </div>

          {/* Filtro por producto específico */}
          {bestSellers && bestSellers.length > 0 && (
            <div>
              <label className="block text-sm font-medium mb-2">
                Productos destacados
              </label>
              <Select
                placeholder="Seleccionar producto"
                value={selectedProduct?.name}
                onChange={value => {
                  const product = bestSellers.find(p => p.name === value)
                  setSelectedProduct(product)
                }}
                style={{ width: '100%' }}
              >
                {bestSellers.map(product => (
                  <Option key={product.id} value={product.name}>
                    {product.name}
                  </Option>
                ))}
              </Select>
            </div>
          )}

          {/* Acciones */}
          <div className="flex gap-2 pt-4">
            <Button type="primary" onClick={onApplyFilters} block className="dark:bg-blue-600 dark:border-blue-600 dark:text-white">
              Aplicar filtros
            </Button>
            <Button onClick={onClearFilters} block>
              Limpiar
            </Button>
          </div>
        </div>
      </Drawer>
    </>
  )
}

export default SearchAndFilters
