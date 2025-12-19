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
    <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <div className="glass" style={{ padding: '2.5rem', width: '100%', maxWidth: '400px' }}>
        <h2 style={{ marginTop: 0, textAlign: 'center', marginBottom: '2rem' }}>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <label>Username</label>
          <input value={creds.username} onChange={e => setCreds({...creds, username: e.target.value})} required autoFocus />
          
          <label>Password</label>
          <input type="password" value={creds.password} onChange={e => setCreds({...creds, password: e.target.value})} required />
          
          <button className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>Login</button>
        </form>
        {error && <p style={{ color: '#ef4444', textAlign: 'center', marginTop: '1rem' }}>{error}</p>}
      </div>
    </div>
  );
}

export default AdminLogin;
