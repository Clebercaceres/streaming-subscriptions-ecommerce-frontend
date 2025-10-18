import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useAsyncState } from '../useAsync.js'

describe('useAsyncState', () => {
  it('initializes with default state', () => {
    const { result } = renderHook(() => useAsyncState())

    expect(result.current.loading).toBe(false)
    expect(result.current.error).toBe(null)
    expect(result.current.data).toBe(null)
  })

  it('initializes with custom initial state', () => {
    const initialState = { loading: true, data: 'test' }
    const { result } = renderHook(() => useAsyncState(initialState))

    expect(result.current.loading).toBe(true)
    expect(result.current.data).toBe('test')
  })

  it('updates loading state correctly', () => {
    const { result } = renderHook(() => useAsyncState())

    act(() => {
      result.current.setLoading(true)
    })

    expect(result.current.loading).toBe(true)
    expect(result.current.error).toBe(null)
  })

  it('updates error state correctly', () => {
    const { result } = renderHook(() => useAsyncState())

    act(() => {
      result.current.setError('Test error')
    })

    expect(result.current.error).toBe('Test error')
    expect(result.current.loading).toBe(false)
  })

  it('updates data state correctly', () => {
    const { result } = renderHook(() => useAsyncState())

    act(() => {
      result.current.setData({ test: 'data' })
    })

    expect(result.current.data).toEqual({ test: 'data' })
    expect(result.current.loading).toBe(false)
    expect(result.current.error).toBe(null)
  })

  it('resets state correctly', () => {
    const { result } = renderHook(() =>
      useAsyncState({
        loading: true,
        error: 'test error',
        data: 'test data',
      })
    )

    act(() => {
      result.current.reset()
    })

    expect(result.current.loading).toBe(false)
    expect(result.current.error).toBe(null)
    expect(result.current.data).toBe(null)
  })
})
