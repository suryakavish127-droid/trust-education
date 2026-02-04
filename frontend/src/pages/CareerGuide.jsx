import React, { useState } from 'react';

function CareerGuide() {
    // State for the existing analyzer
    const [percentage, setPercentage] = useState('');
    const [stream, setStream] = useState('');
    const [interests, setInterests] = useState('');
    const [result, setResult] = useState(null);

    // State for the Interactive Counselor
    const [counselorStep, setCounselorStep] = useState(0); // 0: Not started, 1: Background, 2: Strengths, 3: Goals, 4: Result
    const [counselorData, setCounselorData] = useState({
        background: '',
        strengths: [],
        goals: '',
        interestArea: ''
    });

    const guides = [
        { title: 'The Future of AI & Tech', desc: 'Why Computer Science is still the top choice for 2026.' },
        { title: 'Choosing the Right District', desc: 'Evaluating living costs vs education quality.' },
        { title: 'Management vs Engineering', desc: 'A guide to picking your professional path.' },
        { title: 'Skills Beyond Degree', desc: 'Soft skills that employers actually look for in freshers.' }
    ];

    // Helpers for course generation
    const createCourse = (name, desc, baseFee, exam, p = 85) => {
        let scholarship = "State Govt / Institutional Merit Scholarship available.";
        let reducedFee = baseFee;
        let eligible = p >= 80;
        if (eligible) reducedFee = baseFee * 0.8;
        return {
            name, desc, fee: baseFee, reducedFee,
            scholarship, scholarshipEligible: eligible,
            exam, hasExam: exam && exam !== 'Merit-based'
        };
    };

    const handleCounselorNext = () => setCounselorStep(prev => prev + 1);

    const analyzeCounselorProfile = () => {
        const { background, strengths, goals } = counselorData;
        let recs = [];
        let summary = "";

        if (background === 'Computer Science' || strengths.includes('Logic')) {
            summary = "Based on your logical strengths, you are a natural fit for technical and analytical domains.";
            recs = [
                {
                    fieldName: 'Tech & Innovation', list: [
                        createCourse('B.E. Computer Science', 'Best for building software and AI systems.', 150000, 'TNEA/JEE'),
                        createCourse('B.Sc. Data Science', 'Focuses on extracting insights from big data.', 60000, 'Merit-based')
                    ]
                }
            ];
        } else if (background === 'Biology' || strengths.includes('Patience')) {
            summary = "Your patience and background suggest a strong potential in healthcare and lifesciences.";
            recs = [
                {
                    fieldName: 'Medical & Life Sciences', list: [
                        createCourse('Bachelor of Physiotherapy', 'Revitalizing lives through physical therapy.', 80000, 'Entrance/Merit'),
                        createCourse('B.Sc. Biotechnology', 'Interdisciplinary biology and technology track.', 50000, 'Merit-based')
                    ]
                }
            ];
        } else if (background === 'Commerce' || strengths.includes('Communication')) {
            summary = "Your communication skills and commerce background point towards leadership and finance roles.";
            recs = [
                {
                    fieldName: 'Management & Finance', list: [
                        createCourse('BBA (Management)', 'Gateway to corporate management roles.', 70000, 'Merit-based'),
                        createCourse('B.Com Honors', 'Specialized accounting and finance track.', 45000, 'Merit-based')
                    ]
                }
            ];
        } else {
            summary = "Your creative profile suggests a career in design, media or legal studies.";
            recs = [
                {
                    fieldName: 'Creative & Legal', list: [
                        createCourse('B.Des (Product Design)', 'Creating functional and beautiful products.', 120000, 'NID/NIFT'),
                        createCourse('B.A. Journalism', 'Telling stories that matter to the world.', 40000, 'Merit-based')
                    ]
                }
            ];
        }

        return { summary, recs };
    };

    const analyzeProfile = () => {
        const p = parseFloat(percentage);
        if (isNaN(p)) return alert('Enter valid percentage');

        const createC = (name, desc, fee, exam, type) => {
            let resFee = fee;
            let elig = false;
            if (p > 90) { resFee = fee * 0.5; elig = true; }
            else if (p > 75) { resFee = fee * 0.8; elig = true; }
            return { name, desc, fee, reducedFee: resFee, scholarship: "Merit-based Grant", scholarshipEligible: elig, exam, hasExam: exam !== 'Merit' };
        };

        let catRecs = [];
        if (stream === 'Computer Science') {
            catRecs = [
                { fieldName: 'Engineering', list: [createC('B.E. CSE', 'Core tech.', 150000, 'TNEA', 'eng')] },
                { fieldName: 'Arts & Science', list: [createC('BCA', 'App dev.', 50000, 'Merit', 'arts')] }
            ];
        } else if (stream === 'Biology') {
            catRecs = [{ fieldName: 'Medical', list: [createC('MBBS', 'Medicine.', 200000, 'NEET', 'med')] }];
        } else if (stream === 'Commerce') {
            catRecs = [{ fieldName: 'Professional', list: [createC('B.Com(PA)', 'Audit.', 60000, 'Merit', 'prof')] }];
        } else {
            catRecs = [{ fieldName: 'Arts', list: [createC('B.A. English', 'Lit.', 20000, 'Merit', 'arts')] }];
        }

        setResult({
            level: p > 80 ? 'High' : 'Medium',
            rationale: `Analysis for ${stream} background with ${p}% score.`,
            recommendedCourses: catRecs,
            color: p > 80 ? '#4ade80' : '#fbbf24'
        });
    };

    const counselorResult = counselorStep === 4 ? analyzeCounselorProfile() : null;

    return (
        <div className="container animate-fade-in" style={{ padding: '4rem 0' }}>
            <h1 className="gradient-text" style={{ fontSize: '3rem', marginBottom: '1rem' }}>Career & Course Compass</h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '4rem', fontSize: '1.2rem' }}>Navigate your future with AI-driven insights and professional guidance.</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '4rem' }}>
                {/* Mode 1: Analyzer */}
                <div className="glass" style={{ padding: '2.5rem', border: '1px solid rgba(167, 139, 250, 0.3)' }}>
                    <h2 style={{ color: 'var(--primary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <span>📊</span> Quick Skill Analyzer
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '2rem' }}>Get instant calculations for fees, scholarships, and exam eligibility based on your percentage.</p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontSize: '0.85rem' }}>Stream</label>
                            <select value={stream} onChange={e => setStream(e.target.value)} className="input" style={{ width: '100%' }}>
                                <option value="">Select</option>
                                <option value="Computer Science">Computer Science</option>
                                <option value="Biology">Biology</option>
                                <option value="Commerce">Commerce</option>
                                <option value="Arts">Arts</option>
                            </select>
                        </div>
                        <div>
                            <label style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontSize: '0.85rem' }}>Percentage (%)</label>
                            <input type="number" value={percentage} onChange={e => setPercentage(e.target.value)} className="input" style={{ width: '100%' }} placeholder="e.g. 85" />
                        </div>
                        <button onClick={analyzeProfile} className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>Generate Report</button>
                    </div>
                </div>

                {/* Mode 2: Counselor */}
                <div className="glass" style={{ padding: '2.5rem', border: '1px solid rgba(244, 114, 182, 0.3)' }}>
                    <h2 style={{ color: 'var(--secondary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <span>🎓</span> Friendly Career Counselor
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '2rem' }}>Undecided? Let's chat! I'll help you find the perfect path based on who you are.</p>

                    <div style={{ minHeight: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        {counselorStep === 0 && (
                            <div style={{ textAlign: 'center' }}>
                                <button onClick={() => setCounselorStep(1)} className="btn btn-secondary" style={{ padding: '1rem 2rem' }}>Start Counseling Session</button>
                            </div>
                        )}

                        {counselorStep === 1 && (
                            <div className="animate-fade-in">
                                <h3 style={{ color: 'white', marginBottom: '1.5rem', fontSize: '1.1rem' }}>Counselor: "Tell me, what did you study in 12th?"</h3>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    {['Computer Science', 'Biology', 'Commerce', 'Arts'].map(s => (
                                        <button key={s} onClick={() => { setCounselorData({ ...counselorData, background: s }); handleCounselorNext(); }} className="btn btn-outline" style={{ padding: '0.75rem' }}>{s}</button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {counselorStep === 2 && (
                            <div className="animate-fade-in">
                                <h3 style={{ color: 'white', marginBottom: '1.5rem', fontSize: '1.1rem' }}>Counselor: "What are your core strengths?"</h3>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    {['Logic & Math', 'Creativity', 'Communication', 'Patience'].map(s => (
                                        <button key={s} onClick={() => { setCounselorData({ ...counselorData, strengths: [...counselorData.strengths, s] }); handleCounselorNext(); }} className="btn btn-outline" style={{ padding: '0.75rem' }}>{s}</button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {counselorStep === 3 && (
                            <div className="animate-fade-in">
                                <h3 style={{ color: 'white', marginBottom: '1.5rem', fontSize: '1.1rem' }}>Counselor: "What's your ultimate career goal?"</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    {['Innovation & Tech', 'Healthcare', 'Business Empire', 'Social Impact'].map(s => (
                                        <button key={s} onClick={() => { setCounselorData({ ...counselorData, goals: s }); handleCounselorNext(); }} className="btn btn-outline" style={{ padding: '0.75rem' }}>{s}</button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {counselorStep === 4 && (
                            <div className="animate-fade-in" style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✨</div>
                                <h3 style={{ color: 'white', marginBottom: '1rem' }}>Analysis Complete!</h3>
                                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>I have carefully matched your personality with the best courses.</p>
                                <button onClick={() => setCounselorStep(0)} className="btn btn-outline" style={{ marginRight: '1rem' }}>Restart</button>
                                <button className="btn btn-primary" onClick={() => window.scrollTo(0, document.body.scrollHeight)}>View Suggestions</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Results Display */}
            {(result || counselorResult) && (
                <div className="animate-fade-in glass" style={{ padding: '3rem', borderRadius: '2rem', border: '1px solid var(--primary)' }}>
                    <div style={{ marginBottom: '3rem', borderLeft: '5px solid var(--primary)', paddingLeft: '2rem' }}>
                        <h2 style={{ color: 'white', marginBottom: '1rem' }}>Your Personalized Academic Roadmap</h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>{result ? result.rationale : counselorResult.summary}</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
                        {(result ? result.recommendedCourses : counselorResult.recs).map((category, idx) => (
                            <div key={idx}>
                                <h4 style={{ color: 'var(--primary)', marginBottom: '1.5rem', borderBottom: '1px solid #333', paddingBottom: '0.5rem' }}>{category.fieldName}</h4>
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    {category.list.map((course, i) => (
                                        <li key={i} style={{ marginBottom: '1.5rem', padding: '1.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.1)' }}>
                                            <div style={{ color: 'white', fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '0.5rem' }}>{course.name}</div>
                                            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.2rem' }}>{course.desc}</div>

                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.8rem' }}>
                                                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '0.75rem', borderRadius: '0.6rem' }}>
                                                    <div style={{ color: 'var(--primary)', fontWeight: 'bold' }}>Fee</div>
                                                    <div style={{ color: 'white' }}>₹{course.fee.toLocaleString()}</div>
                                                    {course.scholarshipEligible && <div style={{ color: '#4ade80' }}>↳ ₹{course.reducedFee.toLocaleString()}*</div>}
                                                </div>
                                                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '0.75rem', borderRadius: '0.6rem' }}>
                                                    <div style={{ color: '#fbbf24', fontWeight: 'bold' }}>Entrance</div>
                                                    <div style={{ color: 'white' }}>{course.exam}</div>
                                                </div>
                                                <div style={{ gridColumn: 'span 2', background: 'rgba(74, 222, 128, 0.1)', padding: '0.75rem', borderRadius: '0.6rem' }}>
                                                    <div style={{ color: '#4ade80', fontWeight: 'bold' }}>Scholarship</div>
                                                    <div style={{ color: 'var(--text-secondary)' }}>{course.scholarship}</div>
                                                </div>
                                            </div>
                                            {course.hasExam && (
                                                <button className="btn btn-outline" style={{ width: '100%', marginTop: '1rem', padding: '0.5rem', fontSize: '0.85rem', borderColor: 'var(--secondary)', color: 'var(--secondary)' }}>Apply for Qualifying Exam</button>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div style={{ marginTop: '5rem' }}>
                <h2 className="gradient-text" style={{ marginBottom: '2rem' }}>Expert Resources</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
                    {guides.map((g, idx) => (
                        <div key={idx} className="glass card-hover" style={{ padding: '2.5rem' }}>
                            <h3 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>{g.title}</h3>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>{g.desc}</p>
                            <button className="btn btn-outline">Read Full Guide</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CareerGuide;
