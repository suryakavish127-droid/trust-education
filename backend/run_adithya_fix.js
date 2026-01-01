const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

async function runAdithyaFix() {
    try {
        const conn = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        console.log('--- Syncing Adithya Institute of Technology to Unified Tables ---');

        const [colleges] = await conn.execute(
            "SELECT college_id FROM colleges WHERE college_name = 'Adithya Institute of Technology'"
        );

        console.log(`Found ${colleges.length} courses for Adithya Institute of Technology.`);

        for (const college of colleges) {
            const cid = college.college_id;

            // Insert Hostel Fees (Mess Fee = 40% of Rent)
            // Using existing schema: fee_per_year, mess_fee, total_amount
            await conn.execute(`
                INSERT INTO hostel_fees (college_id, hostel_type, room_type, fee_per_year, mess_fee, total_amount)
                VALUES 
                (?, 'Boys Hostel', 'AC', 90000, 36000, 126000),
                (?, 'Boys Hostel', 'Non-AC', 65000, 26000, 91000),
                (?, 'Girls Hostel', 'AC', 90000, 36000, 126000),
                (?, 'Girls Hostel', 'Non-AC', 65000, 26000, 91000)
            `, [cid, cid, cid, cid]);

            // Insert One-Time Fee
            await conn.execute(`
                INSERT INTO one_time_fees (college_id, fee_name, amount, purpose, status)
                VALUES (?, 'Admission Fee', 15000, 'One-time admission charge for Adithya', 'Non-Refundable')
            `, [cid]);
        }

        console.log('✅ Sync completed. Adithya Institute of Technology fees are now in the unified system!');
        await conn.end();
    } catch (err) {
        console.error('❌ Error:', err);
    }
}

runAdithyaFix();
