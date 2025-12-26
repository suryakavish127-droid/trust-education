const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const fs = require('fs');

dotenv.config();

async function verify() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME || 'college_agency_db'
        });

        const [rows] = await connection.query('SELECT * FROM course_fees WHERE college_name = ?', ['Imayam College of Engineering']);

        let output = `Found ${rows.length} courses for Imayam College of Engineering:\n\n`;
        rows.forEach(row => {
            output += `${row.course.padEnd(20)} | FG Fee: Rs.${row.fg_fee.toString().padStart(6)} | Non-FG Fee: Rs.${row.non_fg_fee.toString().padStart(6)} | ${row.sc_sca_st}\n`;
        });

        console.log(output);
        fs.writeFileSync('imayam_verification.txt', output);
        console.log('\nResults saved to imayam_verification.txt');

        await connection.end();
    } catch (err) {
        console.error('Error:', err.message);
    }
}

verify();
