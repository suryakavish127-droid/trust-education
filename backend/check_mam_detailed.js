const db = require('./config/db');

async function checkMAMDuplicates() {
    try {
        const [rows] = await db.query('SELECT college_name, degree, COUNT(*) as count FROM colleges WHERE college_name LIKE "%M.A.M%" GROUP BY college_name, degree');
        console.log('M.A.M College Records:');
        rows.forEach(r => {
            console.log(`Name: ${r.college_name}`);
            console.log(`Degree: ${r.degree}`);
            console.log(`Count: ${r.count}`);
            console.log('-------------------');
        });
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}
checkMAMDuplicates();
