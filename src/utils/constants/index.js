// Constantes de configuración de la aplicación
export const APP_CONFIG = {
  name: 'Plataforma Streaming',
  version: '1.0.0',
  description: 'Tu acceso a entretenimiento premium',
  author: 'Tu Empresa',
}

// Opciones de navegación del menú
export const NAVIGATION_ITEMS = [
  {
    key: '/',
    label: 'Inicio',
    path: '/',
    requiresAuth: true,
  },
  {
    key: '/products',
    label: 'Productos',
    path: '/products',
    requiresAuth: true,
  },
  {
    key: '/profile',
    label: 'Perfil',
    path: '/profile',
    requiresAuth: true,
  },
  {
    key: '/contact',
    label: 'Contacto',
    path: '/contact',
    requiresAuth: true,
  },
]

// Configuración de temas y colores
export const THEME_CONFIG = {
  primary: '#1890ff',
  secondary: '#722ed1',
  success: '#52c41a',
  warning: '#faad14',
  error: '#f5222d',
  background: '#f0f2f5',
  text: '#262626',
  textSecondary: '#8c8c8c',
}

// Configuración de breakpoints para responsive design
export const BREAKPOINTS = {
  xs: '480px',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  xxl: '1600px',
}

// Configuración de API
export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
  timeout: 10000,
  retries: 3,
}

// Opciones de filtros de productos
export const PRODUCT_FILTERS = {
  sortOptions: [
    { value: 'name_asc', label: 'Nombre A-Z' },
    { value: 'name_desc', label: 'Nombre Z-A' },
    { value: 'price_asc', label: 'Precio menor a mayor' },
    { value: 'price_desc', label: 'Precio mayor a menor' },
    { value: 'sold_desc', label: 'Más vendidos' },
  ],
  priceRanges: [
    { min: 0, max: 10, label: 'Hasta $10' },
    { min: 10, max: 25, label: '$10 - $25' },
    { min: 25, max: 50, label: '$25 - $50' },
    { min: 50, max: 100, label: 'Más de $50' },
  ],
}

// Mensajes de validación y errores
export const VALIDATION_MESSAGES = {
  required: 'Este campo es requerido',
  email: 'Por favor ingresa un email válido',
  minLength: min => `Mínimo ${min} caracteres`,
  maxLength: max => `Máximo ${max} caracteres`,
  passwordMismatch: 'Las contraseñas no coinciden',
}

// Estados de carga y errores
export const LOADING_STATES = {
  idle: 'idle',
  loading: 'loading',
  success: 'success',
  error: 'error',
}
