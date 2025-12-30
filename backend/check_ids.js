const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

async function checkCollegeIds() {
    try {
        const conn = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        // Get Dhanalakshmi Srinivasan colleges with their IDs
        const [colleges] = await conn.execute(
            `SELECT college_id, college_name, district 
       FROM colleges 
       WHERE college_name LIKE '%Dhanalakshmi Srinivasan%'
       ORDER BY district, college_name
       LIMIT 10`
        );

        console.log('\n📋 Dhanalakshmi Srinivasan Colleges with IDs:');
        console.log('='.repeat(90));
        colleges.forEach(c => {
            console.log(`ID: ${c.college_id} | ${c.college_name} (${c.district})`);
        });

        // Check hostel fees
        const [hostelFees] = await conn.execute(
            `SELECT hf.id, hf.college_id, c.college_name, hf.hostel_type, hf.total_amount
       FROM hostel_fees hf
       LEFT JOIN colleges c ON hf.college_id = c.college_id
       WHERE c.college_name LIKE '%Dhanalakshmi Srinivasan%'
       ORDER BY hf.college_id`
        );

        console.log('\n\n🏨 Hostel Fees Records:');
        console.log('='.repeat(90));
        hostelFees.forEach(h => {
            console.log(`Fee ID: ${h.id} | College ID: ${h.college_id} | ${h.college_name || 'NO MATCH'} | ${h.hostel_type}: ₹${h.total_amount}`);
        });

        // Check one-time fees
        const [oneTimeFees] = await conn.execute(
            `SELECT ot.id, ot.college_id, c.college_name, ot.fee_name, ot.amount
       FROM one_time_fees ot
       LEFT JOIN colleges c ON ot.college_id = c.college_id
       WHERE c.college_name LIKE '%Dhanalakshmi Srinivasan%'
       ORDER BY ot.college_id`
        );

        console.log('\n\n💰 One-Time Fees Records:');
        console.log('='.repeat(90));
        oneTimeFees.forEach(o => {
            console.log(`Fee ID: ${o.id} | College ID: ${o.college_id} | ${o.college_name || 'NO MATCH'} | ${o.fee_name}: ₹${o.amount}`);
        });

        console.log('\n' + '='.repeat(90));
        console.log(`\nTotal Colleges: ${colleges.length}`);
        console.log(`Total Hostel Fees: ${hostelFees.length}`);
        console.log(`Total One-Time Fees: ${oneTimeFees.length}\n`);

        await conn.end();
    } catch (err) {
        console.error('Error:', err.message);
    }
}

checkCollegeIds();
