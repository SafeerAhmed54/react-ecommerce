import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

// Temporary Home component placeholder
function Home() {
  return (
    <div>
      <h1>React Ecommerce Learning Project</h1>
      <p>Welcome to Day 1 - Foundation Components</p>
    </div>
  )
}

export default App
