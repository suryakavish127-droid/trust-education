const db = require('./config/db');

async function verifyNewMAM() {
    try {
        const college = 'M.A.M College of Engineering and Technology';
        const [rows] = await db.query('SELECT COUNT(*) as count FROM colleges WHERE college_name = ?', [college]);
        console.log(`Verification for "${college}":`);
        console.log(`- Courses Found: ${rows[0].count}`);

        const [hostel] = await db.query('SELECT COUNT(*) as count FROM hostel_fees hf JOIN colleges c ON hf.college_id = c.college_id WHERE c.college_name = ?', [college]);
        console.log(`- Hostel Records: ${hostel[0].count}`);

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}
verifyNewMAM();
