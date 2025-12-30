const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

async function verifyDetailedData() {
    try {
        const conn = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        const [rows] = await conn.execute(
            `SELECT college_name, district, COUNT(*) as count 
       FROM colleges 
       WHERE college_name LIKE '%Dhanalakshmi Srinivasan%' 
       GROUP BY college_name, district
       ORDER BY district, college_name`
        );

        console.log('\n✅ Dhanalakshmi Srinivasan Institutions - Complete Data:');
        console.log('='.repeat(80));

        let currentDistrict = '';
        let totalCourses = 0;

        rows.forEach(r => {
            if (r.district !== currentDistrict) {
                if (currentDistrict !== '') console.log('');
                console.log(`\n📍 ${r.district.toUpperCase()}`);
                console.log('-'.repeat(80));
                currentDistrict = r.district;
            }
            console.log(`  ✓ ${r.college_name}: ${r.count} courses`);
            totalCourses += r.count;
        });

        console.log('\n' + '='.repeat(80));
        console.log(`\n🎓 TOTAL: ${totalCourses} courses across ${rows.length} institutions\n`);

        await conn.end();
    } catch (err) {
        console.error('Error:', err.message);
    }
}

verifyDetailedData();
