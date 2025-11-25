# Day 4: Shopping Cart System with Context API

## Learning Objectives

By the end of this module, you will:
- Understand the Context API and when to use it
- Learn how to create and use custom context providers
- Master complex state management patterns
- Implement a fully functional shopping cart system

## Concepts Covered

- **Context API**: React's built-in solution for sharing state across components
- **useContext Hook**: Consuming context values in functional components
- **Provider Pattern**: Wrapping components to provide shared state
- **Complex State Updates**: Managing arrays and objects in state
- **Derived State**: Computing values from existing state (totals, counts)
- **Custom Hooks**: Creating reusable hooks for context consumption

---

## Why Context API?

### The Problem: Prop Drilling

In our previous days, we passed data through props. But what happens when you need to share data across many components at different levels?

```jsx
// Without Context - Prop Drilling
<App cartCount={5}>
  <Header cartCount={5}>
    <Navigation cartCount={5}>
      <CartIcon cartCount={5} />
    </Navigation>
  </Header>
</App>
```

This becomes tedious and hard to maintain. Context API solves this!

### The Solution: Context API

Context allows you to share values between components without explicitly passing props through every level.

```jsx
// With Context - Clean and Simple
<CartProvider>
  <App>
    <Header>
      <Navigation>
        <CartIcon /> {/* Can access cart directly! */}
      </Navigation>
    </Header>
  </App>
</CartProvider>
```

---

## Implementation Walkthrough

### Step 1: Creating the Cart Context

First, we create a context and a provider component:

```jsx
// src/context/CartContext.jsx
import { createContext, useContext, useState } from 'react'

// 1. Create the context
const CartContext = createContext()

// 2. Create a custom hook for easy access
export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

// 3. Create the provider component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])
  
  // ... cart methods here
  
  return (
    <CartContext.Provider value={{ cart, /* methods */ }}>
      {children}
    </CartContext.Provider>
  )
}
```

**Key Points:**
- `createContext()` creates a new context object
- The custom hook `useCart()` provides a clean API and error checking
- The provider component wraps children and provides the context value

### Step 2: Implementing Cart Methods

Our cart needs several operations:

```jsx
// Add item to cart or increase quantity
const addToCart = (product) => {
  setCart(prevCart => {
    const existingItem = prevCart.find(item => item.productId === product.id)
    
    if (existingItem) {
      // Item exists - increase quantity
      return prevCart.map(item =>
        item.productId === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    } else {
      // New item - add to cart
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

// Remove item completely
const removeFromCart = (productId) => {
  setCart(prevCart => prevCart.filter(item => item.productId !== productId))
}

// Update quantity
const updateQuantity = (productId, quantity) => {
  if (quantity <= 0) {
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

// Clear entire cart
const clearCart = () => {
  setCart([])
}

// Calculate total price
const getTotalPrice = () => {
  return cart.reduce((total, item) => {
    return total + (item.price * item.quantity)
  }, 0)
}

// Get total item count
const getTotalItems = () => {
  return cart.reduce((total, item) => {
    return total + item.quantity
  }, 0)
}
```

**Important Patterns:**

1. **Functional Updates**: We use `prevCart => ...` to ensure we're working with the latest state
2. **Immutability**: We never mutate the cart directly; we create new arrays/objects
3. **Array Methods**: `map`, `filter`, and `reduce` are essential for state updates
4. **Derived State**: `getTotalPrice` and `getTotalItems` compute values from the cart

### Step 3: Wrapping the App

To make the cart available everywhere, wrap your app with the provider:

```jsx
// src/App.jsx
import { CartProvider } from './context/CartContext'

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </BrowserRouter>
  )
}
```

### Step 4: Using the Cart Context

Any component can now access the cart:

```jsx
// In any component
import { useCart } from '../context/CartContext'

function ProductDetailsPage() {
  const { addToCart } = useCart()
  
  const handleAddToCart = () => {
    addToCart(product)
  }
  
  return (
    <button onClick={handleAddToCart}>Add to Cart</button>
  )
}
```

