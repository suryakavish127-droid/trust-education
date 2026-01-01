const db = require('./config/db');

async function addHindustanAllFees() {
    try {
        // 1. Get all Hindustan/Hindusthan college IDs
        const [colleges] = await db.query('SELECT college_id, college_name FROM colleges WHERE college_name LIKE ? OR college_name LIKE ?', ['%Hindustan%', '%Hindusthan%']);
        console.log(`Found ${colleges.length} Hindustan related college entries.`);

        const collegeIds = colleges.map(c => c.college_id);

        for (const id of collegeIds) {
            console.log(`Processing ID: ${id}`);

            // Clear existing unified fees for this ID
            await db.query('DELETE FROM hostel_fees WHERE college_id = ?', [id]);
            await db.query('DELETE FROM one_time_fees WHERE college_id = ?', [id]);

            // 2. Add Hostel Fees (Boys & Girls, AC & Non-AC)
            // Rent: AC 100k, Non-AC 70k. Mess: 40%
            const hostelFeesData = [
                ['Boys Hostel', 'AC', 100000, 40000, 140000],
                ['Boys Hostel', 'Non-AC', 70000, 28000, 98000],
                ['Girls Hostel', 'AC', 100000, 40000, 140000],
                ['Girls Hostel', 'Non-AC', 70000, 28000, 98000]
            ];

            for (const [type, room, rent, mess, total] of hostelFeesData) {
                await db.query(
                    'INSERT INTO hostel_fees (college_id, hostel_type, room_type, fee_per_year, mess_fee, total_amount) VALUES (?, ?, ?, ?, ?, ?)',
                    [id, type, room, rent, mess, total]
                );
            }

            // 3. Add One-Time Fees
            const oneTimeFeesData = [
                ['Admission Fee', 20000, 'One-time admission charge', 'Non-Refundable'],
                ['Development Fee', 15000, 'Infrastructure development fee', 'Non-Refundable'],
                ['Caution Deposit', 5000, 'Refundable security deposit', 'Refundable']
            ];

            for (const [name, amount, purpose, status] of oneTimeFeesData) {
                await db.query(
                    'INSERT INTO one_time_fees (college_id, fee_name, amount, purpose, status) VALUES (?, ?, ?, ?, ?)',
                    [id, name, amount, purpose, status]
                );
            }
        }

        console.log('Successfully updated fees for all Hindustan/Hindusthan colleges.');
        process.exit(0);
    } catch (err) {
        console.error('Failed to update Hindustan fees:', err.message);
        process.exit(1);
    }
}

addHindustanAllFees();
