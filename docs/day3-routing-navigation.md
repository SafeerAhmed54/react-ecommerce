# Day 3: Product Details Page with Routing

## Learning Objectives

By the end of Day 3, you will be able to:
- Implement client-side routing using React Router
- Navigate between pages using Link components and programmatic navigation
- Extract and use URL parameters with the useParams hook
- Handle navigation state and create dynamic routes

## Concepts Covered

1. **React Router**: Library for handling navigation in React applications
2. **Link Component**: Declarative navigation without page reloads
3. **useParams Hook**: Extracting dynamic parameters from URLs
4. **useNavigate Hook**: Programmatic navigation
5. **Route Configuration**: Setting up routes with dynamic segments
6. **Conditional Rendering**: Handling error states (404 scenarios)

---

## What We Built Today

Today we created a product details page that displays comprehensive information about a single product. Users can click on any product card from the home page and navigate to a dedicated page showing:

- Large product image
- Full product description
- Price and rating
- Stock availability
- Add to Cart button (placeholder for Day 4)

We also implemented proper error handling for when a product doesn't exist.

---

## Understanding React Router

### Why Do We Need React Router?

In traditional multi-page websites, clicking a link causes the browser to request a new HTML page from the server, resulting in a full page reload. This is slow and disrupts the user experience.

React Router enables **client-side routing**, which means:
- Navigation happens instantly without page reloads
- The URL changes, but the page doesn't refresh
- Only the necessary components re-render
- Browser history works correctly (back/forward buttons)

### Installing React Router

```bash
npm install react-router-dom
```

---

## Key Concepts Explained

### 1. BrowserRouter

The `BrowserRouter` component wraps your entire application and provides routing context. It uses the HTML5 history API to keep your UI in sync with the URL.

```jsx
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      {/* Your app components */}
    </BrowserRouter>
  )
}
```

**Important**: You only need ONE `BrowserRouter` at the root of your application.

### 2. Routes and Route

The `Routes` component contains all your route definitions. Each `Route` specifies a path and the component to render when that path matches.

```jsx
import { Routes, Route } from 'react-router-dom'

<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="/product/:id" element={<ProductDetails />} />
</Routes>
```

**Dynamic Routes**: The `:id` syntax creates a dynamic segment. Any value in that position becomes accessible via `useParams`.

### 3. Link Component

The `Link` component creates navigation links that don't cause page reloads.

```jsx
import { Link } from 'react-router-dom'

// Instead of <a href="/product/123">
<Link to="/product/123">View Product</Link>
```

**Why not use `<a>` tags?**
- `<a>` tags cause full page reloads
- `Link` components use client-side navigation
- `Link` preserves application state
- `Link` is faster and provides better UX

### 4. useParams Hook

The `useParams` hook extracts dynamic parameters from the current URL.

```jsx
import { useParams } from 'react-router-dom'

function ProductDetailsPage() {
  const { id } = useParams()  // Gets 'id' from /product/:id
  
  // If URL is /product/prod_001, then id = "prod_001"
  const product = products.find(p => p.id === id)
  
  return <div>{product.name}</div>
}
```

### 5. useNavigate Hook

The `useNavigate` hook provides programmatic navigation (navigating via code, not clicks).

```jsx
import { useNavigate } from 'react-router-dom'

function ProductDetailsPage() {
  const navigate = useNavigate()
  
  const goBack = () => {
    navigate('/')  // Navigate to home page
  }
  
  const goToProduct = (productId) => {
    navigate(`/product/${productId}`)  // Navigate to another product
  }
  
  return <button onClick={goBack}>Back to Home</button>
}
```

**Common navigate patterns**:
- `navigate('/')` - Go to home
- `navigate('/cart')` - Go to cart
- `navigate(-1)` - Go back one page (like browser back button)
- `navigate(-2)` - Go back two pages

---

## Code Walkthrough

### App.jsx - Route Configuration

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ProductDetailsPage from './pages/ProductDetailsPage'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
```

**What's happening**:
1. `BrowserRouter` wraps everything to enable routing
2. `Routes` contains all route definitions
3. `/` renders the Home page
4. `/product/:id` renders ProductDetailsPage with dynamic `id` parameter

### ProductCard.jsx - Navigation with Link

```jsx
import { Link } from 'react-router-dom'

