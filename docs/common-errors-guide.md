# Common Errors and Solutions Guide

This guide covers common errors you might encounter while building the React ecommerce project, along with explanations and solutions.

---

## React Errors

### 1. "Cannot read property of undefined"

**Error Message:**
```
TypeError: Cannot read property 'name' of undefined
```

**Common Causes:**
- Trying to access a property on an object that doesn't exist yet
- Data hasn't loaded from an API or context
- Incorrect destructuring

**Example:**
```jsx
// ❌ Error if product is undefined
const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  return <h1>{product.name}</h1>; // Error!
};
```

**Solutions:**
```jsx
// ✅ Solution 1: Optional chaining
return <h1>{product?.name}</h1>;

// ✅ Solution 2: Conditional rendering
if (!product) return <div>Loading...</div>;
return <h1>{product.name}</h1>;

// ✅ Solution 3: Default value
const product = products.find(p => p.id === id) || {};
```

---

### 2. "Each child in a list should have a unique 'key' prop"

**Error Message:**
```
Warning: Each child in a list should have a unique "key" prop.
```

**Common Causes:**
- Rendering a list without key props
- Using array index as key (not recommended for dynamic lists)

**Example:**
```jsx
// ❌ Missing key
{products.map(product => (
  <ProductCard product={product} />
))}

// ❌ Using index (problematic if list changes)
{products.map((product, index) => (
  <ProductCard key={index} product={product} />
))}
```

**Solutions:**
```jsx
// ✅ Use unique ID
{products.map(product => (
  <ProductCard key={product.id} product={product} />
))}
```

---

### 3. "Too many re-renders"

**Error Message:**
```
Error: Too many re-renders. React limits the number of renders to prevent an infinite loop.
```

**Common Causes:**
- Calling setState directly in the component body
- Event handler called immediately instead of passed as reference

**Example:**
```jsx
// ❌ Infinite loop - setState called on every render
function Counter() {
  const [count, setCount] = useState(0);
  setCount(count + 1); // Called immediately!
  return <div>{count}</div>;
}

// ❌ Function called immediately
<button onClick={handleClick()}>Click</button>
```

**Solutions:**
```jsx
// ✅ Call setState in event handler or useEffect
function Counter() {
  const [count, setCount] = useState(0);
  
  const increment = () => {
    setCount(count + 1);
  };
  
  return <button onClick={increment}>{count}</button>;
}

// ✅ Pass function reference
<button onClick={handleClick}>Click</button>

// ✅ Use arrow function if you need to pass arguments
<button onClick={() => handleClick(id)}>Click</button>
```

---

### 4. "Cannot update a component while rendering a different component"

**Error Message:**
```
Warning: Cannot update a component while rendering a different component.
```

**Common Causes:**
- Calling setState in the render phase of another component
- Updating parent state from child during render

**Example:**
```jsx
// ❌ Updating parent state during render
function Child({ setParentState }) {
  setParentState('new value'); // Called during render!
  return <div>Child</div>;
}
```

**Solutions:**
```jsx
// ✅ Use useEffect
function Child({ setParentState }) {
  useEffect(() => {
    setParentState('new value');
  }, []);
  return <div>Child</div>;
}

// ✅ Or use event handler
function Child({ setParentState }) {
  return (
    <button onClick={() => setParentState('new value')}>
      Update
    </button>
  );
}
```

---

### 5. "Hook called conditionally"

**Error Message:**
```
Error: React Hook "useState" is called conditionally. React Hooks must be called in the exact same order in every component render.
```

**Common Causes:**
- Calling hooks inside conditions, loops, or nested functions
- Early returns before hooks

**Example:**
```jsx
// ❌ Hook called conditionally
function MyComponent({ condition }) {
  if (condition) {
    const [state, setState] = useState(0); // Error!
  }
  return <div>Content</div>;
}

// ❌ Early return before hook
function MyComponent({ data }) {
  if (!data) return null;
  const [state, setState] = useState(0); // Error!
}
```

**Solutions:**
```jsx
// ✅ Call hooks at the top level
function MyComponent({ condition }) {
  const [state, setState] = useState(0);
  
  if (condition) {
    // Use the state here
  }
  return <div>Content</div>;
}

// ✅ Move hooks before early return
function MyComponent({ data }) {
  const [state, setState] = useState(0);
  
  if (!data) return null;
  return <div>Content</div>;
}
```

