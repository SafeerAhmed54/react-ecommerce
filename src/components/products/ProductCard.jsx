import './ProductCard.css'

/**
 * ProductCard Component
 * 
 * Displays a product in a card format with image, name, price,
 * and a button to view more details.
 * 
 * This component demonstrates:
 * - Receiving props from parent components
 * - Displaying dynamic data
 * - Basic event handling
 * 
 * @param {Object} props - Component props
 * @param {string} props.id - Unique product identifier
 * @param {string} props.name - Product name
 * @param {number} props.price - Product price
 * @param {string} props.image - URL or path to product image
 */
function ProductCard({ id, name, price, image }) {
  // Event handler for the View Details button
  const handleViewDetails = () => {
    console.log(`View details for product: ${id}`)
    // Navigation will be implemented in Day 3 with React Router
  }

  return (
    <div className="product-card">
      {/* Product Image */}
      <div className="product-image">
        <img 
          src={image || 'https://via.placeholder.com/300x200?text=Product'} 
          alt={name}
        />
      </div>

      {/* Product Info */}
      <div className="product-info">
        <h3 className="product-name">{name}</h3>
        <p className="product-price">${price.toFixed(2)}</p>
      </div>

      {/* Action Button */}
      <div className="product-actions">
        <button 
          className="btn-view-details"
          onClick={handleViewDetails}
        >
          View Details
        </button>
      </div>
    </div>
  )
}

export default ProductCard
