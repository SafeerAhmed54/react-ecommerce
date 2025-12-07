# React Glossary

A comprehensive glossary of React terms used throughout this 7-day ecommerce learning project.

---

## A

### Arrow Function
A concise syntax for writing functions in JavaScript, commonly used in React for event handlers and callbacks.
```jsx
const handleClick = () => console.log('clicked');
```

---

## B

### Breakpoint
A specific screen width at which the layout changes to accommodate different device sizes (mobile, tablet, desktop).

---

## C

### Component
A reusable, self-contained piece of UI in React. Can be a function or class that returns JSX.
```jsx
function Header() {
  return <header>My App</header>;
}
```

### Component Composition
Building complex UIs by combining smaller, simpler components together.

### Conditional Rendering
Displaying different UI elements based on certain conditions.
```jsx
{isLoggedIn ? <Dashboard /> : <Login />}
```

### Context
A way to pass data through the component tree without manually passing props at every level.

### Context API
React's built-in solution for managing global state and avoiding prop drilling.

### Controlled Component
A form input whose value is controlled by React state.
```jsx
<input value={name} onChange={e => setName(e.target.value)} />
```

### CSS Modules
A CSS file where class names are scoped locally by default, preventing naming conflicts.

---

## D

### Dependency Array
The second argument to `useEffect` that determines when the effect runs.
```jsx
useEffect(() => {}, [dependency1, dependency2]);
```

### Destructuring
Extracting values from objects or arrays into distinct variables.
```jsx
const { name, price } = product;
const [first, second] = array;
```

### Dynamic Route
A route that includes variable segments, like `/product/:id`.

---

## E

### Event Handler
A function that responds to user interactions like clicks, form submissions, or keyboard input.
```jsx
const handleClick = (e) => {
  e.preventDefault();
  // Handle event
};
```

### Event Object
An object passed to event handlers containing information about the event (e.g., `e.target`, `e.preventDefault()`).

---

## F

### Fragment
A way to group multiple elements without adding extra DOM nodes.
```jsx
<>
  <Header />
  <Main />
</>
```

### Functional Component
A JavaScript function that returns JSX. The modern way to write React components.

---

## H

### Hook
A special function that lets you "hook into" React features like state and lifecycle methods from function components.

### Higher-Order Component (HOC)
A function that takes a component and returns a new component with additional props or behavior. (Not used in this project, but good to know)

---

## I

### Immutability
The practice of not modifying data directly, but creating new copies with changes. Essential for React state updates.
```jsx
// ❌ Mutating
array.push(item);

// ✅ Immutable
setArray([...array, item]);
```

### Import/Export
ES6 syntax for sharing code between files.
```jsx
// Export
export const MyComponent = () => {};

// Import
import { MyComponent } from './MyComponent';
```

---

## J

### JSX (JavaScript XML)
A syntax extension that allows writing HTML-like code in JavaScript.
```jsx
const element = <h1>Hello, world!</h1>;
```

---

## K

### Key Prop
A special prop used when rendering lists to help React identify which items have changed.
```jsx
{products.map(product => (
  <ProductCard key={product.id} {...product} />
))}
```

---

## L

### Lazy Loading
Loading components or resources only when they're needed, improving initial load time.

### Lifecycle
The series of phases a component goes through: mounting, updating, and unmounting.

### Link Component
React Router's component for navigation that doesn't reload the page.
```jsx
<Link to="/about">About</Link>
```

---

## M

### Map Function
An array method used to transform each item in an array, commonly used to render lists in React.
```jsx
{products.map(product => <ProductCard key={product.id} product={product} />)}
```

### Media Query
CSS technique for applying styles based on device characteristics like screen width.

---

## N

### Named Export
Exporting multiple items from a module by name.
```jsx
export const Header = () => {};
export const Footer = () => {};
```

### Navigation
Moving between different pages or views in a single-page application.

---

## P

### Props (Properties)
Data passed from a parent component to a child component.
```jsx
<ProductCard name="Laptop" price={999} />
```

### Props Drilling
Passing props through multiple levels of components to reach a deeply nested component. Context API solves this.

### Provider
A component that makes context values available to all child components.
```jsx
<CartProvider>
  <App />
</CartProvider>
```

---

## R

### Re-render
When React updates the DOM because state or props have changed.

### React Router
A library for handling navigation and routing in React applications.

### Responsive Design
Designing UIs that adapt to different screen sizes and devices.

### Route
A mapping between a URL path and a component to render.
```jsx
<Route path="/products" element={<Products />} />
```

---

## S

### Single Page Application (SPA)
A web app that loads a single HTML page and dynamically updates content without full page reloads.

### State
Data that changes over time and affects what a component renders.

### State Lifting
Moving state to a common parent component so multiple children can share it.

### Spread Operator
JavaScript syntax (`...`) for expanding arrays or objects.
```jsx
const newArray = [...oldArray, newItem];
const newObj = { ...oldObj, newProp: value };
```

### Styled Components
A library for writing CSS in JavaScript (CSS-in-JS approach).

---

## T

### Ternary Operator
A concise way to write conditional expressions.
```jsx
{isLoading ? <Spinner /> : <Content />}
```

### Template Literal
String syntax using backticks that allows embedded expressions.
```jsx
const greeting = `Hello, ${name}!`;
```

---

## U

### Uncontrolled Component
A form input that manages its own state internally, accessed via refs. (Not recommended for most cases)

### useEffect
A hook for performing side effects in function components.

### useState
A hook for adding state to function components.

### useContext
A hook for accessing context values.

### useParams
A React Router hook for accessing URL parameters.

### useNavigate
A React Router hook for programmatic navigation.

---

## V

### Virtual DOM
React's lightweight representation of the actual DOM, used to optimize updates.

### Vite
A modern build tool that provides fast development experience with hot module replacement.

---

## W

### Webpack
A module bundler (alternative to Vite) that processes and bundles JavaScript files and assets.

---

## Common Acronyms

- **API**: Application Programming Interface
- **CSS**: Cascading Style Sheets
- **DOM**: Document Object Model
- **ES6**: ECMAScript 2015 (modern JavaScript)
- **HOC**: Higher-Order Component
- **HTML**: HyperText Markup Language
- **JSX**: JavaScript XML
- **NPM**: Node Package Manager
- **SPA**: Single Page Application
- **UI**: User Interface
- **URL**: Uniform Resource Locator

---

## React-Specific Patterns

### Component Pattern
```jsx
function MyComponent({ prop1, prop2 }) {
  const [state, setState] = useState(initialValue);
  
  useEffect(() => {
    // Side effects
  }, [dependencies]);
  
  return <div>{/* JSX */}</div>;
}
```

### Context Pattern
```jsx
// Create context
const MyContext = createContext();

// Provider component
function MyProvider({ children }) {
  const [state, setState] = useState();
  return (
    <MyContext.Provider value={{ state, setState }}>
      {children}
    </MyContext.Provider>
  );
}

// Consumer hook
function useMyContext() {
  return useContext(MyContext);
}
```

### Custom Hook Pattern
```jsx
function useCustomHook(initialValue) {
  const [value, setValue] = useState(initialValue);
  
  // Custom logic
  
  return [value, setValue];
}
```

---

## Quick Tips

- **Component names** must start with a capital letter
- **Hook names** must start with "use"
- **Props** are read-only (never modify them directly)
- **State** should be treated as immutable
- **Keys** should be stable, unique, and not array indices when possible
