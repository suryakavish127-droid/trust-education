const db = require('./config/db');

async function checkMAMDuplicates() {
    try {
        const [rows] = await db.query('SELECT college_name, degree, COUNT(*) as count FROM colleges WHERE college_name LIKE "%M.A.M%" GROUP BY college_name, degree');
        console.log(JSON.stringify(rows, null, 2));
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}
checkMAMDuplicates();
