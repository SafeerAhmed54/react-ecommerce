import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        setUser(parsedUser)
        setIsAuthenticated(true)
      } catch (error) {
        console.error('Failed to parse stored user:', error)
        localStorage.removeItem('user')
      }
    }
  }, [])

  // Login function - dummy authentication
  const login = async (email, password) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500))

    // Check if user exists in localStorage
    const storedUsers = localStorage.getItem('users')
    let users = []
    
    if (storedUsers) {
      try {
        users = JSON.parse(storedUsers)
      } catch (error) {
        console.error('Failed to parse users:', error)
      }
    }

    // Find user with matching email and password
    const foundUser = users.find(
      u => u.email === email && u.password === password
    )

    if (foundUser) {
      const userWithoutPassword = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email
      }
      setUser(userWithoutPassword)
      setIsAuthenticated(true)
      localStorage.setItem('user', JSON.stringify(userWithoutPassword))
      return true
    }

    return false
  }

  // Signup function - dummy authentication
  const signup = async (name, email, password) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500))

    // Get existing users
    const storedUsers = localStorage.getItem('users')
    let users = []
    
    if (storedUsers) {
      try {
        users = JSON.parse(storedUsers)
      } catch (error) {
        console.error('Failed to parse users:', error)
      }
    }

    // Check if user already exists
    const existingUser = users.find(u => u.email === email)
    if (existingUser) {
      return false // User already exists
    }

    // Create new user
    const newUser = {
      id: `user_${Date.now()}`,
      name,
      email,
      password // In real app, this would be hashed
    }

    users.push(newUser)
    localStorage.setItem('users', JSON.stringify(users))

    // Log the user in
    const userWithoutPassword = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email
    }
    setUser(userWithoutPassword)
    setIsAuthenticated(true)
    localStorage.setItem('user', JSON.stringify(userWithoutPassword))

    return true
  }

  // Logout function
  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem('user')
  }

  const value = {
    user,
    isAuthenticated,
    login,
    signup,
    logout
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
