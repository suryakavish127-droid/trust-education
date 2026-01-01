const db = require('./config/db');

async function addMAMData() {
    try {
        const sql = `INSERT INTO colleges (college_name, district, degree, fees, description) VALUES
            ('M.A.M College of Engineering and Technology', 'Tiruchirappalli', 'I - CSE, IT & AI', 80000, 'Total Fee: 110000, Note: FG + 55000, Extra: 60000'),
            ('M.A.M College of Engineering and Technology', 'Tiruchirappalli', 'I - ECE', 60000, 'Total Fee: 75000, Note: FG + 35000, Extra: 60000'),
            ('M.A.M College of Engineering and Technology', 'Tiruchirappalli', 'I - EEE', 55000, 'Total Fee: 55000, Note: FG + 30000, Extra: 60000'),
            ('M.A.M College of Engineering and Technology', 'Tiruchirappalli', 'I - MECH', 50000, 'Total Fee: 55000, Note: FG + 25000, Extra: 60000'),
            ('M.A.M College of Engineering and Technology', 'Tiruchirappalli', 'I - CIVIL', 50000, 'Total Fee: 55000, Note: FG + 25000, Extra: 60000'),
            ('M.A.M College of Engineering and Technology', 'Tiruchirappalli', 'II LE - CSE, IT, AI & ECE', 55000, 'Total Fee: 55000, Note: FG + 30000, Extra: 60000'),
            ('M.A.M College of Engineering and Technology', 'Tiruchirappalli', 'II LE - EEE', 55000, 'Total Fee: 55000, Note: FG + 30000, Extra: 60000'),
            ('M.A.M College of Engineering and Technology', 'Tiruchirappalli', 'II LE - CIVIL & MECH', 50000, 'Total Fee: 55000, Note: FG + 25000, Extra: 60000'),
            ('M.A.M College of Engineering and Technology', 'Tiruchirappalli', 'M.E - Structural Engineering', 50000, 'Total Fee: 55000'),
            ('M.A.M College of Engineering and Technology', 'Tiruchirappalli', 'M.E - VLSI & CAD / CAM', 50000, 'Total Fee: 55000')`;

        const [result] = await db.query(sql);
        console.log(`Successfully added ${result.affectedRows} M.A.M College records to the database.`);
        process.exit(0);
    } catch (err) {
        console.error('Error adding data:', err.message);
        process.exit(1);
    }
}

addMAMData();
