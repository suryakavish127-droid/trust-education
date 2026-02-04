import React from 'react';

function Scholarships() {
    const scholarships = [
        { name: 'Merit-Cum-Means', amount: 'Up to ₹50,000', eligibility: 'GPA > 8.5, Income < 2L', provider: 'Government' },
        { name: 'STEM Excellence', amount: '100% Tuition', eligibility: 'Top 1% in Entrance', provider: 'Private Corporate' },
        { name: 'Sports Quota Gold', amount: 'Fixed ₹25,000', eligibility: 'National Level Athlete', provider: 'University' },
        { name: 'First Graduate', amount: 'Fixed ₹20,000', eligibility: 'No graduates in family', provider: 'State Gov' }
    ];

    return (
        <div className="container animate-fade-in" style={{ padding: '4rem 0' }}>
            <div className="glass" style={{ padding: '3rem', marginBottom: '4rem', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)' }}>
                <h1 className="gradient-text" style={{ fontSize: '3rem' }}>Scholarship & Financial Aid</h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Don't let finances stop your dreams. Explore various aids available for you.</p>
            </div>

            <div style={{ display: 'grid', gap: '2rem' }}>
                {scholarships.map((s, idx) => (
                    <div key={idx} className="glass" style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h3 style={{ margin: '0 0 0.5rem 0' }}>{s.name}</h3>
                            <p style={{ margin: 0, color: 'var(--text-secondary)' }}><strong>Eligibility:</strong> {s.eligibility}</p>
                            <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem' }}><span className="badge">{s.provider}</span></p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <h2 style={{ margin: 0, color: 'var(--primary)' }}>{s.amount}</h2>
                            <button className="btn btn-primary" style={{ marginTop: '1rem' }}>Apply Now</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Scholarships;
