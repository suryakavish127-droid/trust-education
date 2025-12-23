const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all colleges
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM colleges');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching colleges:', err);
    res.status(500).json({ error: err.message });
  }
});

// Filter colleges
router.get('/filter', async (req, res) => {
  const { degree, district, minFee, maxFee } = req.query;
  let query = 'SELECT * FROM colleges WHERE 1=1';
  const params = [];

  if (degree) {
    query += ' AND degree = ?';
    params.push(degree);
  }
  if (district) {
    query += ' AND district = ?';
    params.push(district);
  }
  if (minFee && maxFee) {
    query += ' AND fees BETWEEN ? AND ?';
    params.push(minFee, maxFee);
  } else if (minFee) {
    query += ' AND fees >= ?';
    params.push(minFee);
  } else if (maxFee) {
    query += ' AND fees <= ?';
    params.push(maxFee);
  }

  try {
    const [rows] = await db.execute(query, params);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get unique districts and degrees for filters
router.get('/options', async (req, res) => {
  try {
    const [districts] = await db.query('SELECT DISTINCT district FROM colleges ORDER BY district');
    const [degrees] = await db.query('SELECT DISTINCT degree FROM colleges ORDER BY degree');
    res.json({
      districts: districts.map(d => d.district).filter(Boolean),
      degrees: degrees.map(d => d.degree).filter(Boolean)
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get college categories
router.get('/categories', async (req, res) => {
  try {
    const categories = [
      { name: 'Engineering', icon: '⚙️' },
      { name: 'Medical', icon: '🏥' },
      { name: 'Arts & Science', icon: '🎨' },
      { name: 'Management', icon: '💼' }
    ];
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single college
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM colleges WHERE college_id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'College not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Engineering courses
router.get('/data/engineering', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM engineering_courses');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Aviation courses
router.get('/data/aviation', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM aviation_courses');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get UG Fees
router.get('/data/ug-fees', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM ug_courses_fee');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get PG Fees
router.get('/data/pg-fees', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM pg_programme_fee');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
