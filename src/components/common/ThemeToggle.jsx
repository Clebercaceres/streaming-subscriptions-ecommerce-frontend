import { Button, Tooltip } from 'antd'
import { SunOutlined, MoonOutlined } from '@ant-design/icons'
import { useTheme } from '../../hooks/useTheme'

/**
 * Componente para alternar entre modo claro y oscuro
 * Incluye animación suave y tooltip informativo
 */
const ThemeToggle = ({ size = 'default', showTooltip = true }) => {
  const { isDarkMode, toggleTheme } = useTheme()

  const button = (
    <Button
      type="text"
      icon={isDarkMode ? <SunOutlined /> : <MoonOutlined />}
      onClick={toggleTheme}
      size={size}
      className="transition-all duration-300 ease-in-out"
      aria-label={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
    />
  )

  if (showTooltip) {
    return (
      <Tooltip
        title={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
        placement="bottom"
      >
        {button}
      </Tooltip>
    )
  }

  return button
}

export default ThemeToggle
