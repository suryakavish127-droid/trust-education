import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
  const [creds, setCreds] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/admin/login', creds);
      localStorage.setItem('admin', JSON.stringify(res.data));
      navigate('/admin/dashboard');
    } catch (err) {
      setError('Invalid Credentials');
    }
  };

  return (
    <div className="container animate-fade-in" style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '70vh',
      paddingTop: '2rem'
    }}>
      <div className="glass" style={{
        padding: '3.5rem',
        width: '100%',
        maxWidth: '450px',
        position: 'relative'
      }}>
        {/* Decorative Circle */}
        <div style={{
          position: 'absolute',
          top: '-20px',
          right: '-20px',
          width: '80px',
          height: '80px',
          background: 'var(--primary)',
          borderRadius: '50%',
          filter: 'blur(40px)',
          opacity: '0.4',
          zIndex: 0
        }}></div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span style={{ fontSize: '3rem' }}>🔐</span>
            <h2 style={{ marginTop: '1rem', marginBottom: '0.5rem' }}>Admin Portal</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Enter your credentials to access the dashboard</p>
          </div>

          <form onSubmit={handleLogin} style={{ display: 'grid', gap: '1.5rem' }}>
            <div>
              <label>Username</label>
              <input
                placeholder="Enter username"
                value={creds.username}
                onChange={e => setCreds({ ...creds, username: e.target.value })}
                required
                autoFocus
              />
            </div>

            <div>
              <label>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={creds.password}
                onChange={e => setCreds({ ...creds, password: e.target.value })}
                required
              />
            </div>

            <button className="btn btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1rem', marginTop: '0.5rem' }}>
              Sign In
            </button>
          </form>

          {error && (
            <div style={{
              marginTop: '1.5rem',
              padding: '0.75rem',
              background: 'rgba(239, 68, 68, 0.1)',
              color: '#f87171',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              borderRadius: '0.5rem',
              textAlign: 'center',
              fontSize: '0.9rem'
            }}>
              {error}
            </div>
          )}

          <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Forgotten your password? <a href="#" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Contact IT Support</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );

}

export default AdminLogin;
