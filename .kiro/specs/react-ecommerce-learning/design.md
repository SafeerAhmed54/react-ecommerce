# Design Document

## Overview

This design document outlines the architecture and implementation approach for a 7-day React learning curriculum centered around building an ecommerce website. The project uses a progressive learning model where each day builds upon previous concepts, introducing new React patterns and best practices incrementally.

The ecommerce application serves as the practical vehicle for learning, featuring product browsing, cart management, authentication, and responsive design. Each module is self-contained yet interconnected, allowing learners to see how React concepts work together in a real-world application.

## Architecture

### Project Structure

```
react-ecommerce-learning/
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Button.jsx
│   │   ├── products/
│   │   │   ├── ProductCard.jsx
│   │   │   ├── ProductList.jsx
│   │   │   └── ProductDetails.jsx
│   │   ├── cart/
│   │   │   ├── CartItem.jsx
│   │   │   ├── CartSummary.jsx
│   │   │   └── Cart.jsx
│   │   └── auth/
│   │       ├── LoginForm.jsx
│   │       └── SignupForm.jsx
│   ├── context/
│   │   ├── CartContext.jsx
│   │   └── AuthContext.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── ProductDetailsPage.jsx
│   │   ├── CartPage.jsx
│   │   ├── LoginPage.jsx
│   │   └── SignupPage.jsx
│   ├── data/
│   │   └── products.js
│   ├── styles/
│   │   └── (CSS files or styled-components)
│   ├── App.jsx
│   └── main.jsx
├── public/
│   └── (images and assets)
└── package.json
```

### Technology Stack

