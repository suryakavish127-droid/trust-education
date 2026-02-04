import React, { useState } from 'react';

function Contact() {
    const [status, setStatus] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('Thank you! Our support team will reach out to you shortly.');
    };

    return (
        <div className="container animate-fade-in" style={{ padding: '4rem 0' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>
                <div>
                    <h1 className="gradient-text" style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>Get in Touch</h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '3rem' }}>
                        Have questions about a specific college or need help with the platform? Our guidance counselors are ready to help.
                    </p>

                    <div style={{ display: 'grid', gap: '2rem' }}>
                        <div className="glass" style={{ padding: '1.5rem', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                            <div style={{ fontSize: '2rem' }}>📍</div>
                            <div>
                                <h4 style={{ margin: 0 }}>Our Office</h4>
                                <p style={{ margin: 0, color: 'var(--text-secondary)' }}>123 Academy Way, Education Hub, TN 600001</p>
                            </div>
                        </div>
                        <div className="glass" style={{ padding: '1.5rem', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                            <div style={{ fontSize: '2rem' }}>📞</div>
                            <div>
                                <h4 style={{ margin: 0 }}>Call Us</h4>
                                <p style={{ margin: 0, color: 'var(--text-secondary)' }}>+91 98765 43210</p>
                            </div>
                        </div>
                        <div className="glass" style={{ padding: '1.5rem', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                            <div style={{ fontSize: '2rem' }}>✉️</div>
                            <div>
                                <h4 style={{ margin: 0 }}>Email Us</h4>
                                <p style={{ margin: 0, color: 'var(--text-secondary)' }}>support@academicguidance.com</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="glass" style={{ padding: '3rem' }}>
                    <h3 style={{ marginBottom: '2rem' }}>Send us a Message</h3>
                    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem' }}>
                        <div>
                            <label>Full Name</label>
                            <input required placeholder="Enter your name" />
                        </div>
                        <div>
                            <label>Email Address</label>
                            <input type="email" required placeholder="email@example.com" />
                        </div>
                        <div>
                            <label>Subject</label>
                            <select>
                                <option>College Enquiry</option>
                                <option>Technical Support</option>
                                <option>Partnership</option>
                                <option>Other</option>
                            </select>
                        </div>
                        <div>
                            <label>Message</label>
                            <textarea rows="5" placeholder="How can we help you?"></textarea>
                        </div>
                        <button className="btn btn-primary" style={{ width: '100%' }}>Send Message</button>
                    </form>
                    {status && <div style={{ marginTop: '1.5rem', color: '#4ade80', textAlign: 'center' }}>{status}</div>}
                </div>
            </div>
        </div>
    );
}

export default Contact;
