const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();

async function check() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST || '127.0.0.1',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            database: process.env.DB_NAME || 'clg'
        });
        console.log('Successfully connected to the database!');
        await connection.end();
    } catch (err) {
        console.error('Connection failed:', err.message);
    }
}
check();
