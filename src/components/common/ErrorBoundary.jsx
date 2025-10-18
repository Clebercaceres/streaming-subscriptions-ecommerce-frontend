import React from 'react'
import { Button, Result } from 'antd'

/**
 * Error Boundary component para capturar errores de JavaScript
 * en el árbol de componentes y mostrar una interfaz de fallback
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    // Actualizar el estado para mostrar la interfaz de fallback
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // Registrar el error en el servicio de logging si existe
    console.error('ErrorBoundary caught an error:', error, errorInfo)

    this.setState({
      error: error,
      errorInfo: errorInfo,
    })

    // Aquí podrías enviar el error a un servicio de logging como Sentry
    // if (process.env.NODE_ENV === 'production') {
    //   logErrorToService(error, errorInfo)
    // }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null })
  }

  render() {
    if (this.state.hasError) {
      // Puedes personalizar la interfaz de error según el entorno
      if (process.env.NODE_ENV === 'development') {
        return (
          <Result
            status="error"
            title="Error de Aplicación"
            subTitle="Ha ocurrido un error inesperado en la aplicación."
            extra={[
              <Button key="reset" type="primary" onClick={this.handleReset}>
                Intentar de Nuevo
              </Button>,
              <Button key="reload" onClick={() => window.location.reload()}>
                Recargar Página
              </Button>,
            ]}
          >
            <details style={{ whiteSpace: 'pre-wrap', marginTop: 16 }}>
              <summary>Detalles del Error (Modo Desarrollo)</summary>
              <p>
                <strong>Error:</strong>{' '}
                {this.state.error && this.state.error.toString()}
              </p>
              <p>
                <strong>Component Stack:</strong>{' '}
                {this.state.errorInfo.componentStack}
              </p>
            </details>
          </Result>
        )
      }

      // Interfaz de producción
      return (
        <Result
          status="error"
          title="Lo sentimos"
          subTitle="Ha ocurrido un error inesperado. Por favor, intenta recargar la página."
          extra={[
            <Button
              key="reload"
              type="primary"
              onClick={() => window.location.reload()}
            >
              Recargar Página
            </Button>,
          ]}
        />
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
