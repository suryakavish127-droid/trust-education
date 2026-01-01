const db = require('./config/db');

async function checkColumns() {
    try {
        const [rows] = await db.query('DESCRIBE hostel_fees');
        console.log('Columns in hostel_fees:');
        rows.forEach(row => console.log(`- ${row.Field} (${row.Type})`));
        process.exit(0);
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
}

checkColumns();
