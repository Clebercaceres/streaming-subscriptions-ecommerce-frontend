/**
 * Servicio para subir imágenes de productos
 * Ejemplo de cómo usar desde el frontend
 */

// Ejemplo de función para subir imagen desde React
export const uploadProductImage = async imageFile => {
  const formData = new FormData()
  formData.append('image', imageFile)

  try {
    const response = await fetch('/api/upload/product-image', {
      method: 'POST',
      body: formData,
      // No incluir headers Content-Type, dejar que el navegador lo establezca
    })

    const result = await response.json()

    if (result.success) {
      return result.imageUrl // Retorna la URL relativa de la imagen
    } else {
      throw new Error(result.message)
    }
  } catch (error) {
    throw new Error('Error al subir imagen: ' + error.message)
  }
}

// Ejemplo de uso en un componente React
const handleImageUpload = async event => {
  const file = event.target.files[0]

  if (file) {
    try {
      const imageUrl = await uploadProductImage(file)
      console.log('Imagen subida:', imageUrl)

      // Ahora puedes usar esta URL en tu producto
      // Por ejemplo: setProductData(prev => ({ ...prev, image_url: imageUrl }));
    } catch (error) {
      console.error('Error al subir imagen:', error.message)
    }
  }
}
