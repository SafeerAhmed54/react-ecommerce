import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import './Header.css'

/**
 * Header Component
 * 
 * A reusable navigation header that displays site navigation,
 * cart information, and user authentication status.
 * Includes responsive hamburger menu for mobile devices.
 * 
 * @param {Object} props - Component props
 * @param {number} props.cartItemCount - Number of items in the shopping cart
 * @param {boolean} props.isLoggedIn - Whether the user is authenticated
 * @param {string} props.userName - Name of the logged-in user
 */
function Header({ cartItemCount = 0, isLoggedIn = false, userName = '' }) {
  const { logout } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    setIsMobileMenuOpen(false)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo/Brand */}
        <div className="header-logo">
          <Link to="/" onClick={closeMobileMenu}>
            <h1>ReactShop</h1>
          </Link>
        </div>

        {/* Hamburger Menu Button (Mobile Only) */}
        <button 
          className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Navigation Links */}
        <nav className={`header-nav ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <Link to="/" className="nav-link" onClick={closeMobileMenu}>
            Home
          </Link>
          <Link to="/cart" className="nav-link cart-link" onClick={closeMobileMenu}>
            Cart
            {cartItemCount > 0 && (
              <span className="cart-badge">{cartItemCount}</span>
            )}
          </Link>
          
          {/* Conditional rendering based on authentication status */}
          {isLoggedIn ? (
            <div className="user-info">
              <span className="user-name">Hello, {userName}</span>
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="nav-link" onClick={closeMobileMenu}>
                Login
              </Link>
              <Link to="/signup" className="nav-link signup-link" onClick={closeMobileMenu}>
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header
