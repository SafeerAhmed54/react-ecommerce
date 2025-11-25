import { useCart } from '../../context/CartContext'
import './CartSummary.css'

function CartSummary() {
  const { getTotalPrice } = useCart()
  
  const subtotal = getTotalPrice()
  const taxRate = 0.08 // 8% tax
  const tax = subtotal * taxRate
  const total = subtotal + tax

  return (
    <div className="cart-summary">
      <h2 className="cart-summary-title">Order Summary</h2>
      
      <div className="summary-row">
        <span className="summary-label">Subtotal:</span>
        <span className="summary-value">${subtotal.toFixed(2)}</span>
      </div>
      
      <div className="summary-row">
        <span className="summary-label">Tax (8%):</span>
        <span className="summary-value">${tax.toFixed(2)}</span>
      </div>
      
      <div className="summary-divider"></div>
      
      <div className="summary-row summary-total">
        <span className="summary-label">Total:</span>
        <span className="summary-value">${total.toFixed(2)}</span>
      </div>
      
      <button className="checkout-btn">
        Proceed to Checkout
      </button>
    </div>
  )
}

export default CartSummary
