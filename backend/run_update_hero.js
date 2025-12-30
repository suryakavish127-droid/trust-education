const fs = require('fs');
const path = require('path');
const db = require('./config/db');

async function runUpdates() {
    try {
        const sqlPath = path.join(__dirname, 'update_hero_image.sql');
        const sql = fs.readFileSync(sqlPath, 'utf8');

        await db.query(sql);

        console.log('Successfully updated image URL for Dhanalakshmi Srinivasan College.');
        process.exit(0);
    } catch (err) {
        console.error('Error running updates:', err);
        process.exit(1);
    }
}

runUpdates();
