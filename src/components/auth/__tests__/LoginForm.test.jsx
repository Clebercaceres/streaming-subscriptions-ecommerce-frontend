import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LoginForm } from '../AuthForms'

describe('LoginForm', () => {
  const mockOnSubmit = vi.fn()
  const user = userEvent.setup()

  beforeEach(() => {
    mockOnSubmit.mockClear()
  })

  it('renders login form correctly', () => {
    render(<LoginForm onSubmit={mockOnSubmit} />)

    expect(screen.getByText('Iniciar Sesión')).toBeInTheDocument()
    expect(
      screen.getByPlaceholderText('Correo electrónico')
    ).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Contraseña')).toBeInTheDocument()
    expect(
      screen.getByRole('checkbox', { name: /recordarme/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /iniciar sesión/i })
    ).toBeInTheDocument()
  })

  it('shows error message when provided', () => {
    render(<LoginForm onSubmit={mockOnSubmit} error="Credenciales inválidas" />)

    expect(screen.getByText('Error de autenticación')).toBeInTheDocument()
    expect(screen.getByText('Credenciales inválidas')).toBeInTheDocument()
  })

  it('validates required fields', async () => {
    render(<LoginForm onSubmit={mockOnSubmit} />)

    const submitButton = screen.getByRole('button', { name: /iniciar sesión/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('Por favor ingresa tu email')).toBeInTheDocument()
      expect(
        screen.getByText('Por favor ingresa tu contraseña')
      ).toBeInTheDocument()
    })

    expect(mockOnSubmit).not.toHaveBeenCalled()
  })

  it('validates email format', async () => {
    render(<LoginForm onSubmit={mockOnSubmit} />)

    const emailInput = screen.getByPlaceholderText('Correo electrónico')
    await user.type(emailInput, 'invalid-email')
    await user.tab() // Trigger validation

    await waitFor(() => {
      expect(screen.getByText('Ingresa un email válido')).toBeInTheDocument()
    })
  })

  it('validates password length', async () => {
    render(<LoginForm onSubmit={mockOnSubmit} />)

    const passwordInput = screen.getByPlaceholderText('Contraseña')
    await user.type(passwordInput, '123')
    await user.tab()

    await waitFor(() => {
      expect(
        screen.getByText('La contraseña debe tener al menos 6 caracteres')
      ).toBeInTheDocument()
    })
  })

  it('submits form with valid data', async () => {
    render(<LoginForm onSubmit={mockOnSubmit} />)

    await user.type(
      screen.getByPlaceholderText('Correo electrónico'),
      'test@example.com'
    )
    await user.type(screen.getByPlaceholderText('Contraseña'), 'password123')
    await user.click(screen.getByRole('checkbox', { name: /recordarme/i }))
    await user.click(screen.getByRole('button', { name: /iniciar sesión/i }))

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
        remember: true,
      })
    })
  })

  it('shows loading state', () => {
    render(<LoginForm onSubmit={mockOnSubmit} loading={true} />)

    expect(
      screen.getByRole('button', { name: /iniciar sesión/i })
    ).toBeAttribute('loading')
  })
})
