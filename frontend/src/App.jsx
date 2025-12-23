import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import CollegeDetails from './pages/CollegeDetails';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import FeeExplorer from './pages/FeeExplorer';

function App() {
  return (
    <Router>
      <div className="app">
        <header className="header glass">
          <div className="container nav">
            <Link to="/" className="nav-logo">
              <span style={{ fontSize: '2rem' }}>🎓</span>
              <span className="gradient-text">EduFind</span>
            </Link>
            <nav className="nav-links">
              <Link to="/">Home</Link>
              <Link to="/fees">Fee Structures</Link>
              <Link to="/admin/login" className="btn btn-outline" style={{ padding: '0.4rem 1rem' }}>Admin Portal</Link>
            </nav>
          </div>
        </header>

        <main style={{ minHeight: 'calc(100vh - 200px)' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/college/:id" element={<CollegeDetails />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/fees" element={<FeeExplorer />} />
          </Routes>
        </main>

        <footer className="glass" style={{ marginTop: '5rem', padding: '3rem 0', textAlign: 'center' }}>
          <div className="container">
            <p style={{ color: 'var(--text-secondary)' }}>© 2025 EduFind - College Finder & Fee Comparison</p>
            <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', gap: '2rem' }}>
              <a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>About</a>
              <a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Privacy Policy</a>
              <a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Contact</a>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
