import React, { useState } from 'react';

function FAQ() {
    const [active, setActive] = useState(null);

    const faqs = [
        { q: "How do I compare colleges?", a: "Go to the 'Fee Structure' page or use the Home search. Soon we will launch a 1-to-1 comparison tool." },
        { q: "Are the fee structures up-to-date?", a: "Yes, we verify all fee data directly with college administration every academic cycle." },
        { q: "Is there a service fee for students?", a: "No, our platform is completely free for students and parents to use." },
        { q: "How can I contact a college through this site?", a: "Use the 'Inquiry Form' on any college details page. Our team will forward your request instantly." },
        { q: "What should I do if a college is not listed?", a: "You can send us a request via the Contact page, and we will try to onboard that institute." }
    ];

    return (
        <div className="container animate-fade-in" style={{ padding: '4rem 0', maxWidth: '800px' }}>
            <h1 className="gradient-text" style={{ fontSize: '3rem', marginBottom: '3rem', textAlign: 'center' }}>Frequently Asked Questions</h1>

            <div style={{ display: 'grid', gap: '1.5rem' }}>
                {faqs.map((f, idx) => (
                    <div key={idx} className="glass" style={{ padding: '0', cursor: 'pointer', overflow: 'hidden' }}>
                        <div
                            onClick={() => setActive(active === idx ? null : idx)}
                            style={{ padding: '1.5rem 2rem', background: active === idx ? 'rgba(255,255,255,0.05)' : 'transparent', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                        >
                            <h4 style={{ margin: 0 }}>{f.q}</h4>
                            <span style={{ transform: active === idx ? 'rotate(180deg)' : 'none', transition: '0.3s' }}>▼</span>
                        </div>
                        {active === idx && (
                            <div style={{ padding: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                                {f.a}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FAQ;