```jsx
// In Header component
function Header() {
  const { getTotalItems } = useCart()
  
  return (
    <div className="cart-icon">
      Cart ({getTotalItems()})
    </div>
  )
}
```

---

## Understanding State Updates

### Why Immutability Matters

React detects changes by comparing references. If you mutate state directly, React won't detect the change:

```jsx
// ❌ WRONG - Mutating state directly
const addToCart = (product) => {
  cart.push(product) // Don't do this!
  setCart(cart)
}

// ✅ CORRECT - Creating new array
const addToCart = (product) => {
  setCart([...cart, product])
}
```

### Array Update Patterns

```jsx
// Adding an item
setCart([...cart, newItem])

// Removing an item
setCart(cart.filter(item => item.id !== idToRemove))

// Updating an item
setCart(cart.map(item => 
  item.id === idToUpdate 
    ? { ...item, quantity: newQuantity }
    : item
))

// Replacing entire array
setCart(newArray)
```

---

## Cart Components Architecture

### CartItem Component

Displays a single cart item with quantity controls:

```jsx
function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart()
  
  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} />
      <div className="details">
        <h3>{item.name}</h3>
        <p>${item.price}</p>
      </div>
      <div className="quantity-controls">
        <button onClick={() => updateQuantity(item.productId, item.quantity - 1)}>
          -
        </button>
        <span>{item.quantity}</span>
        <button onClick={() => updateQuantity(item.productId, item.quantity + 1)}>
          +
        </button>
      </div>
      <button onClick={() => removeFromCart(item.productId)}>
        Remove
      </button>
    </div>
  )
}
```

### CartSummary Component

Shows order totals:

```jsx
function CartSummary() {
  const { getTotalPrice } = useCart()
  
  const subtotal = getTotalPrice()
  const tax = subtotal * 0.08
  const total = subtotal + tax
  
  return (
    <div className="cart-summary">
      <div>Subtotal: ${subtotal.toFixed(2)}</div>
      <div>Tax: ${tax.toFixed(2)}</div>
      <div>Total: ${total.toFixed(2)}</div>
      <button>Proceed to Checkout</button>
    </div>
  )
}
```

### Cart Page

Brings everything together:

```jsx
function Cart() {
  const { cart } = useCart()
  
  if (cart.length === 0) {
    return <div>Your cart is empty</div>
  }
  
  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>
      <div className="cart-content">
        <div className="cart-items">
          {cart.map(item => (
            <CartItem key={item.productId} item={item} />
          ))}
        </div>
        <CartSummary />
      </div>
    </div>
  )
}
```

---

## Common Pitfalls and Solutions

### 1. Forgetting the Provider

**Problem:**
```jsx
// Error: useCart must be used within a CartProvider
function App() {
  return <Header /> // Header uses useCart but no provider!
}
```

**Solution:**
```jsx
function App() {
  return (
    <CartProvider>
      <Header />
    </CartProvider>
  )
}
```

### 2. Stale State in Updates

**Problem:**
```jsx
// May use outdated cart value
const addToCart = (product) => {
  setCart([...cart, product])
}
```

**Solution:**
```jsx
// Always use functional update for state that depends on previous state
const addToCart = (product) => {
  setCart(prevCart => [...prevCart, product])
}
```

### 3. Unnecessary Re-renders

**Problem:** Every cart update re-renders all components using the context.

**Solution:** Split context or use `useMemo` for expensive computations:

```jsx
const value = useMemo(() => ({
  cart,
  addToCart,
  removeFromCart,
  // ... other methods
}), [cart])
```

---

## Practical Tasks

Complete these tasks to reinforce your learning:

### Task 1: Add Quantity Validation
Prevent users from adding more than 10 of the same item to the cart.

**Hint:** Modify the `addToCart` function to check the current quantity before adding.

