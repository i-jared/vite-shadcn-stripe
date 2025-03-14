import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import HiddenButton from './pages/HiddenButton'
import CheckoutSuccess from './pages/CheckoutSuccess'

function App() {
  return (
    <Router>
      <div className="container mx-auto px-4 py-8">
        <nav className="mb-8">
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="text-blue-500 hover:text-blue-700">Home</Link>
            </li>
            <li>
              <Link to="/hidden-button" className="text-blue-500 hover:text-blue-700">Hidden Button Challenge</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hidden-button" element={<HiddenButton />} />
          <Route path="/checkout-success" element={<CheckoutSuccess />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App