const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const courses = [
    { name: 'B.E Computer Science and Engineering', fee: 50000, desc: 'Intake: 120. Tuition fee only.' },
    { name: 'B.E Computer Science and Engineering (CS)', fee: 50000, desc: 'Intake: 60. Tuition fee only.' },
    { name: 'B.E Electrical and Electronics Engineering', fee: 50000, desc: 'Intake: 30. Tuition fee only.' },
    { name: 'B.E Electronics and Communication Engineering', fee: 50000, desc: 'Intake: 60. Tuition fee only.' },
    { name: 'B.E Mechanical Engineering', fee: 50000, desc: 'Intake: 30. Tuition fee only.' },
    { name: 'B.Tech Information Technology', fee: 50000, desc: 'Intake: 120. Tuition fee only.' },
    { name: 'B.Tech Artificial Intelligence and Data Science', fee: 50000, desc: 'Intake: 120. Tuition fee only.' },
    { name: 'MBA', fee: 50000, desc: 'Intake: 90. Tuition fee only.' }
];

async function addLoyolaCourses() {
    try {
        const conn = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        // Current official name
        const collegeName = 'LOYOLA INSTITUTE OF TECHNOLOGY, CHENNAI';
        const district = 'Chennai';

        console.log(`--- Adding New Courses for ${collegeName} ---`);

        for (const c of courses) {
            await conn.execute(
                "INSERT INTO colleges (college_name, district, degree, fees, description) VALUES (?, ?, ?, ?, ?)",
                [collegeName, district, c.name, c.fee, c.desc]
            );
        }

        console.log(`✅ Successfully added ${courses.length} courses.`);

        // Now run the fee synchronization to ensure these new records have the hostel/one-time fees
        console.log('--- Synchronizing fees for new records ---');

        // Fee data from previous step
        const hostelFees = [
            { type: 'Boys Hostel', room: 'AC', rent: 98000, mess: 56000, total: 154000 },
            { type: 'Boys Hostel', room: 'Non-AC', rent: 73000, mess: 44000, total: 117000 },
            { type: 'Girls Hostel', room: 'AC', rent: 98000, mess: 56000, total: 154000 },
            { type: 'Girls Hostel', room: 'Non-AC', rent: 73000, mess: 44000, total: 117000 }
        ];

        const oneTimeFees = [
            { name: 'Admission Fee', amount: 18000, purpose: 'One-time admission charge', status: 'Non-Refundable' },
            { name: 'Caution Deposit', amount: 12000, purpose: 'Refundable security deposit', status: 'Refundable' },
            { name: 'Library Fee', amount: 6000, purpose: 'One-time library access fee', status: 'Non-Refundable' },
            { name: 'Lab Fee', amount: 8500, purpose: 'One-time lab usage fee', status: 'Non-Refundable' },
            { name: 'Sports Fee', amount: 5000, purpose: 'One-time sports activity fee', status: 'Non-Refundable' }
        ];

        const [rows] = await conn.execute(
            "SELECT college_id FROM colleges WHERE college_name = ?",
            [collegeName]
        );

        for (const row of rows) {
            const cid = row.college_id;

            // Sync Hostels (Check if already exists for this specific ID)
            const [existingHostel] = await conn.execute("SELECT id FROM hostel_fees WHERE college_id = ?", [cid]);
            if (existingHostel.length === 0) {
                for (const h of hostelFees) {
                    await conn.execute(
                        "INSERT INTO hostel_fees (college_id, hostel_type, room_type, fee_per_year, mess_fee, total_amount) VALUES (?, ?, ?, ?, ?, ?)",
                        [cid, h.type, h.room, h.rent, h.mess, h.total]
                    );
                }
            }

            // Sync One-Time
            const [existingOneTime] = await conn.execute("SELECT id FROM one_time_fees WHERE college_id = ?", [cid]);
            if (existingOneTime.length === 0) {
                for (const o of oneTimeFees) {
                    await conn.execute(
                        "INSERT INTO one_time_fees (college_id, fee_name, amount, purpose, status) VALUES (?, ?, ?, ?, ?)",
                        [cid, o.name, o.amount, o.purpose, o.status]
                    );
                }
            }
        }

        console.log('✅ Fees synced for all Loyola records.');
        await conn.end();
    } catch (err) {
        console.error('❌ Error:', err);
    }
}

addLoyolaCourses();
