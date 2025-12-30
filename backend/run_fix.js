const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

dotenv.config();

async function runFixScript() {
    try {
        const conn = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            multipleStatements: true
        });

        console.log('\n🔧 Running Fees Fix Script...\n');

        // Read the SQL fix file
        const sqlFile = fs.readFileSync(path.join(__dirname, 'fix_fees.sql'), 'utf8');

        // Execute the SQL
        await conn.query(sqlFile);

        console.log('✅ Fix script executed successfully!\n');

        // Verify the results
        const [hostelCount] = await conn.execute(
            `SELECT COUNT(*) as count FROM hostel_fees hf
       INNER JOIN colleges c ON hf.college_id = c.college_id
       WHERE c.college_name LIKE '%Dhanalakshmi Srinivasan%'`
        );

        const [oneTimeCount] = await conn.execute(
            `SELECT COUNT(*) as count FROM one_time_fees otf
       INNER JOIN colleges c ON otf.college_id = c.college_id
       WHERE c.college_name LIKE '%Dhanalakshmi Srinivasan%'`
        );

        console.log('📊 Verification:');
        console.log(`   Hostel Fee Records: ${hostelCount[0].count}`);
        console.log(`   One-Time Fee Records: ${oneTimeCount[0].count}\n`);

        console.log('✨ Fees are now linked to ALL courses for each institution!');
        console.log('🎯 The frontend should now display fees correctly.\n');

        await conn.end();
    } catch (err) {
        console.error('❌ Error:', err.message);
        console.error(err.stack);
    }
}

runFixScript();
