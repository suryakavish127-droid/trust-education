const db = require('./config/db');

async function addData() {
    try {
        console.log('Starting data insertion for New Prince Shri Bhavani College...');

        // 1. Insert into colleges table (so it shows up in search)
        // Each course is a separate entry in the colleges table
        const colleges = [
            ['New Prince Shri Bhavani College of Engineering and Technology', 'Chennai', 'B.E. Computer Science Engineering', 85000, 'UG Course | Govt: 85,000 | Mgt: 1,20,000'],
            ['New Prince Shri Bhavani College of Engineering and Technology', 'Chennai', 'B.E. CSE - Cyber Security', 85000, 'UG Course | Govt: 85,000 | Mgt: 1,20,000'],
            ['New Prince Shri Bhavani College of Engineering and Technology', 'Chennai', 'B.E. Electrical & Electronics Engineering', 75000, 'UG Course | Govt: 75,000 | Mgt: 75,000'],
            ['New Prince Shri Bhavani College of Engineering and Technology', 'Chennai', 'B.E. Electronics & Communication Engineering', 80000, 'UG Course | Govt: 80,000 | Mgt: 1,15,000'],
            ['New Prince Shri Bhavani College of Engineering and Technology', 'Chennai', 'B.E. Mechanical Engineering', 75000, 'UG Course | Govt: 75,000 | Mgt: 75,000'],
            ['New Prince Shri Bhavani College of Engineering and Technology', 'Chennai', 'B.Tech Information Technology', 85000, 'UG Course | Govt: 85,000 | Mgt: 1,20,000'],
            ['New Prince Shri Bhavani College of Engineering and Technology', 'Chennai', 'B.Tech Artificial Intelligence and Data Science', 85000, 'UG Course | Govt: 85,000 | Mgt: 1,20,000'],
            ['New Prince Shri Bhavani College of Engineering and Technology', 'Chennai', 'M.E. Applied Electronics', 50000, 'PG Course | Govt & Mgt: 50,000'],
            ['New Prince Shri Bhavani College of Engineering and Technology', 'Chennai', 'M.C.A. Master of Computer Application', 70000, 'PG Course | Govt & Mgt: 70,000'],
            ['New Prince Shri Bhavani College of Engineering and Technology', 'Chennai', 'M.B.A. Master of Business Administration', 70000, 'PG Course | Govt & Mgt: 70,000'],
            ['New Prince Shri Bhavani College of Engineering and Technology', 'Chennai', 'Lateral Entry', 80000, 'Lateral Entry Course | Govt: 80,000 | Mgt: 1,15,000']
        ];

        for (const c of colleges) {
            await db.query(
                'INSERT INTO colleges (college_name, district, degree, fees, description) VALUES (?, ?, ?, ?, ?)',
                c
            );
        }
        console.log('Inserted colleges.');

        // 2. Get the college IDs to link hostel and one-time fees
        const [collegeRows] = await db.query(
            'SELECT college_id FROM colleges WHERE college_name = ?',
            ['New Prince Shri Bhavani College of Engineering and Technology']
        );

        if (collegeRows.length > 0) {
            const firstId = collegeRows[0].college_id;

            // 3. Insert into hostel_fees (relational)
            const hostelFees = [
                [firstId, 'Boys Hostel', 'AC', 90000, 0, 90000],
                [firstId, 'Boys Hostel', 'Non-AC', 70000, 0, 70000],
                [firstId, 'Girls Hostel', 'AC', 90000, 0, 90000],
                [firstId, 'Girls Hostel', 'Non-AC', 70000, 0, 70000]
            ];
            // Since the UI shows these for ALL courses of the college, 
            // we should technically link them to all IDs, or the UI should be smart enough.
            // Currently CollegeDetails.jsx fetches by ID. So we need to insert for ALL IDs.
            for (const row of collegeRows) {
                const id = row.college_id;
                for (const hf of hostelFees) {
                    const rent = hf[3];
                    const calculatedMess = Math.round(rent * 0.40);
                    const calculatedTotal = rent + calculatedMess;
                    await db.query(
                        'INSERT INTO hostel_fees (college_id, hostel_type, room_type, fee_per_year, mess_fee, total_amount) VALUES (?, ?, ?, ?, ?, ?)',
                        [id, hf[1], hf[2], rent, calculatedMess, calculatedTotal]
                    );
                }
            }
            console.log('Inserted hostel fees for all courses.');

            // 4. Insert into one_time_fees (relational)
            const oneTimeFees = [
                [firstId, 'Admission Fee', 10000, 'One-time admission charge', 'Non-Refundable'],
                [firstId, 'Caution Deposit (Refundable)', 5000, 'Refundable security deposit', 'Refundable'],
                [firstId, 'Hostel Admission Fee', 5000, 'One-time hostel processing fee', 'Non-Refundable']
            ];
            for (const row of collegeRows) {
                const id = row.college_id;
                for (const otf of oneTimeFees) {
                    await db.query(
                        'INSERT INTO one_time_fees (college_id, fee_name, amount, purpose, status) VALUES (?, ?, ?, ?, ?)',
                        [id, otf[1], otf[2], otf[3], otf[4]]
                    );
                }
            }
            console.log('Inserted one-time fees for all courses.');
        }

        // 5. Insert into the flat tables as requested by the user
        // Creating the mess_fees table first if it doesn't exist (handled by setup script, but double check)
        await db.query(`CREATE TABLE IF NOT EXISTS mess_fees (
            id INT AUTO_INCREMENT PRIMARY KEY,
            college_name VARCHAR(255),
            place VARCHAR(255),
            mess_type VARCHAR(50),
            fee_per_year INT
        )`);

        const messFees = [
            ['New Prince Shri Bhavani College of Engineering and Technology', 'Chennai', 'Veg', 45000],
            ['New Prince Shri Bhavani College of Engineering and Technology', 'Chennai', 'Non-Veg', 50000]
        ];
        for (const mf of messFees) {
            await db.query('INSERT INTO mess_fees (college_name, place, mess_type, fee_per_year) VALUES (?, ?, ?, ?)', mf);
        }
        console.log('Inserted flat mess fees.');

        console.log('All data for New Prince Shri Bhavani College has been successfully added.');
        process.exit(0);
    } catch (err) {
        console.error('Error adding data:', err);
        process.exit(1);
    }
}

addData();
