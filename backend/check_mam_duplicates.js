const db = require('./config/db');

async function checkMAMDuplicates() {
    try {
        const [rows] = await db.query('SELECT college_name, degree, COUNT(*) as count FROM colleges WHERE college_name LIKE "%M.A.M%" GROUP BY college_name, degree HAVING count > 0');
        console.log('M.A.M College Records:');
        rows.forEach(r => console.log(`- [${r.college_name}] (${r.degree}): ${r.count}`));
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}
checkMAMDuplicates();
