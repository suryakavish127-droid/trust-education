import React from 'react';

function PrivacyPolicy() {
    return (
        <div className="container animate-fade-in" style={{ padding: '4rem 0', maxWidth: '900px' }}>
            <div className="glass" style={{ padding: '4rem' }}>
                <h1 className="gradient-text">Privacy Policy</h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Last updated: January 2026</p>

                <div style={{ marginTop: '3rem', display: 'grid', gap: '2rem' }}>
                    <div>
                        <h3>1. Data Collection</h3>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>We collect information you provide directly to us through enquiry forms and contact requests. This include name, phone number, and email address.</p>
                    </div>
                    <div>
                        <h3>2. Use of Information</h3>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>The data is used solely to facilitate your admission process by sharing it with the respective educational institutions you've shown interest in.</p>
                    </div>
                    <div>
                        <h3>3. Data Protection</h3>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>We implement standard security measures to protect your data from unauthorized access or disclosure.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PrivacyPolicy;
