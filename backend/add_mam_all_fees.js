const db = require('./config/db');

async function addMamAllFees() {
    try {
        // 1. Get all M.A.M college IDs
        const [colleges] = await db.query('SELECT college_id, college_name FROM colleges WHERE college_name LIKE ?', ['%M.A.M%']);
        console.log(`Found ${colleges.length} M.A.M related college entries.`);

        const collegeIds = colleges.map(c => c.college_id);

        for (const id of collegeIds) {
            console.log(`Processing ID: ${id}`);

            // Clear existing unified fees for this ID to avoid duplicates (optional but safer for "syncing")
            await db.query('DELETE FROM hostel_fees WHERE college_id = ?', [id]);
            await db.query('DELETE FROM one_time_fees WHERE college_id = ?', [id]);

            // 2. Add Hostel Fees
            // Rent: AC 70k, Non-AC 45k. Mess: 40%
            const hostelFeesData = [
                ['Boys Hostel', 'AC', 70000, 28000, 98000],
                ['Boys Hostel', 'Non-AC', 45000, 18000, 63000],
                ['Girls Hostel', 'AC', 70000, 28000, 98000],
                ['Girls Hostel', 'Non-AC', 45000, 18000, 63000]
            ];

            for (const [type, room, rent, mess, total] of hostelFeesData) {
                await db.query(
                    'INSERT INTO hostel_fees (college_id, hostel_type, room_type, fee_per_year, mess_fee, total_amount) VALUES (?, ?, ?, ?, ?, ?)',
                    [id, type, room, rent, mess, total]
                );
            }

            // 3. Add One-Time Fees
            const oneTimeFeesData = [
                ['Admission Fee', 10000, 'One-time admission charge', 'Non-Refundable'],
                ['Technology Fee', 5000, 'Lab and maintenance fee', 'Non-Refundable']
            ];

            for (const [name, amount, purpose, status] of oneTimeFeesData) {
                await db.query(
                    'INSERT INTO one_time_fees (college_id, fee_name, amount, purpose, status) VALUES (?, ?, ?, ?, ?)',
                    [id, name, amount, purpose, status]
                );
            }
        }

        console.log('Successfully updated fees for all M.A.M colleges.');
        process.exit(0);
    } catch (err) {
        console.error('Failed to update M.A.M fees:', err.message);
        process.exit(1);
    }
}

addMamAllFees();
