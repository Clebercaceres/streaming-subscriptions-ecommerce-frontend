import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { LoadingSpinner } from '../index.jsx'

describe('LoadingSpinner', () => {
  it('renders with default size', () => {
    render(<LoadingSpinner />)
    const spinner = screen.getByRole('img', { hidden: true })
    expect(spinner).toBeInTheDocument()
  })

  it('renders with large size', () => {
    render(<LoadingSpinner size="large" />)
    const spinner = screen.getByRole('img', { hidden: true })
    expect(spinner).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(<LoadingSpinner className="custom-class" />)
    const spinner = screen.getByRole('img', { hidden: true })
    expect(spinner).toHaveClass('custom-class')
  })
})
