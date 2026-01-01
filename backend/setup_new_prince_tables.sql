-- Create tables for New Prince Shri Bhavani College data format
CREATE TABLE IF NOT EXISTS college_programme_fees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    college_name VARCHAR(255),
    place VARCHAR(100),
    programme VARCHAR(50),
    course VARCHAR(255),
    govt_fee INT,
    mgt_fee INT
);

-- We already added mess_fees in database.sql but let's ensure it here too for the script
CREATE TABLE IF NOT EXISTS mess_fees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    college_name VARCHAR(255),
    place VARCHAR(255),
    mess_type VARCHAR(50),
    fee_per_year INT
);

-- Adjust one_time_fees to support the flat insert if needed, 
-- or just create a separate table for this college's flat data
CREATE TABLE IF NOT EXISTS one_time_fees_flat (
    id INT AUTO_INCREMENT PRIMARY KEY,
    college_name VARCHAR(255),
    place VARCHAR(100),
    description VARCHAR(255),
    amount INT
);
