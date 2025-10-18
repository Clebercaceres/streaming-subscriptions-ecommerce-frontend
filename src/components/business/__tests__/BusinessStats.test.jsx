import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BusinessStats } from '../business/BusinessStats'
import { DollarSign, TrendingUp } from 'lucide-react'

// Mock de lucide-react icons
vi.mock('lucide-react', () => ({
  DollarSign: () => <div data-testid="dollar-icon" />,
  TrendingUp: () => <div data-testid="trending-icon" />,
}))

describe('BusinessStats', () => {
  const defaultProps = {
    title: 'Ventas Totales',
    value: '$125,000',
    change: 12.5,
    changeType: 'increase',
    icon: <DollarSign />,
  }

  it('renders correctly with all props', () => {
    render(<BusinessStats {...defaultProps} />)

    expect(screen.getByText('Ventas Totales')).toBeInTheDocument()
    expect(screen.getByText('$125,000')).toBeInTheDocument()
    expect(screen.getByText('+12.5% desde el mes pasado')).toBeInTheDocument()
    expect(screen.getByTestId('dollar-icon')).toBeInTheDocument()
  })

  it('renders with decrease change type', () => {
    render(
      <BusinessStats {...defaultProps} change={-5.2} changeType="decrease" />
    )

    expect(screen.getByText('-5.2% desde el mes pasado')).toBeInTheDocument()
  })

  it('renders without change information', () => {
    render(<BusinessStats title="Usuarios Activos" value={1250} />)

    expect(screen.getByText('Usuarios Activos')).toBeInTheDocument()
    expect(screen.getByText('1250')).toBeInTheDocument()
    expect(screen.queryByText(/desde el mes pasado/)).not.toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(
      <BusinessStats {...defaultProps} className="custom-class" />
    )

    expect(container.firstChild).toHaveClass('business-stat', 'custom-class')
  })

  it('handles numeric values correctly', () => {
    render(
      <BusinessStats
        title="Productos"
        value={150}
        change={8}
        icon={<TrendingUp />}
      />
    )

    expect(screen.getByText('Productos')).toBeInTheDocument()
    expect(screen.getByText('150')).toBeInTheDocument()
    expect(screen.getByText('+8% desde el mes pasado')).toBeInTheDocument()
    expect(screen.getByTestId('trending-icon')).toBeInTheDocument()
  })
})
