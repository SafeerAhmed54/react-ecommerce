import { useCart } from '../context/CartContext'
import CartItem from '../components/cart/CartItem'
import CartSummary from '../components/cart/CartSummary'
import './Cart.css'

function Cart() {
  const { cart } = useCart()

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-container">
          <h1 className="cart-title">Shopping Cart</h1>
          <div className="empty-cart">
            <p className="empty-cart-message">Your cart is empty</p>
            <a href="/" className="continue-shopping-btn">
              Continue Shopping
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h1 className="cart-title">Shopping Cart</h1>
        
        <div className="cart-content">
          <div className="cart-items">
            {cart.map(item => (
              <CartItem key={item.productId} item={item} />
            ))}
          </div>
          
          <div className="cart-summary-wrapper">
            <CartSummary />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
