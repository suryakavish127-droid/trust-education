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

  if (!college) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <div className="glass" style={{ padding: '2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
        
        {/* Details Section */}
        <div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', background: 'linear-gradient(to right, #a5b4fc, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {college.college_name}
          </h1>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
            <span style={{ background: 'rgba(255,255,255,0.1)', padding: '0.3rem 0.8rem', borderRadius: '20px' }}>{college.degree}</span>
            <span style={{ background: 'rgba(255,255,255,0.1)', padding: '0.3rem 0.8rem', borderRadius: '20px' }}>{college.district}</span>
          </div>
          
          <div style={{ marginBottom: '2rem', lineHeight: '1.6', color: '#cbd5e1' }}>
            {college.description}
          </div>

          <h2 style={{ fontSize: '2rem' }}>₹{college.fees.toLocaleString()} <span style={{ fontSize: '1rem', color: 'gray', fontWeight: 'normal' }}>/ year</span></h2>
        </div>

        {/* Enquiry Form */}
        <div style={{ background: 'rgba(0,0,0,0.2)', padding: '2rem', borderRadius: '1rem' }}>
          <h2 style={{ marginTop: 0 }}>Enquire Now</h2>
          <p style={{ color: 'gray', marginBottom: '1.5rem' }}>Fill in your details to get more information.</p>
          
          <form onSubmit={handleSubmit}>
            <label>Name</label>
            <input value={form.student_name} onChange={e => setForm({...form, student_name: e.target.value})} required />
            
            <label>Phone Number (10 digits)</label>
            <input type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} required />
            
            <label>Email ID</label>
            <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
            
            <label>Interested Degree</label>
            <select value={form.interested_degree} onChange={e => setForm({...form, interested_degree: e.target.value})}>
              <option value={college.degree}>{college.degree}</option>
              {/* Could offer others if college supports multiple, but here 1 college = 1 degree row usually or mapped differently. 
                  Schema says 'degree' is varchar, implying one per row. So strictly speaking just display current. */}
            </select>

            <label>Message (Optional)</label>
            <textarea rows="3" value={form.message} onChange={e => setForm({...form, message: e.target.value})}></textarea>

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Submit Enquiry</button>
          </form>
          {msg && <div style={{ marginTop: '1rem', padding: '1rem', background: msg.includes('Error') ? 'rgba(239, 68, 68, 0.2)' : 'rgba(34, 197, 94, 0.2)', borderRadius: '0.5rem' }}>{msg}</div>}
        </div>

      </div>
    </div>
  );
}

export default CollegeDetails;
