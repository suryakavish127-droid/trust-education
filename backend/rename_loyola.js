const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

async function renameLoyola() {
    try {
        const conn = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        console.log('--- Renaming Loyola College ---');

        const oldName = 'Loyola College';
        const newName = 'LOYOLA INSTITUTE OF TECHNOLOGY, CHENNAI';

        const [res] = await conn.execute(
            "UPDATE colleges SET college_name = ? WHERE college_name = ?",
            [newName, oldName]
        );

        console.log(`✅ Updated ${res.affectedRows} courses to new name.`);

        await conn.end();
    } catch (err) {
        console.error('❌ Error:', err);
    }
}

renameLoyola();
