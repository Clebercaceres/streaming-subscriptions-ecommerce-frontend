/**
 * Utilidades y componentes específicos del proyecto
 * Solo componentes que realmente aportan valor único
 */

import React from 'react'
import { Loader2 } from 'lucide-react'

/**
 * Spinner de carga reutilizable
 * Usa íconos de Lucide React para mejor integración
 */
export const LoadingSpinner = ({ size = 'default', className = '' }) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    default: 'w-6 h-6',
    large: 'w-8 h-8',
  }

  return (
    <Loader2
      className={`animate-spin text-primary ${sizeClasses[size]} ${className}`}
    />
  )
}

// Re-exportar componentes de Ant Design para conveniencia
export {
  Button,
  Input,
  Card,
  Badge,
  Alert,
  Modal,
  Typography,
  Space,
  Divider,
  Row,
  Col,
  Statistic,
  Tag,
  Avatar,
  Dropdown,
  Menu,
  Breadcrumb,
  Pagination,
  Tabs,
  Table,
  Form,
  Select,
  DatePicker,
  TimePicker,
  Calendar,
  Tree,
  TreeSelect,
  Cascader,
  Switch,
  Slider,
  Rate,
  Progress,
  Timeline,
  Tooltip,
  Popover,
  Popconfirm,
  Drawer,
  message,
  notification
} from 'antd'

export { default as Spin } from 'antd/es/spin'
export { default as Empty } from 'antd/es/empty'
