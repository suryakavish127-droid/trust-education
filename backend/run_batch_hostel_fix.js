const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const feeData = [
    {
        name: 'Adithya College of Arts and Science',
        hostel: [
            { type: 'Boys Hostel', room: 'AC', rent: 95000, mess: 52000, total: 147000 },
            { type: 'Boys Hostel', room: 'Non-AC', rent: 70000, mess: 42000, total: 112000 },
            { type: 'Girls Hostel', room: 'AC', rent: 95000, mess: 52000, total: 147000 },
            { type: 'Girls Hostel', room: 'Non-AC', rent: 70000, mess: 42000, total: 112000 }
        ]
    },
    {
        name: 'Rathinam Group of Institutions',
        hostel: [
            { type: 'Boys Hostel', room: 'AC', rent: 92000, mess: 50000, total: 142000 },
            { type: 'Boys Hostel', room: 'Non-AC', rent: 68000, mess: 40000, total: 108000 },
            { type: 'Girls Hostel', room: 'AC', rent: 92000, mess: 50000, total: 142000 },
            { type: 'Girls Hostel', room: 'Non-AC', rent: 68000, mess: 40000, total: 108000 }
        ]
    },
    {
        name: 'Nehru College',
        hostel: [
            { type: 'Boys Hostel', room: 'AC', rent: 90000, mess: 51000, total: 141000 },
            { type: 'Boys Hostel', room: 'Non-AC', rent: 66000, mess: 41000, total: 107000 },
            { type: 'Girls Hostel', room: 'AC', rent: 90000, mess: 51000, total: 141000 },
            { type: 'Girls Hostel', room: 'Non-AC', rent: 66000, mess: 41000, total: 107000 }
        ]
    },
    {
        name: 'Sri Ramakrishna College of Engineering',
        hostel: [
            { type: 'Boys Hostel', room: 'AC', rent: 97000, mess: 53000, total: 150000 },
            { type: 'Boys Hostel', room: 'Non-AC', rent: 71000, mess: 43000, total: 114000 },
            { type: 'Girls Hostel', room: 'AC', rent: 97000, mess: 53000, total: 150000 },
            { type: 'Girls Hostel', room: 'Non-AC', rent: 71000, mess: 43000, total: 114000 }
        ]
    },
    {
        name: 'Hindusthan College of Arts & Science',
        hostel: [
            { type: 'Boys Hostel', room: 'AC', rent: 94000, mess: 52000, total: 146000 },
            { type: 'Boys Hostel', room: 'Non-AC', rent: 69000, mess: 41000, total: 110000 },
            { type: 'Girls Hostel', room: 'AC', rent: 94000, mess: 52000, total: 146000 },
            { type: 'Girls Hostel', room: 'Non-AC', rent: 69000, mess: 41000, total: 110000 }
        ]
    }
];

async function runBatchHostelFix() {
    try {
        const conn = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        console.log('--- Starting Batch Hostel Fee Sync ---');

        for (const college of feeData) {
            const [rows] = await conn.execute(
                "SELECT college_id FROM colleges WHERE college_name = ?",
                [college.name]
            );

            console.log(`\nProcessing: ${college.name} (Courses found: ${rows.length})`);

            for (const course of rows) {
                const cid = course.college_id;

                // Clear existing hostel fees for this college_id to prevent duplicates if running again
                await conn.execute("DELETE FROM hostel_fees WHERE college_id = ?", [cid]);

                for (const h of college.hostel) {
                    const calculatedMess = Math.round(h.rent * 0.40);
                    const calculatedTotal = h.rent + calculatedMess;
                    await conn.execute(`
                        INSERT INTO hostel_fees (college_id, hostel_type, room_type, fee_per_year, mess_fee, total_amount)
                        VALUES (?, ?, ?, ?, ?, ?)
                    `, [cid, h.type, h.room, h.rent, calculatedMess, calculatedTotal]);
                }
            }
            console.log(`✅ ${college.name} synced.`);
        }

        console.log('\n--- Batch Sync Completed Successfully! ---');
        await conn.end();
    } catch (err) {
        console.error('❌ Error during batch sync:', err);
    }
}

runBatchHostelFix();
