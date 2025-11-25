import { createContext, useContext, useState } from 'react'

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

  // Add item to cart or increase quantity if already exists
  const addToCart = (product) => {
    setCart(prevCart => {
      // Check if product already exists in cart
      const existingItem = prevCart.find(item => item.productId === product.id)
      
      if (existingItem) {
        // Increase quantity if item exists
        return prevCart.map(item =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        // Add new item to cart
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
    </CartContext.Provider>
  )
}
