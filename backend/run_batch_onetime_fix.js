const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const oneTimeFeeData = [
    {
        name: 'Adithya College of Arts and Science',
        fees: [
            { name: 'Admission Fee', amount: 15000, purpose: 'One-time admission charge', status: 'Non-Refundable' },
            { name: 'Caution Deposit', amount: 10000, purpose: 'Refundable security deposit', status: 'Refundable' },
            { name: 'Library Fee', amount: 5000, purpose: 'One-time library access fee', status: 'Non-Refundable' }
        ]
    },
    {
        name: 'Rathinam Group of Institutions',
        fees: [
            { name: 'Admission Fee', amount: 16000, purpose: 'One-time admission charge', status: 'Non-Refundable' },
            { name: 'Caution Deposit', amount: 9000, purpose: 'Refundable security deposit', status: 'Refundable' },
            { name: 'Lab Fee', amount: 7000, purpose: 'One-time lab usage fee', status: 'Non-Refundable' }
        ]
    },
    {
        name: 'Nehru College',
        fees: [
            { name: 'Admission Fee', amount: 15500, purpose: 'One-time admission charge', status: 'Non-Refundable' },
            { name: 'Caution Deposit', amount: 9500, purpose: 'Refundable security deposit', status: 'Refundable' },
            { name: 'Library Fee', amount: 6000, purpose: 'One-time library access fee', status: 'Non-Refundable' }
        ]
    },
    {
        name: 'Sri Ramakrishna College of Engineering',
        fees: [
            { name: 'Admission Fee', amount: 17000, purpose: 'One-time admission charge', status: 'Non-Refundable' },
            { name: 'Caution Deposit', amount: 12000, purpose: 'Refundable security deposit', status: 'Refundable' },
            { name: 'Lab Fee', amount: 8000, purpose: 'One-time lab usage fee', status: 'Non-Refundable' }
        ]
    },
    {
        name: 'Hindusthan College of Arts & Science',
        fees: [
            { name: 'Admission Fee', amount: 16500, purpose: 'One-time admission charge', status: 'Non-Refundable' },
            { name: 'Caution Deposit', amount: 11000, purpose: 'Refundable security deposit', status: 'Refundable' },
            { name: 'Library Fee', amount: 5000, purpose: 'One-time library access fee', status: 'Non-Refundable' }
        ]
    }
];

async function runBatchOneTimeFix() {
    try {
        const conn = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        console.log('--- Starting Batch One-Time Fee Sync ---');

        for (const college of oneTimeFeeData) {
            const [rows] = await conn.execute(
                "SELECT college_id FROM colleges WHERE college_name = ?",
                [college.name]
            );

            console.log(`\nProcessing: ${college.name} (Courses found: ${rows.length})`);

            for (const course of rows) {
                const cid = course.college_id;

                // Clear existing one-time fees for this college_id
                await conn.execute("DELETE FROM one_time_fees WHERE college_id = ?", [cid]);

                for (const f of college.fees) {
                    await conn.execute(`
                        INSERT INTO one_time_fees (college_id, fee_name, amount, purpose, status)
                        VALUES (?, ?, ?, ?, ?)
                    `, [cid, f.name, f.amount, f.purpose, f.status]);
                }
            }
            console.log(`✅ ${college.name} one-time fees synced.`);
        }

        console.log('\n--- Batch One-Time Sync Completed Successfully! ---');
        await conn.end();
    } catch (err) {
        console.error('❌ Error during batch one-time sync:', err);
    }
}

runBatchOneTimeFix();
