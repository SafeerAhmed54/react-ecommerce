# React Hooks Cheat Sheet

This cheat sheet covers all the React hooks used throughout this 7-day ecommerce learning project.

## useState

**Purpose:** Manage component state

**Syntax:**
```jsx
const [state, setState] = useState(initialValue);
```

**Used in:**
- Day 2: Managing product list, filters, and sorting
- Day 5: Form inputs (email, password, validation errors)
- Day 6: UI states (loading, mobile menu toggle)

**Example from Project:**
```jsx
const [products, setProducts] = useState([]);
const [filter, setFilter] = useState('all');
```

**Key Points:**
- State updates trigger re-renders
- Use functional updates when new state depends on previous: `setState(prev => prev + 1)`
- Initial value is only used on first render

---

## useEffect

**Purpose:** Handle side effects (data fetching, subscriptions, DOM manipulation)

**Syntax:**
```jsx
useEffect(() => {
  // Effect code
  return () => {
    // Cleanup (optional)
  };
}, [dependencies]);
```

**Used in:**
- Day 4: Persisting cart to localStorage
- Day 5: Loading user from localStorage on mount
- Day 6: Setting up responsive listeners

**Example from Project:**
```jsx
useEffect(() => {
  localStorage.setItem('cart', JSON.stringify(cart));
}, [cart]);
```

**Key Points:**
- Empty dependency array `[]` = runs once on mount
- No dependency array = runs after every render
- Return cleanup function for subscriptions/timers

---

## useContext

**Purpose:** Access context values without prop drilling

**Syntax:**
```jsx
const value = useContext(MyContext);
```

**Used in:**
- Day 4: Accessing cart state and methods
- Day 5: Accessing auth state and methods

**Example from Project:**
```jsx
const { cart, addToCart, removeFromCart } = useContext(CartContext);
const { user, login, logout } = useContext(AuthContext);
```

**Key Points:**
- Must be used inside a component wrapped by the Provider
- Component re-renders when context value changes
- Prefer creating custom hooks like `useCart()` for cleaner code

---

## useParams

**Purpose:** Access URL parameters from React Router

**Syntax:**
```jsx
const { paramName } = useParams();
```

**Used in:**
- Day 3: Getting product ID from URL

**Example from Project:**
```jsx
const { id } = useParams();
const product = products.find(p => p.id === id);
```

**Key Points:**
- Only works inside components rendered by React Router
- Returns an object with all URL parameters
- Parameters are always strings

---

## useNavigate

**Purpose:** Programmatically navigate between routes

**Syntax:**
```jsx
const navigate = useNavigate();
navigate('/path');
```

**Used in:**
- Day 3: Redirecting after actions
- Day 5: Redirecting after login/signup

**Example from Project:**
```jsx
const navigate = useNavigate();

const handleLogin = async () => {
  const success = await login(email, password);
  if (success) navigate('/');
};
```

**Key Points:**
- Use for navigation triggered by logic (not user clicks)
- Can pass state: `navigate('/path', { state: data })`
- Use `navigate(-1)` to go back

---

## Custom Hooks (Created in Project)

### useCart

**Purpose:** Simplified access to cart context

```jsx
const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
```

### useAuth

**Purpose:** Simplified access to auth context

```jsx
const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
```

---

## Hook Rules (Important!)

1. **Only call hooks at the top level**
   - ❌ Don't call inside loops, conditions, or nested functions
   - ✅ Call at the top of your component

2. **Only call hooks from React functions**
   - ✅ React function components
   - ✅ Custom hooks
   - ❌ Regular JavaScript functions

3. **Custom hooks must start with "use"**
   - ✅ `useCart`, `useAuth`, `useLocalStorage`
   - ❌ `getCart`, `cartHook`

---

## Quick Reference Table

| Hook | Purpose | Returns | Common Use Case |
|------|---------|---------|-----------------|
| `useState` | Local state | `[value, setter]` | Form inputs, toggles |
| `useEffect` | Side effects | Cleanup function | Data fetching, subscriptions |
| `useContext` | Context access | Context value | Global state access |
| `useParams` | URL params | Object | Dynamic routes |
| `useNavigate` | Navigation | Function | Programmatic routing |

---

## Pro Tips

1. **Combine hooks for complex logic:**
```jsx
const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
  fetchData().then(result => {
    setData(result);
    setLoading(false);
  });
}, []);
```

2. **Extract custom hooks for reusability:**
```jsx
const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
```

3. **Optimize with dependency arrays:**
```jsx
// ❌ Runs on every render
useEffect(() => {
  console.log(count);
});

// ✅ Runs only when count changes
useEffect(() => {
  console.log(count);
}, [count]);
```
