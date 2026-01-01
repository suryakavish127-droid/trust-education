const db = require('./config/db');

async function checkMAMHostel() {
    try {
        const [rows] = await db.query(`
            SELECT c.college_name, c.degree, COUNT(hf.id) as hostel_count 
            FROM colleges c 
            LEFT JOIN hostel_fees hf ON c.college_id = hf.college_id 
            WHERE c.college_name LIKE "%M.A.M%" 
            GROUP BY c.college_name, c.degree
        `);
        console.log(JSON.stringify(rows, null, 2));
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}
checkMAMHostel();
