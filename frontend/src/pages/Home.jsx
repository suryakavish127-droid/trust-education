import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
  // Persistence Helpers
  const getSavedState = (key, initial) => {
    try {
      const saved = sessionStorage.getItem(key);
      return saved ? JSON.parse(saved) : initial;
    } catch (e) {
      return initial;
    }
  };

  const [colleges, setColleges] = useState(() => getSavedState('home_colleges', []));
  const [filters, setFilters] = useState(() => getSavedState('home_filters', {
    degree: '',
    district: '',
    minFee: 0,
    maxFee: 200000
  }));

  // Dynamic lists for dropdowns
  const [districts, setDistricts] = useState([]);
  const [degrees, setDegrees] = useState([]);

  // New State for Category Feature
  const [showCategories, setShowCategories] = useState(() => getSavedState('home_showCategories', false));
  const [categories, setCategories] = useState([]); // Options don't need persistence, fetched on demand
  const [activeLevel, setActiveLevel] = useState(() => getSavedState('home_activeLevel', null));
  const [selectedCategory, setSelectedCategory] = useState(() => getSavedState('home_selectedCategory', null));

  // Searchable Dropdown State
  const [degreeSearch, setDegreeSearch] = useState(() => getSavedState('home_degreeSearch', ''));
  const [showDegreeDropdown, setShowDegreeDropdown] = useState(false);

  // Save State on Change
  useEffect(() => {
    sessionStorage.setItem('home_colleges', JSON.stringify(colleges));
    sessionStorage.setItem('home_filters', JSON.stringify(filters));
    sessionStorage.setItem('home_showCategories', JSON.stringify(showCategories));
    sessionStorage.setItem('home_activeLevel', JSON.stringify(activeLevel));
    sessionStorage.setItem('home_selectedCategory', JSON.stringify(selectedCategory));
    sessionStorage.setItem('home_degreeSearch', JSON.stringify(degreeSearch));
  }, [colleges, filters, showCategories, activeLevel, selectedCategory, degreeSearch]);

  useEffect(() => {
    fetchOptions();

    // Only fetch default colleges if we haven't visited before in this session
    // AND if we don't have existing results saved.
    // This allows "Back" button to show exactly what was left.
    const hasVisited = sessionStorage.getItem('home_visited');
    if (!hasVisited) {
      fetchColleges();
      sessionStorage.setItem('home_visited', 'true');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = () => {
    fetchColleges();
  };

  const fetchOptions = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/colleges/options');
      setDistricts(res.data.districts);
      setDegrees(res.data.degrees);
    } catch (err) {
      console.error('Error fetching options:', err);
    }
  };

  const fetchColleges = async () => {
    try {
      const params = new URLSearchParams();
      if (filters.degree) params.append('degree', filters.degree);
      if (filters.district) params.append('district', filters.district);
      params.append('minFee', filters.minFee);
      params.append('maxFee', filters.maxFee);

      const res = await axios.get(`http://localhost:5000/api/colleges/filter?${params.toString()}`);

      let data = res.data;

      // Client-side filtering for UG/PG if active
      if (activeLevel === 'UG') {
        data = data.filter(c => c.degree.startsWith('B')); // Approx logic for UG
      } else if (activeLevel === 'PG') {
        data = data.filter(c => c.degree.startsWith('M')); // Approx logic for PG
      }

      // Client-side filtering for Selected Category
      if (selectedCategory) {
        data = data.filter(c => {
          const name = c.college_name || '';
          const desc = c.description || '';

          if (selectedCategory === 'Engineering') {
            return name.includes('Engineering') || name.includes('Technology') || desc.includes('Engineering');
          }
          if (selectedCategory === 'Medical') {
            return name.includes('Medical') || name.includes('Hospital') || name.includes('Nursing');
          }
          if (selectedCategory === 'Management') {
            return desc.includes('Category: Management') || name.includes('Management') || c.degree.includes('BBA') || c.degree.includes('MBA');
          }
          if (selectedCategory === 'Arts & Science') {
            return desc.includes('Category: Science') || desc.includes('Category: Commerce') || desc.includes('Category: Arts') || desc.includes('Category: Media') || c.degree.includes('B.Sc') || c.degree.includes('B.A') || c.degree.includes('B.Com');
          }
          return false;
        });
      }

      setColleges(data);
    } catch (err) {
      console.error(err);
    }
  };


  const handleCategoryClick = async () => {
    if (!showCategories) {
      try {
        const res = await axios.get('http://localhost:5000/api/colleges/categories');
        setCategories(res.data);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    }
    setShowCategories(!showCategories);
  };

  const selectCategory = (categoryName) => {
    if (selectedCategory === categoryName) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(categoryName);
      // Reset degree search/filter when changing category
      setDegreeSearch('');
      setFilters(prev => ({ ...prev, degree: '' }));
    }
  };



  // Helper for fuzzy search / abbreviations
  const getFilteredDegrees = () => {
    let availableDegrees = degrees;

    // First, filter by Category if selected
    if (selectedCategory) {
      availableDegrees = degrees.filter(d => {
        const degree = d.toLowerCase();
        if (selectedCategory === 'Engineering') {
          return degree.includes('b.e') || degree.includes('b.tech') || degree.includes('m.e') || degree.includes('m.tech') || degree.includes('architecture');
        }
        if (selectedCategory === 'Medical') {
          return degree.includes('mbbs') || degree.includes('bds') || degree.includes('pharm') || degree.includes('nursing') || degree.includes('allied health') || degree.includes('bpt');
        }
        if (selectedCategory === 'Arts & Science') {
          return degree.includes('b.sc') || degree.includes('b.a') || degree.includes('b.com') || degree.includes('bca') || degree.includes('m.sc') || degree.includes('m.a') || degree.includes('m.com') || degree.includes('mca');
        }
        if (selectedCategory === 'Management') {
          return degree.includes('bba') || degree.includes('mba');
        }
        return true;
      });
    }

    // Then apply Search Filter
    if (!degreeSearch) return availableDegrees;

    const term = degreeSearch.toLowerCase();

    // Define common abbreviations map
    const abbrMap = {
      'ai': ['artificial intelligence', 'ai'],
      'ds': ['data science', 'ds'],
      'ml': ['machine learning', 'ml'],
      'it': ['information technology', 'it'],
      'cse': ['computer science', 'cse'],
      'ece': ['electronics', 'ece'],
      'eee': ['electrical', 'eee'],
      'mech': ['mechanical', 'mech'],
      'civil': ['civil engineering'],
      'b.sc': ['b.sc'],
      'm.sc': ['m.sc'],
      'b.e': ['b.e'],
      'b.tech': ['b.tech'],
      'eng': ['engineering', 'english']
    };

    // Check if term matches an abbreviation key (partial or full)
    let searchTerms = [term];
    Object.keys(abbrMap).forEach(key => {
      if (key.includes(term) || term.includes(key)) {
        searchTerms = [...searchTerms, ...abbrMap[key]];
      }
    });

    return availableDegrees.filter(degree => {
      const d = degree.toLowerCase();
      return searchTerms.some(st => d.includes(st));
    });
  };

  const filteredDegrees = getFilteredDegrees();

  const handleDegreeSelect = (degree) => {
    setFilters({ ...filters, degree });
    setDegreeSearch(degree);
    setShowDegreeDropdown(false);
  };

  // ... existing useEffects ...

  // (This part is conceptually merging into existing code, the below replacement covers the render and clear function)

  // ...

  return (
    <div className="container animate-fade-in">
      {/* Hero Section */}
      <div className="hero">
        <h1 className="gradient-text">Find Your Dream College</h1>
        <p>Compare fees, explore campuses, and make the right choice for your future across multiple districts and degrees.</p>

        {/* New Feature Buttons */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <button
            className={`btn ${showCategories ? 'btn-primary' : 'btn-outline'}`}
            onClick={handleCategoryClick}
          >
            {showCategories ? 'Hide Categories' : '🎓 College Categories'}
          </button>

          <button
            className={`btn ${activeLevel === 'UG' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setActiveLevel(activeLevel === 'UG' ? null : 'UG')}
          >
            📚 UG Courses
          </button>

          <button
            className={`btn ${activeLevel === 'PG' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setActiveLevel(activeLevel === 'PG' ? null : 'PG')}
          >
            🎓 PG Courses
          </button>
        </div>

        {/* Category Grid (Collapsible) */}
        {showCategories && (
          <div className="glass animate-fade-in" style={{ padding: '2rem', marginBottom: '2rem', background: 'rgba(255,255,255,0.05)' }}>
            <h3 style={{ marginTop: 0, marginBottom: '1.5rem', textAlign: 'center' }}>Explore by Category</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
              {categories.map((cat, idx) => (
                <div
                  key={idx}
                  className="glass glass-hover"
                  onClick={() => selectCategory(cat.name)}
                  style={{
                    padding: '1.5rem',
                    textAlign: 'center',
                    cursor: 'pointer',
                    background: selectedCategory === cat.name ? 'rgba(99, 102, 241, 0.4)' : 'rgba(0,0,0,0.2)',
                    border: selectedCategory === cat.name ? '2px solid var(--primary)' : '1px solid transparent',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{cat.icon}</div>
                  <div style={{ fontWeight: 'bold' }}>{cat.name}</div>
                </div>
              ))}
            </div>
            {selectedCategory && (
              <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                <p style={{ color: 'var(--primary)', fontWeight: 'bold' }}>
                  Filtering by {selectedCategory} • <span style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => setSelectedCategory(null)}>Clear</span>
                </p>
              </div>
            )}
          </div>
        )}

        <div style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', gap: '1rem' }}>

          {/* Custom Searchable Dropdown for Degrees */}
          <div style={{ position: 'relative', flex: 1 }}>
            {showDegreeDropdown && (
              <div
                style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 999 }}
                onClick={() => setShowDegreeDropdown(false)}
              />
            )}
            <input
              type="text"
              value={degreeSearch}
              onChange={(e) => {
                setDegreeSearch(e.target.value);
                setShowDegreeDropdown(true);
                if (e.target.value === '') setFilters({ ...filters, degree: '' });
              }}
              onFocus={() => setShowDegreeDropdown(true)}
              placeholder="Search Degree (e.g. AI, B.Sc)..."
              className="glass"
              style={{ width: '100%', cursor: 'text', paddingRight: '2.5rem' }}
            />
            {filters.degree ? (
              <button
                onClick={() => {
                  setFilters({ ...filters, degree: '' });
                  setDegreeSearch('');
                }}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  fontSize: '1.2rem',
                  zIndex: 10
                }}
              >
                ×
              </button>
            ) : (
              <div
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  pointerEvents: 'none',
                  color: 'var(--text-secondary)'
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
            )}

            {showDegreeDropdown && (
              <div className="glass" style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                marginTop: '4px',
                maxHeight: '300px',
                overflowY: 'auto',
                zIndex: 1000,
                padding: '4px 0',
                background: '#202020',
                border: '1px solid #404040',
                borderRadius: '6px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                backdropFilter: 'none',
                WebkitBackdropFilter: 'none'
              }}>
                {filteredDegrees.length > 0 ? (
                  filteredDegrees.map(d => (
                    <div
                      key={d}
                      onClick={() => handleDegreeSelect(d)}
                      className="dropdown-item"
                      style={{
                        padding: '8px 12px',
                        cursor: 'default', // Native feeling
                        transition: 'background 0.1s',
                        color: '#f3f4f6',
                        fontSize: '0.95rem',
                        fontFamily: 'inherit'
                      }}
                      onMouseEnter={(e) => e.target.style.background = '#374151'}
                      onMouseLeave={(e) => e.target.style.background = 'transparent'}
                    >
                      {d}
                    </div>
                  ))
                ) : (
                  <div style={{ padding: '8px 12px', textAlign: 'center', color: '#9ca3af', fontSize: '0.9rem' }}>
                    No degrees found
                  </div>
                )}
              </div>
            )}
          </div>

          <select
            value={filters.district}
            onChange={e => setFilters({ ...filters, district: e.target.value })}
            className="glass"
            style={{ flex: 1 }}
          >
            <option value="">All Districts</option>
            {districts.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>

          <button
            className="btn btn-primary"
            onClick={handleSearch}
            style={{ padding: '0.9rem 2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            Search
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 1fr) 3fr', gap: '3rem' }}>

        {/* Sidebar Filters */}
        <aside>
          <div className="glass" style={{ padding: '2rem', position: 'sticky', top: '2rem' }}>
            <h3 style={{ marginTop: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
              Quick Filters
            </h3>

            <div style={{ marginBottom: '2rem' }}>
              <label>Max Annual Fee: <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>₹{filters.maxFee.toLocaleString()}</span></label>
              <input
                type="range"
                min="0"
                max="200000"
                step="5000"
                value={filters.maxFee}
                onChange={e => setFilters({ ...filters, maxFee: Number(e.target.value) })}
                style={{ cursor: 'pointer' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                <span>₹0</span>
                <span>₹2L+</span>
              </div>
            </div>

            <button className="btn btn-outline" style={{ width: '100%' }} onClick={() => {
              setFilters({ degree: '', district: '', minFee: 0, maxFee: 200000 });
              setActiveLevel(null);
              setDegreeSearch('');
              // Clear storage as well to reset "Back" state
              sessionStorage.removeItem('home_colleges');
              sessionStorage.removeItem('home_filters');
              sessionStorage.removeItem('home_activeLevel');
              sessionStorage.removeItem('home_selectedCategory');
              sessionStorage.removeItem('home_degreeSearch');
              sessionStorage.removeItem('home_showCategories');
              sessionStorage.removeItem('home_visited'); // Allow fresh fetch next time if needed
            }}>
              Clear All Filters
            </button>

            <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '0.75rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Total {colleges.length} colleges found matching your criteria.
            </div>
          </div>
        </aside>

        {/* College Grid */}
        <main>
          <div className="card-grid">
            {colleges.map(college => (
              <div key={college.college_id} className="glass college-card glass-hover">
                <div style={{ marginBottom: '1rem' }}>
                  <span className="badge">{college.degree}</span>
                </div>
                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem' }}>{college.college_name}</h3>
                <p style={{ margin: '0 0 1.5rem 0', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  {college.district}
                </p>

                <div style={{ marginTop: 'auto', paddingTop: '1.5rem', borderTop: '1px solid var(--glass-border)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Annual Fee</span>
                      <span style={{ fontWeight: '800', fontSize: '1.4rem', color: 'white' }}>₹{college.fees.toLocaleString()}</span>
                      <span style={{ marginLeft: '0.5rem', color: 'var(--text-secondary)' }}>Hostel: ₹{college.hostel_fees?.toLocaleString() || '0'}</span>
                      <span style={{ marginLeft: '0.5rem', color: 'var(--text-secondary)' }}>One‑Time: ₹{college.one_time_fees?.toLocaleString() || '0'}</span>
                    </div>
                    <Link to={`/college/${college.college_id}`}>
                      <button className="btn btn-primary">Details</button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
            {colleges.length === 0 && (
              <div className="glass" style={{ gridColumn: '1 / -1', padding: '4rem', textAlign: 'center' }}>
                <h3 style={{ color: 'var(--text-secondary)' }}>No colleges match your criteria</h3>
                <p>Try adjusting your filters or resetting them.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Home;
