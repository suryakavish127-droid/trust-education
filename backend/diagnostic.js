const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

async function comprehensiveDiagnostic() {
    try {
        const conn = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        console.log('\n' + '='.repeat(100));
        console.log('COMPREHENSIVE DIAGNOSTIC REPORT - HOSTEL & ONE-TIME FEES');
        console.log('='.repeat(100));

        // Get all unique Dhanalakshmi Srinivasan college names
        const [uniqueColleges] = await conn.execute(
            `SELECT DISTINCT college_name, district, COUNT(*) as course_count
       FROM colleges 
       WHERE college_name LIKE '%Dhanalakshmi Srinivasan%'
       GROUP BY college_name, district
       ORDER BY district, college_name`
        );

        console.log('\n📚 UNIQUE DHANALAKSHMI SRINIVASAN INSTITUTIONS:');
        console.log('-'.repeat(100));
        uniqueColleges.forEach((c, idx) => {
            console.log(`${idx + 1}. ${c.college_name} (${c.district}) - ${c.course_count} courses`);
        });

        // For each unique college, check if fees exist
        console.log('\n\n🔍 FEES STATUS FOR EACH INSTITUTION:');
        console.log('='.repeat(100));

        for (const college of uniqueColleges) {
            console.log(`\n📍 ${college.college_name} (${college.district})`);
            console.log('-'.repeat(100));

            // Get one college_id for this college name + district combination
            const [ids] = await conn.execute(
                `SELECT college_id FROM colleges 
         WHERE college_name = ? AND district = ? 
         LIMIT 1`,
                [college.college_name, college.district]
            );

            if (ids.length === 0) {
                console.log('   ❌ No college_id found');
                continue;
            }

            const collegeId = ids[0].college_id;
            console.log(`   College ID: ${collegeId}`);

            // Check hostel fees
            const [hostelFees] = await conn.execute(
                `SELECT * FROM hostel_fees WHERE college_id = ?`,
                [collegeId]
            );

            console.log(`   🏨 Hostel Fees: ${hostelFees.length} records`);
            hostelFees.forEach(h => {
                console.log(`      - ${h.hostel_type} (${h.room_type}): ₹${h.total_amount.toLocaleString()}/year`);
            });

            // Check one-time fees
            const [oneTimeFees] = await conn.execute(
                `SELECT * FROM one_time_fees WHERE college_id = ?`,
                [collegeId]
            );

            console.log(`   💰 One-Time Fees: ${oneTimeFees.length} records`);
            oneTimeFees.forEach(o => {
                console.log(`      - ${o.fee_name}: ₹${o.amount.toLocaleString()} (${o.status})`);
            });

            if (hostelFees.length === 0 && oneTimeFees.length === 0) {
                console.log('   ⚠️  NO FEES DATA FOUND FOR THIS COLLEGE!');
            }
        }

        console.log('\n' + '='.repeat(100));
        console.log('END OF DIAGNOSTIC REPORT');
        console.log('='.repeat(100) + '\n');

        await conn.end();
    } catch (err) {
        console.error('Error:', err.message);
        console.error(err.stack);
    }
}

comprehensiveDiagnostic();