---

### 6. "Objects are not valid as a React child"

**Error Message:**
```
Error: Objects are not valid as a React child (found: object with keys {name, price}).
```

**Common Causes:**
- Trying to render an object directly in JSX
- Forgetting to access object properties

**Example:**
```jsx
// ❌ Rendering object directly
const product = { name: 'Laptop', price: 999 };
return <div>{product}</div>; // Error!
```

**Solutions:**
```jsx
// ✅ Render specific properties
return <div>{product.name} - ${product.price}</div>;

// ✅ Convert to string if needed
return <div>{JSON.stringify(product)}</div>;
```

---

## React Router Errors

### 7. "useParams() may be used only in the context of a <Router> component"

**Error Message:**
```
Error: useParams() may be used only in the context of a <Router> component.
```

**Common Causes:**
- Using React Router hooks outside of BrowserRouter
- Component not rendered by a Route

**Solutions:**
```jsx
// ✅ Wrap app with BrowserRouter
import { BrowserRouter } from 'react-router-dom';

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
```

---

### 8. "No routes matched location"

**Error Message:**
```
No routes matched location "/products/123"
```

**Common Causes:**
- Route path doesn't match URL
- Missing dynamic route parameter syntax
- Routes not properly nested

**Solutions:**
```jsx
// ❌ Missing colon for dynamic parameter
<Route path="/product/id" element={<ProductDetails />} />

// ✅ Correct dynamic route
<Route path="/product/:id" element={<ProductDetails />} />
```

---

## Context API Errors

### 9. "Cannot read property 'addToCart' of undefined"

**Error Message:**
```
TypeError: Cannot read property 'addToCart' of undefined
```

**Common Causes:**
- Using useContext outside of Provider
- Provider not wrapping the component tree

**Solutions:**
```jsx
// ✅ Ensure Provider wraps your app
function App() {
  return (
    <CartProvider>
      <YourComponents />
    </CartProvider>
  );
}

// ✅ Add error checking in custom hook
function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
```

---

## Form and Input Errors

### 10. "A component is changing an uncontrolled input to be controlled"

**Error Message:**
```
Warning: A component is changing an uncontrolled input to be controlled.
```

**Common Causes:**
- Input value starts as undefined/null then becomes a string
- Switching between controlled and uncontrolled

**Example:**
```jsx
// ❌ Value starts as undefined
const [email, setEmail] = useState();
<input value={email} onChange={e => setEmail(e.target.value)} />
```

**Solutions:**
```jsx
// ✅ Initialize with empty string
const [email, setEmail] = useState('');
<input value={email} onChange={e => setEmail(e.target.value)} />

// ✅ Or use defaultValue for uncontrolled
<input defaultValue="" onChange={e => setEmail(e.target.value)} />
```

---

### 11. "Form submission causes page reload"

**Problem:**
Form submits and page refreshes, losing state

**Common Causes:**
- Not preventing default form behavior

**Example:**
```jsx
// ❌ Page reloads
const handleSubmit = () => {
  login(email, password);
};

<form onSubmit={handleSubmit}>
```

**Solutions:**
```jsx
// ✅ Prevent default
const handleSubmit = (e) => {
  e.preventDefault();
  login(email, password);
};
```

---

## State Management Errors

### 12. "State not updating immediately"

**Problem:**
State appears not to update after calling setState

**Common Causes:**
- setState is asynchronous
- Trying to use new state value immediately after setting it

**Example:**
```jsx
// ❌ Won't work as expected
const handleClick = () => {
  setCount(count + 1);
  console.log(count); // Still shows old value!
};
```

**Solutions:**
```jsx
// ✅ Use useEffect to react to state changes
useEffect(() => {
  console.log(count); // Shows updated value
}, [count]);

// ✅ Use functional update if new state depends on old
setCount(prevCount => prevCount + 1);
```

---

### 13. "State mutation doesn't trigger re-render"

**Problem:**
Modifying state directly doesn't update the UI

**Example:**
```jsx
// ❌ Mutating state directly
const addItem = (item) => {
  cart.push(item); // Doesn't trigger re-render!
  setCart(cart);
};
```

