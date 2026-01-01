const db = require('./config/db');

const sqlStatements = [
    `INSERT INTO colleges (college_name, district, degree, fees, description, image_url) VALUES
    ('Dhanalakshmi Srinivasan College of Engineering and Technology', 'Perambalur', 'B.E Aeronautical Engineering', 65000, 'UG First Year | Govt: 65,000 | Management: 75,000', 'dscet.jpg'),
    ('Dhanalakshmi Srinivasan College of Engineering and Technology', 'Perambalur', 'B.E Agricultural Engineering', 70000, 'UG First Year | Govt: 70,000 | Management: 90,000', 'dscet.jpg'),
    ('Dhanalakshmi Srinivasan College of Engineering and Technology', 'Perambalur', 'B.Tech Artificial Intelligence & Data Science', 110000, 'UG First Year | Govt: 1,10,000 | Management: 1,35,000', 'dscet.jpg'),
    ('Dhanalakshmi Srinivasan College of Engineering and Technology', 'Perambalur', 'B.E Biomedical Engineering', 85000, 'UG First Year | Govt: 85,000 | Management: 1,05,000', 'dscet.jpg'),
    ('Dhanalakshmi Srinivasan College of Engineering and Technology', 'Perambalur', 'B.E Civil Engineering', 60000, 'UG First Year | Govt: 60,000 | Management: 65,000', 'dscet.jpg'),
    ('Dhanalakshmi Srinivasan College of Engineering and Technology', 'Perambalur', 'B.E Computer Science and Engineering', 110000, 'UG First Year | Govt: 1,10,000 | Management: 1,35,000', 'dscet.jpg'),
    ('Dhanalakshmi Srinivasan College of Engineering and Technology', 'Perambalur', 'B.E CSE (Cyber Security)', 110000, 'UG First Year | Govt: 1,10,000 | Management: 1,30,000', 'dscet.jpg'),
    ('Dhanalakshmi Srinivasan College of Engineering and Technology', 'Perambalur', 'B.E CSE (AI & ML)', 110000, 'UG First Year | Govt: 1,10,000 | Management: 1,30,000', 'dscet.jpg'),
    ('Dhanalakshmi Srinivasan College of Engineering and Technology', 'Perambalur', 'B.E Electrical and Electronics Engineering', 75000, 'UG First Year | Govt: 75,000 | Management: 80,000', 'dscet.jpg'),
    ('Dhanalakshmi Srinivasan College of Engineering and Technology', 'Perambalur', 'B.E Electronics and Communication Engineering', 85000, 'UG First Year | Govt: 85,000 | Management: 95,000', 'dscet.jpg'),
    ('Dhanalakshmi Srinivasan College of Engineering and Technology', 'Perambalur', 'B.Tech Information Technology', 110000, 'UG First Year | Govt: 1,10,000 | Management: 1,35,000', 'dscet.jpg');`,

    `INSERT INTO colleges (college_name, district, degree, fees, description, image_url) VALUES
    ('Dhanalakshmi Srinivasan College of Engineering and Technology', 'Perambalur', 'B.E Aeronautical Engineering (Lateral Entry)', 60000, 'UG Direct Second Year | Govt: 60,000 | Management: 70,000', 'dscet.jpg'),
    ('Dhanalakshmi Srinivasan College of Engineering and Technology', 'Perambalur', 'B.E Agricultural Engineering (Lateral Entry)', 60000, 'UG Direct Second Year | Govt: 60,000 | Management: 90,000', 'dscet.jpg'),
    ('Dhanalakshmi Srinivasan College of Engineering and Technology', 'Perambalur', 'B.Tech Artificial Intelligence & Data Science (Lateral Entry)', 100000, 'UG Direct Second Year | Govt: 1,00,000 | Management: 1,20,000', 'dscet.jpg'),
    ('Dhanalakshmi Srinivasan College of Engineering and Technology', 'Perambalur', 'B.E Computer Science and Engineering (Lateral Entry)', 100000, 'UG Direct Second Year | Govt: 1,00,000 | Management: 1,30,000', 'dscet.jpg');`,

    `INSERT INTO colleges (college_name, district, degree, fees, description, image_url) VALUES
    ('Dhanalakshmi Srinivasan College of Engineering and Technology', 'Perambalur', 'M.E Computer Science and Engineering', 70000, 'PG First Year | Govt & Management Fees Same', 'dscet.jpg'),
    ('Dhanalakshmi Srinivasan College of Engineering and Technology', 'Perambalur', 'M.E Communication Systems', 50000, 'PG First Year | Govt & Management Fees Same', 'dscet.jpg'),
    ('Dhanalakshmi Srinivasan College of Engineering and Technology', 'Perambalur', 'MBA', 90000, 'PG First Year | Govt & Management Fees Same', 'dscet.jpg'),
    ('Dhanalakshmi Srinivasan College of Engineering and Technology', 'Perambalur', 'MCA', 65000, 'PG First Year | Govt & Management Fees Same', 'dscet.jpg');`
];

async function insertData() {
    try {
        for (const sql of sqlStatements) {
            await db.query(sql);
        }
        console.log('Successfully inserted all college data for Dhanalakshmi Srinivasan College of Engineering and Technology, Perambalur.');
        process.exit(0);
    } catch (error) {
        console.error('Error inserting data:', error);
        process.exit(1);
    }
}

insertData();
