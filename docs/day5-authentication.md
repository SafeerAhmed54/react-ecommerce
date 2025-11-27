# Day 5: Authentication with Forms

## Learning Objectives
- Create controlled form components in React
- Implement client-side form validation
- Use Context API for authentication state management
- Store and retrieve data from localStorage
- Handle asynchronous operations in forms

## Concepts Covered
- Controlled Components
- Form Validation
- Context API for Authentication
- localStorage
- Async/Await

## Practical Tasks

### Task 1: Add Password Strength Indicator
Add a visual indicator showing password strength (weak, medium, strong) in the signup form.

### Task 2: Implement Remember Me Checkbox
Add a checkbox that keeps users logged in for 7 days using localStorage timestamps.

### Task 3: Add Form Reset Functionality
Create a Clear button that resets all form fields and errors.

### Task 4: Create Protected Routes
Implement a ProtectedRoute component that redirects unauthenticated users to login.

### Task 5: Add User Profile Display
Create a profile page showing user information (name, email, account date).

## Quiz

### Question 1
What is a controlled component in React?
A) A component that controls other components
B) A form input whose value is controlled by React state
C) A component with strict prop validation
D) A component that uses useEffect
**Answer: B**

### Question 2
Why should you never store passwords in localStorage?
A) localStorage has limited storage space
B) localStorage only stores strings
C) localStorage is accessible via JavaScript and not secure
D) localStorage data expires after 24 hours
**Answer: C**

### Question 3
What does e.preventDefault() do in a form submission handler?
A) Prevents the form from being submitted
B) Prevents the default browser behavior of refreshing the page
C) Prevents validation errors
D) Prevents the user from clicking submit multiple times
**Answer: B**

### Question 4
Which validation should happen first in a login form?
A) Check if email exists in database
B) Check if password is correct
C) Check if fields are empty and properly formatted
D) Check if user is already logged in
**Answer: C**

### Question 5
What is the purpose of the isLoading state in form components?
A) To show a loading spinner
B) To prevent multiple form submissions
C) To disable form inputs during submission
D) All of the above
**Answer: D**

### Question 6
How do you parse JSON data from localStorage?
A) localStorage.getItem('key')
B) JSON.parse(localStorage.getItem('key'))
C) localStorage.parse('key')
D) JSON.get(localStorage, 'key')
**Answer: B**

### Question 7
What happens if you try to use useAuth() outside of an AuthProvider?
A) It returns null
B) It returns undefined
C) It throws an error
D) It creates a new context automatically
**Answer: C**

### Question 8
Which regex pattern validates a basic email format?
A) /^[a-z]+@[a-z]+$/
B) /^[^\s@]+@[^\s@]+\.[^\s@]+$/
C) /^[\w]+@[\w]+\.com$/
D) /^.+@.+$/
**Answer: B**

## Key Takeaways
- Controlled components give React full control over form inputs
- Validation should happen on submit with clear error messages
- Context API is perfect for global state like authentication
- localStorage persists data but should never store sensitive information
- Loading states improve UX and prevent duplicate submissions

## What's Next?
In Day 6, we'll focus on responsive design, CSS approaches in React, and UI enhancements.
