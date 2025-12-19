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
    college_name: '', degree: '', district: '', fees: '', description: ''
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
      setNewCollege({ college_name: '', degree: '', district: '', fees: '', description: '' });
      fetchColleges();
    } catch (err) {
      alert('Error adding college');
    }
  };

  const handleDelete = async (id) => {
    if(!window.confirm('Are you sure?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/admin/colleges/${id}`);
      fetchColleges();
    } catch (err) {
      alert('Error deleting');
    }
  };

  return (
    <div className="container">
      <div className="glass" style={{ padding: '2rem' }}>
        <h1 style={{ marginBottom: '2rem' }}>Admin Dashboard</h1>
        
        <div style={{ marginBottom: '2rem' }}>
          <button 
            className={`btn ${activeTab === 'colleges' ? 'btn-primary' : ''}`} 
            style={{ marginRight: '1rem', background: activeTab !== 'colleges' ? 'transparent' : null }}
            onClick={() => setActiveTab('colleges')}
          >
            Manage Colleges
          </button>
          <button 
            className={`btn ${activeTab === 'enquiries' ? 'btn-primary' : ''}`}
            style={{ background: activeTab !== 'enquiries' ? 'transparent' : null }}
            onClick={() => setActiveTab('enquiries')}
          >
            View Enquiries
          </button>
        </div>

        {activeTab === 'colleges' && (
          <div>
            <h3>Add New College</h3>
            <form onSubmit={handleCreateCollege} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
              <input placeholder="College Name" value={newCollege.college_name} onChange={e => setNewCollege({...newCollege, college_name: e.target.value})} required />
              <input placeholder="Degree (e.g., BCA)" value={newCollege.degree} onChange={e => setNewCollege({...newCollege, degree: e.target.value})} required />
              <input placeholder="District" value={newCollege.district} onChange={e => setNewCollege({...newCollege, district: e.target.value})} required />
              <input type="number" placeholder="Fees" value={newCollege.fees} onChange={e => setNewCollege({...newCollege, fees: e.target.value})} required />
              <textarea style={{ gridColumn: '1/-1' }} placeholder="Description" value={newCollege.description} onChange={e => setNewCollege({...newCollege, description: e.target.value})} />
              <button className="btn btn-primary" style={{ gridColumn: '1/-1' }}>Add College</button>
            </form>

            <h3>Existing Colleges</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {colleges.map(c => (
                <div key={c.college_id} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '0.5rem' }}>
                  <div>
                    <strong>{c.college_name}</strong> - {c.degree} ({c.district})
                  </div>
                  <button onClick={() => handleDelete(c.college_id)} style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}>Delete</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'enquiries' && (
          <div>
            <h3>Student Enquiries</h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
                <thead>
                  <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--glass-border)' }}>
                    <th style={{ padding: '1rem' }}>Date</th>
                    <th style={{ padding: '1rem' }}>Student</th>
                    <th style={{ padding: '1rem' }}>Contact</th>
                    <th style={{ padding: '1rem' }}>Target College</th>
                    <th style={{ padding: '1rem' }}>Degree</th>
                  </tr>
                </thead>
                <tbody>
                  {enquiries.map(e => (
                    <tr key={e.enquiry_id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '1rem' }}>{new Date(e.enquiry_date).toLocaleDateString()}</td>
                      <td style={{ padding: '1rem' }}>{e.student_name}</td>
                      <td style={{ padding: '1rem' }}>{e.phone}<br/><small style={{color:'gray'}}>{e.email}</small></td>
                      <td style={{ padding: '1rem' }}>{e.college_name || 'N/A'}</td>
                      <td style={{ padding: '1rem' }}>{e.interested_degree}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