- **React 18+**: Core framework with hooks and modern patterns
- **React Router v6**: Client-side routing
- **Context API**: Global state management for cart and auth
- **Vite**: Build tool for fast development experience
- **CSS Modules or Tailwind CSS**: Styling approach (learner's choice)

### Learning Progression Model

Each day follows a consistent pattern:
1. **Concept Introduction**: Brief overview of the day's React concepts
2. **Code Implementation**: Step-by-step code with inline comments
3. **Detailed Explanation**: Deep dive into how and why the code works
4. **Practical Tasks**: 3-5 hands-on exercises to reinforce learning
5. **Knowledge Quiz**: 5-10 questions to assess understanding

## Components and Interfaces

### Day 1: Foundation Components

**Header Component**
```jsx
// Props interface
{
  cartItemCount: number,
  isLoggedIn: boolean,
  userName: string
}
```

**Footer Component**
```jsx
// Static component with no props
// Displays copyright and links
```

**ProductCard Component (Preview)**
```jsx
// Props interface
{
  id: string,
  name: string,
  price: number,
  image: string,
  onQuickView: function
}
```

### Day 2: Product Listing

**ProductList Component**
```jsx
// State management
const [products, setProducts] = useState([])
const [filter, setFilter] = useState('all')

// Renders grid of ProductCard components
```

**Product Data Structure**
```javascript
{
  id: string,
  name: string,
  price: number,
  description: string,
  image: string,
  category: string,
  inStock: boolean,
  rating: number
}
```

### Day 3: Routing and Details

**React Router Setup**
```jsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/product/:id" element={<ProductDetailsPage />} />
    <Route path="/cart" element={<CartPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/signup" element={<SignupPage />} />
  </Routes>
</BrowserRouter>
```

**ProductDetails Component**
```jsx
// Uses useParams hook to get product ID
// Displays full product information
// Includes "Add to Cart" functionality
```

### Day 4: Cart System

**CartContext Structure**
```jsx
{
  cart: [
    {
      productId: string,
      name: string,
      price: number,
      quantity: number,
      image: string
    }
  ],
  addToCart: (product) => void,
  removeFromCart: (productId) => void,
  updateQuantity: (productId, quantity) => void,
  clearCart: () => void,
  getTotalPrice: () => number,
  getTotalItems: () => number
}
```

**Cart Component**
```jsx
// Consumes CartContext
// Displays list of CartItem components
// Shows CartSummary with total
```

### Day 5: Authentication

**AuthContext Structure**
```jsx
{
  user: {
    id: string,
    name: string,
    email: string
  } | null,
  login: (email, password) => Promise<boolean>,
  signup: (name, email, password) => Promise<boolean>,
  logout: () => void,
  isAuthenticated: boolean
}
```

**LoginForm Component**
```jsx
// Controlled form inputs
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [errors, setErrors] = useState({})

// Validation logic
// Dummy authentication (localStorage)
```

**SignupForm Component**
```jsx
// Similar to LoginForm with additional fields
// Name, email, password, confirm password
// Client-side validation
```

### Day 6: Responsive Design

**Breakpoint Strategy**
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

**Responsive Components**
- Grid layouts that adapt (1 column → 2 columns → 4 columns)
- Hamburger menu for mobile navigation
- Touch-friendly cart controls
- Optimized images for different screen sizes

### Day 7: Deployment

**Build Configuration**
- Production environment variables
- Asset optimization
- Code splitting considerations
- SEO meta tags

## Data Models

### Product Model
```javascript
{
  id: "prod_001",
  name: "Wireless Headphones",
  price: 79.99,
  description: "High-quality wireless headphones with noise cancellation",
  image: "/images/headphones.jpg",
  category: "Electronics",
  inStock: true,
  rating: 4.5,
  reviews: 128
}
```

### Cart Item Model
```javascript
{
  productId: "prod_001",
  name: "Wireless Headphones",
  price: 79.99,
  quantity: 2,
  image: "/images/headphones.jpg"
}
```

### User Model
```javascript
{
  id: "user_001",
  name: "John Doe",
  email: "john@example.com",
  password: "hashed_password" // In dummy auth, stored in localStorage
}
```

## Error Handling

### Form Validation Errors
- Empty field validation
- Email format validation
- Password strength requirements
- Matching password confirmation

### Navigation Errors
- 404 page for invalid routes
- Redirect to home if product not found
- Protected routes (cart/checkout require auth)

### Cart Operations
- Prevent adding out-of-stock items
- Maximum quantity limits
- Clear error messages for failed operations

## Testing Strategy

### Manual Testing Focus
Since this is a learning project, emphasis is on understanding rather than automated testing:

1. **Component Rendering**: Verify each component displays correctly
2. **User Interactions**: Test all buttons, forms, and navigation
3. **State Management**: Verify cart updates, auth state changes
4. **Responsive Behavior**: Test on different screen sizes
5. **Edge Cases**: Empty cart, invalid login, missing products

### Learning Checkpoints
Each day includes:
- **Tasks**: Hands-on modifications to reinforce concepts
- **Quiz**: Multiple choice and short answer questions
- **Code Review**: Self-assessment checklist

## Daily Module Structure

### Module Template

**Day X: [Topic]**

1. **Learning Objectives** (2-3 bullet points)
2. **Concepts Covered** (List of React concepts)
3. **Code Implementation**
   - Step-by-step instructions
   - Complete code snippets
   - Inline comments explaining key parts
4. **Explanation Section**
   - How it works
   - Why we use this approach
   - Common pitfalls to avoid
5. **Practical Tasks** (3-5 exercises)
   - Task 1: Modify existing code
   - Task 2: Add new feature
   - Task 3: Debug challenge
   - Task 4: Styling enhancement
   - Task 5: Bonus challenge
6. **Quiz** (5-10 questions)
   - Multiple choice
   - True/False
   - Short code snippets to analyze
7. **Resources for Further Learning**
   - Official React docs links
   - Recommended articles
   - Video tutorials

## Implementation Notes

### Day 1 Focus
- Keep it simple: basic components, props, JSX
- No state management yet
- Static data
- Emphasis on component structure and reusability

### Day 2 Focus
- Introduce useState hook
- Array methods (map, filter)
- Event handling basics
- Component composition

### Day 3 Focus
- React Router installation and setup
- Link vs anchor tags
- useParams and useNavigate hooks
- Passing state through navigation

### Day 4 Focus
- Context API creation and provider setup
- useContext hook
- Complex state updates
- Derived state (totals, counts)

### Day 5 Focus
- Controlled vs uncontrolled components
- Form submission handling
- Validation patterns
- localStorage for persistence

### Day 6 Focus
- CSS-in-JS or utility-first CSS
- Media queries in React
- Conditional rendering for responsive UI
- Performance considerations (React.memo, useMemo)

### Day 7 Focus
- Build process understanding
- Environment variables
- Deployment platforms comparison
- Post-deployment testing

## Success Criteria

A learner successfully completes the curriculum when they can:
1. Build React components from scratch
2. Manage state using hooks and Context API
3. Implement routing in a single-page application
4. Handle forms and user input
5. Create responsive layouts
6. Deploy a React application to production
7. Explain core React concepts confidently
