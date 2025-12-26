const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();

async function populate() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

    console.log('Populating One-Time Fees for Adithya colleges...');

    const fees = [
        {
            college_name: 'Adithya Institute of Technology',
            fee_name: 'Registration Fee',
            amount: 5000,
            purpose: 'Admission and File Processing',
            refundable_status: 'Non-Refundable'
        },
        {
            college_name: 'Adithya Institute of Technology',
            fee_name: 'Caution Deposit',
            amount: 10000,
            purpose: 'Refundable security deposit for lab and library',
            refundable_status: 'Refundable'
        },
        {
            college_name: 'Adithya College of Arts and Science',
            fee_name: 'University Registration',
            amount: 3000,
            purpose: 'Bardhiar University registration and enrollment',
            refundable_status: 'Non-Refundable'
        },
        {
            college_name: 'Adithya College of Arts and Science',
            fee_name: 'Library Deposit',
            amount: 2000,
            purpose: 'Security deposit for library resources',
            refundable_status: 'Refundable'
        }
    ];

    for (const f of fees) {
        await connection.query(
            'INSERT INTO college_fees (college_name, fee_category, fee_name, amount, purpose, refundable_status) VALUES (?, ?, ?, ?, ?, ?)',
            [f.college_name, 'One-Time', f.fee_name, f.amount, f.purpose, f.refundable_status]
        );
    }

    console.log('Sample One-Time Fees populated.');
    await connection.end();
}

populate().catch(console.error);
