import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function CollegeDetails() {
  const { id } = useParams();
  const [college, setCollege] = useState(null);
  const [form, setForm] = useState({
    student_name: '', phone: '', email: '', interested_degree: '', message: ''
  });
  const [hostelFees, setHostelFees] = useState([]);
  const [oneTimeFees, setOneTimeFees] = useState([]);
  const [msg, setMsg] = useState('');

  // Slideshow logic
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const slideShows = {
    'Dhanalakshmi': [
      '/ds_slide_1.jpg',
      '/ds_slide_2.jpg',
      '/ds_slide_3.png',
      '/ds_slide_4.png'
    ],
    'CARE': [
      '/care_slide_1.jpg',
      '/care_slide_2.jpg',
      '/care_slide_3.jpg'
    ],
    'Imayam': [
      '/imayam_slide_1.jpg',
      '/imayam_slide_2.jpg',
      '/imayam_slide_3.jpg'
    ],
    'Indra Ganesan': [
      '/indra_slide_1.png',
      '/indra_slide_2.png'
    ],
    'MAM': [
      '/mam_slide_1.png',
      '/mam_slide_2.png',
      '/mam_slide_3.png',
      '/mam_slide_4.png'
    ],
    'Hindustan': [
      '/hindustan_slide_1.jpg',
      '/hindustan_slide_2.jpg',
      '/hindustan_slide_3.jpg',
      '/hindustan_slide_4.jpg',
      '/hindustan_slide_5.jpg'
    ],
    'Loyola': [
      '/loyola_slide_1.jpg',
      '/loyola_slide_2.jpg',
      '/loyola_slide_3.jpg',
      '/loyola_slide_4.jpg'
    ],
    'Adithya': [
      '/adithya_slide_1.png',
      '/adithya_slide_2.jpg',
      '/adithya_slide_3.jpg',
      '/adithya_slide_4.jpg',
      '/adithya_slide_5.jpg'
    ],
    'Rathinam': [
      '/rathinam_slide_1.png',
      '/rathinam_slide_2.jpg',
      '/rathinam_slide_3.jpg',
      '/rathinam_slide_4.jpg'
    ]
  };

  useEffect(() => {
    let interval;
    if (college) {
      const key = Object.keys(slideShows).find(k => college.college_name.includes(k));
      if (key) {
        interval = setInterval(() => {
          setCurrentImageIndex(prev => (prev + 1) % slideShows[key].length);
        }, 3000);
      }
    }
    return () => clearInterval(interval);
  }, [college]);

  useEffect(() => {
    fetchCollege();
  }, [id]);

  const fetchCollege = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/colleges/${id}`);
      setCollege(res.data);
      setForm(prev => ({ ...prev, interested_degree: res.data.degree }));

      // Fetch Unified Fee Details
      if (id) {
        try {
          const uRes = await axios.get(`http://localhost:5000/api/colleges/fees/unified/${id}`);
          const unifiedFees = uRes.data;

          setHostelFees(unifiedFees.filter(f => f.fee_type === 'HOSTEL_FEE').map(f => ({
            id: Math.random(),
            hostel_type: f.hostel_type || f.name, // Support both schemas during transition
            room_type: f.room_type || '-',
            fee_per_year: f.fee_per_year || 0,
            mess_fee: f.mess_fee || 0,
            amount: f.amount // total
          })));

          setOneTimeFees(unifiedFees.filter(f => f.fee_type === 'ONE_TIME_FEE').map(f => ({
            id: Math.random(),
            fee_name: f.name,
            amount: f.amount,
            purpose: f.purpose,
            refundable_status: f.status
          })));
        } catch (e) {
          console.error("Error fetching unified fees", e);
        }
      }
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
          height: '350px',
          backgroundImage: `url('${(() => {
            const key = Object.keys(slideShows).find(k => college.college_name.includes(k));
            return key ? slideShows[key][currentImageIndex] : (college.image_url || '/dhanalakshmi-college-1.jpg');
          })()}')`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'flex-end',
          padding: '3rem',
          transition: 'background-image 0.5s ease-in-out'
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


            {/* Always display Hostel Fees Section */}
            <div style={{ marginTop: '2.5rem' }}>
              <h4 style={{ marginBottom: '1rem', color: '#fff' }}>Hostel Fees Structure</h4>
              <div className="glass" style={{ padding: '0', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem' }}>
                  <thead>
                    <tr style={{ textAlign: 'left', background: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)' }}>
                      <th style={{ padding: '1rem' }}>Hostel Type</th>
                      <th style={{ padding: '1rem' }}>Room Type</th>
                      <th style={{ padding: '1rem' }}>Rent/Year</th>
                      <th style={{ padding: '1rem' }}>Mess Fee</th>
                      <th style={{ padding: '1rem' }}>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hostelFees.length > 0 ? (
                      hostelFees.map(f => (
                        <tr key={f.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                          <td style={{ padding: '1rem', color: '#fff' }}>{f.hostel_type}</td>
                          <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{f.room_type}</td>
                          <td style={{ padding: '1rem' }}>₹{f.fee_per_year.toLocaleString()}</td>
                          <td style={{ padding: '1rem' }}>₹{f.mess_fee.toLocaleString()}</td>
                          <td style={{ padding: '1rem', fontWeight: 'bold', color: 'var(--primary)' }}>₹{f.amount.toLocaleString()}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>No Hostel Fees data available</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Always display One-Time Fees Section */}
            <div style={{ marginTop: '2.5rem' }}>
              <h4 style={{ marginBottom: '1rem', color: '#fff' }}>One-Time Fees Breakdown</h4>
              <div className="glass" style={{ padding: '0', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem' }}>
                  <thead>
                    <tr style={{ textAlign: 'left', background: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)' }}>
                      <th style={{ padding: '1rem' }}>Fee Name</th>
                      <th style={{ padding: '1rem' }}>Amount</th>
                      <th style={{ padding: '1rem' }}>Purpose</th>
                      <th style={{ padding: '1rem' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {oneTimeFees.length > 0 ? (
                      oneTimeFees.map(f => (
                        <tr key={f.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                          <td style={{ padding: '1rem', color: '#fff' }}>{f.fee_name}</td>
                          <td style={{ padding: '1rem', fontWeight: 'bold' }}>₹{f.amount.toLocaleString()}</td>
                          <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{f.purpose || 'General'}</td>
                          <td style={{ padding: '1rem' }}>
                            <span className="badge" style={{
                              background: f.refundable_status === 'Refundable' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                              color: f.refundable_status === 'Refundable' ? '#4ade80' : '#f87171',
                              borderColor: f.refundable_status === 'Refundable' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                              fontSize: '0.75rem'
                            }}>
                              {f.refundable_status || 'Non-Refundable'}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>No One-Time Fees data available</td>
                      </tr>
                    )}
                  </tbody>
                </table>
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
    </div >
  );

}

export default CollegeDetails;
