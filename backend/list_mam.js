const db = require('./config/db');

async function listMAM() {
    try {
        const [rows] = await db.query('SELECT DISTINCT college_name FROM colleges WHERE college_name LIKE "%M.A.M%"');
        console.log('M.A.M Colleges in DB:');
        rows.forEach(r => console.log(`- ${r.college_name}`));
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}
listMAM();
