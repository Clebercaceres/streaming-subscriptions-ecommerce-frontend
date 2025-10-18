import React from 'react'
import { useCrudOperations } from '../hooks/useReactQuery'
import { Card, Button, List, Spin, Alert } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'

/**
 * Ejemplo de componente usando el hook personalizado useCrudOperations
 * Demuestra operaciones CRUD completas con React Query
 */
const CrudExample = () => {
  // Usar operaciones CRUD para productos
  const {
    read: { data: products, isLoading, error },
    create: { mutate: createProduct, isLoading: isCreating },
    update: { mutate: updateProduct, isLoading: isUpdating },
    delete: { mutate: deleteProduct, isLoading: isDeleting }
  } = useCrudOperations(['products'], '/products')

  const handleCreate = () => {
    createProduct({
      name: 'Nuevo Producto',
      description: 'Descripción del producto',
      price: 29.99,
      stock: 10
    })
  }

  const handleUpdate = (id) => {
    updateProduct({
      id,
      data: {
        name: 'Producto Actualizado',
        price: 39.99
      }
    })
  }

  const handleDelete = (id) => {
    deleteProduct(id)
  }

  if (error) {
    return (
      <Alert
        message="Error cargando productos"
        description={error.message}
        type="error"
        showIcon
      />
    )
  }

  return (
    <div className="space-y-4">
      {/* Header con botón de crear */}
      <Card>
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Gestión de Productos</h2>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleCreate}
            loading={isCreating}
          >
            Crear Producto
          </Button>
        </div>
      </Card>

      {/* Lista de productos */}
      <Card>
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Spin size="large" tip="Cargando productos..." />
          </div>
        ) : (
          <List
            dataSource={products?.data || []}
            renderItem={(product) => (
              <List.Item
                actions={[
                  <Button
                    key="edit"
                    type="text"
                    icon={<EditOutlined />}
                    onClick={() => handleUpdate(product.id)}
                    loading={isUpdating}
                  >
                    Editar
                  </Button>,
                  <Button
                    key="delete"
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => handleDelete(product.id)}
                    loading={isDeleting}
                  >
                    Eliminar
                  </Button>
                ]}
              >
                <List.Item.Meta
                  title={product.name}
                  description={
                    <div>
                      <p>{product.description}</p>
                      <p className="font-semibold text-green-600">
                        ${product.price}
                      </p>
                    </div>
                  }
                />
              </List.Item>
            )}
          />
        )}
      </Card>
    </div>
  )
}

export default CrudExample
