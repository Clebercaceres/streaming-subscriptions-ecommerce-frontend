import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SearchForm } from '../forms/FormComponents'

describe('SearchForm', () => {
  const mockOnSearch = vi.fn()
  const user = userEvent.setup()

  beforeEach(() => {
    mockOnSearch.mockClear()
  })

  it('renders search input and button', () => {
    render(<SearchForm onSearch={mockOnSearch} />)

    expect(screen.getByPlaceholderText('Buscar...')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /buscar/i })).toBeInTheDocument()
  })

  it('renders custom placeholder', () => {
    render(
      <SearchForm onSearch={mockOnSearch} placeholder="Buscar productos..." />
    )

    expect(
      screen.getByPlaceholderText('Buscar productos...')
    ).toBeInTheDocument()
  })

  it('calls onSearch when form is submitted', async () => {
    render(<SearchForm onSearch={mockOnSearch} />)

    const input = screen.getByPlaceholderText('Buscar...')
    await user.type(input, 'laptop')
    await user.click(screen.getByRole('button', { name: /buscar/i }))

    expect(mockOnSearch).toHaveBeenCalledWith('laptop')
  })

  it('shows loading state', () => {
    render(<SearchForm onSearch={mockOnSearch} loading={true} />)

    expect(screen.getByRole('button', { name: /buscar/i })).toBeAttribute(
      'loading'
    )
  })

  it('applies custom className', () => {
    const { container } = render(
      <SearchForm onSearch={mockOnSearch} className="custom-search" />
    )

    expect(container.firstChild).toHaveClass('search-form', 'custom-search')
  })
})
