import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider, useCart } from './context/CartContext'
import Header from './components/common/Header'
import Footer from './components/common/Footer'
import Home from './pages/Home'
import ProductDetailsPage from './pages/ProductDetailsPage'
import Cart from './pages/Cart'
import './App.css'

// Inner component that uses cart context
function AppContent() {
  const { getTotalItems } = useCart()
  
  return (
    <div className="app">
      <Header cartItemCount={getTotalItems()} isLoggedIn={false} userName="" />
      
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>
      
      <Footer />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </BrowserRouter>
  )
}

export default App
