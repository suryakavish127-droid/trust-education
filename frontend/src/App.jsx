import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import CollegeDetails from './pages/CollegeDetails';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar glass">
          <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
            <h2>🎓 EduFind</h2>
          </Link>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/admin/login">Admin</Link>
          </div>
        </nav>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/college/:id" element={<CollegeDetails />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
