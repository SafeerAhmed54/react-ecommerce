import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/common/Header'
import Footer from './components/common/Footer'
import Home from './pages/Home'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header cartItemCount={0} isLoggedIn={false} userName="" />
        
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

export default App
