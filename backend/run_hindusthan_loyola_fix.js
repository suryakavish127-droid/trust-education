const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const data = {
    hostel: [
        {
            name: 'Hindusthan College of Arts & Science',
            fees: [
                { type: 'Boys Hostel', room: 'AC', rent: 94000, mess: 52000, total: 146000 },
                { type: 'Boys Hostel', room: 'Non-AC', rent: 69000, mess: 41000, total: 110000 },
                { type: 'Girls Hostel', room: 'AC', rent: 94000, mess: 52000, total: 146000 },
                { type: 'Girls Hostel', room: 'Non-AC', rent: 69000, mess: 41000, total: 110000 }
            ]
        },
        {
            name: 'LOYOLA INSTITUTE OF TECHNOLOGY, CHENNAI',
            fees: [
                { type: 'Boys Hostel', room: 'AC', rent: 97000, mess: 55000, total: 152000 },
                { type: 'Boys Hostel', room: 'Non-AC', rent: 72000, mess: 43000, total: 115000 },
                { type: 'Girls Hostel', room: 'AC', rent: 97000, mess: 55000, total: 152000 },
                { type: 'Girls Hostel', room: 'Non-AC', rent: 72000, mess: 43000, total: 115000 }
            ]
        }
    ],
    oneTime: [
        {
            name: 'Hindusthan College of Arts & Science',
            fees: [
                { name: 'Admission Fee', amount: 16500, purpose: 'One-time admission charge', status: 'Non-Refundable' },
                { name: 'Caution Deposit', amount: 11000, purpose: 'Refundable security deposit', status: 'Refundable' },
                { name: 'Library Fee', amount: 5500, purpose: 'One-time library access fee', status: 'Non-Refundable' }
            ]
        },
        {
            name: 'LOYOLA INSTITUTE OF TECHNOLOGY, CHENNAI',
            fees: [
                { name: 'Admission Fee', amount: 18000, purpose: 'One-time admission charge', status: 'Non-Refundable' },
                { name: 'Caution Deposit', amount: 12000, purpose: 'Refundable security deposit', status: 'Refundable' },
                { name: 'Lab Fee', amount: 8000, purpose: 'One-time lab usage fee', status: 'Non-Refundable' }
            ]
        }
    ]
};

async function runHindusthanLoyolaSync() {
    try {
        const conn = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        console.log('--- Syncing Hostels for Hindusthan & Loyola ---');
        for (const college of data.hostel) {
            const [rows] = await conn.execute("SELECT college_id FROM colleges WHERE college_name = ?", [college.name]);
            console.log(`Processing Hostels: ${college.name} (${rows.length} courses)`);
            for (const course of rows) {
                const cid = course.college_id;
                await conn.execute("DELETE FROM hostel_fees WHERE college_id = ?", [cid]);
                for (const h of college.fees) {
                    await conn.execute("INSERT INTO hostel_fees (college_id, hostel_type, room_type, fee_per_year, mess_fee, total_amount) VALUES (?, ?, ?, ?, ?, ?)",
                        [cid, h.type, h.room, h.rent, h.mess, h.total]);
                }
            }
        }

        console.log('\n--- Syncing One-Time Fees for Hindusthan & Loyola ---');
        for (const college of data.oneTime) {
            const [rows] = await conn.execute("SELECT college_id FROM colleges WHERE college_name = ?", [college.name]);
            console.log(`Processing One-Time: ${college.name} (${rows.length} courses)`);
            for (const course of rows) {
                const cid = course.college_id;
                await conn.execute("DELETE FROM one_time_fees WHERE college_id = ?", [cid]);
                for (const f of college.fees) {
                    await conn.execute("INSERT INTO one_time_fees (college_id, fee_name, amount, purpose, status) VALUES (?, ?, ?, ?, ?)",
                        [cid, f.name, f.amount, f.purpose, f.status]);
                }
            }
        }

        console.log('\n✅ Sync completed successfully!');
        await conn.end();
    } catch (err) {
        console.error('❌ Error:', err);
    }
}

runHindusthanLoyolaSync();
