const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();

async function check() {
    const conn = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

    const [rows] = await conn.execute("SELECT college_id, college_name FROM colleges WHERE college_name = 'Dhanalakshmi Srinivasan Engineering College' LIMIT 1");

    if (rows.length > 0) {
        console.log('College ID:', rows[0].college_id);

        // Check fees for this ID
        const [fees] = await conn.execute("SELECT * FROM hostel_fees WHERE college_id = ?", [rows[0].college_id]);
        console.log('Hostel Fees Count:', fees.length);
    } else {
        console.log('College not found');
    }

    await conn.end();
}
check();
