# Day 1: Foundation Components and React Basics

## Learning Objectives

By the end of Day 1, you will:
- Understand React component structure and JSX syntax
- Learn how to create reusable components
- Master passing data through props
- Build a foundation for the ecommerce application

## Concepts Covered

1. **React Components**: Building blocks of React applications
2. **JSX**: JavaScript XML syntax for writing component markup
3. **Props**: Passing data from parent to child components
4. **Component Composition**: Combining components to build UIs
5. **Basic Styling**: Applying CSS to React components

---

## Code Implementation

### What We Built Today

We created three foundational components for our ecommerce application:

1. **Header Component** - Navigation bar with cart and auth links
2. **Footer Component** - Static footer with site information
3. **ProductCard Component** - Reusable card to display products

### Component Structure

All components follow this basic structure:

```jsx
import './ComponentName.css'

function ComponentName(props) {
  return (
    <div>
      {/* JSX markup goes here */}
    </div>
  )
}

export default ComponentName
```

---

## Detailed Explanation

### 1. Understanding JSX

JSX looks like HTML but it's actually JavaScript. Key differences:

- Use `className` instead of `class`
- Use `htmlFor` instead of `for`
- All tags must be closed (even `<img />`)
- JavaScript expressions go inside curly braces `{}`

**Example from our Header:**
```jsx
<h1>ReactShop</h1>  {/* This is JSX */}
{cartItemCount > 0 && (  /* JavaScript expression */
  <span className="cart-badge">{cartItemCount}</span>
)}
```

### 2. Props: Passing Data to Components

Props are like function parameters. They let you pass data from parent to child components.

**In the Header component:**
```jsx
function Header({ cartItemCount = 0, isLoggedIn = false, userName = '' }) {
  // cartItemCount, isLoggedIn, and userName are props
  // The = 0, = false, = '' are default values
}
```

**Using the Header component:**
```jsx
<Header 
  cartItemCount={5} 
  isLoggedIn={true} 
  userName="John"
/>
```

### 3. Conditional Rendering

Show different content based on conditions:

```jsx
{isLoggedIn ? (
  <span>Hello, {userName}</span>
) : (
  <Link to="/login">Login</Link>
)}
```

This is a ternary operator: `condition ? ifTrue : ifFalse`

### 4. Component Reusability

The ProductCard component can be reused for any product:

```jsx
<ProductCard 
  id="1" 
  name="Laptop" 
  price={999.99} 
  image="/laptop.jpg" 
/>

<ProductCard 
  id="2" 
  name="Phone" 
  price={699.99} 
  image="/phone.jpg" 
/>
```

Same component, different data!

### 5. Event Handling

React uses camelCase for event handlers:

```jsx
<button onClick={handleViewDetails}>
  View Details
</button>
```

The function is defined in the component:
```jsx
const handleViewDetails = () => {
  console.log(`View details for product: ${id}`)
}
```

---

## Common Pitfalls to Avoid

1. **Forgetting to import React** (in older versions)
2. **Using `class` instead of `className`**
3. **Not closing self-closing tags**: `<img>` should be `<img />`
4. **Forgetting curly braces for JavaScript**: `<div>{price}</div>` not `<div>price</div>`
5. **Mutating props**: Props are read-only, never change them directly

---

## Practical Tasks

Complete these tasks to reinforce your learning:

### Task 1: Modify the Header Component
Add a search icon next to the cart icon in the Header. Create a simple search icon using an emoji or text.

**Hint:** Add it in the `header-nav` section before the cart link.

### Task 2: Create a New Component
Create a `Button` component in `src/components/common/Button.jsx` that accepts these props:
- `text` (string): Button text
- `onClick` (function): Click handler
- `variant` (string): "primary" or "secondary" for different styles

### Task 3: Pass Props to ProductCard
Update the ProductCard to accept an additional prop called `rating` (number 1-5). Display it as stars or a number below the price.

### Task 4: Style the Footer
Modify `Footer.css` to change the background color to a dark blue (`#1a252f`) and make the links turn yellow on hover.

### Task 5: Add Prop Validation
Research and add PropTypes to the Header component to validate that:
- `cartItemCount` is a number
- `isLoggedIn` is a boolean
- `userName` is a string

**Hint:** You'll need to install and import `prop-types` package.

---

## Quiz: Test Your Knowledge

### Question 1
What does JSX stand for?
- A) JavaScript XML
- B) Java Syntax Extension
- C) JavaScript Extension
- D) JSON XML

**Answer:** A) JavaScript XML

---

### Question 2
Which of the following is the correct way to use a CSS class in JSX?
- A) `<div class="header">`
- B) `<div className="header">`
- C) `<div style="header">`
- D) `<div css="header">`

**Answer:** B) `<div className="header">`

---

### Question 3
What are props in React?
- A) Properties that allow you to pass data from parent to child components
- B) A way to style components
- C) Functions that handle events
- D) State management tools

**Answer:** A) Properties that allow you to pass data from parent to child components

---

### Question 4
How do you embed JavaScript expressions in JSX?
- A) Using square brackets `[]`
- B) Using curly braces `{}`
- C) Using parentheses `()`
- D) Using quotes `""`

**Answer:** B) Using curly braces `{}`

---

### Question 5
What is wrong with this code?
```jsx
<img src="photo.jpg" alt="Photo">
```
- A) Nothing, it's correct
- B) The img tag must be self-closing: `<img src="photo.jpg" alt="Photo" />`
- C) Should use `image` instead of `img`
- D) Missing className attribute

**Answer:** B) The img tag must be self-closing

---

### Question 6
Which statement about props is TRUE?
- A) Props can be modified inside the child component
- B) Props are optional and components don't need them
- C) Props are read-only and cannot be changed by the child component
- D) Props can only be strings

**Answer:** C) Props are read-only and cannot be changed by the child component

---

### Question 7
What does this code do?
```jsx
{isLoggedIn && <span>Welcome!</span>}
```
- A) Always shows "Welcome!"
- B) Shows "Welcome!" only if isLoggedIn is true
- C) Shows "Welcome!" only if isLoggedIn is false
- D) Causes an error

**Answer:** B) Shows "Welcome!" only if isLoggedIn is true

---

### Question 8
How do you handle a button click in React?
- A) `<button onclick="handleClick()">`
- B) `<button onClick={handleClick}>`
- C) `<button click={handleClick}>`
- D) `<button onPress={handleClick}>`

**Answer:** B) `<button onClick={handleClick}>`

---

## Resources for Further Learning

### Official Documentation
- [React Documentation - Components and Props](https://react.dev/learn/passing-props-to-a-component)
- [React Documentation - JSX](https://react.dev/learn/writing-markup-with-jsx)

### Recommended Articles
- [Thinking in React](https://react.dev/learn/thinking-in-react)
- [Understanding Props vs State](https://react.dev/learn/state-a-components-memory)

### Video Tutorials
- [React Tutorial for Beginners](https://www.youtube.com/watch?v=SqcY0GlETPk) by Programming with Mosh
- [React Props Explained](https://www.youtube.com/watch?v=PHaECbrKgs0) by Web Dev Simplified

---

## What's Next?

In **Day 2**, we'll learn about:
- State management with the `useState` hook
- Rendering lists of data
- Filtering and sorting products
- Event handling in depth

Make sure you're comfortable with today's concepts before moving forward!

---

## Summary

Today you learned:
✅ How to create React components
✅ What JSX is and how to use it
✅ How to pass data using props
✅ How to compose components together
✅ Basic event handling in React

Great job completing Day 1! 🎉
