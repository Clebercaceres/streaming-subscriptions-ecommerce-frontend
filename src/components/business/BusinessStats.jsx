import PropTypes from 'prop-types'
import { Card, Typography, Space } from 'antd'

const { Title, Text } = Typography

/**
 * Componente para mostrar estadísticas de negocio
 */
export const BusinessStats = ({
  title,
  value,
  change,
  changeType = 'increase',
  icon,
  className = '',
}) => {
  return (
    <Card className={`business-stat ${className}`}>
      <Space direction="vertical" size="small" className="w-full">
        <div className="flex items-center justify-between">
          <Text type="secondary" className="text-sm">
            {title}
          </Text>
          {icon && <div className="text-primary">{icon}</div>}
        </div>
        <Title level={3} className="mb-0">
          {value}
        </Title>
        {change && (
          <Text
            className={`text-sm ${
              changeType === 'increase' ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {changeType === 'increase' ? '+' : '-'}
            {change}% desde el mes pasado
          </Text>
        )}
      </Space>
    </Card>
  )
}

BusinessStats.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  change: PropTypes.number,
  changeType: PropTypes.oneOf(['increase', 'decrease']),
  icon: PropTypes.node,
  className: PropTypes.string,
}

/**
 * Componente para mostrar métricas de ventas
 */
export const SalesMetrics = ({ metrics, loading = false }) => {
  if (loading) {
    return <div className="text-center py-4">Cargando métricas...</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <BusinessStats key={index} {...metric} />
      ))}
    </div>
  )
}

SalesMetrics.propTypes = {
  metrics: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      change: PropTypes.number,
      changeType: PropTypes.oneOf(['increase', 'decrease']),
      icon: PropTypes.node,
    })
  ).isRequired,
  loading: PropTypes.bool,
}

export default BusinessStats
