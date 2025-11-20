import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/common/Header'
import Footer from './components/common/Footer'
import ProductCard from './components/products/ProductCard'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header cartItemCount={3} isLoggedIn={false} userName="" />
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </BrowserRouter>
  )
}

// Temporary Home component placeholder
function Home() {
  return (
    <div className="home-container">
      <h1>React Ecommerce Learning Project</h1>
      <p>Welcome to Day 1 - Foundation Components</p>
      
      <div className="product-grid">
        <ProductCard 
          id="1"
          name="Wireless Headphones"
          price={79.99}
          image="https://via.placeholder.com/300x200?text=Headphones"
        />
        <ProductCard 
          id="2"
          name="Smart Watch"
          price={199.99}
          image="https://via.placeholder.com/300x200?text=Smart+Watch"
        />
        <ProductCard 
          id="3"
          name="Laptop Stand"
          price={49.99}
          image="https://via.placeholder.com/300x200?text=Laptop+Stand"
        />
      </div>
    </div>
  )
}

export default App
