/**
 * Formatea un precio en moneda local
 * @param {number} price - Precio a formatear
 * @param {string} currency - Moneda (por defecto 'USD')
 * @returns {string} - Precio formateado
 */
export const formatPrice = (price, currency = 'USD') => {
  if (typeof price !== 'number' || isNaN(price)) {
    return '$0.00'
  }

  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price)
}

/**
 * Formatea una fecha en formato legible
 * @param {string|Date} date - Fecha a formatear
 * @param {Object} options - Opciones de formato
 * @returns {string} - Fecha formateada
 */
export const formatDate = (date, options = {}) => {
  if (!date) return ''

  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  }

  return new Intl.DateTimeFormat('es-ES', defaultOptions).format(new Date(date))
}

/**
 * Trunca texto a una longitud máxima
 * @param {string} text - Texto a truncar
 * @param {number} maxLength - Longitud máxima
 * @param {string} suffix - Sufijo para texto truncado
 * @returns {string} - Texto truncado
 */
export const truncateText = (text, maxLength = 100, suffix = '...') => {
  if (!text || text.length <= maxLength) {
    return text
  }

  return text.substring(0, maxLength - suffix.length) + suffix
}

/**
 * Genera un slug a partir de un texto
 * @param {string} text - Texto para generar slug
 * @returns {string} - Slug generado
 */
export const slugify = text => {
  if (!text) return ''

  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

/**
 * Valida si un email tiene formato válido
 * @param {string} email - Email a validar
 * @returns {boolean} - True si es válido
 */
export const isValidEmail = email => {
  if (!email) return false

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Valida si una contraseña es fuerte
 * @param {string} password - Contraseña a validar
 * @returns {Object} - Resultado de validación
 */
export const validatePassword = password => {
  const errors = []

  if (!password) {
    return { isValid: false, errors: ['La contraseña es requerida'] }
  }

  if (password.length < 8) {
    errors.push('Mínimo 8 caracteres')
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Al menos una letra mayúscula')
  }

  if (!/[a-z]/.test(password)) {
    errors.push('Al menos una letra minúscula')
  }

  if (!/\d/.test(password)) {
    errors.push('Al menos un número')
  }

  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>?]/.test(password)) {
    errors.push('Al menos un carácter especial')
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

/**
 * Calcula el tiempo transcurrido desde una fecha
 * @param {string|Date} date - Fecha de referencia
 * @returns {string} - Tiempo transcurrido en formato legible
 */
export const timeAgo = date => {
  if (!date) return ''

  const now = new Date()
  const past = new Date(date)
  const diffInSeconds = Math.floor((now - past) / 1000)

  const intervals = [
    { label: 'año', seconds: 31536000 },
    { label: 'mes', seconds: 2592000 },
    { label: 'día', seconds: 86400 },
    { label: 'hora', seconds: 3600 },
    { label: 'minuto', seconds: 60 },
    { label: 'segundo', seconds: 1 },
  ]

  for (const interval of intervals) {
    const count = Math.floor(diffInSeconds / interval.seconds)
    if (count >= 1) {
      return `hace ${count} ${interval.label}${count > 1 ? 's' : ''}`
    }
  }

  return 'hace unos momentos'
}

/**
 * Genera colores únicos para avatares basados en texto
 * @param {string} text - Texto para generar color
 * @returns {string} - Color hexadecimal
 */
export const generateAvatarColor = text => {
  if (!text) return '#1890ff'

  let hash = 0
  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash)
  }

  const colors = [
    '#f56a00',
    '#7265e6',
    '#ffbf00',
    '#00a2ae',
    '#1890ff',
    '#52c41a',
    '#fa541c',
    '#722ed1',
    '#eb2f96',
    '#13c2c2',
    '#a0d911',
    '#faad14',
  ]

  return colors[Math.abs(hash) % colors.length]
}
