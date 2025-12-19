const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

async function setup() {
  console.log('Connecting to MySQL...');
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });

  const dbName = process.env.DB_NAME || 'college_agency_db';
  console.log(`Checking database '${dbName}'...`);

  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
  await connection.query(`USE \`${dbName}\``);

  console.log('Database selected. Checking tables...');
  
  // Read SQL file
  const sqlPath = path.join(__dirname, 'database.sql');
  let sql = fs.readFileSync(sqlPath, 'utf8');

  // Remove DB creation lines from SQL since we handled it or want to use the env var DB_NAME
  // The original SQL has 'USE college_agency_db;', we should ignore that or replace it.
  // Simple regex to remove 'CREATE DATABASE...' and 'USE...' lines
  sql = sql.replace(/CREATE DATABASE IF NOT EXISTS .*/g, '');
  sql = sql.replace(/USE .*/g, '');

  // Split by semicolon to get statements
  const statements = sql.split(';').map(s => s.trim()).filter(s => s.length > 0);

  for (const statement of statements) {
    try {
      await connection.query(statement);
    } catch (err) {
      // Ignore errors like "Table already exists" or "Duplicate entry" for this quick setup
      // but log others.
      if (err.code !== 'ER_TABLE_EXISTS_ERROR' && err.code !== 'ER_DUP_ENTRY') {
          console.warn(`Warning executing statement: ${err.message}`);
      }
    }
  }

  console.log('Database setup complete.');
  await connection.end();
}

setup().catch(err => {
  console.error('Setup failed:', err.message);
  process.exit(1);
});