function ProductCard({ id, name, price, image }) {
  return (
    <div className="product-card">
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>${price}</p>
      
      {/* Link to product details page */}
      <Link to={`/product/${id}`} className="btn-view-details">
        View Details
      </Link>
    </div>
  )
}
```

**What's happening**:
1. We import `Link` from react-router-dom
2. We use template literals to create dynamic URLs: `/product/${id}`
3. Clicking the link navigates to the product details page
4. The `className` styles the Link as a button

### ProductDetailsPage.jsx - Using URL Parameters

```jsx
import { useParams, useNavigate } from 'react-router-dom'
import { products } from '../data/products'

function ProductDetailsPage() {
  // Extract the 'id' parameter from the URL
  const { id } = useParams()
  const navigate = useNavigate()
  
  // Find the product with matching ID
  const product = products.find(p => p.id === id)
  
  // Handle product not found
  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Product Not Found</h2>
        <button onClick={() => navigate('/')}>
          Back to Home
        </button>
      </div>
    )
  }
  
  // Render product details
  return (
    <div className="product-details-page">
      <img src={product.image} alt={product.name} />
      <h1>{product.name}</h1>
      <p className="price">${product.price}</p>
      <p className="description">{product.description}</p>
      <button onClick={() => alert('Cart feature coming in Day 4!')}>
        Add to Cart
      </button>
    </div>
  )
}
```

**What's happening**:
1. `useParams()` extracts the `id` from the URL
2. We search the products array for a matching product
3. If no product is found, we show an error message
4. We use `navigate('/')` to programmatically return to home
5. If product exists, we display all its details

---

## Common Patterns and Best Practices

### 1. Always Handle Missing Data

When using dynamic routes, always check if the data exists:

```jsx
const product = products.find(p => p.id === id)

if (!product) {
  return <NotFoundMessage />
}

// Safe to use product here
return <div>{product.name}</div>
```

### 2. Use Template Literals for Dynamic URLs

```jsx
// Good
<Link to={`/product/${productId}`}>View</Link>

// Avoid string concatenation
<Link to={"/product/" + productId}>View</Link>
```

### 3. Style Links as Buttons

Links can be styled to look like buttons using CSS:

```css
.btn-view-details {
  display: block;
  padding: 0.75rem;
  background-color: #3498db;
  color: white;
  text-decoration: none;
  text-align: center;
  border-radius: 4px;
}
```

### 4. Use Semantic Navigation

- Use `Link` for user-initiated navigation (clicks)
- Use `navigate` for programmatic navigation (after form submission, etc.)

---

## Practical Tasks

Now it's your turn to practice! Complete these tasks to reinforce your learning:

### Task 1: Add Breadcrumb Navigation

Add a breadcrumb navigation at the top of the ProductDetailsPage showing: Home > Category > Product Name

**Hints**:
- Create a new component called `Breadcrumb.jsx`
- Use `Link` components for Home and Category
- Display the current product name as plain text (not a link)
- Style it to appear above the product details

**Example**:
```
Home > Electronics > Wireless Headphones
```

### Task 2: Implement Related Products Section

At the bottom of the ProductDetailsPage, show 4 related products from the same category.

**Hints**:
- Filter products by matching category
- Exclude the current product
- Limit to 4 products using `.slice(0, 4)`
- Reuse the `ProductCard` component
- Add a section title "Related Products"

### Task 3: Add a Back Button

Add a "Back to Products" button at the top of the ProductDetailsPage that navigates back to the home page.

**Hints**:
- Use the `useNavigate` hook
- Create a button with an onClick handler
- Call `navigate('/')` or `navigate(-1)`
- Style it to match your design

### Task 4: Create a 404 Not Found Page

Create a dedicated NotFoundPage component for invalid routes.

**Hints**:
- Create `NotFoundPage.jsx` in the pages folder
- Add a route with `path="*"` (catches all unmatched routes)
- Display a friendly message and a link back to home
- Add some creative styling or an illustration

**Route example**:
```jsx
<Route path="*" element={<NotFoundPage />} />
```

### Task 5: Add Product Image Gallery

Enhance the ProductDetailsPage to show multiple product images (simulate with the same image for now).

**Hints**:
- Create a state variable for the selected image
- Display thumbnails below the main image
- Clicking a thumbnail updates the main image
- Add hover effects to thumbnails
- Use an array of image URLs (can duplicate the same URL for practice)

---

## Quiz: Test Your Knowledge

### Question 1
What is the purpose of React Router in a React application?

A) To manage component state  
B) To enable client-side navigation without page reloads  
C) To fetch data from APIs  
D) To style components  

**Answer**: B

---

### Question 2
Which hook would you use to extract the `id` parameter from the URL `/product/:id`?

A) useState  
B) useEffect  
C) useParams  
D) useNavigate  

**Answer**: C

---

### Question 3
What's the difference between `<Link>` and `<a>` tags?

A) There is no difference  
B) Link causes page reloads, <a> doesn't  
C) Link enables client-side navigation, <a> causes full page reloads  
D) Link only works with external URLs  

**Answer**: C

---

### Question 4
How do you navigate programmatically to the home page?

A) `window.location = '/'`  
B) `navigate('/')`  
C) `<Link to="/" />`  
D) `router.push('/')`  

**Answer**: B

---

### Question 5
What does the following route match? `<Route path="/product/:id" />`

A) Only /product/id  
B) /product followed by any value  
C) /product with an optional id  
D) Only /product/123  

**Answer**: B

---

### Question 6
Which component must wrap your entire application to enable routing?

A) Routes  
B) Route  
C) BrowserRouter  
D) Link  

**Answer**: C

---

### Question 7
What does `navigate(-1)` do?

A) Navigates to the first page  
B) Goes back one page in history  
C) Navigates to page with id -1  
D) Causes an error  

**Answer**: B

---

### Question 8
How do you create a dynamic URL in a Link component?

A) `<Link to="/product/" + id>`  
B) `<Link to={/product/${id}}>`  
C) `<Link to={`/product/${id}`}>`  
D) `<Link to="/product/:id">`  

**Answer**: C

---

## Common Mistakes to Avoid

### 1. Forgetting to Import Components
```jsx
// ❌ Wrong - forgot to import
<Route path="/product/:id" element={<ProductDetailsPage />} />

