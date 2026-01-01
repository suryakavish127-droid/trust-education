const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

async function runImayamFix() {
    try {
        const conn = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        console.log('--- Step 1: Insert into care_hostel_fees for Imayam ---');
        await conn.execute(`
            INSERT INTO care_hostel_fees 
            (college_name, gender, room_type, yearly_fee, one_time_fee) VALUES
            ('Imayam College of Engineering', 'Boys', 'AC', 85000, 12000),
            ('Imayam College of Engineering', 'Boys', 'Non-AC', 60000, 12000),
            ('Imayam College of Engineering', 'Girls', 'AC', 85000, 12000),
            ('Imayam College of Engineering', 'Girls', 'Non-AC', 60000, 12000)
        `);

        console.log('--- Step 2: Syncing Imayam to Unified Tables ---');

        const [colleges] = await conn.execute(
            "SELECT college_id FROM colleges WHERE college_name = 'Imayam College of Engineering'"
        );

        console.log(`Found ${colleges.length} courses for Imayam College of Engineering.`);

        for (const college of colleges) {
            const cid = college.college_id;

            // Insert Hostel Fees
            await conn.execute(`
                INSERT INTO hostel_fees (college_id, hostel_type, room_type, fee_per_year, mess_fee, total_amount)
                VALUES 
                (?, 'Boys Hostel', 'AC', 85000, 0, 85000),
                (?, 'Boys Hostel', 'Non-AC', 60000, 0, 60000),
                (?, 'Girls Hostel', 'AC', 85000, 0, 85000),
                (?, 'Girls Hostel', 'Non-AC', 60000, 0, 60000)
            `, [cid, cid, cid, cid]);

            // Insert One-Time Fee
            await conn.execute(`
                INSERT INTO one_time_fees (college_id, fee_name, amount, purpose, status)
                VALUES (?, 'Admission Fee', 12000, 'One-time admission charge for Imayam', 'Non-Refundable')
            `, [cid]);
        }

        console.log('✅ Sync completed. Imayam College fees are now in the unified system!');
        await conn.end();
    } catch (err) {
        console.error('❌ Error:', err);
    }
}

runImayamFix();
