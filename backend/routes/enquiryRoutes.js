const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Submit Enquiry
router.post('/', async (req, res) => {
  const { student_name, phone, email, interested_degree, college_id, message } = req.body;

  // Basic Validation
  if (!student_name || !phone || !email || !interested_degree || !college_id) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  if (phone.length !== 10) {
    return res.status(400).json({ message: 'Phone number must be 10 digits' });
  }
  // Simple email regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  try {
    const [result] = await db.execute(
      'INSERT INTO enquiries (student_name, phone, email, interested_degree, college_id) VALUES (?, ?, ?, ?, ?)',
      [student_name, phone, email, interested_degree, college_id]
    );
    res.status(201).json({ message: 'Enquiry submitted successfully', id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get All Enquiries (Admin)
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT e.*, c.college_name FROM enquiries e LEFT JOIN colleges c ON e.college_id = c.college_id ORDER BY e.enquiry_date DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
