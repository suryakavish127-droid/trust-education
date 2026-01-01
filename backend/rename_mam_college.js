const db = require('./config/db');

async function renameCollege() {
    try {
        const oldName = 'MAM College of Engineering and Technology';
        const newName = 'M.A.M College of Engineering and Technology';

        const [result] = await db.query(
            'UPDATE colleges SET college_name = ? WHERE college_name = ?',
            [newName, oldName]
        );

        console.log(`Updated ${result.affectedRows} records: "${oldName}" -> "${newName}"`);

        // Also update the image URLs if they exist for this college name
        await db.query(
            'UPDATE colleges SET image_url = REPLACE(image_url, ?, ?) WHERE college_name = ?',
            [oldName, newName, newName]
        );

        process.exit(0);
    } catch (err) {
        console.error('Update failed:', err.message);
        process.exit(1);
    }
}

renameCollege();
