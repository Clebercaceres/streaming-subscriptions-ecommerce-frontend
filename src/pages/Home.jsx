import React, { useEffect, useState } from 'react'
import { useProductStore } from '../store'
import { LoadingSpinner } from '../components/ui'

// Componentes específicos
import CatalogHeader from '../components/common/CatalogHeader'
import SearchAndFilters from '../components/common/SearchAndFilters'
import ProductList from '../components/common/ProductList'
import BestSellers from '../components/common/BestSellers'

/**
 * Página de catálogo de productos (usada en /products)
 * Refactorizada con componentes más pequeños y reutilizables
 */
const Home = () => {
  const {
    products,
    loading,
    error,
    filters,
    totalCount,
    bestSellers,
    fetchProducts,
    fetchBestSellers,
    updateFilters,
    searchProducts,
  } = useProductStore()

  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [priceRange, setPriceRange] = useState({ min: '', max: '' })

  useEffect(() => {
    fetchProducts()
    fetchBestSellers()
  }, [])

  const handleSearch = async value => {
    setSearchQuery(value)
    if (value.trim()) {
      await searchProducts(value.trim())
    } else {
      await fetchProducts()
    }
  }

  const handleSortChange = newSort => {
    updateFilters({ sort: newSort })
    fetchProducts()
  }

  const handleApplyFilters = () => {
    const customFilters = {}

    if (priceRange.min) customFilters.minPrice = priceRange.min
    if (priceRange.max) customFilters.maxPrice = priceRange.max
    if (selectedProduct) customFilters.productName = selectedProduct.name

    updateFilters(customFilters)
    fetchProducts(customFilters)
    setShowFilters(false)
  }

  const handleClearFilters = () => {
    setSelectedProduct(null)
    setPriceRange({ min: '', max: '' })
    updateFilters({
      sort: 'name_asc',
      search: '',
      minPrice: null,
      maxPrice: null,
      productName: null,
    })
    fetchProducts()
  }

  const handleProductFilter = product => {
    setSelectedProduct(product)
    updateFilters({ productName: product.name })
    fetchProducts({ productName: product.name })
  }

  return (
    <div className="space-y-6">
      {/* Header con estadísticas */}
      <CatalogHeader totalCount={totalCount} bestSellers={bestSellers} />

      {/* Barra de búsqueda y filtros */}
      <SearchAndFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        viewMode={viewMode}
        setViewMode={setViewMode}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
        onApplyFilters={handleApplyFilters}
        onClearFilters={handleClearFilters}
        onSearch={handleSearch}
      />

      {/* Productos más vendidos */}
      <BestSellers bestSellers={bestSellers} />

      {/* Lista de productos */}
      <ProductList
        products={products}
        loading={loading}
        error={error}
        viewMode={viewMode}
        searchQuery={searchQuery}
      />
    </div>
  )
}

export default Home
