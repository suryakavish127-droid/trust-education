const mysql = require('mysql2/promise');
require('dotenv').config();

async function verify() {
    const conn = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

    console.log('Verifying M.A.M and ABC Data...');

    const colleges = ['M.A.M College of Engineering', 'ABC Arts and Science College'];

    for (const college of colleges) {
        console.log(`\nChecking ${college}:`);

        // Count Courses
        const [courses] = await conn.execute(
            'SELECT COUNT(*) as count FROM colleges WHERE college_name = ?',
            [college]
        );
        const courseCount = courses[0].count;
        console.log(`- Total Courses: ${courseCount}`);

        if (courseCount === 0) {
            console.log('  ❌ No courses found! Check INSERT statements.');
            continue;
        }

        // Count Hostel Fees
        const [hostel] = await conn.execute(
            `SELECT COUNT(*) as count FROM hostel_fees hf
             JOIN colleges c ON hf.college_id = c.college_id
             WHERE c.college_name = ?`,
            [college]
        );
        console.log(`- Hostel Fee Records: ${hostel[0].count}`);

        // Count One-Time Fees
        const [onetime] = await conn.execute(
            `SELECT COUNT(*) as count FROM one_time_fees otf
             JOIN colleges c ON otf.college_id = c.college_id
             WHERE c.college_name = ?`,
            [college]
        );
        console.log(`- One-Time Fee Records: ${onetime[0].count}`);
    }

    await conn.end();
}

verify().catch(console.error);
