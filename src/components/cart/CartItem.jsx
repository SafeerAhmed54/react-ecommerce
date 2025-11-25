import { useCart } from '../../context/CartContext'
import './CartItem.css'

function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart()

  const handleQuantityChange = (newQuantity) => {
    updateQuantity(item.productId, newQuantity)
  }

  const handleRemove = () => {
    removeFromCart(item.productId)
  }

  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} className="cart-item-image" />
      
      <div className="cart-item-details">
        <h3 className="cart-item-name">{item.name}</h3>
        <p className="cart-item-price">${item.price.toFixed(2)}</p>
      </div>
      
      <div className="cart-item-quantity">
        <button 
          className="quantity-btn"
          onClick={() => handleQuantityChange(item.quantity - 1)}
          aria-label="Decrease quantity"
        >
          -
        </button>
        <span className="quantity-value">{item.quantity}</span>
        <button 
          className="quantity-btn"
          onClick={() => handleQuantityChange(item.quantity + 1)}
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
      
      <div className="cart-item-total">
        <p className="item-total-price">${(item.price * item.quantity).toFixed(2)}</p>
      </div>
      
      <button 
        className="remove-btn"
        onClick={handleRemove}
        aria-label="Remove item"
      >
        ×
      </button>
    </div>
  )
}

export default CartItem
