const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

async function runFixedFix() {
    try {
        const conn = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        console.log('--- Step 1: Create care_hostel_fees table ---');
        await conn.execute(`
            CREATE TABLE IF NOT EXISTS care_hostel_fees (
                id INT AUTO_INCREMENT PRIMARY KEY,
                college_name VARCHAR(255),
                gender VARCHAR(50),
                room_type VARCHAR(50),
                yearly_fee INT,
                one_time_fee INT
            )
        `);

        console.log('--- Step 2: Insert user data into care_hostel_fees ---');
        await conn.execute(`
            INSERT INTO care_hostel_fees 
            (college_name, gender, room_type, yearly_fee, one_time_fee) VALUES
            ('CARE College of Engineering', 'Boys', 'AC', 90000, 15000),
            ('CARE College of Engineering', 'Boys', 'Non-AC', 65000, 15000),
            ('CARE College of Engineering', 'Girls', 'AC', 90000, 15000),
            ('CARE College of Engineering', 'Girls', 'Non-AC', 65000, 15000)
        `);

        console.log('--- Step 3: Syncing to Unified Tables (hostel_fees & one_time_fees) ---');

        // Find all college_ids for CARE
        const [colleges] = await conn.execute(
            "SELECT college_id FROM colleges WHERE college_name = 'CARE College of Engineering'"
        );

        console.log(`Found ${colleges.length} courses for CARE College of Engineering.`);

        for (const college of colleges) {
            const cid = college.college_id;

            // Insert Hostel Fees (using mess_fee = 0 for now)
            await conn.execute(`
                INSERT INTO hostel_fees (college_id, hostel_type, room_type, fee_per_year, mess_fee, total_amount)
                VALUES 
                (?, 'Boys Hostel', 'AC', 90000, 0, 90000),
                (?, 'Boys Hostel', 'Non-AC', 65000, 0, 65000),
                (?, 'Girls Hostel', 'AC', 90000, 0, 90000),
                (?, 'Girls Hostel', 'Non-AC', 65000, 0, 65000)
            `, [cid, cid, cid, cid]);

            // Insert One-Time Fee (only once per college course if not exists)
            // But we should probably add a specific "Admission Fee"
            await conn.execute(`
                INSERT INTO one_time_fees (college_id, fee_name, amount, purpose, status)
                VALUES (?, 'Admission Fee', 15000, 'One-time admission charge for CARE', 'Non-Refundable')
            `, [cid]);
        }

        console.log('✅ Sync completed. CARE College fees are now in the unified system!');
        await conn.end();
    } catch (err) {
        console.error('❌ Error:', err);
    }
}

runFixedFix();
