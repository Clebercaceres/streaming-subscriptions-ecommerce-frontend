import React from 'react'
import { Breadcrumb } from 'antd'
import { useLocation, Link } from 'react-router-dom'
import { HomeOutlined, ShoppingOutlined } from '@ant-design/icons'

/**
 * Componente de navegación tipo breadcrumb
 * Muestra la ruta actual del usuario
 */
const AppBreadcrumb = () => {
  const location = useLocation()
  const pathnames = location.pathname.split('/').filter(x => x)

  // Configuración de rutas para mostrar nombres amigables
  const routeNames = {
    '': 'Inicio',
    products: 'Productos',
    product: 'Producto',
    profile: 'Perfil',
    contact: 'Contacto',
    login: 'Iniciar Sesión',
    register: 'Registrarse',
  }

  // Construir items del breadcrumb
  const breadcrumbItems = [
    {
      title: (
        <Link to="/">
          <HomeOutlined className="mr-1" />
          Inicio
        </Link>
      ),
    },
  ]

  pathnames.forEach((name, index) => {
    const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`
    const isLast = index === pathnames.length - 1

    // Obtener nombre amigable de la ruta
    const displayName =
      routeNames[name] || name.charAt(0).toUpperCase() + name.slice(1)

    breadcrumbItems.push({
      title: isLast ? displayName : <Link to={routeTo}>{displayName}</Link>,
    })
  })

  return <Breadcrumb items={breadcrumbItems} className="mb-4" separator=">" />
}

export default AppBreadcrumb
