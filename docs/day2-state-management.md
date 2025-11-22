# Day 2: Product Listing with State Management

## Learning Objectives

By the end of this module, you will be able to:
- Use the `useState` hook to manage component state
- Render lists of components using array methods
- Handle user events and update state accordingly
- Implement filtering and sorting functionality
- Understand the importance of keys in React lists

## Concepts Covered

### 1. The useState Hook

The `useState` hook is React's way of adding state to functional components. State is data that can change over time and causes the component to re-render when updated.

**Basic Syntax:**
```jsx
const [stateVariable, setStateFunction] = useState(initialValue)
```

**Example from ProductList:**
```jsx
const [selectedCategory, setSelectedCategory] = useState('all')
const [sortBy, setSortBy] = useState('default')
```

- `selectedCategory` and `sortBy` are state variables that hold current values
- `setSelectedCategory` and `setSortBy` are functions to update those values
- `'all'` and `'default'` are the initial values

**Key Points:**
- State is preserved between re-renders
- Updating state triggers a re-render
- Never modify state directly - always use the setter function
- State updates are asynchronous

### 2. Array Mapping and List Rendering

React uses JavaScript's `map()` method to transform arrays of data into arrays of components.

**Example from ProductList:**
```jsx
{sortedProducts.map(product => (
  <ProductCard
    key={product.id}
    id={product.id}
    name={product.name}
    price={product.price}
    image={product.image}
  />
))}
```

**Why use map()?**
- Transforms data into JSX elements
- Creates a component for each item in the array
- Keeps code DRY (Don't Repeat Yourself)

### 3. The Importance of Keys

Every element in a list needs a unique `key` prop. Keys help React identify which items have changed, been added, or removed.

**Good Practice:**
```jsx
<ProductCard key={product.id} {...props} />
```

**Bad Practice:**
```jsx
<ProductCard key={index} {...props} />  // Using array index
```

**Why keys matter:**
- Improves performance by minimizing DOM updates
- Prevents bugs with component state
- Should be stable, unique, and predictable

### 4. Event Handling

Event handlers are functions that respond to user interactions like clicks, typing, or form submissions.

**Example from ProductList:**
```jsx
const handleCategoryChange = (e) => {
  setSelectedCategory(e.target.value)
}

<select onChange={handleCategoryChange}>
  {/* options */}
</select>
```

**Key Concepts:**
- Event handlers receive an event object (`e`)
- `e.target` refers to the element that triggered the event
- `e.target.value` gets the current value of form inputs
- Use arrow functions or bind to preserve `this` context

### 5. Filtering and Sorting Arrays

**Filtering:**
```jsx
const filteredProducts = selectedCategory === 'all'
  ? products
  : products.filter(product => product.category === selectedCategory)
```

The `filter()` method creates a new array with elements that pass a test.

**Sorting:**
```jsx
const sortedProducts = [...filteredProducts].sort((a, b) => {
  switch (sortBy) {
    case 'price-low':
      return a.price - b.price
    case 'price-high':
      return b.price - a.price
    default:
      return 0
  }
})
```

**Important:** We use the spread operator `[...]` to create a copy before sorting because `sort()` mutates the original array.

### 6. Conditional Rendering

Display different UI based on conditions:

```jsx
{sortedProducts.length > 0 ? (
  sortedProducts.map(product => <ProductCard {...product} />)
) : (
  <p>No products found</p>
)}
```

## Code Walkthrough

### Product Data Structure (products.js)

```javascript
export const products = [
  {
    id: "prod_001",
    name: "Wireless Headphones",
    price: 79.99,
    description: "High-quality wireless headphones...",
    image: "https://...",
    category: "Electronics",
    inStock: true,
    rating: 4.5
  },
  // ... more products
]
```

This is a simple JavaScript array exported for use in components. In a real application, this data would come from an API.

### ProductList Component Breakdown

**1. State Initialization:**
```jsx
const [selectedCategory, setSelectedCategory] = useState('all')
const [sortBy, setSortBy] = useState('default')
```

**2. Derive Categories:**
```jsx
const categories = ['all', ...new Set(products.map(product => product.category))]
```
- `products.map(product => product.category)` extracts all categories
- `new Set(...)` removes duplicates
- `['all', ...]` adds "all" option at the beginning

**3. Filter Products:**
```jsx
const filteredProducts = selectedCategory === 'all'
  ? products
  : products.filter(product => product.category === selectedCategory)
```

**4. Sort Products:**
```jsx
const sortedProducts = [...filteredProducts].sort((a, b) => {
  // sorting logic
})
```

**5. Render UI:**
```jsx
return (
  <div className="product-list-container">
    {/* Controls */}
    {/* Product Grid */}
  </div>
)
```

### Home Page Component

The Home page is a simple container that:
1. Imports the product data
2. Renders a hero section with welcome text
3. Passes the products array to ProductList

```jsx
function Home() {
  return (
    <div className="home-page">
      <section className="hero-section">
        <h1>Welcome to React E-Commerce</h1>
        <p>Discover amazing products...</p>
      </section>
      
      <section className="catalog-section">
        <h2>Our Products</h2>
        <ProductList products={products} />
      </section>
    </div>
  )
}
```

## Common Pitfalls to Avoid

1. **Mutating State Directly**
   ```jsx
   // ❌ Wrong
   selectedCategory = 'Electronics'
   
   // ✅ Correct
   setSelectedCategory('Electronics')
   ```

2. **Forgetting Keys in Lists**
   ```jsx
   // ❌ Wrong
   {products.map(product => <ProductCard {...product} />)}
   
   // ✅ Correct
   {products.map(product => <ProductCard key={product.id} {...product} />)}
   ```

3. **Mutating Arrays Before Sorting**
   ```jsx
   // ❌ Wrong - mutates original array
   const sorted = products.sort(...)
   
   // ✅ Correct - creates a copy first
   const sorted = [...products].sort(...)
   ```

4. **Not Handling Empty States**
   ```jsx
   // ❌ Wrong - shows nothing if empty
   {products.map(product => <ProductCard {...product} />)}
   
   // ✅ Correct - shows message if empty
   {products.length > 0 ? (
     products.map(product => <ProductCard {...product} />)
   ) : (
     <p>No products available</p>
   )}
   ```

## Practical Tasks

Complete these tasks to reinforce your learning:

### Task 1: Add Search Filter
Add a text input that filters products by name as the user types.

**Hints:**
- Add a new state variable for the search term
- Use `filter()` to check if product name includes the search term
- Use `toLowerCase()` for case-insensitive search

### Task 2: Implement Stock Status Filter
Add a checkbox to show only in-stock products.

**Hints:**
- Add a boolean state variable for "show in-stock only"
- Filter products based on the `inStock` property
- Use a checkbox input with `checked` and `onChange` props

### Task 3: Add Category Badges
Display category badges on each ProductCard.

**Hints:**
- Modify ProductCard to accept a `category` prop
- Add a styled span or div to display the category
- Use different colors for different categories

### Task 4: Create Loading State
Simulate loading products with a loading indicator.

**Hints:**
- Add a `loading` state variable
- Use `setTimeout` to simulate a delay
- Show a loading spinner or message while loading is true

### Task 5: Add Product Count Display
Show the number of products currently displayed after filtering.

**Hints:**
- Use the length of the filtered/sorted array
- Display it above or below the product grid
- Update it dynamically as filters change

## Quiz

Test your understanding with these questions:

### Question 1
What does the `useState` hook return?
- A) A single value
- B) An array with two elements: the state value and a setter function
- C) An object with state and setState properties
- D) A function to update state

