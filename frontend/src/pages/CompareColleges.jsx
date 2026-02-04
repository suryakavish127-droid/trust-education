import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CompareColleges() {
    const [colleges, setColleges] = useState([]);
    const [selected, setSelected] = useState([null, null]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/colleges').then(res => setColleges(res.data));
    }, []);

    const handleSelect = (idx, id) => {
        const col = colleges.find(c => c.college_id === parseInt(id));
        const newSelected = [...selected];
        newSelected[idx] = col;
        setSelected(newSelected);
    };

    return (
        <div className="container animate-fade-in" style={{ padding: '4rem 0' }}>
            <h1 className="gradient-text" style={{ fontSize: '3rem', marginBottom: '3rem' }}>Side-by-Side Comparison</h1>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '4rem' }}>
                {[0, 1].map(idx => (
                    <div key={idx} className="glass" style={{ padding: '2rem' }}>
                        <label style={{ display: 'block', marginBottom: '1rem' }}>Select College {idx + 1}</label>
                        <select onChange={(e) => handleSelect(idx, e.target.value)} style={{ width: '100%' }}>
                            <option value="">-- Choose a College --</option>
                            {colleges.map(c => <option key={c.college_id} value={c.college_id}>{c.college_name}</option>)}
                        </select>
                    </div>
                ))}
            </div>

            {selected[0] && selected[1] && (
                <div className="glass" style={{ padding: '2rem' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: 'rgba(255,255,255,0.05)' }}>
                                <th style={{ padding: '1.5rem', textAlign: 'left' }}>Feature</th>
                                <th style={{ padding: '1.5rem', textAlign: 'center' }}>{selected[0].college_name}</th>
                                <th style={{ padding: '1.5rem', textAlign: 'center' }}>{selected[1].college_name}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}><strong>Annual Fee</strong></td>
                                <td style={{ padding: '1.5rem', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>₹{selected[0].fees.toLocaleString()}</td>
                                <td style={{ padding: '1.5rem', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>₹{selected[1].fees.toLocaleString()}</td>
                            </tr>
                            <tr>
                                <td style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}><strong>District</strong></td>
                                <td style={{ padding: '1.5rem', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>{selected[0].district}</td>
                                <td style={{ padding: '1.5rem', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>{selected[1].district}</td>
                            </tr>
                            <tr>
                                <td style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}><strong>Degree Type</strong></td>
                                <td style={{ padding: '1.5rem', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>{selected[0].degree}</td>
                                <td style={{ padding: '1.5rem', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>{selected[1].degree}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default CompareColleges;
