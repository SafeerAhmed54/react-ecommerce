import ProductList from '../components/products/ProductList'
import { products } from '../data/products'
import './Home.css'

/**
 * Home Page Component
 * 
 * The main landing page that displays the product catalog.
 * 
 * This component demonstrates:
 * - Importing and using data
 * - Composing components together
 * - Page-level component structure
 */
function Home() {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <h1 className="hero-title">Welcome to React E-Commerce</h1>
        <p className="hero-subtitle">
          Discover amazing products at great prices. Browse our collection and find what you love!
        </p>
      </section>

      {/* Product Catalog Section */}
      <section className="catalog-section">
        <h2 className="section-title">Our Products</h2>
        <ProductList products={products} />
      </section>
    </div>
  )
}

export default Home
