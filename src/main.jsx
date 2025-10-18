import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ConfigProvider, theme } from 'antd'
import esES from 'antd/locale/es_ES'
import App from './App.jsx'
import './index.css'
import { useTheme } from './hooks/useTheme'

// Crear cliente de React Query con configuración optimizada
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutos
      gcTime: 10 * 60 * 1000, // 10 minutos (antes era cacheTime)
      retry: (failureCount, error) => {
        // No reintentar en errores 4xx (cliente)
        if (error?.status >= 400 && error?.status < 500) {
          return false
        }
        // Reintentar hasta 3 veces en otros errores
        return failureCount < 3
      },
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: false,
    },
  },
})

// Tema personalizado para modo claro
const lightTheme = {
  algorithm: theme.defaultAlgorithm,
  token: {
    // Colores principales
    colorPrimary: '#1890ff',
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorError: '#ff4d4f',
    colorInfo: '#1890ff',

    // Colores de fondo
    colorBgContainer: '#ffffff',
    colorBgLayout: '#f5f5f5',
    colorBgSpotlight: '#ffffff',

    // Colores de texto
    colorText: '#000000',
    colorTextSecondary: '#666666',
    colorTextTertiary: '#999999',
    colorTextQuaternary: '#cccccc',

    // Bordes
    colorBorder: '#d9d9d9',
    colorBorderSecondary: '#f0f0f0',

    // Otros
    borderRadius: 8,
    wireframe: false,
  },
}

// Tema personalizado para modo oscuro
const darkTheme = {
  algorithm: theme.darkAlgorithm,
  token: {
    // Colores principales (más brillantes para modo oscuro)
    colorPrimary: '#69c0ff',
    colorSuccess: '#73d13d',
    colorWarning: '#ffc53d',
    colorError: '#ff7875',
    colorInfo: '#69c0ff',

    // Colores de fondo
    colorBgContainer: '#141414',
    colorBgLayout: '#000000',
    colorBgSpotlight: '#1f1f1f',

    // Colores de texto
    colorText: '#ffffff',
    colorTextSecondary: '#bfbfbf',
    colorTextTertiary: '#8c8c8c',
    colorTextQuaternary: '#595959',

    // Bordes
    colorBorder: '#424242',
    colorBorderSecondary: '#262626',

    // Otros
    borderRadius: 8,
    wireframe: false,
  },
}

// Componente wrapper para aplicar el tema oscuro
const AppWithTheme = () => {
  const { isDarkMode } = useTheme()

  // Aplicar clases de tema oscuro al elemento root cuando cambie el estado
  useEffect(() => {
    const rootElement = document.documentElement
    if (isDarkMode) {
      rootElement.classList.add('dark')
    } else {
      rootElement.classList.remove('dark')
    }
  }, [isDarkMode])

  // Configuración completa de Ant Design con tema dinámico
  return (
    <ConfigProvider
      locale={esES}
      theme={isDarkMode ? darkTheme : lightTheme}
    >
      <div
        className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark' : ''}`}
      >
        <App />
      </div>
    </ConfigProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppWithTheme />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
)
