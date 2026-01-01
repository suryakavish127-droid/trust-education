const fs = require('fs');
const path = require('path');
const db = require('./config/db');

async function runSetup() {
    try {
        const sqlPath = path.join(__dirname, 'setup_new_prince_tables.sql');
        const sql = fs.readFileSync(sqlPath, 'utf8');

        // Split by semicolons and remove empty statements
        const statements = sql
            .split(';')
            .map(s => s.trim())
            .filter(s => s.length > 0);

        console.log(`Executing ${statements.length} SQL statements...`);

        for (const statement of statements) {
            await db.query(statement);
        }

        console.log('Successfully set up tables for New Prince Shri Bhavani College.');
        process.exit(0);
    } catch (err) {
        console.error('Error setting up tables:', err);
        process.exit(1);
    }
}

runSetup();
