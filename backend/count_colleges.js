const db = require('./config/db');

async function countColleges() {
    try {
        const [rows] = await db.query('SELECT college_name, COUNT(*) as count FROM colleges GROUP BY college_name');
        console.log(JSON.stringify(rows));
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}
countColleges();
