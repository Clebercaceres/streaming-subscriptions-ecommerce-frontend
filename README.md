<<<<<<< HEAD
# Guía de Desarrollo - Plataforma de Streaming

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js 18+
- npm o yarn
- Git

### Instalación

```bash
# Clonar el repositorio
git clone <url-del-repositorio>
cd plataforma-streaming/frontend

# Instalar dependencias
npm install

# Iniciar desarrollo
npm run dev

# Ejecutar tests
npm run test

# Ejecutar linting
npm run lint
```

## 📁 Estructura del Proyecto

### Frontend (React + Vite)

```
src/
├── components/          # Componentes React
│   ├── business/       # Componentes específicos de negocio
│   ├── common/         # Componentes reutilizables
│   ├── forms/         # Formularios y componentes de entrada
│   ├── layout/        # Layouts y estructura de página
│   ├── ui/            # Componentes básicos de UI
│   └── auth/          # Componentes de autenticación
├── hooks/             # Custom hooks
│   ├── api/          # Hooks para llamadas API
│   └── auth/         # Hooks de autenticación
├── pages/            # Páginas de la aplicación
├── services/         # Servicios y llamadas API
├── store/            # Estado global (Zustand)
├── utils/            # Utilidades y helpers
└── test/             # Archivos de configuración de testing
```

### Tecnologías Principales

- **React 18** - Framework principal con hooks modernos
- **Vite** - Build tool rápido y optimizado
- **Zustand** - Manejo de estado ligero y escalable
- **React Router** - Enrutamiento del lado del cliente
- **Ant Design** - Librería de componentes UI
- **Tailwind CSS** - Framework de estilos utility-first
- **Axios** - Cliente HTTP para llamadas API
- **Vitest** - Framework de testing moderno
- **ESLint** - Linting y calidad de código

## 🏗️ Arquitectura

### Estado Global (Zustand)

```javascript
// stores/index.js
export const useAuthStore = create(
  devtools(
    persist(
      (set, get) => ({
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,

        login: async credentials => {
          /* ... */
        },
        logout: () => {
          /* ... */
        },
        verifyAuth: async () => {
          /* ... */
        },
      }),
      { name: 'auth-storage' }
    ),
    { name: 'AuthStore' }
  )
)
```

### Hooks Personalizados

```javascript
// hooks/useAuth.js
export const useAuth = () => {
  const { user, token, isAuthenticated, loading, login, logout, verifyAuth } =
    useAuthStore()

  return {
    user,
    token,
    isAuthenticated,
    loading,
    login,
    logout,
    verifyAuth,
    isAdmin: user?.role === 'admin',
  }
}
```

### Servicios API

```javascript
// services/api.js
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001/api',
  timeout: 10000,
})

// Interceptors para manejo automático de tokens
api.interceptors.request.use(config => {
  const token = localStorage.getItem('auth-storage')
  if (token) {
    // Configurar token automáticamente
  }
  return config
})
```

## 🔧 Configuración

### Variables de Entorno

```env
# .env
VITE_API_URL=http://localhost:5001/api
VITE_IMAGES_URL=http://localhost:5001/images
```

### ESLint

```javascript
// .eslintrc.cjs
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
    'no-console': 'warn',
    // ... más reglas
  },
}
```

## 🧪 Testing

### Ejecutar Tests

```bash
# Todos los tests
npm run test

# Tests en modo watch
npm run test:watch

# Tests con cobertura
npm run test:coverage

# Tests con interfaz gráfica
npm run test:ui
```

### Ejemplo de Test

```javascript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { LoadingSpinner } from '../components/ui'

describe('LoadingSpinner', () => {
  it('renders with default size', () => {
    render(<LoadingSpinner />)
    const spinner = screen.getByRole('img', { hidden: true })
    expect(spinner).toBeInTheDocument()
  })
})
```

## 🚀 Despliegue

### Build de Producción

```bash
npm run build
```

### Despliegue en Netlify/Vercel

1. Conectar repositorio a la plataforma
2. Configurar variables de entorno
3. Desplegar automáticamente

## 📋 Comandos Disponibles

```bash
# Desarrollo
npm run dev              # Servidor de desarrollo
npm run build           # Build de producción
npm run preview         # Preview del build

# Calidad de Código
npm run lint            # Ejecutar ESLint
npm run lint:fix        # Corregir problemas automáticamente

# Testing
npm run test            # Ejecutar tests
npm run test:ui         # Interfaz gráfica de tests
npm run test:coverage   # Cobertura de tests

# Utilidades
npm run clean           # Limpiar cache y node_modules
```

## 🔒 Seguridad

### Autenticación

- **JWT Tokens** almacenados en localStorage con expiración
- **Refresh Tokens** automáticos para mantener sesiones activas
- **Verificación automática** de autenticación en carga de aplicación

### Validación de Datos

- **PropTypes** en todos los componentes
- **Validación de formularios** con reglas estrictas
- **Sanitización de entrada** en servicios API

### Protección contra Ataques

- **XSS Protection** mediante sanitización de contenido
- **CSRF Protection** mediante configuración de CORS
- **Rate Limiting** implementado en el backend

## 📈 Performance

### Optimizaciones Implementadas

- **React.memo** para componentes que reciben muchos props
- **Lazy Loading** de imágenes con `loading="lazy"`
- **Code Splitting** automático con Vite
- **Bundle Optimization** mediante tree shaking

### Mejores Prácticas

- **Uso de useCallback y useMemo** donde sea necesario
- **Virtualización** para listas grandes (si aplica)
- **Caching** de datos con React Query (si se implementa)

## 🛠️ Desarrollo

### Convenciones de Código

- **Imports**: Sin extensión de archivo
- **Nombres**: camelCase para variables, PascalCase para componentes
- **Comentarios**: JSDoc para funciones públicas
- **Errores**: Manejo consistente con try/catch

### Patrón de Commits

```
feat: nueva funcionalidad
fix: corrección de bug
docs: cambios en documentación
style: cambios de formato
refactor: refactorización de código
test: agregar tests
chore: tareas de mantenimiento
```

## 📞 Soporte

Para preguntas o problemas:

1. Revisar la documentación
2. Crear un issue en el repositorio
3. Contactar al equipo de desarrollo

---

**¡Feliz desarrollo! 🚀**
=======
# streaming-subscriptions-ecommerce-frontend
🛒Plataforma de  E-commerce
>>>>>>> cbd148999f9bb4331a8063ea5c3cb154f3690669
