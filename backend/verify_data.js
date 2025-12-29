const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

async function verifyData() {
    try {
        const conn = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        const [rows] = await conn.execute(
            `SELECT college_name, COUNT(*) as count 
       FROM colleges 
       WHERE college_name LIKE '%Dhanalakshmi Srinivasan%' 
       GROUP BY college_name`
        );

        console.log('\n✅ Dhanalakshmi Srinivasan Institutions Data:');
        console.log('='.repeat(60));
        rows.forEach(r => {
            console.log(`  ${r.college_name}: ${r.count} courses`);
        });
        console.log('='.repeat(60));
        console.log(`\nTotal: ${rows.reduce((sum, r) => sum + r.count, 0)} courses added\n`);

        await conn.end();
    } catch (err) {
        console.error('Error:', err.message);
    }
}

verifyData();