**Answer:** B

### Question 2
Why is it important to use keys when rendering lists in React?
- A) To make the code look professional
- B) To help React identify which items have changed
- C) Keys are optional and not really necessary
- D) To prevent console warnings only

**Answer:** B

### Question 3
What's wrong with this code?
```jsx
const [count, setCount] = useState(0)
count = count + 1
```
- A) Nothing, it's correct
- B) Should use `setCount(count + 1)` instead
- C) useState should be called with a function
- D) count should be declared with let

**Answer:** B

### Question 4
Which array method creates a new array with elements that pass a test?
- A) map()
- B) filter()
- C) reduce()
- D) forEach()

**Answer:** B

### Question 5
What does the spread operator `[...array]` do?
- A) Deletes the array
- B) Creates a shallow copy of the array
- C) Sorts the array
- D) Reverses the array

**Answer:** B

### Question 6
In event handlers, what does `e.target.value` represent?
- A) The event type
- B) The current value of the input element
- C) The previous value
- D) The element's ID

**Answer:** B

### Question 7
What happens when you call a state setter function like `setCount(5)`?
- A) The state updates immediately
- B) The component re-renders immediately
- C) React schedules a re-render with the new state
- D) Nothing happens until you refresh the page

**Answer:** C

### Question 8
Why do we create a copy before sorting an array?
```jsx
const sorted = [...products].sort(...)
```
- A) To improve performance
- B) Because sort() mutates the original array
- C) To make the code more readable
- D) It's not necessary, just a convention

**Answer:** B

## Resources for Further Learning

- [React Docs: Using the State Hook](https://react.dev/reference/react/useState)
- [React Docs: Rendering Lists](https://react.dev/learn/rendering-lists)
- [React Docs: Responding to Events](https://react.dev/learn/responding-to-events)
- [MDN: Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
- [MDN: Array.prototype.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
- [MDN: Array.prototype.sort()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)

## Next Steps

In Day 3, we'll learn about:
- React Router for navigation
- Dynamic routing with URL parameters
- Creating a product details page
- Navigating between pages programmatically

Great job completing Day 2! You now understand how to manage state and render dynamic lists in React. 🎉
