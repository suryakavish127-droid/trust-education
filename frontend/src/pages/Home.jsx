import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
  const [colleges, setColleges] = useState([]);
  const [filters, setFilters] = useState({
    degree: '',
    district: '',
    minFee: 0,
    maxFee: 200000
  });

  // Dynamic lists for dropdowns
  const [districts, setDistricts] = useState([]);
  const [degrees, setDegrees] = useState([]);

  useEffect(() => {
    fetchOptions();
  }, []);

  useEffect(() => {
    fetchColleges();
  }, [filters]);

  const fetchOptions = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/colleges/options');
      setDistricts(res.data.districts);
      setDegrees(res.data.degrees);
    } catch (err) {
      console.error('Error fetching options:', err);
    }
  };

  const fetchColleges = async () => {
    try {
      const params = new URLSearchParams();
      if (filters.degree) params.append('degree', filters.degree);
      if (filters.district) params.append('district', filters.district);
      params.append('minFee', filters.minFee);
      params.append('maxFee', filters.maxFee);

      const res = await axios.get(`http://localhost:5000/api/colleges/filter?${params.toString()}`);
      setColleges(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container animate-fade-in">
      {/* Hero Section */}
      <div className="hero">
        <h1 className="gradient-text">Find Your Dream College</h1>
        <p>Compare fees, explore campuses, and make the right choice for your future across multiple districts and degrees.</p>
        <div style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', gap: '1rem' }}>
          <select
            value={filters.degree}
            onChange={e => setFilters({ ...filters, degree: e.target.value })}
            className="glass"
          >
            <option value="">All Degrees</option>
            {degrees.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
          <select
            value={filters.district}
            onChange={e => setFilters({ ...filters, district: e.target.value })}
            className="glass"
          >
            <option value="">All Districts</option>
            {districts.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 1fr) 3fr', gap: '3rem' }}>

        {/* Sidebar Filters */}
        <aside>
          <div className="glass" style={{ padding: '2rem', position: 'sticky', top: '2rem' }}>
            <h3 style={{ marginTop: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
              Quick Filters
            </h3>

            <div style={{ marginBottom: '2rem' }}>
              <label>Max Annual Fee: <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>₹{filters.maxFee.toLocaleString()}</span></label>
              <input
                type="range"
                min="0"
                max="200000"
                step="5000"
                value={filters.maxFee}
                onChange={e => setFilters({ ...filters, maxFee: Number(e.target.value) })}
                style={{ cursor: 'pointer' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                <span>₹0</span>
                <span>₹2L+</span>
              </div>
            </div>

            <button className="btn btn-outline" style={{ width: '100%' }} onClick={() => setFilters({ degree: '', district: '', minFee: 0, maxFee: 200000 })}>
              Clear All Filters
            </button>

            <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '0.75rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Total {colleges.length} colleges found matching your criteria.
            </div>
          </div>
        </aside>

        {/* College Grid */}
        <main>
          <div className="card-grid">
            {colleges.map(college => (
              <div key={college.college_id} className="glass college-card glass-hover">
                <div style={{ marginBottom: '1rem' }}>
                  <span className="badge">{college.degree}</span>
                </div>
                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem' }}>{college.college_name}</h3>
                <p style={{ margin: '0 0 1.5rem 0', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  {college.district}
                </p>

                <div style={{ marginTop: 'auto', paddingTop: '1.5rem', borderTop: '1px solid var(--glass-border)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Annual Fee</span>
                      <span style={{ fontWeight: '800', fontSize: '1.4rem', color: 'white' }}>₹{college.fees.toLocaleString()}</span>
                    </div>
                    <Link to={`/college/${college.college_id}`}>
                      <button className="btn btn-primary">Details</button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
            {colleges.length === 0 && (
              <div className="glass" style={{ gridColumn: '1 / -1', padding: '4rem', textAlign: 'center' }}>
                <h3 style={{ color: 'var(--text-secondary)' }}>No colleges match your criteria</h3>
                <p>Try adjusting your filters or resetting them.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );

}

export default Home;
