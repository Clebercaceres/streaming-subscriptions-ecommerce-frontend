import { useEffect, Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

// Layouts y componentes principales
import AppLayout from './components/layout/AppLayout'
import ErrorBoundary from './components/common/ErrorBoundary'

// Páginas con lazy loading
const HomePage = lazy(() => import('./pages/HomePage'))
const Home = lazy(() => import('./pages/Home'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))
const Profile = lazy(() => import('./pages/Profile'))
const CartPage = lazy(() => import('./pages/CartPage'))
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'))
const NotFound = lazy(() => import('./pages/NotFound'))
const ContactPage = lazy(() => import('./pages/ContactPage'))

// Componentes de UI
import { Spin } from 'antd'
import ProtectedRoute from './components/auth/ProtectedRoute'
import { useAuth } from './hooks/useAuth'
import AuthLayout from './components/layouts/AuthLayout'

// Componente de carga para Suspense
const PageLoader = () => (
  <div className="min-h-[400px] flex items-center justify-center">
    <Spin size="large" />
  </div>
)

/**
 * Componente principal de la aplicación
 * Maneja autenticación, rutas y layout principal
 */
function App() {
  const { loading, verifyAuth } = useAuth()

  // Verificar autenticación al cargar la aplicación
  useEffect(() => {
    verifyAuth()
  }, [verifyAuth])

  // Mostrar loading mientras se verifica autenticación
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Spin size="large" />
        <div className="mt-4 text-gray-600 dark:text-gray-400">
          Verificando autenticación...
        </div>
      </div>
    )
  }

  return (
    <ErrorBoundary>
      <Routes>
        {/* Rutas públicas de autenticación */}
        <Route
          path="/login"
          element={
            <AuthLayout>
              <Suspense fallback={<PageLoader />}>
                <Login />
              </Suspense>
            </AuthLayout>
          }
        />

        <Route
          path="/register"
          element={
            <AuthLayout>
              <Suspense fallback={<PageLoader />}>
                <Register />
              </Suspense>
            </AuthLayout>
          }
        />

        {/* Rutas protegidas con layout principal */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Suspense fallback={<PageLoader />}>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/products" element={<Home />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/404" element={<NotFound />} />
                    <Route path="*" element={<Navigate to="/404" replace />} />
                  </Routes>
                </Suspense>
              </AppLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </ErrorBoundary>
  )
}

export default App
