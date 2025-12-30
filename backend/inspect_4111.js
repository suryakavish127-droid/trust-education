const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

async function inspectCollege() {
    try {
        const conn = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        const collegeId = 4111;

        console.log(`\n🔍 Inspecting College ID: ${collegeId}`);
        console.log('='.repeat(60));

        // 1. Get College Details
        const [college] = await conn.execute(
            `SELECT * FROM colleges WHERE college_id = ?`,
            [collegeId]
        );

        if (college.length === 0) {
            console.log('❌ College NOT FOUND in database.');
        } else {
            console.log(`✅ College Found: ${college[0].college_name}`);
            console.log(`   District: ${college[0].district}`);
            console.log(`   Description: ${college[0].description}`);
        }

        // 2. Check Hostel Fees for this specific ID
        const [hostelFees] = await conn.execute(
            `SELECT * FROM hostel_fees WHERE college_id = ?`,
            [collegeId]
        );
        console.log(`\n🏨 Hostel Fees linked to ID ${collegeId}: ${hostelFees.length} records`);

        // 3. Check One-Time Fees for this specific ID
        const [oneTimeFees] = await conn.execute(
            `SELECT * FROM one_time_fees WHERE college_id = ?`,
            [collegeId]
        );
        console.log(`💰 One-Time Fees linked to ID ${collegeId}: ${oneTimeFees.length} records`);

        // 4. Check if fees exist for this college NAME (under other IDs)
        if (college.length > 0) {
            const name = college[0].college_name;
            const [allHostelFees] = await conn.execute(
                `SELECT hf.*, c.college_id 
         FROM hostel_fees hf
         JOIN colleges c ON hf.college_id = c.college_id
         WHERE c.college_name = ?`,
                [name]
            );

            console.log(`\n🔎 Checking ALL fees for "${name}":`);
            console.log(`   Total Hostel Fee records found for entire institution: ${allHostelFees.length}`);
        }

        await conn.end();
    } catch (err) {
        console.error('Error:', err.message);
    }
}

inspectCollege();
