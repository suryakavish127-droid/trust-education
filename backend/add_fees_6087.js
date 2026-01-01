const db = require('./config/db');

async function addFees() {
    const collegeId = 6087;
    try {
        console.log(`Adding fees for college ID: ${collegeId}`);

        // 1. Add Hostel Fees (AC and Non-AC)
        // Rent values are per year. Mess is 40% of rent.
        const hostelFeesData = [
            ['Boys Hostel', 'AC', 100000, 40000, 140000],
            ['Boys Hostel', 'Non-AC', 70000, 28000, 98000],
            ['Girls Hostel', 'AC', 100000, 40000, 140000],
            ['Girls Hostel', 'Non-AC', 70000, 28000, 98000]
        ];

        for (const [type, room, rent, mess, total] of hostelFeesData) {
            await db.query(
                'INSERT INTO hostel_fees (college_id, hostel_type, room_type, fee_per_year, mess_fee, total_amount) VALUES (?, ?, ?, ?, ?, ?)',
                [collegeId, type, room, rent, mess, total]
            );
        }
        console.log('Successfully added AC and Non-AC hostel fees.');

        // 2. Add One-Time Fees
        const oneTimeFeesData = [
            ['Admission Fee', 20000, 'One-time admission processing fee', 'Non-Refundable'],
            ['Development Fee', 15000, 'Infrastructure development fee', 'Non-Refundable'],
            ['Caution Deposit', 5000, 'Refundable security deposit', 'Refundable']
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
