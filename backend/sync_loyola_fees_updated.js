const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const data = {
    hostel: [
        { type: 'Boys Hostel', room: 'AC', rent: 98000, mess: 56000, total: 154000 },
        { type: 'Boys Hostel', room: 'Non-AC', rent: 73000, mess: 44000, total: 117000 },
        { type: 'Girls Hostel', room: 'AC', rent: 98000, mess: 56000, total: 154000 },
        { type: 'Girls Hostel', room: 'Non-AC', rent: 73000, mess: 44000, total: 117000 }
    ],
    oneTime: [
        { name: 'Admission Fee', amount: 18000, purpose: 'One-time admission charge', status: 'Non-Refundable' },
        { name: 'Caution Deposit', amount: 12000, purpose: 'Refundable security deposit', status: 'Refundable' },
        { name: 'Library Fee', amount: 6000, purpose: 'One-time library access fee', status: 'Non-Refundable' },
        { name: 'Lab Fee', amount: 8500, purpose: 'One-time lab usage fee', status: 'Non-Refundable' },
        { name: 'Sports Fee', amount: 5000, purpose: 'One-time sports activity fee', status: 'Non-Refundable' }
    ]
};

async function syncLoyolaFees() {
    try {
        const conn = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        // The institution's current name in the DB
        const currentName = 'LOYOLA INSTITUTE OF TECHNOLOGY, CHENNAI';

        console.log(`--- Syncing Fees for ${currentName} ---`);

        const [rows] = await conn.execute(
            "SELECT college_id FROM colleges WHERE college_name = ?",
            [currentName]
        );

        if (rows.length === 0) {
            console.error(`❌ Could not find any courses for ${currentName}`);
            await conn.end();
            return;
        }

        console.log(`Found ${rows.length} courses. Updating fees...`);

        for (const course of rows) {
            const cid = course.college_id;

            // Sync Hostels
            await conn.execute("DELETE FROM hostel_fees WHERE college_id = ?", [cid]);
            for (const h of data.hostel) {
                await conn.execute(
                    "INSERT INTO hostel_fees (college_id, hostel_type, room_type, fee_per_year, mess_fee, total_amount) VALUES (?, ?, ?, ?, ?, ?)",
                    [cid, h.type, h.room, h.rent, h.mess, h.total]
                );
            }

            // Sync One-Time
            await conn.execute("DELETE FROM one_time_fees WHERE college_id = ?", [cid]);
            for (const o of data.oneTime) {
                await conn.execute(
                    "INSERT INTO one_time_fees (college_id, fee_name, amount, purpose, status) VALUES (?, ?, ?, ?, ?)",
                    [cid, o.name, o.amount, o.purpose, o.status]
                );
            }
        }

        console.log('✅ Loyola fees synchronized successfully!');
        await conn.end();
    } catch (err) {
        console.error('❌ Error during sync:', err);
    }
}

syncLoyolaFees();
