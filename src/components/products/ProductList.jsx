import { useState } from 'react'
import ProductCard from './ProductCard'
import './ProductList.css'

/**
 * ProductList Component
 * 
 * Displays a grid of products with filtering and sorting capabilities.
 * 
 * This component demonstrates:
 * - useState hook for managing component state
 * - Array mapping to render lists of components
 * - Event handling for filters and sorting
 * - Conditional rendering based on state
 * 
 * @param {Object} props - Component props
 * @param {Array} props.products - Array of product objects
 */
function ProductList({ products }) {
  // State for category filter
  const [selectedCategory, setSelectedCategory] = useState('all')
  
  // State for sort option
  const [sortBy, setSortBy] = useState('default')

  // Get unique categories from products
  const categories = ['all', ...new Set(products.map(product => product.category))]

  // Filter products by category
  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(product => product.category === selectedCategory)

  // Sort filtered products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'name':
        return a.name.localeCompare(b.name)
      case 'rating':
        return b.rating - a.rating
      default:
        return 0
    }
  })

  // Event handlers
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value)
  }

  const handleSortChange = (e) => {
    setSortBy(e.target.value)
  }

  return (
    <div className="product-list-container">
      {/* Filter and Sort Controls */}
      <div className="product-controls">
        <div className="filter-group">
          <label htmlFor="category-filter">Category:</label>
          <select 
            id="category-filter"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="sort-group">
          <label htmlFor="sort-select">Sort by:</label>
          <select 
            id="sort-select"
            value={sortBy}
            onChange={handleSortChange}
          >
            <option value="default">Default</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Name: A to Z</option>
            <option value="rating">Rating: High to Low</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="product-grid">
        {sortedProducts.length > 0 ? (
          sortedProducts.map(product => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
            />
          ))
        ) : (
          <p className="no-products">No products found in this category.</p>
        )}
      </div>
    </div>
  )
}

export default ProductList
