import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Campaign from './campaign'
import About from './about'

export default function App() {
  return (
    <Router>
      <div style={{
        backgroundColor: '#121212',
        color: 'white',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <nav style={{
          display: 'flex',
          gap: '20px',
          marginTop: '40px',
          fontSize: '20px'
        }}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Campaign</Link>
          <Link to="/about" style={{ color: 'white', textDecoration: 'none' }}>About</Link>
        </nav>

        <div style={{ marginTop: '40px', textAlign: 'center' }}>
          <Routes>
            <Route path="/" element={<Campaign />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}
