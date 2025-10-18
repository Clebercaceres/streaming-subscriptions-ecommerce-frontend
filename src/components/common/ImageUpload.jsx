import React, { useState } from 'react'
import { Upload, Button, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { uploadProductImage } from '../services/imageUpload'

/**
 * Componente para subir imágenes de productos
 * Ejemplo de integración en formularios de productos
 */
const ImageUpload = ({ onImageUploaded, currentImage }) => {
  const [loading, setLoading] = useState(false)

  const handleUpload = async file => {
    setLoading(true)
    try {
      const imageUrl = await uploadProductImage(file)
      onImageUploaded(imageUrl)
      message.success('Imagen subida correctamente')
    } catch (error) {
      message.error('Error al subir imagen: ' + error.message)
    } finally {
      setLoading(false)
    }
    return false // Prevenir comportamiento por defecto de antd
  }

  const uploadProps = {
    beforeUpload: handleUpload,
    showUploadList: false,
    disabled: loading,
    accept: 'image/*',
  }

  return (
    <div className="space-y-4">
      {/* Vista previa de imagen actual */}
      {currentImage && (
        <div className="mb-4">
          <img
            src={currentImage}
            alt="Imagen actual del producto"
            className="w-32 h-32 object-cover rounded-lg border"
          />
        </div>
      )}

      {/* Botón de subida */}
      <Upload {...uploadProps}>
        <Button icon={<UploadOutlined />} loading={loading} disabled={loading}>
          {loading ? 'Subiendo...' : 'Subir Imagen'}
        </Button>
      </Upload>

      {/* Información */}
      <div className="text-sm text-gray-500">
        <p>• Formatos aceptados: JPG, PNG, WebP</p>
        <p>• Tamaño máximo: 5MB</p>
        <p>• Dimensiones recomendadas: 300x450px</p>
      </div>
    </div>
  )
}

export default ImageUpload
