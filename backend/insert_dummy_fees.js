const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();

async function run() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

    console.log('Fetching actual college IDs...');
    const [colleges] = await connection.query('SELECT college_id, college_name FROM colleges ORDER BY college_id LIMIT 2');

    if (colleges.length < 2) {
        console.error('Not enough colleges found to insert dummy data.');
        process.exit(1);
    }

    const id1 = colleges[0].college_id;
    const id2 = colleges[1].college_id;

    console.log(`Using IDs: ${id1} (${colleges[0].college_name}), ${id2} (${colleges[1].college_name})`);

    console.log('Clearing existing fee data...');
    await connection.query('DELETE FROM hostel_fees');
    await connection.query('DELETE FROM one_time_fees');

    console.log('Inserting Dummy Data...');

    const hostelData = [
        [id1, 'Boys Hostel', 'AC', 50000, 15000, 65000],
        [id1, 'Boys Hostel', 'Non-AC', 40000, 15000, 55000],
        [id1, 'Girls Hostel', 'AC', 48000, 15000, 63000],
        [id1, 'Girls Hostel', 'Non-AC', 38000, 15000, 53000],
        [id2, 'Boys Hostel', 'AC', 52000, 16000, 68000],
        [id2, 'Girls Hostel', 'Non-AC', 39000, 14000, 53000]
    ];

    for (const d of hostelData) {
        await connection.query(
            'INSERT INTO hostel_fees (college_id, hostel_type, room_type, fee_per_year, mess_fee, total_amount) VALUES (?, ?, ?, ?, ?, ?)',
            d
        );
    }

    const onetimeData = [
        [id1, 'Registration Fee', 5000, 'College registration', 'Non-Refundable'],
        [id1, 'Caution Deposit', 10000, 'Refundable security deposit', 'Refundable'],
        [id1, 'Admission Fee', 15000, 'One-time admission', 'Non-Refundable'],
        [id1, 'Development Fee', 20000, 'Infrastructure development', 'Non-Refundable'],
        [id2, 'Registration Fee', 6000, 'College registration', 'Non-Refundable'],
        [id2, 'Caution Deposit', 9000, 'Refundable security deposit', 'Refundable'],
        [id2, 'Admission Fee', 14000, 'One-time admission', 'Non-Refundable'],
        [id2, 'Development Fee', 18000, 'Infrastructure development', 'Non-Refundable']
    ];

    for (const d of onetimeData) {
        await connection.query(
            'INSERT INTO one_time_fees (college_id, fee_name, amount, purpose, status) VALUES (?, ?, ?, ?, ?)',
            d
        );
    }

    console.log('Dummy Data Inserted Successfully.');
    await connection.end();
}

run().catch(console.error);
