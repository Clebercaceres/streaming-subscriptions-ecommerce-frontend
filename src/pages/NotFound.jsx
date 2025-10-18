import { Link } from 'react-router-dom'
import { Home, ArrowLeft } from 'lucide-react'
import { Button, Typography, Card, Space } from 'antd'

const { Title, Text } = Typography

/**
 * Página 404 - No encontrado
 */
const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-md w-full text-center">
        <Space direction="vertical" size="large" className="w-full">
          <div>
            <Title level={1} className="text-9xl font-bold m-0">
              404
            </Title>
            <Title level={2} className="mt-4 mb-2">
              Página no encontrada
            </Title>
            <Text type="secondary" className="text-lg">
              Lo sentimos, la página que buscas no existe o ha sido movida.
            </Text>
          </div>

          <Space direction="vertical" className="w-full">
            <Button
              type="primary"
              size="large"
              block
              icon={<Home />}
            >
              <Link to="/">Ir al inicio</Link>
            </Button>

            <Button
              size="large"
              block
              icon={<ArrowLeft />}
              onClick={() => window.history.back()}
            >
              Volver atrás
            </Button>
          </Space>
        </Space>
      </Card>
    </div>
  )
}

export default NotFound
