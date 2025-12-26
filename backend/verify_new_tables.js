const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();

async function verify() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

    const [engRows] = await connection.query('SELECT COUNT(*) as count FROM engineering_fees');
    const [cseRows] = await connection.query('SELECT COUNT(*) as count FROM cse_category_fees');

    console.log(`engineering_fees count: ${engRows[0].count}`);
    console.log(`cse_category_fees count: ${cseRows[0].count}`);

    await connection.end();
}
verify().catch(console.error);
