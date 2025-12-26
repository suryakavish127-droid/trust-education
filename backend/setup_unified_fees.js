const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();

async function setup() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

    console.log('Dropping and recreating fee tables to match exact requested schema...');

    await connection.query('DROP TABLE IF EXISTS hostel_fees');
    await connection.query('DROP TABLE IF EXISTS one_time_fees');

    await connection.query(`
        CREATE TABLE hostel_fees (
            id INT AUTO_INCREMENT PRIMARY KEY,
            college_id INT,
            hostel_type VARCHAR(200),
            total_amount INT,
            note VARCHAR(100)
        )
    `);

    await connection.query(`
        CREATE TABLE one_time_fees (
            id INT AUTO_INCREMENT PRIMARY KEY,
            college_id INT,
            fee_name VARCHAR(200),
            amount INT,
            purpose TEXT,
            status VARCHAR(100)
        )
    `);

    // Migrate data from existing tables
    console.log('Migrating data from old tables (college_hostel_fees & college_fees)...');

    // Migrate Hostel Fees
    try {
        const [hOld] = await connection.query('SELECT * FROM college_hostel_fees');
        for (const row of hOld) {
            const [c] = await connection.query('SELECT college_id FROM colleges WHERE college_name = ? LIMIT 1', [row.college_name]);
            if (c.length > 0) {
                await connection.query(
                    'INSERT INTO hostel_fees (college_id, hostel_type, total_amount, note) VALUES (?, ?, ?, ?)',
                    [c[0].college_id, row.hostel_type, row.amount, row.note]
                );
            }
        }
    } catch (e) { console.log('college_hostel_fees might be empty or missing'); }

    // Migrate One-Time Fees
    try {
        const [otOld] = await connection.query('SELECT * FROM college_fees');
        for (const row of otOld) {
            const [c] = await connection.query('SELECT college_id FROM colleges WHERE college_name = ? LIMIT 1', [row.college_name]);
            if (c.length > 0) {
                await connection.query(
                    'INSERT INTO one_time_fees (college_id, fee_name, amount, purpose, status) VALUES (?, ?, ?, ?, ?)',
                    [c[0].college_id, row.fee_name, row.amount, row.purpose, row.refundable_status]
                );
            }
        }
    } catch (e) { console.log('college_fees might be empty or missing'); }

    console.log('Setup and Migration Complete.');
    await connection.end();
}

setup().catch(console.error);
