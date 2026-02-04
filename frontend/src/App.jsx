import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import CollegeDetails from './pages/CollegeDetails';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import FeeExplorer from './pages/FeeExplorer';
import About from './pages/About';
import Contact from './pages/Contact';
import CourseCatalog from './pages/CourseCatalog';
import Scholarships from './pages/Scholarships';
import FAQ from './pages/FAQ';
import CompareColleges from './pages/CompareColleges';
import CareerGuide from './pages/CareerGuide';
import PrivacyPolicy from './pages/PrivacyPolicy';

function App() {
  return (
    <Router>
      <div className="app">
        <header className="header glass">
          <div className="container nav">
            <Link to="/" className="nav-logo">
              <span style={{ fontSize: '2rem' }}>🎓</span>
              <span className="gradient-text">Advanced Guidance</span>
            </Link>
            <nav className="nav-links">
              <Link to="/">Home</Link>
              <Link to="/courses">Courses</Link>
              <Link to="/fees">Fees</Link>
              <Link to="/compare">Compare</Link>
              <Link to="/scholarships">Scholarships</Link>
              <Link to="/career">Career Guide</Link>
              <Link to="/about">About</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/admin/login" className="btn btn-outline" style={{ padding: '0.4rem 1rem' }}>Admin</Link>
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
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/courses" element={<CourseCatalog />} />
            <Route path="/scholarships" element={<Scholarships />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/compare" element={<CompareColleges />} />
            <Route path="/career" element={<CareerGuide />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
          </Routes>
        </main>

        <footer className="glass" style={{ marginTop: '5rem', padding: '3rem 0', textAlign: 'center' }}>
          <div className="container">
            <p style={{ color: 'var(--text-secondary)' }}>© 2026 Advanced Academic Guidance - Premium College Planner</p>
            <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', gap: '2rem' }}>
              <Link to="/about" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>About</Link>
              <Link to="/faq" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>FAQ</Link>
              <Link to="/privacy" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Privacy Policy</Link>
              <Link to="/contact" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Contact</Link>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
