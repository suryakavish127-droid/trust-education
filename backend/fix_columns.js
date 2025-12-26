const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();

async function fix() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

    console.log('Adding missing columns to colleges table...');
    try {
        await connection.query('ALTER TABLE colleges ADD COLUMN hostel_fees INT DEFAULT 0 AFTER fees');
        console.log('Added hostel_fees');
    } catch (err) {
        console.log('hostel_fees might already exist or error:', err.message);
    }

    try {
        await connection.query('ALTER TABLE colleges ADD COLUMN one_time_fees INT DEFAULT 0 AFTER hostel_fees');
        console.log('Added one_time_fees');
    } catch (err) {
        console.log('one_time_fees might already exist or error:', err.message);
    }

    console.log('Updating college_fees table...');
    try {
        await connection.query('ALTER TABLE college_fees ADD COLUMN purpose TEXT AFTER amount');
        console.log('Added purpose to college_fees');
    } catch (err) {
        console.log('purpose might already exist or error:', err.message);
    }

    try {
        await connection.query("ALTER TABLE college_fees ADD COLUMN refundable_status ENUM('Refundable', 'Non-Refundable') DEFAULT 'Non-Refundable' AFTER purpose");
        console.log('Added refundable_status to college_fees');
    } catch (err) {
        console.log('refundable_status might already exist or error:', err.message);
    }

    await connection.end();
}
fix().catch(console.error);
