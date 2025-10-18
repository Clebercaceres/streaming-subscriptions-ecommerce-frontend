import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Home,
  User,
  Settings,
  HelpCircle,
  ShoppingBag,
  TrendingUp,
} from 'lucide-react'

/**
 * Sidebar de navegación lateral
 */
const Sidebar = () => {
  const location = useLocation()

  const menuItems = [
    {
      path: '/',
      icon: Home,
      label: 'Inicio',
      description: 'Catálogo de productos',
    },
    {
      path: '/profile',
      icon: User,
      label: 'Perfil',
      description: 'Mi cuenta y configuración',
    },
    {
      path: '/settings',
      icon: Settings,
      label: 'Ajustes',
      description: 'Configuración de la aplicación',
    },
    {
      path: '/support',
      icon: HelpCircle,
      label: 'Soporte',
      description: 'Ayuda y contacto',
    },
  ]

  const categories = [
    { name: 'Netflix', color: 'bg-red-500' },
    { name: 'HBO Max', color: 'bg-purple-500' },
    { name: 'Disney+', color: 'bg-blue-500' },
    { name: 'Amazon Prime', color: 'bg-orange-500' },
    { name: 'Apple TV+', color: 'bg-gray-800' },
    { name: 'Crunchyroll', color: 'bg-yellow-500' },
    { name: 'Paramount+', color: 'bg-indigo-500' },
    { name: 'Peacock', color: 'bg-green-500' },
  ]

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
      {/* Logo/Brand */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-900">Streaming Platform</h1>
        <p className="text-sm text-gray-500 mt-1">Accesos Premium</p>
      </div>

      {/* Menú de navegación */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {menuItems.map(item => {
            const Icon = item.icon
            const isActive = location.pathname === item.path

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5" />
                <div>
                  <div>{item.label}</div>
                  <div
                    className={`text-xs ${
                      isActive ? 'text-primary-foreground/70' : 'text-gray-500'
                    }`}
                  >
                    {item.description}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Separador */}
        <div className="my-6 border-t border-gray-200" />

        {/* Categorías populares */}
        <div>
          <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Categorías populares
          </h3>
          <div className="space-y-1">
            {categories.map(category => (
              <button
                key={category.name}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <div className={`w-3 h-3 rounded-full ${category.color}`} />
                <span className="font-medium">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Más vendidos */}
        <div className="mt-6">
          <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Más vendidos
          </h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-3 px-3 py-2 bg-yellow-50 rounded-lg">
              <TrendingUp className="w-4 h-4 text-yellow-600" />
              <div>
                <div className="text-sm font-medium text-gray-900">Netflix</div>
                <div className="text-xs text-gray-500">1,250 ventas</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 px-3 py-2 bg-purple-50 rounded-lg">
              <TrendingUp className="w-4 h-4 text-purple-600" />
              <div>
                <div className="text-sm font-medium text-gray-900">HBO Max</div>
                <div className="text-xs text-gray-500">890 ventas</div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Footer del sidebar */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3 px-3 py-2">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <ShoppingBag className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <div className="text-sm font-medium text-gray-900">
              Premium Access
            </div>
            <div className="text-xs text-gray-500">
              Tu plataforma de streaming
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
