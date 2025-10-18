import React, { useState } from 'react'
import { useProducts, useCreateProduct } from '../queries'
import { Card, Button, Input, Form, Space, Spin, Alert } from 'antd'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons'

/**
 * Ejemplo de componente usando React Query para productos
 * Demuestra el uso de consultas y mutaciones con caché inteligente
 */
const ProductsExample = () => {
  const [filters, setFilters] = useState({
    search: '',
    limit: 12,
    offset: 0
  })

  // Usar React Query para obtener productos
  const {
    data: productsData,
    isLoading,
    error,
    refetch
  } = useProducts(filters)

  // Mutación para crear productos
  const createProductMutation = useCreateProduct()

  const handleSearch = (value) => {
    setFilters(prev => ({
      ...prev,
      search: value,
      offset: 0 // Reset pagination on search
    }))
  }

  const handleCreateProduct = async (values) => {
    try {
      await createProductMutation.mutateAsync(values)
      // El producto se agregará automáticamente al caché
      // No necesitamos hacer nada más aquí
    } catch (error) {
      console.error('Error creando producto:', error)
    }
  }

  if (error) {
    return (
      <Alert
        message="Error cargando productos"
        description={error.message}
        type="error"
        showIcon
        action={
          <Button size="small" onClick={() => refetch()}>
            Reintentar
          </Button>
        }
      />
    )
  }

  return (
    <div className="space-y-6">
      {/* Barra de búsqueda */}
      <Card>
        <Space className="w-full justify-between">
          <Input
            placeholder="Buscar productos..."
            prefix={<SearchOutlined />}
            value={filters.search}
            onChange={(e) => handleSearch(e.target.value)}
            style={{ width: 300 }}
          />

          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              // Aquí podrías abrir un modal de creación
              console.log('Crear nuevo producto')
            }}
          >
            Nuevo Producto
          </Button>
        </Space>
      </Card>

      {/* Estado de carga */}
      {isLoading && (
        <div className="flex justify-center py-8">
          <Spin size="large" tip="Cargando productos..." />
        </div>
      )}

      {/* Grid de productos */}
      {productsData?.data && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {productsData.data.map((product) => (
            <Card
              key={product.id}
              hoverable
              cover={
                <img
                  alt={product.name}
                  src={product.image_url || '/placeholder-image.png'}
                  className="h-48 object-cover"
                />
              }
            >
              <Card.Meta
                title={product.name}
                description={
                  <div className="space-y-2">
                    <p className="text-gray-600 line-clamp-2">
                      {product.description}
                    </p>
                    <p className="text-lg font-semibold text-blue-600">
                      ${product.price}
                    </p>
                    {product.stock <= 5 && (
                      <p className="text-orange-600 text-sm">
                        ¡Solo quedan {product.stock} unidades!
                      </p>
                    )}
                  </div>
                }
              />
            </Card>
          ))}
        </div>
      )}

      {/* Estado vacío */}
      {!isLoading && productsData?.data?.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No se encontraron productos</p>
        </div>
      )}

      {/* Información de React Query para debugging */}
      {process.env.NODE_ENV === 'development' && (
        <Card size="small" className="bg-gray-50">
          <p className="text-sm text-gray-600">
            <strong>React Query Debug:</strong><br />
            Estado: {isLoading ? 'Cargando' : 'Cargado'}<br />
            Productos en caché: {productsData?.data?.length || 0}<br />
            Última actualización: {productsData ? new Date().toLocaleTimeString() : 'Nunca'}
          </p>
        </Card>
      )}
    </div>
  )
}

export default ProductsExample
