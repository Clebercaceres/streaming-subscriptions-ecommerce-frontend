import React, { memo, useState, useEffect } from 'react'
import { Layout } from 'antd'
import AppHeader from './header/AppHeader'
import Sidebar from './sidebar/Sidebar'
import MobileHeader from './MobileHeader'
import MobileMenu from './MobileMenu'
import FloatingCartIcon from '../common/FloatingCartIcon'
import WhatsAppFloatButton from '../common/WhatsAppFloatButton'

const { Content } = Layout

/**
 * Layout principal de la aplicación
 * Responsivo: sidebar fijo en desktop, menú hamburguesa en móvil/tablet
 */
const AppLayout = memo(({ children }) => {
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Detectar tamaño de pantalla
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024) // lg breakpoint de Tailwind (1024px)
    }

    // Verificar tamaño inicial
    checkScreenSize()

    // Escuchar cambios de tamaño de ventana
    window.addEventListener('resize', checkScreenSize)

    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  const handleMobileMenuToggle = () => {
    setMobileMenuVisible(!mobileMenuVisible)
  }

  const handleMobileMenuClose = () => {
    setMobileMenuVisible(false)
  }

  return (
    <Layout className="min-h-screen theme-transition">
      {/* Layout responsivo */}
      {isMobile ? (
        /* Layout móvil: header superior + menú lateral desplegable */
        <>
          {/* Header móvil fijo en la parte superior */}
          <MobileHeader onMenuClick={handleMobileMenuToggle} />

          {/* Contenido principal sin márgenes laterales */}
          <Layout className="mt-16">
            <Content className="flex-1 overflow-y-auto theme-transition">
              <div className="p-4">{children}</div>
            </Content>
          </Layout>

          {/* Menú móvil desplegable */}
          <MobileMenu
            visible={mobileMenuVisible}
            onClose={handleMobileMenuClose}
          />
        </>
      ) : (
        /* Layout desktop: sidebar izquierdo + header superior derecho */
        <>
          {/* Sidebar fijo a la izquierda */}
          <Sidebar />

          {/* Contenido principal con header fijo */}
          <Layout className="ml-70">
            {/* Header fijo en la parte superior */}
            <div className="fixed top-0 right-0 left-70 z-50 theme-transition">
              <AppHeader />
            </div>

            {/* Contenido de la página con margen superior para compensar el header fijo */}
            <Content className="flex-1 overflow-y-auto mt-16 theme-transition">
              <div className="p-6">{children}</div>
            </Content>
          </Layout>
        </>
      )}

      {/* Componentes flotantes - visibles en ambas versiones */}
      <FloatingCartIcon />
      <WhatsAppFloatButton />
    </Layout>
  )
})

AppLayout.displayName = 'AppLayout'

export default AppLayout
