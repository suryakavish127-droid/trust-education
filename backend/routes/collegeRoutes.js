const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all colleges
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM colleges');
    res.json(rows);
  } catch (err) {
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

module.exports = router;
