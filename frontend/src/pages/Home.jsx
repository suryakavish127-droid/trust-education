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

  // Derived lists for dropdowns
  const [districts, setDistricts] = useState([]);
  const [degrees, setDegrees] = useState([]);

  useEffect(() => {
    fetchColleges();
  }, [filters]); // Debounce could be added for slider, but keeping simple

  const fetchColleges = async () => {
    try {
      const params = new URLSearchParams();
      if (filters.degree) params.append('degree', filters.degree);
      if (filters.district) params.append('district', filters.district);
      params.append('minFee', filters.minFee);
      params.append('maxFee', filters.maxFee);

      const res = await axios.get(`http://localhost:5000/api/colleges/filter?${params.toString()}`);
      setColleges(res.data);
      
      // Populate dropdowns dynamically from ALL data if needed, or static. 
      // Ideally backend sends available options. I'll just extract unique from current list if list was all, 
      // but since I'm filtering, I should probably fetch all initially or have static lists.
      // For this task, I'll extract unique from the *results* (which shrinks options) OR just hardcode common ones.
      // Let's hardcode for better UX or fetch unique. 
      // I'll stick to a simple strategy: manually update these if possible or let them be free text?
      // Req says "Dropdown or checkbox". I'll use free text or a pre-defined list for now.
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 1fr) 3fr', gap: '2rem' }}>
        
        {/* Sidebar Filters */}
        <div className="glass" style={{ padding: '1.5rem', height: 'fit-content' }}>
          <h3 style={{ marginTop: 0 }}>Filters</h3>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <label>Degree</label>
            <select 
              value={filters.degree} 
              onChange={e => setFilters({...filters, degree: e.target.value})}
            >
              <option value="">All Degrees</option>
              <option value="BCA">BCA</option>
              <option value="B.E">B.E</option>
              <option value="B.Sc">B.Sc</option>
              <option value="MBA">MBA</option>
              <option value="MCA">MCA</option>
              <option value="B.A">B.A</option>
            </select>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label>District</label>
            <select 
              value={filters.district} 
              onChange={e => setFilters({...filters, district: e.target.value})}
            >
              <option value="">All Districts</option>
              <option value="Chennai">Chennai</option>
              <option value="Coimbatore">Coimbatore</option>
              <option value="Madurai">Madurai</option>
              <option value="Trichy">Trichy</option>
              <option value="Salem">Salem</option>
              <option value="Bangalore">Bangalore</option>
            </select>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label>Max Annual Fee: ₹{filters.maxFee}</label>
            <input 
              type="range" 
              min="0" 
              max="200000" 
              step="5000"
              value={filters.maxFee} 
              onChange={e => setFilters({...filters, maxFee: Number(e.target.value)})}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'gray' }}>
              <span>₹0</span>
              <span>₹2L+</span>
            </div>
          </div>

          <button className="btn" style={{ width: '100%', border: '1px solid white', background: 'transparent', color: 'white' }} onClick={() => setFilters({ degree: '', district: '', minFee: 0, maxFee: 200000 })}>
            Reset Filters
          </button>
        </div>

        {/* College Grid */}
        <div>
          <h2 style={{ marginTop: 0, marginBottom: '1.5rem' }}>Found {colleges.length} Colleges</h2>
          <div className="card-grid">
            {colleges.map(college => (
              <div key={college.college_id} className="glass" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <h3 style={{ margin: 0, color: '#a5b4fc' }}>{college.college_name}</h3>
                <span style={{ background: 'rgba(255,255,255,0.1)', width: 'fit-content', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem' }}>
                  {college.degree}
                </span>
                <p style={{ margin: '0.5rem 0', color: '#cbd5e1' }}>📍 {college.district}</p>
                <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>₹{college.fees.toLocaleString()}</span>
                    <Link to={`/college/${college.college_id}`}>
                      <button className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>Details</button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
            {colleges.length === 0 && (
              <p style={{ color: 'gray' }}>No colleges match your criteria.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