### Task 2: Implement Cart Persistence with localStorage
Save the cart to localStorage so it persists across page refreshes.

**Hint:** Use `useEffect` to save cart to localStorage whenever it changes, and load it on mount.

```jsx
useEffect(() => {
  localStorage.setItem('cart', JSON.stringify(cart))
}, [cart])

// On mount
useEffect(() => {
  const savedCart = localStorage.getItem('cart')
  if (savedCart) {
    setCart(JSON.parse(savedCart))
  }
}, [])
```

### Task 3: Add Empty Cart Message with Style
Enhance the empty cart view with a friendly message and a "Continue Shopping" button that navigates to the home page.

**Hint:** Use conditional rendering and the `useNavigate` hook.

### Task 4: Create Cart Badge Animation
Add a subtle animation to the cart icon in the header when items are added.

**Hint:** Use CSS transitions and a temporary state to trigger the animation.

### Task 5: Add "Remove All" Button
Add a button to the cart page that clears all items with a confirmation dialog.

**Hint:** Use `window.confirm()` before calling `clearCart()`.

---

## Quiz: Test Your Understanding

### Question 1
What is the primary purpose of the Context API in React?

A) To replace all state management  
B) To share state across components without prop drilling  
C) To make components render faster  
D) To handle API calls  

**Answer:** B

---

### Question 2
What does the `useContext` hook do?

A) Creates a new context  
B) Provides context to children  
C) Consumes a context value  
D) Updates context state  

**Answer:** C

---

### Question 3
Why do we use functional updates in `setCart(prevCart => ...)`?

A) It's faster  
B) It ensures we work with the latest state  
C) It's required by React  
D) It prevents errors  

**Answer:** B

---

### Question 4
Which array method is best for removing an item from the cart?

A) `splice()`  
B) `delete`  
C) `filter()`  
D) `remove()`  

**Answer:** C

---

### Question 5
What's wrong with this code?

```jsx
const addToCart = (product) => {
  cart.push(product)
  setCart(cart)
}
```

A) Nothing, it works fine  
B) It mutates state directly  
C) `push()` doesn't exist  
D) Missing return statement  

**Answer:** B

---

### Question 6
How do you calculate the total price of all items in the cart?

A) Use a for loop  
B) Use `reduce()` to sum price × quantity  
C) Use `map()` to get prices  
D) Use `filter()` to find prices  

**Answer:** B

---

### Question 7
What happens if you use `useCart()` outside of `CartProvider`?

A) It returns null  
B) It throws an error  
C) It returns undefined  
D) It creates a new cart  

**Answer:** B (if you implemented the error check in the custom hook)

---

### Question 8
Why create a custom `useCart()` hook instead of using `useContext(CartContext)` directly?

A) It's required by React  
B) It provides better error messages and cleaner API  
C) It's faster  
D) It prevents bugs  

**Answer:** B

---

### Question 9
What does immutability mean in React state updates?

A) State never changes  
B) Creating new objects/arrays instead of modifying existing ones  
C) State is frozen  
D) Using const for variables  

**Answer:** B

---

### Question 10
When should you consider using Context API?

A) For all state in your app  
B) For state needed by many components at different levels  
C) Only for authentication  
D) Never, always use props  

**Answer:** B

---

## Key Takeaways

1. **Context API** solves prop drilling by providing global state access
2. **Provider Pattern** wraps components to share state
3. **Custom Hooks** like `useCart()` provide clean APIs for context consumption
4. **Immutability** is crucial for React to detect state changes
5. **Functional Updates** ensure you work with the latest state
6. **Derived State** computes values from existing state without storing duplicates
7. **Array Methods** (`map`, `filter`, `reduce`) are essential for state updates

---

## Next Steps

In Day 5, we'll build authentication forms and learn about:
- Controlled components
- Form validation
- User input handling
- localStorage for user persistence

Great job completing Day 4! You now have a fully functional shopping cart system using React's Context API. 🎉

