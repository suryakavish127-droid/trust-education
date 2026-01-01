const db = require('./config/db');

async function populateFlatTables() {
    try {
        console.log('Populating flat tables with New Prince College data...');

        // 1. college_programme_fees (Mapping to their provided 'college_fees' insert)
        const progFees = [
            ['New Prince Shri Bhavani College of Engineering and Technology', 'Chennai', 'UG', 'B.E. Computer Science Engineering', 85000, 120000],
            ['New Prince Shri Bhavani College of Engineering and Technology', 'Chennai', 'UG', 'B.E. CSE - Cyber Security', 85000, 120000],
            ['New Prince Shri Bhavani College of Engineering and Technology', 'Chennai', 'UG', 'B.E. Electrical & Electronics Engineering', 75000, 75000],
            ['New Prince Shri Bhavani College of Engineering and Technology', 'Chennai', 'UG', 'B.E. Electronics & Communication Engineering', 80000, 115000],
            ['New Prince Shri Bhavani College of Engineering and Technology', 'Chennai', 'UG', 'B.E. Mechanical Engineering', 75000, 75000],
            ['New Prince Shri Bhavani College of Engineering and Technology', 'Chennai', 'UG', 'B.Tech Information Technology', 85000, 120000],
            ['New Prince Shri Bhavani College of Engineering and Technology', 'Chennai', 'UG', 'B.Tech Artificial Intelligence and Data Science', 85000, 120000],
            ['New Prince Shri Bhavani College of Engineering and Technology', 'Chennai', 'PG', 'M.E. Applied Electronics', 50000, 50000],
            ['New Prince Shri Bhavani College of Engineering and Technology', 'Chennai', 'PG', 'M.C.A. Master of Computer Application', 70000, 70000],
            ['New Prince Shri Bhavani College of Engineering and Technology', 'Chennai', 'PG', 'M.B.A. Master of Business Administration', 70000, 70000],
            ['New Prince Shri Bhavani College of Engineering and Technology', 'Chennai', 'UG', 'Lateral Entry', 80000, 115000]
        ];

        for (const row of progFees) {
            await db.query(
                'INSERT INTO college_programme_fees (college_name, place, programme, course, govt_fee, mgt_fee) VALUES (?, ?, ?, ?, ?, ?)',
                row
            );
        }
        console.log('Populated college_programme_fees.');

        // 2. mess_fees
        const messFees = [
            ['New Prince Shri Bhavani College of Engineering and Technology', 'Chennai', 'Veg', 45000],
            ['New Prince Shri Bhavani College of Engineering and Technology', 'Chennai', 'Non-Veg', 50000]
        ];
        for (const row of messFees) {
            await db.query(
                'INSERT INTO mess_fees (college_name, place, mess_type, fee_per_year) VALUES (?, ?, ?, ?)',
                row
            );
        }
        console.log('Populated mess_fees.');

        // 3. one_time_fees_flat (Mapping to their provided 'one_time_fees' insert)
        const oneTimeFees = [
            ['New Prince Shri Bhavani College of Engineering and Technology', 'Chennai', 'Admission Fee', 10000],
            ['New Prince Shri Bhavani College of Engineering and Technology', 'Chennai', 'Caution Deposit (Refundable)', 5000],
            ['New Prince Shri Bhavani College of Engineering and Technology', 'Chennai', 'Hostel Admission Fee', 5000]
        ];
        for (const row of oneTimeFees) {
            await db.query(
                'INSERT INTO one_time_fees_flat (college_name, place, description, amount) VALUES (?, ?, ?, ?)',
                row
            );
        }
        console.log('Populated one_time_fees_flat.');

        console.log('Finished populating flat data tables.');
        process.exit(0);
    } catch (err) {
        console.error('Error populating tables:', err);
        process.exit(1);
    }
}

populateFlatTables();
