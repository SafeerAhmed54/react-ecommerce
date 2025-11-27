import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import './Header.css'

/**
 * Header Component
 * 
 * A reusable navigation header that displays site navigation,
 * cart information, and user authentication status.
 * 
 * @param {Object} props - Component props
 * @param {number} props.cartItemCount - Number of items in the shopping cart
 * @param {boolean} props.isLoggedIn - Whether the user is authenticated
 * @param {string} props.userName - Name of the logged-in user
 */
function Header({ cartItemCount = 0, isLoggedIn = false, userName = '' }) {
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
  }
  return (
    <header className="header">
      <div className="header-container">
        {/* Logo/Brand */}
        <div className="header-logo">
          <Link to="/">
            <h1>ReactShop</h1>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="header-nav">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/cart" className="nav-link cart-link">
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
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/signup" className="nav-link signup-link">
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
