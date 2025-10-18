import React from 'react'
import { Link } from 'react-router-dom'

/**
 * Layout para páginas de autenticación (login, register)
 * Diseño centrado con fondo atractivo
 */
const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-secondary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo/Brand */}
        <div className="text-center">
          <Link to="/" className="inline-block">
            <h1 className="text-3xl font-bold text-primary">
              Streaming Platform
            </h1>
            <p className="text-gray-600 mt-2">
              Tu acceso a entretenimiento premium
            </p>
          </Link>
        </div>

        {/* Contenido de autenticación */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          {children}
        </div>

        {/* Información adicional */}
        <div className="text-center text-sm text-gray-500">
          <p>
            ¿Necesitas ayuda?{' '}
            <a href="#" className="text-primary hover:underline">
              Contacta con soporte
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