**Solutions:**
```jsx
// ✅ Create new array
const addItem = (item) => {
  setCart([...cart, item]);
};

// ✅ For objects
const updateUser = (newName) => {
  setUser({ ...user, name: newName });
};
```

---

## Build and Import Errors

### 14. "Module not found: Can't resolve './Component'"

**Error Message:**
```
Module not found: Error: Can't resolve './Component'
```

**Common Causes:**
- Incorrect file path
- Missing file extension
- Case sensitivity issues

**Solutions:**
```jsx
// ❌ Wrong path
import Header from './components/header'; // File is Header.jsx

// ✅ Correct path and case
import Header from './components/Header';

// ✅ Relative path from current file
import Header from '../components/Header';
```

---

### 15. "Attempted import error: 'X' is not exported from 'Y'"

**Error Message:**
```
Attempted import error: 'Header' is not exported from './components/Header'
```

**Common Causes:**
- Named import vs default import mismatch
- Export doesn't exist

**Example:**
```jsx
// File: Header.jsx
export default function Header() {} // Default export

// ❌ Wrong import
import { Header } from './Header'; // Named import

// ✅ Correct import
import Header from './Header'; // Default import
```

**Solutions:**
```jsx
// For default exports
export default MyComponent;
import MyComponent from './MyComponent';

// For named exports
export const MyComponent = () => {};
import { MyComponent } from './MyComponent';

// Multiple named exports
export const Header = () => {};
export const Footer = () => {};
import { Header, Footer } from './components';
```

---

## CSS and Styling Errors

### 16. "className vs class"

**Error Message:**
```
Warning: Invalid DOM property `class`. Did you mean `className`?
```

**Common Causes:**
- Using HTML attribute names instead of JSX equivalents

**Example:**
```jsx
// ❌ HTML attribute
<div class="container">Content</div>

// ✅ JSX attribute
<div className="container">Content</div>
```

**Other common JSX differences:**
- `for` → `htmlFor`
- `onclick` → `onClick`
- `onchange` → `onChange`

---

## localStorage Errors

### 17. "localStorage is not defined"

**Error Message:**
```
ReferenceError: localStorage is not defined
```

**Common Causes:**
- Accessing localStorage during server-side rendering
- Accessing before DOM is ready

**Solutions:**
```jsx
// ✅ Check if localStorage exists
const saveToStorage = (key, value) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

// ✅ Use in useEffect (client-side only)
useEffect(() => {
  const saved = localStorage.getItem('cart');
  if (saved) setCart(JSON.parse(saved));
}, []);
```

---

## Debugging Tips

### General Debugging Strategies

1. **Use console.log strategically**
```jsx
console.log('Props:', props);
console.log('State:', state);
console.log('Rendering component');
```

2. **Check React DevTools**
- Inspect component props and state
- View component hierarchy
- Track re-renders

3. **Verify data structure**
```jsx
console.log('Type:', typeof data);
console.log('Is array:', Array.isArray(data));
console.log('Keys:', Object.keys(data));
```

4. **Add error boundaries**
```jsx
class ErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    console.log('Error:', error, errorInfo);
  }
  
  render() {
    return this.props.children;
  }
}
```

5. **Check network requests**
- Open browser DevTools → Network tab
- Verify API calls and responses

---

## Quick Checklist for Common Issues

When something doesn't work, check:

- [ ] Are all imports correct?
- [ ] Is the component wrapped in necessary Providers?
- [ ] Are hooks called at the top level?
- [ ] Is state being mutated directly?
- [ ] Are event handlers passed correctly (not called immediately)?
- [ ] Do list items have unique keys?
- [ ] Is data loaded before trying to access it?
- [ ] Are you using className instead of class?
- [ ] Is preventDefault() called on form submissions?
- [ ] Are dependencies in useEffect correct?

---

## Getting Help

If you're still stuck:

1. **Read the error message carefully** - It often tells you exactly what's wrong
2. **Check the React documentation** - https://react.dev
3. **Search for the error message** - Someone has likely encountered it before
4. **Use React DevTools** - Inspect component state and props
5. **Simplify the problem** - Remove code until it works, then add back piece by piece
6. **Ask for help** - Provide error message, relevant code, and what you've tried

Remember: Every developer encounters these errors. They're learning opportunities!
