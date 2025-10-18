import React from 'react'
import { notification, message } from 'antd'
import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons'

/**
 * Utilidades para mostrar notificaciones y mensajes
 */

// Configuración de íconos por tipo
const iconMap = {
  success: CheckCircleOutlined,
  error: CloseCircleOutlined,
  warning: ExclamationCircleOutlined,
  info: InfoCircleOutlined,
}

/**
 * Muestra una notificación
 * @param {string} type - Tipo de notificación (success, error, warning, info)
 * @param {string} title - Título de la notificación
 * @param {string} description - Descripción de la notificación
 * @param {Object} options - Opciones adicionales de configuración
 */
export const showNotification = (type, title, description, options = {}) => {
  const icon = iconMap[type]

  notification[type]({
    message: title,
    description,
    icon: icon ? React.createElement(icon) : null,
    placement: 'topRight',
    duration: 4,
    ...options,
  })
}

/**
 * Muestra un mensaje global
 * @param {string} type - Tipo de mensaje (success, error, warning, info)
 * @param {string} content - Contenido del mensaje
 * @param {number} duration - Duración en segundos (opcional)
 */
export const showMessage = (type, content, duration = 3) => {
  message[type](content, duration)
}

/**
 * Muestra una confirmación antes de ejecutar una acción
 * @param {string} title - Título del diálogo de confirmación
 * @param {string} content - Contenido del diálogo
 * @param {Function} onConfirm - Función a ejecutar si confirma
 * @param {Function} onCancel - Función a ejecutar si cancela (opcional)
 * @param {Object} options - Opciones adicionales
 */
export const showConfirm = (
  title,
  content,
  onConfirm,
  onCancel,
  options = {}
) => {
  const {
    okText = 'Aceptar',
    cancelText = 'Cancelar',
    ...modalOptions
  } = options

  window.confirm({
    title,
    content,
    okText,
    cancelText,
    onOk: onConfirm,
    onCancel: onCancel || (() => {}),
    ...modalOptions,
  })
}

/**
 * Componente para mostrar mensajes de estado dentro de componentes
 */
export const StatusMessage = ({
  type = 'info',
  message,
  showIcon = true,
  className = '',
}) => {
  if (!message) return null

  const icon = iconMap[type]
  const IconComponent = icon

  return (
    <div className={`flex items-center gap-2 text-sm ${className}`}>
      {showIcon && IconComponent && (
        <IconComponent className={`text-${type}`} />
      )}
      <span>{message}</span>
    </div>
  )
}

export default {
  showNotification,
  showMessage,
  showConfirm,
  StatusMessage,
}
