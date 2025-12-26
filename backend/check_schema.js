const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();

async function check() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });
    const [rows] = await connection.query('DESCRIBE colleges');
    console.log(JSON.stringify(rows, null, 2));
    await connection.end();
}
check().catch(console.error);
