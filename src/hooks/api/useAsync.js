import React, { useState, useCallback } from 'react'

/**
 * Hook personalizado para manejar estados de carga y errores
 * @param {Object} initialState - Estado inicial
 * @returns {Object} - Estado y funciones para manejarlo
 */
export const useAsyncState = (initialState = {}) => {
  const [state, setState] = useState({
    loading: false,
    error: null,
    data: null,
    ...initialState,
  })

  const setLoading = useCallback(loading => {
    setState(prev => ({ ...prev, loading }))
  }, [])

  const setError = useCallback(error => {
    setState(prev => ({
      ...prev,
      error: error instanceof Error ? error.message : error,
      loading: false,
    }))
  }, [])

  const setData = useCallback(data => {
    setState(prev => ({
      ...prev,
      data,
      loading: false,
      error: null,
    }))
  }, [])

  const reset = useCallback(() => {
    setState({
      loading: false,
      error: null,
      data: null,
    })
  }, [])

  return {
    ...state,
    setLoading,
    setError,
    setData,
    reset,
  }
}

/**
 * Hook personalizado para manejar operaciones asíncronas
 * @param {Function} asyncFunction - Función asíncrona a ejecutar
 * @param {Object} options - Opciones adicionales
 * @returns {Object} - Estado y función para ejecutar la operación
 */
export const useAsyncOperation = (asyncFunction, options = {}) => {
  const { onSuccess, onError, immediate = false } = options
  const asyncState = useAsyncState()

  const execute = useCallback(
    async (...args) => {
      try {
        asyncState.setLoading(true)
        const result = await asyncFunction(...args)

        asyncState.setData(result)

        if (onSuccess) {
          onSuccess(result)
        }

        return result
      } catch (error) {
        asyncState.setError(error)

        if (onError) {
          onError(error)
        }

        throw error
      }
    },
    [asyncFunction, asyncState, onSuccess, onError]
  )

  // Ejecutar inmediatamente si se especifica
  React.useEffect(() => {
    if (immediate) {
      execute()
    }
  }, [immediate, execute])

  return {
    ...asyncState,
    execute,
  }
}
