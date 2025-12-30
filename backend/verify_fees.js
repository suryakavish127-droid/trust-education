const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

async function verifyFeesData() {
    try {
        const conn = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        // Check Hostel Fees
        const [hostelRows] = await conn.execute(
            `SELECT c.college_name, c.district, h.hostel_type, h.total_amount 
       FROM hostel_fees h
       JOIN colleges c ON h.college_id = c.college_id
       WHERE c.college_name LIKE '%Dhanalakshmi Srinivasan%'
       ORDER BY c.district, c.college_name, h.hostel_type`
        );

        console.log('\n✅ Hostel Fees for Dhanalakshmi Srinivasan Institutions:');
        console.log('='.repeat(90));

        let currentCollege = '';
        hostelRows.forEach(r => {
            const collegeName = `${r.college_name} (${r.district})`;
            if (collegeName !== currentCollege) {
                console.log(`\n📍 ${collegeName}`);
                console.log('-'.repeat(90));
                currentCollege = collegeName;
            }
            console.log(`  ${r.hostel_type}: ₹${r.total_amount.toLocaleString()}/year`);
        });

        // Check One-Time Fees
        const [oneTimeRows] = await conn.execute(
            `SELECT c.college_name, c.district, o.fee_name, o.amount 
       FROM one_time_fees o
       JOIN colleges c ON o.college_id = c.college_id
       WHERE c.college_name LIKE '%Dhanalakshmi Srinivasan%'
       ORDER BY c.district, c.college_name, o.fee_name`
        );

        console.log('\n\n✅ One-Time Fees for Dhanalakshmi Srinivasan Institutions:');
        console.log('='.repeat(90));

        currentCollege = '';
        oneTimeRows.forEach(r => {
            const collegeName = `${r.college_name} (${r.district})`;
            if (collegeName !== currentCollege) {
                console.log(`\n📍 ${collegeName}`);
                console.log('-'.repeat(90));
                currentCollege = collegeName;
            }
            console.log(`  ${r.fee_name}: ₹${r.amount.toLocaleString()}`);
        });

        console.log('\n' + '='.repeat(90));
        console.log(`\n🎓 Total Hostel Fee Entries: ${hostelRows.length}`);
        console.log(`💰 Total One-Time Fee Entries: ${oneTimeRows.length}\n`);

        await conn.end();
    } catch (err) {
        console.error('Error:', err.message);
    }
}

verifyFeesData();
