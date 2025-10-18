# 🚀 Guía de Uso de React Query en el Proyecto

## 📋 Introducción

React Query está completamente configurado y listo para usar. Proporciona caché inteligente, sincronización automática y manejo de errores optimizado.

## 📁 Servicios Disponibles

### Productos (`productQueries.js`)
```javascript
import { useProducts, useProduct, useCreateProduct } from '../queries'

// Obtener productos con filtros
const { data, isLoading, error } = useProducts({
  search: 'laptop',
  limit: 10,
  minPrice: 100
})

// Obtener producto específico
const { data: product } = useProduct(productId)

// Crear producto
const createMutation = useCreateProduct()
await createMutation.mutateAsync(productData)
```

### Perfil (`profileQueries.js`)
```javascript
import { useProfile, useUpdateProfile } from '../queries'

// Obtener perfil actual
const { data: profile } = useProfile()

// Actualizar perfil
const updateMutation = useUpdateProfile()
await updateMutation.mutateAsync(newProfileData)
```

### Plataformas (`platformQueries.js`)
```javascript
import { usePlatforms, useTrendingPlatforms } from '../queries'

// Obtener plataformas
const { data: platforms } = usePlatforms()

// Plataformas en tendencia
const { data: trending } = useTrendingPlatforms(5)
```

## 🪝 Hooks Personalizados

### `useQueryWithError`
Para consultas con manejo automático de errores:
```javascript
import { useQueryWithError } from '../hooks/useReactQuery'

const { data, isLoading } = useQueryWithError(
  ['custom-query'],
  () => api.get('/custom-endpoint'),
  {
    staleTime: 5 * 60 * 1000,
    onSuccess: (data) => console.log('Datos cargados:', data)
  }
)
```

### `useMutationWithError`
Para mutaciones con notificaciones automáticas:
```javascript
import { useMutationWithError } from '../hooks/useReactQuery'

const mutation = useMutationWithError(
  (data) => api.post('/endpoint', data),
  {
    successMessage: '¡Operación exitosa!',
    invalidateQueries: [['products']] // Invalidar queries relacionadas
  }
)
```

## 💡 Mejores Prácticas

### 1. **Query Keys Consistentes**
```javascript
// ✅ Bueno
export const productKeys = {
  all: ['products'],
  detail: (id) => [...productKeys.all, id],
}

// ❌ Malo
const queryKey = ['products', id] // Fácil de escribir mal
```

### 2. **Manejo de Estados de Carga**
```javascript
const { data, isLoading, error, isFetching } = useProducts()

// isLoading: Primera carga
// isFetching: Cualquier recarga (incluyendo background refetch)
// error: Error de la consulta
```

### 3. **Mutaciones con Optimismo**
```javascript
const mutation = useMutation({
  mutationFn: updateProduct,
  onMutate: async (newProduct) => {
    // Cancelar consultas salientes
    await queryClient.cancelQueries(['products'])

    // Snapshot del valor anterior
    const previousProducts = queryClient.getQueryData(['products'])

    // Aplicar actualización optimista
    queryClient.setQueryData(['products'], old => [...old, newProduct])

    return { previousProducts }
  },
  onError: (err, newProduct, context) => {
    // Revertir en caso de error
    queryClient.setQueryData(['products'], context.previousProducts)
  }
})
```

### 4. **Invalidación Inteligente**
```javascript
// Invalidar todas las consultas de productos
queryClient.invalidateQueries(['products'])

// Invalidar consulta específica
queryClient.invalidateQueries(['products', 'detail', productId])

// Invalidar con filtros
queryClient.invalidateQueries({
  queryKey: ['products'],
  predicate: (query) => query.queryKey.includes('active')
})
```

## 🔧 Configuración Actual

- **staleTime**: 5 minutos (datos "frescos")
- **gcTime**: 10 minutos (tiempo en caché)
- **retry**: Máximo 3 intentos (no retry en errores 4xx)
- **refetchOnWindowFocus**: Deshabilitado

## 📊 Debugging

En desarrollo, puedes ver el estado de React Query en:
1. React DevTools → Profiler → "Query Client"
2. Network tab para ver consultas reales
3. Console logs automáticos de errores

## 🚨 Migración desde Zustand

Para migrar stores existentes a React Query:

```javascript
// ❌ Zustand
const { products, loading } = useProductsStore()

// ✅ React Query
const { data: products, isLoading: loading } = useProducts()
```

## 🎯 Próximos Pasos

1. **Reemplazar consultas API directas** con React Query
2. **Agregar más servicios** según necesites (usuarios, pedidos, etc.)
3. **Implementar caché persistente** para datos críticos
4. **Agregar prefetching** para mejorar UX

¡React Query ya está optimizando tu aplicación! 🎉
