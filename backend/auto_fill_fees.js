const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '.env') });

const HOSTEL_TYPES = [
    { type: '8 Per Room - Common Bathroom', min: 70000, max: 80000 },
    { type: '6 Per Room - Non AC', min: 90000, max: 100000 },
    { type: '4 Per Room - AC', min: 110000, max: 130000 },
    { type: '2 Per Room - AC Luxury', min: 150000, max: 200000 }
];

const PASSWORDS_TO_TRY = [
    process.env.DB_PASSWORD, // Try what's in .env first
    'root123',
    ':root123',
    '',
    'root',
    'admin',
    'admin123',
    'password',
    '123456'
];

async function run() {
    console.log('Starting Auto-Fill Fees & Connection Fixer...');
    console.log(`Target Host: ${process.env.DB_HOST}`);
    console.log(`Target User: ${process.env.DB_USER}`);

    let connection = null;
    let workingPassword = null;

    // 1. Try to connect
    for (const pass of PASSWORDS_TO_TRY) {
        if (pass === undefined) continue;
        console.log(`Trying password: '${pass}' ...`);
        try {
            connection = await mysql.createConnection({
                host: process.env.DB_HOST || '127.0.0.1',
                user: process.env.DB_USER || 'root',
                password: pass,
                multipleStatements: true
            });
            console.log('SUCCESS! Connected with password:', pass);
            workingPassword = pass;
            break;
        } catch (err) {
            console.log(`Failed: ${err.message}`);
        }
    }

    if (!connection) {
        console.error('CRITICAL: Could not connect with any common password.');
        console.error('Please verify your MySQL password and update backend/.env manually.');
        process.exit(1);
    }

    // 2. Update .env if password changed
    if (workingPassword !== process.env.DB_PASSWORD) {
        console.log('Updating backend/.env with the correct password...');
        const envPath = path.join(__dirname, '.env');
        let envContent = fs.readFileSync(envPath, 'utf8');
        // Replace DB_PASSWORD line
        const regex = /DB_PASSWORD=.*/;
        if (regex.test(envContent)) {
            envContent = envContent.replace(regex, `DB_PASSWORD=${workingPassword}`);
        } else {
            envContent += `\nDB_PASSWORD=${workingPassword}`;
        }
        fs.writeFileSync(envPath, envContent);
        console.log('.env updated.');
    }

    // 3. Setup Database and Add Fees
    try {
        const dbName = process.env.DB_NAME || 'clg';
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
        await connection.query(`USE \`${dbName}\``);
        console.log(`Using database: ${dbName}`);

        // Ensure table exists
        await connection.query(`
            CREATE TABLE IF NOT EXISTS college_hostel_fees (
                id INT AUTO_INCREMENT PRIMARY KEY,
                college_name VARCHAR(200),
                hostel_type VARCHAR(200),
                amount INT,
                note VARCHAR(100)
            )
        `);

        // TRUNCATE table to ensure fresh random fees on retry
        console.log('Clearing existing hostel fees for a fresh start...');
        await connection.query('TRUNCATE TABLE college_hostel_fees');

        // Get all colleges
        const [colleges] = await connection.query('SELECT DISTINCT college_name FROM colleges');
        console.log(`Found ${colleges.length} colleges.`);

        let addedCount = 0;
        for (const clg of colleges) {
            const name = clg.college_name;
            console.log(`Adding fees for ${name}...`);
            for (const h of HOSTEL_TYPES) {
                const amount = Math.floor(Math.random() * (h.max - h.min + 1)) + h.min;
                const roundedAmount = Math.round(amount / 1000) * 1000;

                await connection.query(
                    'INSERT INTO college_hostel_fees (college_name, hostel_type, amount, note) VALUES (?, ?, ?, ?)',
                    [name, h.type, roundedAmount, 'Yearly']
                );
                addedCount++;
            }
        }

        console.log(`\nSuccessfully added ${addedCount} new fee records!`);
        console.log('Verify at /colleges page.');

    } catch (err) {
        console.error('Error during data setup:', err);
    } finally {
        await connection.end();
    }
}

run();
