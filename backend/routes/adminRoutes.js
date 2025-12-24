const express = require('express');
const router = express.Router();
const db = require('../config/db');
const bcrypt = require('bcrypt');

// Admin Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const [rows] = await db.execute('SELECT * FROM admin WHERE username = ?', [username]);
        if (rows.length === 0) return res.status(401).json({ message: 'Invalid credentials' });

        const admin = rows[0];
        const match = await bcrypt.compare(password, admin.password);

        // For specific task simpliciation, if DB password is not hashed yet (manually inserted), we might fail.
        // BUT the requirement asked for bcrypt. I will assume the user has hashed it OR I can provide a utility to hash.
        // However, since I provided a SQL with comment about hashing, let's implement a fallback or just strict check.
        // Strict check is better.

        if (!match) return res.status(401).json({ message: 'Invalid credentials' });

        res.json({ message: 'Login successful', admin_id: admin.admin_id, username: admin.username });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add College
router.post('/colleges', async (req, res) => {
    const { college_name, degree, district, fees, hostel_fees, one_time_fees, description } = req.body;
    try {
        const [result] = await db.execute(
            'INSERT INTO colleges (college_name, degree, district, fees, hostel_fees, one_time_fees, description) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [college_name, degree, district, fees, hostel_fees, one_time_fees, description]
        );
        res.status(201).json({ message: 'College added', id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update College
router.put('/colleges/:id', async (req, res) => {
    const { college_name, degree, district, fees, hostel_fees, one_time_fees, description } = req.body;
    try {
        await db.execute(
            'UPDATE colleges SET college_name=?, degree=?, district=?, fees=?, hostel_fees=?, one_time_fees=?, description=? WHERE college_id=?',
            [college_name, degree, district, fees, hostel_fees, one_time_fees, description, req.params.id]
        );
        res.json({ message: 'College updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete College
router.delete('/colleges/:id', async (req, res) => {
    try {
        await db.execute('DELETE FROM colleges WHERE college_id = ?', [req.params.id]);
        res.json({ message: 'College deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