// ✅ Correct
import ProductDetailsPage from './pages/ProductDetailsPage'
<Route path="/product/:id" element={<ProductDetailsPage />} />
```

### 2. Using <a> Instead of <Link>
```jsx
// ❌ Wrong - causes page reload
<a href="/product/123">View Product</a>

// ✅ Correct - client-side navigation
<Link to="/product/123">View Product</Link>
```

### 3. Not Handling Missing Data
```jsx
// ❌ Wrong - will crash if product is undefined
const product = products.find(p => p.id === id)
return <div>{product.name}</div>

// ✅ Correct - handles missing product
const product = products.find(p => p.id === id)
if (!product) return <div>Not Found</div>
return <div>{product.name}</div>
```

### 4. Multiple BrowserRouters
```jsx
// ❌ Wrong - only need one BrowserRouter
function App() {
  return (
    <BrowserRouter>
      <BrowserRouter>  {/* Don't nest! */}
        <Routes>...</Routes>
      </BrowserRouter>
    </BrowserRouter>
  )
}

// ✅ Correct - one BrowserRouter at the root
function App() {
  return (
    <BrowserRouter>
      <Routes>...</Routes>
    </BrowserRouter>
  )
}
```

---

## Resources for Further Learning

### Official Documentation
- [React Router Documentation](https://reactrouter.com/)
- [React Router Tutorial](https://reactrouter.com/en/main/start/tutorial)

### Recommended Articles
- [Understanding Client-Side Routing](https://blog.webdevsimplified.com/2022-07/react-router/)
- [React Router v6 Guide](https://www.robinwieruch.de/react-router/)

### Video Tutorials
- [React Router 6 - Complete Guide](https://www.youtube.com/watch?v=Ul3y1LXxzdU)
- [React Router Crash Course](https://www.youtube.com/watch?v=Law7wfdg_ls)

---

## What's Next?

Congratulations on completing Day 3! You now understand how to:
- Set up routing in a React application
- Navigate between pages using Link and useNavigate
- Extract URL parameters with useParams
- Handle dynamic routes and error states

### Coming Up in Day 4: Shopping Cart with Context API

Tomorrow we'll implement a fully functional shopping cart system using React's Context API. You'll learn:
- Creating and using Context for global state
- Managing complex state across multiple components
- Adding, removing, and updating cart items
- Calculating totals and managing cart persistence

Get ready to level up your state management skills!

---

## Checklist

Before moving to Day 4, make sure you can:

- [ ] Explain what React Router does and why it's useful
- [ ] Set up routes using BrowserRouter, Routes, and Route
- [ ] Navigate using Link components
- [ ] Extract URL parameters with useParams
- [ ] Navigate programmatically with useNavigate
- [ ] Handle missing data and error states
- [ ] Create dynamic routes with parameters
- [ ] Understand the difference between Link and <a> tags

If you're comfortable with all these concepts, you're ready for Day 4!
