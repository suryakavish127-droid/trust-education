const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

dotenv.config();

async function addIndraFees() {
    try {
        const conn = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            multipleStatements: true
        });

        console.log('\n🔧 Adding Fees for Indra Ganesan...\n');

        // Read the SQL fix file
        const sqlFile = fs.readFileSync(path.join(__dirname, 'add_indra_fees.sql'), 'utf8');

        // Execute the SQL
        await conn.query(sqlFile);

        console.log('✅ Insert executed successfully!\n');

        // Verify the results for one specific ID (4111)
        const [hostelCount] = await conn.execute(
            `SELECT COUNT(*) as count FROM hostel_fees WHERE college_id = 4111`
        );

        const [oneTimeCount] = await conn.execute(
            `SELECT COUNT(*) as count FROM one_time_fees WHERE college_id = 4111`
        );

        console.log('📊 Verification for ID 4111:');
        console.log(`   Hostel Fee Records: ${hostelCount[0].count}`);
        console.log(`   One-Time Fee Records: ${oneTimeCount[0].count}\n`);

        await conn.end();
    } catch (err) {
        console.error('❌ Error:', err.message);
    }
}

addIndraFees();
