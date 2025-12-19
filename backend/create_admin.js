const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

dotenv.config();

async function createAdmin() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'college_agency_db'
  });

  const username = 'admin';
  const password = 'admin123';
  const hashedPassword = await bcrypt.hash(password, 10);

  console.log(`Creating admin user...`);
  console.log(`Username: ${username}`);
  console.log(`Password: ${password}`);

  try {
    // Check if exists
    const [rows] = await connection.execute('SELECT * FROM admin WHERE username = ?', [username]);
    if (rows.length > 0) {
      console.log('Admin user already exists. Updating password...');
      await connection.execute('UPDATE admin SET password = ? WHERE username = ?', [hashedPassword, username]);
    } else {
      await connection.execute('INSERT INTO admin (username, password) VALUES (?, ?)', [username, hashedPassword]);
      console.log('Admin user created.');
    }
  } catch (err) {
    console.error('Error creating admin:', err.message);
  } finally {
    await connection.end();
  }
}

createAdmin();
