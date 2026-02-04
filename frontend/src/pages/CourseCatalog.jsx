import React from 'react';

function CourseCatalog() {
    const courses = [
        { name: 'Computer Science', category: 'Engineering', demand: 'Very High', icon: '💻' },
        { name: 'Information Technology', category: 'Engineering', demand: 'High', icon: '🌐' },
        { name: 'Mechanical Engineering', category: 'Engineering', demand: 'Medium', icon: '⚙️' },
        { name: 'Civil Engineering', category: 'Engineering', demand: 'Medium', icon: '🏗️' },
        { name: 'MBA - Marketing', category: 'Management', demand: 'High', icon: '📈' },
        { name: 'MBA - Finance', category: 'Management', demand: 'High', icon: '💰' },
        { name: 'Psychology', category: 'Arts', demand: 'Medium', icon: '🧠' },
        { name: 'Bio-Technology', category: 'Science', demand: 'High', icon: '🧪' },
    ];

    return (
        <div className="container animate-fade-in" style={{ padding: '4rem 0' }}>
            <h1 className="gradient-text" style={{ fontSize: '3rem', marginBottom: '3rem' }}>Course Catalog</h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
                {courses.map((course, idx) => (
                    <div key={idx} className="glass card-hover" style={{ padding: '2rem' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>{course.icon}</div>
                        <h3 style={{ marginBottom: '0.5rem' }}>{course.name}</h3>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Category: {course.category}</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span className="badge" style={{ background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)' }}>{course.demand} Demand</span>
                            <button className="btn btn-outline" style={{ padding: '0.3rem 0.8rem', fontSize: '0.8rem' }}>View Colleges</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CourseCatalog;
