const fs = require('fs');
const path = require('path');
const db = require('./config/db');

async function runUpdates() {
    try {
        const sqlPath = path.join(__dirname, 'add_loyola_hindusthan.sql');
        const sql = fs.readFileSync(sqlPath, 'utf8');

        // Split by semicolons to get individual statements, filtering out empty ones
        const statements = sql.split(';').filter(stmt => stmt.trim().length > 0);

        console.log(`Found ${statements.length} SQL statements to execute.`);

        for (const stmt of statements) {
            await db.query(stmt);
        }

        console.log('Successfully added Loyola and Hindusthan college data.');
        process.exit(0);
    } catch (err) {
        console.error('Error running updates:', err);
        process.exit(1);
    }
}

runUpdates();
