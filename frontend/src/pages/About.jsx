import React from 'react';

function About() {
    return (
        <div className="container animate-fade-in" style={{ padding: '4rem 0' }}>
            <div className="glass" style={{ padding: '4rem', textAlign: 'center', marginBottom: '4rem' }}>
                <h1 className="gradient-text" style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>Empowering Future Scholars</h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '800px', margin: '0 auto', lineHeight: '1.8' }}>
                    Advanced Academic Guidance is a premium platform dedicated to bridging the gap between students and their ideal educational institutions. We provide transparent fee structures, detailed campus insights, and professional guidance to help you make the most important decision of your life.
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem' }}>
                <div className="glass" style={{ padding: '2rem' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎯</div>
                    <h3>Our Mission</h3>
                    <p style={{ color: 'var(--text-secondary)' }}>To provide 100% transparency in college admissions and fee structures across the nation.</p>
                </div>
                <div className="glass" style={{ padding: '2rem' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👁️‍🗨️</div>
                    <h3>Our Vision</h3>
                    <p style={{ color: 'var(--text-secondary)' }}>To become the world's most trusted advisor for higher education and career planning.</p>
                </div>
                <div className="glass" style={{ padding: '2rem' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🤝</div>
                    <h3>Our Values</h3>
                    <p style={{ color: 'var(--text-secondary)' }}>Integrity, Student-First approach, and data-driven decision making.</p>
                </div>
            </div>
        </div>
    );
}

export default About;
