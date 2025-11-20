import './Footer.css'

/**
 * Footer Component
 * 
 * A static footer component that displays copyright information
 * and placeholder links for site navigation.
 * 
 * This component demonstrates a simple React component without props.
 */
function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Footer Links Section */}
        <div className="footer-links">
          <div className="footer-column">
            <h3>Shop</h3>
            <ul>
              <li><a href="#products">All Products</a></li>
              <li><a href="#categories">Categories</a></li>
              <li><a href="#deals">Special Deals</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Customer Service</h3>
            <ul>
              <li><a href="#contact">Contact Us</a></li>
              <li><a href="#shipping">Shipping Info</a></li>
              <li><a href="#returns">Returns</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>About</h3>
            <ul>
              <li><a href="#about">About Us</a></li>
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="footer-bottom">
          <p>&copy; {currentYear} ReactShop. All rights reserved.</p>
          <p className="footer-tagline">Built with React for learning purposes</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
