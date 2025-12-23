import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function CollegeDetails() {
  const { id } = useParams();
  const [college, setCollege] = useState(null);
  const [form, setForm] = useState({
    student_name: '', phone: '', email: '', interested_degree: '', message: ''
  });
  const [msg, setMsg] = useState('');

  useEffect(() => {
    fetchCollege();
  }, [id]);

  const fetchCollege = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/colleges/${id}`);
      setCollege(res.data);
      setForm(prev => ({ ...prev, interested_degree: res.data.degree }));
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.phone.length !== 10) {
      alert('Phone must be 10 digits');
      return;
    }
    try {
      await axios.post('http://localhost:5000/api/enquiries', {
        ...form,
        college_id: id
      });
      setMsg('Enquiry sent successfully! We will contact you soon.');
      setForm({ student_name: '', phone: '', email: '', interested_degree: college.degree, message: '' });
    } catch (err) {
      setMsg('Error sending enquiry. Please try again.');
    }
  };

  if (!college) return (
    <div className="container" style={{ padding: '4rem', textAlign: 'center' }}>
      <div className="glass" style={{ padding: '3rem' }}>
        <h2 className="animate-pulse">Fetching details...</h2>
      </div>
    </div>
  );

  return (
    <div className="container animate-fade-in">
      {/* College Info Header */}
      <div className="glass" style={{ marginBottom: '3rem', overflow: 'hidden' }}>
        <div style={{
          height: '250px',
          background: `linear-gradient(rgba(0,0,0,0.5), var(--background)), url('/hero-bg.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'flex-end',
          padding: '3rem'
        }}>
          <div>
            <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem' }}>
              <span className="badge" style={{ background: 'var(--primary)', color: 'white' }}>{college.degree}</span>
              <span className="badge" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', borderColor: 'rgba(255,255,255,0.2)' }}>{college.district}</span>
            </div>
            <h1 style={{ fontSize: '3rem', margin: 0 }} className="gradient-text">{college.college_name}</h1>
          </div>
        </div>

        <div style={{ padding: '3rem', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '4rem' }}>
          {/* Main Info */}
          <div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--primary)' }}>About This Institute</h3>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '2.5rem' }}>
              {college.description}
            </p>

            <div className="glass" style={{ padding: '2rem', background: 'rgba(99, 102, 241, 0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Consolidated Annual Fee</p>
                <h2 style={{ fontSize: '2.5rem', margin: 0 }}>₹{college.fees.toLocaleString()}</h2>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Academic Year 2025-26</p>
                <span className="badge" style={{ background: 'rgba(34, 197, 94, 0.2)', color: '#4ade80', borderColor: 'rgba(34, 197, 94, 0.3)' }}>● Admissions Open</span>
              </div>
            </div>
          </div>

          {/* Sidebar / Enquiry Form */}
          <aside>
            <div className="glass" style={{ padding: '2.5rem', background: 'rgba(255, 255, 255, 0.03)' }}>
              <h3 style={{ marginTop: 0 }}>Admission Enquiry</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '0.9rem' }}>
                Secure your seat today. Fill the form below and our counselor will call you within 24 hours.
              </p>

              <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.25rem' }}>
                <div>
                  <label>Full Name</label>
                  <input value={form.student_name} onChange={e => setForm({ ...form, student_name: e.target.value })} required placeholder="John Doe" />
                </div>

                <div>
                  <label>Phone Number</label>
                  <input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} required placeholder="10-digit mobile number" />
                </div>

                <div>
                  <label>Email Address</label>
                  <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required placeholder="john@example.com" />
                </div>

                <div>
                  <label>Message</label>
                  <textarea rows="3" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Any specific questions?"></textarea>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>Submit Inquiry</button>
              </form>

              {msg && (
                <div className="animate-fade-in" style={{
                  marginTop: '1.5rem',
                  padding: '1rem',
                  fontSize: '0.9rem',
                  textAlign: 'center',
                  background: msg.includes('Error') ? 'rgba(239, 68, 68, 0.1)' : 'rgba(34, 197, 94, 0.1)',
                  color: msg.includes('Error') ? '#f87171' : '#4ade80',
                  border: `1px solid ${msg.includes('Error') ? 'rgba(239, 68, 68, 0.2)' : 'rgba(34, 197, 94, 0.2)'}`,
                  borderRadius: '0.75rem'
                }}>
                  {msg}
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );

}

export default CollegeDetails;
