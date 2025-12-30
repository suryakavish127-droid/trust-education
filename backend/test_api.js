const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

async function testUnifiedAPI() {
    try {
        const conn = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        // Get a sample Dhanalakshmi Srinivasan college
        const [colleges] = await conn.execute(
            `SELECT college_id, college_name, district 
       FROM colleges 
       WHERE college_name LIKE '%Dhanalakshmi Srinivasan Engineering College%'
       AND district = 'Perambalur'
       LIMIT 1`
        );

        if (colleges.length === 0) {
            console.log('No college found!');
            await conn.end();
            return;
        }

        const college = colleges[0];
        console.log('\n🎓 Testing with College:');
        console.log('='.repeat(90));
        console.log(`ID: ${college.college_id} | ${college.college_name} (${college.district})`);

        // Test the unified API query (same as the API route)
        const query = `
      SELECT 
          'HOSTEL_FEE' AS fee_type,
          hf.college_id,
          hf.hostel_type,
          hf.room_type,
          hf.fee_per_year,
          hf.mess_fee,
          hf.total_amount AS amount,
          NULL AS name,
          NULL AS purpose,
          NULL AS status
      FROM hostel_fees hf
      WHERE hf.college_id = ?

      UNION ALL

      SELECT 
          'ONE_TIME_FEE' AS fee_type,
          ot.college_id,
          NULL AS hostel_type,
          NULL AS room_type,
          NULL AS fee_per_year,
          NULL AS mess_fee,
          ot.amount,
          ot.fee_name AS name,
          ot.purpose,
          ot.status
      FROM one_time_fees ot
      WHERE ot.college_id = ?
    `;

        const [results] = await conn.query(query, [college.college_id, college.college_id]);

        console.log('\n\n📊 Unified API Results:');
        console.log('='.repeat(90));

        const hostelFees = results.filter(r => r.fee_type === 'HOSTEL_FEE');
        const oneTimeFees = results.filter(r => r.fee_type === 'ONE_TIME_FEE');

        console.log(`\n🏨 Hostel Fees (${hostelFees.length}):`);
        hostelFees.forEach(h => {
            console.log(`  ${h.hostel_type} (${h.room_type}): ₹${h.amount.toLocaleString()}`);
        });

        console.log(`\n💰 One-Time Fees (${oneTimeFees.length}):`);
        oneTimeFees.forEach(o => {
            console.log(`  ${o.name}: ₹${o.amount.toLocaleString()} - ${o.status}`);
        });

        console.log('\n' + '='.repeat(90));
        console.log(`\nAPI would return ${results.length} total records for college_id ${college.college_id}\n`);

        await conn.end();
    } catch (err) {
        console.error('Error:', err.message);
        console.error(err.stack);
    }
}

testUnifiedAPI();
