import { createContext, useContext, useState } from 'react'
import Toast from '../components/common/Toast'

// Create the Cart Context
const CartContext = createContext()

// Custom hook to use the Cart Context
export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

// Cart Provider Component
export const CartProvider = ({ children }) => {
  // Cart state: array of cart items
  const [cart, setCart] = useState([])
  
  // Toast notification state
  const [toast, setToast] = useState(null)

  // Show toast notification
  const showToast = (message, type = 'success') => {
    setToast({ message, type })
  }

  // Close toast notification
  const closeToast = () => {
    setToast(null)
  }

  // Add item to cart or increase quantity if already exists
  const addToCart = (product) => {
    setCart(prevCart => {
      // Check if product already exists in cart
      const existingItem = prevCart.find(item => item.productId === product.id)
      
      if (existingItem) {
        // Increase quantity if item exists
        showToast(`Updated ${product.name} quantity in cart`, 'success')
        return prevCart.map(item =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        // Add new item to cart
        showToast(`${product.name} added to cart!`, 'success')
        return [
          ...prevCart,
          {
            productId: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            image: product.image
          }
        ]
      }
    })
  }

  // Remove item from cart completely
  const removeFromCart = (productId) => {
    const item = cart.find(item => item.productId === productId)
    if (item) {
      showToast(`${item.name} removed from cart`, 'info')
    }
    setCart(prevCart => prevCart.filter(item => item.productId !== productId))
  }

  // Update quantity of a specific item
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      // Remove item if quantity is 0 or negative
      removeFromCart(productId)
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.productId === productId
            ? { ...item, quantity }
            : item
        )
      )
    }
  }

  // Clear all items from cart
  const clearCart = () => {
    setCart([])
  }

  // Calculate total price of all items in cart
  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      return total + (item.price * item.quantity)
    }, 0)
  }

  // Get total number of items in cart
  const getTotalItems = () => {
    return cart.reduce((total, item) => {
      return total + item.quantity
    }, 0)
  }

  // Context value object
  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems
  }

  return (
    <CartContext.Provider value={value}>
      {children}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={closeToast}
        />
      )}
    </CartContext.Provider>
  )
}
