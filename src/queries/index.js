/**
 * Índice de servicios React Query
 * Centraliza todas las consultas y mutaciones para fácil importación
 */

// Exportar todas las funciones de productos
export * from './productQueries'

// Exportar todas las funciones de perfil
export * from './profileQueries'

// Exportar todas las funciones de plataformas
export * from './platformQueries'

// Query Keys centrales para acceso desde cualquier lugar
export { productKeys } from './productQueries'
export { profileKeys } from './profileQueries'
export { platformKeys } from './platformQueries'
