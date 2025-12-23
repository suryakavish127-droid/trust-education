import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FeeExplorer() {
    const [data, setData] = useState({
        engineering: [],
        aviation: [],
        ugFees: [],
        pgFees: []
    });
    const [activeTab, setActiveTab] = useState('engineering');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAllData();
    }, []);

    const fetchAllData = async () => {
        setLoading(true);
        try {
            const [eng, avi, ug, pg] = await Promise.all([
                axios.get('http://localhost:5000/api/colleges/data/engineering'),
                axios.get('http://localhost:5000/api/colleges/data/aviation'),
                axios.get('http://localhost:5000/api/colleges/data/ug-fees'),
                axios.get('http://localhost:5000/api/colleges/data/pg-fees')
            ]);
            setData({
                engineering: eng.data,
                aviation: avi.data,
                ugFees: ug.data,
                pgFees: pg.data
            });
        } catch (err) {
            console.error('Error fetching fee data:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container animate-fade-in">
            <div className="glass" style={{ padding: '3rem', marginTop: '2rem' }}>
                <h1 className="gradient-text">Detailed Fee Structures</h1>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem' }}>
                    Explore course-wise fee details for Engineering, Aviation, UG, and PG programs.
                </p>

                <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
                    {['engineering', 'aviation', 'ugFees', 'pgFees'].map(tab => (
                        <button
                            key={tab}
                            className={`btn ${activeTab === tab ? 'btn-primary' : 'btn-outline'}`}
                            onClick={() => setActiveTab(tab)}
                            style={{ textTransform: 'capitalize' }}
                        >
                            {tab.replace(/([A-Z])/g, ' $1')}
                        </button>
                    ))}
                </div>

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '4rem' }}>
                        <h3 className="animate-pulse">Loading fee data...</h3>
                    </div>
                ) : (
                    <div className="glass" style={{ background: 'rgba(255,255,255,0.02)', overflow: 'hidden' }}>
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ textAlign: 'left', background: 'rgba(255,255,255,0.05)' }}>
                                        {activeTab === 'engineering' && (
                                            <>
                                                <th style={{ padding: '1.25rem' }}>Course Name</th>
                                                <th style={{ padding: '1.25rem' }}>Duration</th>
                                                <th style={{ padding: '1.25rem' }}>NIET Fee/Yr</th>
                                                <th style={{ padding: '1.25rem' }}>NIT Fee/Yr</th>
                                            </>
                                        )}
                                        {activeTab === 'aviation' && (
                                            <>
                                                <th style={{ padding: '1.25rem' }}>Course Name</th>
                                                <th style={{ padding: '1.25rem' }}>Duration (Years)</th>
                                                <th style={{ padding: '1.25rem' }}>Fee Per Sem</th>
                                            </>
                                        )}
                                        {activeTab === 'ugFees' && (
                                            <>
                                                <th style={{ padding: '1.25rem' }}>Course Name</th>
                                                <th style={{ padding: '1.25rem' }}>Stream</th>
                                                <th style={{ padding: '1.25rem' }}>Tuition Fee</th>
                                                <th style={{ padding: '1.25rem' }}>Total Fee</th>
                                            </>
                                        )}
                                        {activeTab === 'pgFees' && (
                                            <>
                                                <th style={{ padding: '1.25rem' }}>Programme Name</th>
                                                <th style={{ padding: '1.25rem' }}>Tuition Fee</th>
                                                <th style={{ padding: '1.25rem' }}>Other Fee</th>
                                                <th style={{ padding: '1.25rem' }}>Total Fee</th>
                                            </>
                                        )}
                                    </tr>
                                </thead>
                                <tbody>
                                    {data[activeTab].map((item, idx) => (
                                        <tr key={idx} style={{ borderTop: '1px solid var(--glass-border)' }}>
                                            {activeTab === 'engineering' && (
                                                <>
                                                    <td style={{ padding: '1.25rem', fontWeight: 'bold' }}>{item.course}</td>
                                                    <td style={{ padding: '1.25rem' }}>{item.years} Years</td>
                                                    <td style={{ padding: '1.25rem' }}>{item.niet_fee_year ? `₹${item.niet_fee_year.toLocaleString()}` : '-'}</td>
                                                    <td style={{ padding: '1.25rem' }}>{item.nit_fee_year ? `₹${item.nit_fee_year.toLocaleString()}` : '-'}</td>
                                                </>
                                            )}
                                            {activeTab === 'aviation' && (
                                                <>
                                                    <td style={{ padding: '1.25rem', fontWeight: 'bold' }}>{item.course}</td>
                                                    <td style={{ padding: '1.25rem' }}>{item.years}</td>
                                                    <td style={{ padding: '1.25rem' }}>₹{item.fee_per_sem.toLocaleString()}</td>
                                                </>
                                            )}
                                            {activeTab === 'ugFees' && (
                                                <>
                                                    <td style={{ padding: '1.25rem', fontWeight: 'bold' }}>{item.course_name}</td>
                                                    <td style={{ padding: '1.25rem' }}><span className="badge">{item.stream}</span></td>
                                                    <td style={{ padding: '1.25rem' }}>₹{item.tuition_fee.toLocaleString()}</td>
                                                    <td style={{ padding: '1.25rem', color: 'white', fontWeight: 'bold' }}>₹{item.total_fee.toLocaleString()}</td>
                                                </>
                                            )}
                                            {activeTab === 'pgFees' && (
                                                <>
                                                    <td style={{ padding: '1.25rem', fontWeight: 'bold' }}>{item.programme_name}</td>
                                                    <td style={{ padding: '1.25rem' }}>₹{item.tuition_fee.toLocaleString()}</td>
                                                    <td style={{ padding: '1.25rem' }}>₹{item.other_fee.toLocaleString()}</td>
                                                    <td style={{ padding: '1.25rem', color: 'white', fontWeight: 'bold' }}>₹{item.total_fee.toLocaleString()}</td>
                                                </>
                                            )}
                                        </tr>
                                    ))}
                                    {data[activeTab].length === 0 && (
                                        <tr>
                                            <td colSpan="4" style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                                                No records found. Make sure the database is synced.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default FeeExplorer;
