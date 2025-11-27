import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider, useCart } from './context/CartContext'
import { AuthProvider, useAuth } from './context/AuthContext'
import Header from './components/common/Header'
import Footer from './components/common/Footer'
import Home from './pages/Home'
import ProductDetailsPage from './pages/ProductDetailsPage'
import Cart from './pages/Cart'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import './App.css'

// Inner component that uses cart and auth context
function AppContent() {
  const { getTotalItems } = useCart()
  const { isAuthenticated, user } = useAuth()
  
  return (
    <div className="app">
      <Header 
        cartItemCount={getTotalItems()} 
        isLoggedIn={isAuthenticated} 
        userName={user?.name || ''} 
      />
      
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </main>
      
      <Footer />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
