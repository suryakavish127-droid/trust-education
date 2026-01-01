const db = require('./config/db');

async function addFees() {
    const collegeId = 6257;
    try {
        console.log(`Adding fees for college ID: ${collegeId}`);

        // 1. Add Hostel Fees
        const hostelFeesData = [
            ['Boys Hostel', 'Standard', 85000, 34000, 119000],
            ['Girls Hostel', 'Standard', 80000, 32000, 112000]
        ];

        for (const [type, room, rent, mess, total] of hostelFeesData) {
            await db.query(
                'INSERT INTO hostel_fees (college_id, hostel_type, room_type, fee_per_year, mess_fee, total_amount) VALUES (?, ?, ?, ?, ?, ?)',
                [collegeId, type, room, rent, mess, total]
            );
        }
        console.log('Successfully added hostel fees.');

        // 2. Add One-Time Fees
        const oneTimeFeesData = [
            ['Admission Fee', 20000, 'One-time admission processing fee', 'Non-Refundable'],
            ['Development Fee', 15000, 'Infrastructure development fee', 'Non-Refundable']
        ];

        for (const [name, amount, purpose, status] of oneTimeFeesData) {
            await db.query(
                'INSERT INTO one_time_fees (college_id, fee_name, amount, purpose, status) VALUES (?, ?, ?, ?, ?)',
                [collegeId, name, amount, purpose, status]
            );
        }
        console.log('Successfully added one-time fees.');

        process.exit(0);
    } catch (err) {
        console.error('Failed to add fees:', err.message);
        process.exit(1);
    }
}

addFees();
