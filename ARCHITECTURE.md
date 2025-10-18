# Arquitectura del Frontend

## Estructura de Directorios

```
src/
├── components/           # Componentes React
│   ├── business/        # Componentes específicos de negocio
│   ├── common/          # Componentes reutilizables
│   ├── forms/          # Formularios y componentes de entrada
│   ├── layout/         # Layouts y estructura de página
│   │   ├── header/     # Componentes del header
│   │   ├── sidebar/    # Componentes del sidebar
│   │   └── footer/     # Componentes del footer
│   ├── ui/             # Componentes básicos de UI
│   └── auth/           # Componentes de autenticación
├── hooks/              # Custom hooks
│   ├── api/           # Hooks para llamadas API
│   └── auth/          # Hooks de autenticación
├── pages/             # Páginas de la aplicación
├── services/          # Servicios y llamadas API
├── store/             # Estado global (Zustand)
├── utils/             # Utilidades y helpers
└── assets/            # Recursos estáticos
```

## Tecnologías Principales

- **React 18** - Framework principal
- **Zustand** - Manejo de estado
- **React Router** - Enrutamiento
- **Ant Design** - Componentes UI
- **Tailwind CSS** - Estilos
- **Axios** - Cliente HTTP
- **Vite** - Build tool

## Patrones Utilizados

- **Custom Hooks** para lógica reutilizable
- **Component Composition** para componentes flexibles
- **PropTypes** para validación de props
- **Error Boundaries** para manejo de errores
- **Loading States** para mejor UX

## Estado Global

El estado se maneja con Zustand con los siguientes stores:

- `useAuthStore` - Autenticación y usuario
- `useProductStore` - Productos y filtros
- `useCartStore` - Carrito de compras

## Convenciones de Código

- **Imports**: Sin extensión de archivo
- **Nombres**: camelCase para variables y funciones, PascalCase para componentes
- **Estilos**: Tailwind CSS con clases semánticas
- **Comentarios**: JSDoc para funciones públicas
- **Errores**: Manejo consistente con try/catch

## Testing

- **Vitest** para testing unitario
- **React Testing Library** para componentes
- **MSW** para mocking de APIs

## Performance

- **Code Splitting** con React.lazy
- **Memoización** con React.memo donde sea necesario
- **Virtualización** para listas grandes
- **Image Optimization** con lazy loading
