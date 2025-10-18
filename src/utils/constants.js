/**
 * Constantes de colores utilizados en la aplicación
 */
export const COLORS = {
  primary: '#1890ff',
  success: '#52c41a',
  warning: '#faad14',
  danger: '#ff4d4f',
  info: '#1890ff',
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
}

/**
 * Configuración de plataformas de streaming
 */
export const STREAMING_PLATFORMS = [
  {
    name: 'Netflix',
    description: 'Miles de películas y series',
    price: '15.99',
    color: 'bg-red-600',
    icon: 'N',
  },
  {
    name: 'Disney+',
    description: 'Contenido Disney, Pixar, Marvel',
    price: '12.99',
    color: 'bg-blue-600',
    icon: 'D+',
  },
  {
    name: 'HBO Max',
    description: 'Series originales y películas',
    price: '14.99',
    color: 'bg-purple-600',
    icon: 'HBO',
  },
  {
    name: 'Amazon Prime',
    description: 'Video y beneficios exclusivos',
    price: '9.99',
    color: 'bg-orange-600',
    icon: 'Prime',
  },
  {
    name: 'Apple TV+',
    description: 'Series originales Apple',
    price: '6.99',
    color: 'bg-gray-800',
    icon: 'TV+',
  },
  {
    name: 'YouTube Premium',
    description: 'Sin anuncios y música',
    price: '11.99',
    color: 'bg-red-500',
    icon: 'YT',
  },
]

/**
 * Características destacadas de la plataforma
 */
export const PLATFORM_FEATURES = [
  {
    title: 'Acceso Instantáneo',
    description:
      'Obtén acceso inmediato a tus plataformas favoritas sin complicaciones.',
    color: 'bg-blue-600',
    icon: 'thunderbolt',
  },
  {
    title: 'Soporte 24/7',
    description: 'Nuestro equipo está disponible las 24 horas para ayudarte.',
    color: 'bg-green-600',
    icon: 'customer-service',
  },
  {
    title: 'Múltiples Plataformas',
    description:
      'Accede a Netflix, Disney+, HBO Max, Prime Video y muchas más.',
    color: 'bg-purple-600',
    icon: 'global',
  },
  {
    title: 'Garantía de Seguridad',
    description:
      'Tus datos están protegidos con los más altos estándares de seguridad.',
    color: 'bg-orange-600',
    icon: 'safety',
  },
]

/**
 * Contenido del carousel
 */
export const CAROUSEL_CONTENT = [
  {
    title: '🎬 Estrenos Exclusivos',
    description: 'Las mejores series y películas en estreno',
    subtitle: 'No te pierdas los últimos lanzamientos',
    image: 'products/carousel-1.jpeg',
  },
  {
    title: '⚡ Contenido Premium',
    description: 'Acceso inmediato a todo el catálogo',
    subtitle: 'Miles de horas de entretenimiento',
    image: 'products/carousel-2.jpeg',
  },
  {
    title: '🌟 Series Originales',
    description: 'Producciones exclusivas de alta calidad',
    subtitle: 'Contenido que no encontrarás en otro lado',
    image: 'products/carousel-3.jpeg',
  },
  {
    title: '🎭 Entretenimiento Total',
    description: 'Todo el entretenimiento que necesitas',
    subtitle: 'Películas, series, documentales y más',
    image: 'products/carousel-4.jpeg',
  },
]

/**
 * Configuración de estadísticas rápidas
 */
export const QUICK_STATS = [
  {
    title: 'Productos Disponibles',
    value: '1000+',
    icon: 'appstore',
    color: COLORS.primary,
  },
  {
    title: 'Precio Promedio',
    value: '$8.99',
    icon: 'dollar',
    color: COLORS.success,
  },
  {
    title: 'Más Vendido',
    value: 'Netflix',
    icon: 'trophy',
    color: COLORS.warning,
  },
]

/**
 * Configuración de filtros por defecto
 */
export const DEFAULT_FILTERS = {
  sort: 'name_asc',
  search: '',
  limit: 20,
  offset: 0,
}

/**
 * Configuración de paginación
 */
export const PAGINATION_CONFIG = {
  defaultPageSize: 20,
  showSizeChanger: true,
  showQuickJumper: true,
  showTotal: (total, range) => `${range[0]}-${range[1]} de ${total} productos`,
}
