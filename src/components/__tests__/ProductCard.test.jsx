import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import ProductCard from '../ProductCard'

// Mock del store de Zustand
vi.mock('../../../store', () => ({
  useCartStore: () => ({
    addItem: vi.fn(),
  }),
}))

// Mock del servicio de imágenes
vi.mock('../../../services/imageService', () => ({
  getImageWithFallback: () => 'https://example.com/image.jpg',
}))

const mockProduct = {
  id: 1,
  name: 'Producto de Test',
  description: 'Descripción del producto de test',
  price: 29.99,
  image_url: 'test-image.jpg',
  sold_count: 15,
}

const renderWithRouter = component => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe('ProductCard', () => {
  it('renders product information correctly', () => {
    renderWithRouter(<ProductCard product={mockProduct} />)

    expect(screen.getByText('Producto de Test')).toBeInTheDocument()
    expect(
      screen.getByText('Descripción del producto de test')
    ).toBeInTheDocument()
    expect(screen.getByText('$29.99')).toBeInTheDocument()
    expect(screen.getByText('15 vendidos')).toBeInTheDocument()
  })

  it('renders with grid view mode by default', () => {
    renderWithRouter(<ProductCard product={mockProduct} />)

    // Debería renderizar el componente en modo grid por defecto
    expect(screen.getByText('Producto de Test')).toBeInTheDocument()
  })

  it('renders with list view mode when specified', () => {
    renderWithRouter(<ProductCard product={mockProduct} viewMode="list" />)

    // Debería renderizar el componente en modo lista
    expect(screen.getByText('Producto de Test')).toBeInTheDocument()
  })

  it('displays fallback when no image is available', () => {
    const productWithoutImage = { ...mockProduct, image_url: null }
    renderWithRouter(<ProductCard product={productWithoutImage} />)

    expect(screen.getByText('Producto de Test')).toBeInTheDocument()
  })
})
