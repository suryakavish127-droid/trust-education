const db = require('./config/db');

async function run() {
    try {
        const [colleges] = await db.query(
            "SELECT college_id FROM colleges WHERE college_name = 'Dhanalakshmi Srinivasan Arts and Science College' AND district = 'Perambalur'"
        );

        console.log(`Found ${colleges.length} courses for DS Arts & Science Perambalur.`);

        const fees = [
            ['Boys Hostel', 'AC Room', 70000, 40000, 110000],
            ['Boys Hostel', 'Non-AC Room', 50000, 35000, 85000],
            ['Girls Hostel', 'AC Room', 75000, 42000, 117000],
            ['Girls Hostel', 'Non-AC Room', 55000, 35000, 90000]
        ];

        for (const clg of colleges) {
            const cid = clg.college_id;
            // Clear existing for this specific ID if needed, but the user asked for INSERT.
            // However, to keep it clean, maybe we should delete existing hostel fees for these courses first?
            // Given the pattern in previous scripts, let's delete existing ones for these IDs.
            await db.query("DELETE FROM hostel_fees WHERE college_id = ?", [cid]);

            for (const f of fees) {
                await db.query(
                    "INSERT INTO hostel_fees (college_id, hostel_type, room_type, fee_per_year, mess_fee, total_amount) VALUES (?, ?, ?, ?, ?, ?)",
                    [cid, f[0], f[1], f[2], f[3], f[4]]
                );
            }
        }

        console.log("Successfully inserted hostel fees for all identified courses.");
        process.exit(0);
    } catch (err) {
        console.error("Error:", err);
        process.exit(1);
    }
}

run();
