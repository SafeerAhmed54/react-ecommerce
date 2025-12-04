import { useParams, useNavigate } from 'react-router-dom'
import { products } from '../data/products'
import { useCart } from '../context/CartContext'
import './ProductDetailsPage.css'

/**
 * ProductDetailsPage Component
 * 
 * Displays detailed information about a single product.
 * 
 * This component demonstrates:
 * - Using useParams hook to get URL parameters
 * - Finding data based on route parameters
 * - Conditional rendering for error states
 * - useNavigate hook for programmatic navigation
 * - Using Context API for cart functionality
 * 
 * Day 3 Learning Focus: React Router and Navigation
 * Day 4 Learning Focus: Context API and Cart Management
 */
function ProductDetailsPage() {
  // Get the product ID from the URL parameter
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()

  // Find the product in our data array
  const product = products.find(p => p.id === id)

  // Handle case where product is not found
  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Product Not Found</h2>
        <p>Sorry, we couldn't find the product you're looking for.</p>
        <button 
          className="btn-back-home"
          onClick={() => navigate('/')}
        >
          Back to Home
        </button>
      </div>
    )
  }

  // Handler for Add to Cart button
  const handleAddToCart = () => {
    addToCart(product)
    alert(`"${product.name}" has been added to your cart!`)
  }

  return (
    <div className="product-details-page">
      <div className="product-details-container">
        {/* Product Image Section */}
        <div className="product-image-section">
          <img 
            src={product.image || 'https://via.placeholder.com/600x600?text=Product'} 
            alt={product.name}
            className="product-detail-image"
            loading="lazy"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
          />
        </div>

        {/* Product Information Section */}
        <div className="product-info-section">
          <h1 className="product-title">{product.name}</h1>
          
          {/* Rating Display */}
          <div className="product-rating">
            <span className="rating-stars">{'⭐'.repeat(Math.floor(product.rating))}</span>
            <span className="rating-value">{product.rating}</span>
          </div>

          {/* Price */}
          <div className="product-price-section">
            <span className="product-price">${product.price.toFixed(2)}</span>
          </div>

          {/* Stock Status */}
          <div className="product-stock">
            {product.inStock ? (
              <span className="in-stock">✓ In Stock</span>
            ) : (
              <span className="out-of-stock">✗ Out of Stock</span>
            )}
          </div>

          {/* Description */}
          <div className="product-description">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>

          {/* Category */}
          <div className="product-category">
            <strong>Category:</strong> {product.category}
          </div>

          {/* Add to Cart Button */}
          <div className="product-actions">
            <button 
              className="btn-add-to-cart"
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailsPage
