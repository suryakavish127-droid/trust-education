import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const [colleges, setColleges] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [activeTab, setActiveTab] = useState('colleges');
  const navigate = useNavigate();

  // New College State
  const [newCollege, setNewCollege] = useState({
    college_name: '', degree: '', district: '', fees: '', hostel_fees: '', one_time_fees: '', description: ''
  });

  useEffect(() => {
    // Basic auth check logic (In real app verify token)
    const admin = localStorage.getItem('admin');
    if (!admin) navigate('/admin/login');

    fetchColleges();
    fetchEnquiries();
  }, []);

  const fetchColleges = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/colleges');
      setColleges(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchEnquiries = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/enquiries');
      setEnquiries(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateCollege = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/admin/colleges', newCollege);
      alert('College Added');
      setNewCollege({ college_name: '', degree: '', district: '', fees: '', hostel_fees: '', one_time_fees: '', description: '' });
      fetchColleges();
    } catch (err) {
      alert('Error adding college');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/admin/colleges/${id}`);
      fetchColleges();
    } catch (err) {
      alert('Error deleting');
    }
  };

  return (
    <div className="container animate-fade-in">
      <div className="glass" style={{ padding: '3rem', minHeight: '600px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
          <h1 style={{ margin: 0 }} className="gradient-text">Admin Dashboard</h1>
          <button
            className="btn btn-outline"
            onClick={() => { localStorage.removeItem('admin'); navigate('/admin/login'); }}
            style={{ fontSize: '0.85rem' }}
          >
            Logout session
          </button>
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem' }}>
          <button
            className={`btn ${activeTab === 'colleges' ? 'btn-primary' : 'btn-outline'}`}
            style={{ border: activeTab === 'colleges' ? 'none' : '1px solid transparent' }}
            onClick={() => setActiveTab('colleges')}
          >
            🏫 Manage Colleges
          </button>
          <button
            className={`btn ${activeTab === 'enquiries' ? 'btn-primary' : 'btn-outline'}`}
            style={{ border: activeTab === 'enquiries' ? 'none' : '1px solid transparent' }}
            onClick={() => setActiveTab('enquiries')}
          >
            📩 View Enquiries
          </button>
        </div>

        {activeTab === 'colleges' && (
          <div className="animate-fade-in">
            <h3 style={{ marginBottom: '1.5rem' }}>Add New Institute</h3>
            <form onSubmit={handleCreateCollege} className="glass" style={{ padding: '2rem', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem', marginBottom: '4rem', background: 'rgba(255,255,255,0.02)' }}>
              <div>
                <label>College Name</label>
                <input placeholder="University of Technology" value={newCollege.college_name} onChange={e => setNewCollege({ ...newCollege, college_name: e.target.value })} required />
              </div>
              <div>
                <label>Degree Available</label>
                <input placeholder="e.g. BCA, B.Tech" value={newCollege.degree} onChange={e => setNewCollege({ ...newCollege, degree: e.target.value })} required />
              </div>
              <div>
                <label>Located District</label>
                <input placeholder="e.g. Bangalore" value={newCollege.district} onChange={e => setNewCollege({ ...newCollege, district: e.target.value })} required />
              </div>
              <div>
                <label>Annual Fees (₹)</label>
                <input type="number" placeholder="95000" value={newCollege.fees} onChange={e => setNewCollege({ ...newCollege, fees: e.target.value })} required />
              </div>
              <div>
                <label>Hostel Fees (₹)</label>
                <input type="number" placeholder="20000" value={newCollege.hostel_fees} onChange={e => setNewCollege({ ...newCollege, hostel_fees: e.target.value })} />
              </div>
              <div>
                <label>One-Time Fees (₹)</label>
                <input type="number" placeholder="15000" value={newCollege.one_time_fees} onChange={e => setNewCollege({ ...newCollege, one_time_fees: e.target.value })} />
              </div>
              <div style={{ gridColumn: '1/-1' }}>
                <label>Institute Description</label>
                <textarea rows="4" placeholder="Briefly describe the campus, facilities and ranking..." value={newCollege.description} onChange={e => setNewCollege({ ...newCollege, description: e.target.value })} />
              </div>
              <button className="btn btn-primary" style={{ gridColumn: '1/-1', padding: '1rem' }}>Deploy New College Listing</button>
            </form>

            <h3 style={{ marginBottom: '1.5rem' }}>Active Listings ({colleges.length})</h3>
            <div style={{ display: 'grid', gap: '1rem' }}>
              {colleges.map(c => (
                <div key={c.college_id} className="glass" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 2rem', background: 'rgba(255,255,255,0.03)' }}>
                  <div>
                    <span style={{ fontWeight: '700', fontSize: '1.1rem' }}>{c.college_name}</span>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                      {c.degree} • {c.district} • <span style={{ color: 'white' }}>₹{c.fees.toLocaleString()}</span> • Hostel: ₹{c.hostel_fees?.toLocaleString() || '0'} • One‑Time: ₹{c.one_time_fees?.toLocaleString() || '0'}
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(c.college_id)}
                    className="btn btn-outline"
                    style={{ color: '#f87171', borderColor: 'rgba(248, 113, 113, 0.2)', padding: '0.5rem 1rem', fontSize: '0.8rem' }}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'enquiries' && (
          <div className="animate-fade-in">
            <h3 style={{ marginBottom: '1.5rem' }}>Student Interest Pipeline</h3>
            <div className="glass" style={{ overflow: 'hidden', background: 'rgba(255,255,255,0.02)' }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ textAlign: 'left', background: 'rgba(255,255,255,0.05)' }}>
                      <th style={{ padding: '1.25rem' }}>Date Received</th>
                      <th style={{ padding: '1.25rem' }}>Student Profile</th>
                      <th style={{ padding: '1.25rem' }}>Contact Info</th>
                      <th style={{ padding: '1.25rem' }}>Target Institute</th>
                      <th style={{ padding: '1.25rem' }}>Program</th>
                    </tr>
                  </thead>
                  <tbody>
                    {enquiries.length > 0 ? enquiries.map(e => (
                      <tr key={e.enquiry_id} style={{ borderTop: '1px solid var(--glass-border)' }}>
                        <td style={{ padding: '1.25rem' }}>{new Date(e.enquiry_date).toLocaleDateString()}</td>
                        <td style={{ padding: '1.25rem', fontWeight: 'bold' }}>{e.student_name}</td>
                        <td style={{ padding: '1.25rem' }}>
                          <div>{e.phone}</div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{e.email}</div>
                        </td>
                        <td style={{ padding: '1.25rem' }}>{e.college_name || 'N/A'}</td>
                        <td style={{ padding: '1.25rem' }}>
                          <span className="badge">{e.interested_degree}</span>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan="5" style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                          No enquiries found in the system yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

}

export default AdminDashboard;
