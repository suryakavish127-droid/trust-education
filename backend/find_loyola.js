
const mysql = require('mysql2/promise');
require('dotenv').config({ path: './.env' });

async function findLoyola() {
    let connection;
    try {
        connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        const [rows] = await connection.execute(
            "SELECT college_id, college_name, district, image_url FROM colleges WHERE college_name LIKE '%Loyola%'"
        );
        console.log("Loyola College Records:");
        console.log(JSON.stringify(rows, null, 2));

    } catch (error) {
        console.error('Error:', error);
    } finally {
        if (connection) await connection.end();
    }
}

findLoyola();
