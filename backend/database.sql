-- Create Database
CREATE DATABASE IF NOT EXISTS college_agency_db;
USE college_agency_db;

-- Table: colleges
CREATE TABLE IF NOT EXISTS colleges (
  college_id INT AUTO_INCREMENT PRIMARY KEY,
  college_name VARCHAR(200),
  degree VARCHAR(100),
  district VARCHAR(100),
  fees INT,
  hostel_fees INT DEFAULT 0,
  one_time_fees INT DEFAULT 0,
  description TEXT
);

-- Table: enquiries
CREATE TABLE IF NOT EXISTS enquiries (
  enquiry_id INT AUTO_INCREMENT PRIMARY KEY,
  student_name VARCHAR(150),
  phone VARCHAR(15),
  email VARCHAR(150),
  interested_degree VARCHAR(100),
  college_id INT,
  enquiry_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (college_id) REFERENCES colleges(college_id) ON DELETE SET NULL
);

-- Table: admin
CREATE TABLE IF NOT EXISTS admin (
  admin_id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) UNIQUE,
  password VARCHAR(255)
);

-- Table: college_fees (Legacy One-Time Fees)
CREATE TABLE IF NOT EXISTS college_fees (
  id INT AUTO_INCREMENT PRIMARY KEY,
  college_name VARCHAR(200),
  fee_category VARCHAR(100), -- 'One-Time', 'Annual', etc.
  fee_name VARCHAR(200),
  amount INT,
  purpose TEXT,
  refundable_status ENUM('Refundable', 'Non-Refundable') DEFAULT 'Non-Refundable'
);

-- Table: hostel_fees (Unified Schema)
CREATE TABLE IF NOT EXISTS hostel_fees (
  id INT AUTO_INCREMENT PRIMARY KEY,
  college_id INT,
  hostel_type VARCHAR(200),
  room_type VARCHAR(200),
  fee_per_year INT,
  mess_fee INT,
  total_amount INT
);

-- Table: one_time_fees (Unified Schema)
CREATE TABLE IF NOT EXISTS one_time_fees (
  id INT AUTO_INCREMENT PRIMARY KEY,
  college_id INT,
  fee_name VARCHAR(200),
  amount INT,
  purpose TEXT,
  status VARCHAR(100)
);

-- Insert Dummy Data for Colleges (Replaced with specific Medical College data)
DELETE FROM colleges;
INSERT INTO colleges (college_name, district, degree, fees, description) VALUES
('Dhanalakshmi Srinivasan Medical College and Hospital', 'Perambalur', 'B.Sc. Cardio Pulmonary Perfusion Care Technology', 200000, 'Specialized medical education in perfusion care.'),
('Dhanalakshmi Srinivasan Medical College and Hospital', 'Perambalur', 'B.Sc. Cardiac Technology', 200000, 'Advanced training in cardiac medical technology.'),
('Dhanalakshmi Srinivasan Medical College and Hospital', 'Perambalur', 'B.Sc. Dialysis Technology', 125000, 'Comprehensive course on renal dialysis procedures.'),
('Dhanalakshmi Srinivasan Medical College and Hospital', 'Perambalur', 'B.Sc. Operation Theatre & Anaesthesia', 200000, 'Training for surgical environment and anesthesia support.'),
('Dhanalakshmi Srinivasan Medical College and Hospital', 'Perambalur', 'B.Sc. Medical Laboratory Technology', 125000, 'Focused on clinical laboratory diagnostics.'),
('Dhanalakshmi Srinivasan Medical College and Hospital', 'Perambalur', 'B.Sc. Accident & Emergency Care Technology', 100000, 'Training for emergency medical response and care.'),
('Dhanalakshmi Srinivasan Medical College and Hospital', 'Perambalur', 'B.Sc. Critical Care Technology', 100000, 'Specialized course for intensive care unit technology.'),
('Dhanalakshmi Srinivasan Medical College and Hospital', 'Perambalur', 'B.Sc. Radiography and Imaging Technology', 150000, 'Advancing skills in medical imaging and radiology.'),
('MAM College of Engineering and Technology', 'Tiruchirappalli', 'I - CSE, IT & AI', 80000, 'Total Fee: 110000, Note: FG + 55000, Extra: 60000'),
('MAM College of Engineering and Technology', 'Tiruchirappalli', 'I - ECE', 60000, 'Total Fee: 75000, Note: FG + 35000, Extra: 60000'),
('MAM College of Engineering and Technology', 'Tiruchirappalli', 'I - EEE', 55000, 'Total Fee: 55000, Note: FG + 30000, Extra: 60000'),
('MAM College of Engineering and Technology', 'Tiruchirappalli', 'I - MECH', 50000, 'Total Fee: 55000, Note: FG + 25000, Extra: 60000'),
('MAM College of Engineering and Technology', 'Tiruchirappalli', 'I - CIVIL', 50000, 'Total Fee: 55000, Note: FG + 25000, Extra: 60000'),
('MAM College of Engineering and Technology', 'Tiruchirappalli', 'II LE - CSE, IT, AI & ECE', 55000, 'Total Fee: 55000, Note: FG + 30000, Extra: 60000'),
('MAM College of Engineering and Technology', 'Tiruchirappalli', 'II LE - EEE', 55000, 'Total Fee: 55000, Note: FG + 30000, Extra: 60000'),
('MAM College of Engineering and Technology', 'Tiruchirappalli', 'II LE - CIVIL & MECH', 50000, 'Total Fee: 55000, Note: FG + 25000, Extra: 60000'),
('MAM College of Engineering and Technology', 'Tiruchirappalli', 'M.E - Structural Engineering', 50000, 'Total Fee: 55000'),
('MAM College of Engineering and Technology', 'Tiruchirappalli', 'M.E - VLSI & CAD / CAM', 50000, 'Total Fee: 55000');
INSERT INTO colleges (college_name, district, degree, fees, description) VALUES
('Adithya Institute of Technology', 'Coimbatore', 'B.E AI & DS', 110000, 'UG Engineering - Government Quota'),
('Adithya Institute of Technology', 'Coimbatore', 'B.E CSE', 100000, 'UG Engineering - Government Quota'),
('Adithya Institute of Technology', 'Coimbatore', 'B.E IT', 100000, 'UG Engineering - Government Quota'),
('Adithya Institute of Technology', 'Coimbatore', 'B.E ECE', 95000, 'UG Engineering - Government Quota'),
('Adithya Institute of Technology', 'Coimbatore', 'B.E EEE', 75000, 'UG Engineering - Government Quota'),
('Adithya Institute of Technology', 'Coimbatore', 'B.E Mechanical', 75000, 'UG Engineering - Government Quota'),
('Adithya Institute of Technology', 'Coimbatore', 'B.E Civil', 50000, 'UG Engineering - Government Quota'),

('Adithya Institute of Technology', 'Coimbatore', 'B.E AI & DS (Lateral Entry)', 95000, 'Lateral Entry 2nd Year'),
('Adithya Institute of Technology', 'Coimbatore', 'B.E CSE (Lateral Entry)', 65000, 'Lateral Entry 2nd Year'),
('Adithya Institute of Technology', 'Coimbatore', 'B.E IT (Lateral Entry)', 65000, 'Lateral Entry 2nd Year'),
('Adithya Institute of Technology', 'Coimbatore', 'B.E ECE (Lateral Entry)', 65000, 'Lateral Entry 2nd Year'),
('Adithya Institute of Technology', 'Coimbatore', 'B.E EEE (Lateral Entry)', 50000, 'Lateral Entry 2nd Year'),
('Adithya Institute of Technology', 'Coimbatore', 'B.E Mechanical (Lateral Entry)', 50000, 'Lateral Entry 2nd Year'),
('Adithya Institute of Technology', 'Coimbatore', 'B.E Civil (Lateral Entry)', 40000, 'Lateral Entry 2nd Year'),

('Adithya College of Arts and Science', 'Coimbatore', 'B.A Political Science', 60000, 'UG - 3 Years'),
('Adithya College of Arts and Science', 'Coimbatore', 'B.Com', 60000, 'UG - 3 Years'),
('Adithya College of Arts and Science', 'Coimbatore', 'B.Com (CA)', 60000, 'UG - 3 Years'),
('Adithya College of Arts and Science', 'Coimbatore', 'B.Com (PA)', 60000, 'UG - 3 Years'),
('Adithya College of Arts and Science', 'Coimbatore', 'BBA', 60000, 'UG - 3 Years'),
('Adithya College of Arts and Science', 'Coimbatore', 'B.Sc Computer Science', 60000, 'UG - 3 Years'),
('Adithya College of Arts and Science', 'Coimbatore', 'B.Sc AI & ML', 60000, 'UG - 3 Years'),
('Adithya College of Arts and Science', 'Coimbatore', 'B.Sc IT', 60000, 'UG - 3 Years'),
('Adithya College of Arts and Science', 'Coimbatore', 'B.Sc Psychology', 60000, 'UG - 3 Years'),
('Adithya College of Arts and Science', 'Coimbatore', 'B.A English Literature', 30000, 'UG - 3 Years'),
('Adithya College of Arts and Science', 'Coimbatore', 'B.Sc Mathematics', 30000, 'UG - 3 Years'),
('Adithya College of Arts and Science', 'Coimbatore', 'B.Com IT', 60000, 'UG - 3 Years');


-- Add Nehru College Data to main table (Updated with proper district)
INSERT INTO colleges (college_name, district, degree, fees, description) VALUES
('Nehru College', 'Coimbatore', 'B.B.A Logistics', 35000, 'Category: Management | Duration: 3 years'),
('Nehru College', 'Coimbatore', 'B.B.A Computer Application', 30000, 'Category: Management | Duration: 3 years'),
('Nehru College', 'Coimbatore', 'B.B.A International Business', 30000, 'Category: Management | Duration: 3 years'),
('Nehru College', 'Coimbatore', 'B.B.A Aviation Management', 50000, 'Category: Management | Duration: 3 years'),
('Nehru College', 'Coimbatore', 'B.Com Banking', 25000, 'Category: Commerce | Duration: 3 years'),
('Nehru College', 'Coimbatore', 'B.Com Computer Application', 30000, 'Category: Commerce | Duration: 3 years'),
('Nehru College', 'Coimbatore', 'B.Com Professional Accounting', 30000, 'Category: Commerce | Duration: 3 years'),
('Nehru College', 'Coimbatore', 'B.Com Information Technology', 30000, 'Category: Commerce | Duration: 3 years'),
('Nehru College', 'Coimbatore', 'B.Com Accounting and Finance', 25000, 'Category: Commerce | Duration: 3 years'),
('Nehru College', 'Coimbatore', 'B.Com Business Analytics', 25000, 'Category: Commerce | Duration: 3 years'),
('Nehru College', 'Coimbatore', 'B.C.A', 40000, 'Category: Computer Science | Duration: 3 years'),
('Nehru College', 'Coimbatore', 'B.Sc Computer Science', 35000, 'Category: Computer Science | Duration: 3 years'),
('Nehru College', 'Coimbatore', 'B.Sc Information Technology', 35000, 'Category: Computer Science | Duration: 3 years'),
('Nehru College', 'Coimbatore', 'B.Sc Internet of Things', 30000, 'Category: Computer Science | Duration: 3 years'),
('Nehru College', 'Coimbatore', 'B.Sc AI & ML', 40000, 'Category: Computer Science | Duration: 3 years'),
('Nehru College', 'Coimbatore', 'B.Sc CS with Data Science', 40000, 'Category: Computer Science | Duration: 3 years'),
('Nehru College', 'Coimbatore', 'B.Sc Digital & Cyber Forensic', 40000, 'Category: Computer Science | Duration: 3 years'),
('Nehru College', 'Coimbatore', 'B.C.A with Business Analytics', 40000, 'Category: Computer Science | Duration: 3 years'),
('Nehru College', 'Coimbatore', 'B.Sc Biotechnology', 25000, 'Category: Science | Duration: 3 years'),
('Nehru College', 'Coimbatore', 'B.Sc Microbiology', 25000, 'Category: Science | Duration: 3 years'),
('Nehru College', 'Coimbatore', 'B.Sc Food Science & Nutrition', 30000, 'Category: Science | Duration: 3 years'),
('Nehru College', 'Coimbatore', 'B.Sc Forensic Science', 35000, 'Category: Science | Duration: 3 years'),
('Nehru College', 'Coimbatore', 'B.Sc Visual Communication', 35000, 'Category: Media | Duration: 3 years'),
('Nehru College', 'Coimbatore', 'B.Sc Catering & Hotel Management', 25000, 'Category: Others | Duration: 3 years'),
('Nehru College', 'Coimbatore', 'B.Sc Costume Design & Fashion', 25000, 'Category: Others | Duration: 3 years'),
('Nehru College', 'Coimbatore', 'B.A English Literature', 15000, 'Category: Others | Duration: 3 years'),
('Nehru College', 'Coimbatore', 'B.A Criminology', 35000, 'Category: Others | Duration: 3 years'),
('Nehru College', 'Coimbatore', 'B.Sc Psychology', 25000, 'Category: Others | Duration: 3 years'),
('Hindustan', 'Chennai', 'M.A English', 17500, 'Postgraduate program in English literature and language studies.'),
('Hindustan', 'Chennai', 'M.Com Computer Applications', 30000, 'Postgraduate commerce program with computer applications specialization.'),
('Hindustan', 'Chennai', 'M.Com International Business', 30000, 'Postgraduate program focusing on international business and trade.'),
('Hindustan', 'Chennai', 'M.Sc Biotechnology', 32000, 'Postgraduate program in biotechnology and life sciences.'),
('Hindustan', 'Chennai', 'M.Sc Microbiology', 36000, 'Postgraduate program in microbiology and laboratory sciences.'),
('Hindustan', 'Chennai', 'M.Sc Computer Science', 24000, 'Postgraduate program in computer science and software systems.'),
('Hindustan', 'Chennai', 'M.Sc Information Technology', 24000, 'Postgraduate program in information technology and computing.'),
('Hindustan', 'Chennai', 'M.Sc ECS', 17500, 'Postgraduate program in electronics and computer science.'),
('Hindustan', 'Chennai', 'M.Sc Physics', 32000, 'Postgraduate program in physics and applied sciences.'),
('Hindustan', 'Chennai', 'M.Sc Costume Design & Fashion', 22000, 'Postgraduate program in fashion design and costume technology.'),
('Hindustan', 'Chennai', 'M.Sc Mathematics', 17500, 'Postgraduate program in pure and applied mathematics.'),
('Hindustan', 'Chennai', 'M.Sc Visual Communication', 17500, 'Postgraduate program in media, design, and visual communication.'),
('Hindustan', 'Chennai', 'M.S.W', 32000, 'Postgraduate program in social work and community development.'),
('Hindustan', 'Chennai', 'M.Sc Applied Psychology', 33000, 'Postgraduate program in applied psychology and behavioral sciences.'),
('Hindustan', 'Chennai', 'MBA - ELITE', 115000, 'Elite Master of Business Administration program with advanced management training.'),
('Hindustan', 'Chennai', 'MBA (M)', 90000, 'Master of Business Administration program.'),
('Hindustan', 'Chennai', 'MCA (M)', 65000, 'Master of Computer Applications program.'),
('Loyola', 'Chennai', 'B.E Computer Science and Engineering', 50000, 'Intake: 120. Tuition fee only.'),
('Loyola', 'Chennai', 'B.E Computer Science and Engineering (CS)', 50000, 'Intake: 60. Tuition fee only.'),
('Loyola', 'Chennai', 'B.E Electrical and Electronics Engineering', 50000, 'Intake: 30. Tuition fee only.'),
('Loyola', 'Chennai', 'B.E Electronics and Communication Engineering', 50000, 'Intake: 60. Tuition fee only.'),
('Loyola', 'Chennai', 'B.E Mechanical Engineering', 50000, 'Intake: 30. Tuition fee only.'),
('Loyola', 'Chennai', 'B.Tech Information Technology', 50000, 'Intake: 120. Tuition fee only.'),
('Loyola', 'Chennai', 'B.Tech Artificial Intelligence and Data Science', 50000, 'Intake: 120. Tuition fee only.'),
('Loyola', 'Chennai', 'MBA', 50000, 'Intake: 90. Tuition fee only.'),
('Sri Ramakrishna College of Engineering', 'Coimbatore', 'B.E Computer Science and Engineering', 65000, 'Undergraduate engineering program in Computer Science. Tuition fee only.'),
('Sri Ramakrishna College of Engineering', 'Coimbatore', 'B.Tech Artificial Intelligence and Data Science', 65000, 'Undergraduate program in Artificial Intelligence and Data Science. Tuition fee only.'),
('Sri Ramakrishna College of Engineering', 'Coimbatore', 'B.E Cyber Security', 55000, 'Undergraduate engineering program in Cyber Security. Tuition fee only.'),
('Sri Ramakrishna College of Engineering', 'Coimbatore', 'B.E Bio-Medical Engineering', 55000, 'Undergraduate engineering program in Biomedical Engineering. Tuition fee only.'),
('Sri Ramakrishna College of Engineering', 'Coimbatore', 'B.E Electronics and Communication Engineering', 55000, 'Undergraduate engineering program in Electronics and Communication. Tuition fee only.'),
('Sri Ramakrishna College of Engineering', 'Coimbatore', 'B.E Mechanical Engineering', 35000, 'Undergraduate engineering program in Mechanical Engineering. Tuition fee only.'),
('Sri Ramakrishna College of Engineering', 'Coimbatore', 'B.Tech Agriculture Engineering', 35000, 'Undergraduate program in Agricultural Engineering. Tuition fee only.'),
('Sri Ramakrishna College of Engineering', 'Coimbatore', 'M.E Computer Science and Engineering', 50000, 'Postgraduate engineering program in Computer Science. Tuition fee only.'),
('Sri Ramakrishna College of Engineering', 'Coimbatore', 'B.E Computer Science and Engineering', 65000, 'Tuition fee only'),
('Sri Ramakrishna College of Engineering', 'Coimbatore', 'B.Tech Artificial Intelligence and Data Science', 65000, 'Tuition fee only'),
('Sri Ramakrishna College of Engineering', 'Coimbatore', 'B.E Cyber Security', 55000, 'Tuition fee only'),
('Sri Ramakrishna College of Engineering', 'Coimbatore', 'B.E Bio-Medical Engineering', 55000, 'Tuition fee only'),
('Sri Ramakrishna College of Engineering', 'Coimbatore', 'B.E Electronics and Communication Engineering', 55000, 'Tuition fee only'),
('Sri Ramakrishna College of Engineering', 'Coimbatore', 'B.E Mechanical Engineering', 35000, 'Tuition fee only'),
('Sri Ramakrishna College of Engineering', 'Coimbatore', 'B.Tech Agriculture Engineering', 35000, 'Tuition fee only'),
('Sri Ramakrishna College of Engineering', 'Coimbatore', 'M.E Computer Science and Engineering', 50000, 'Tuition fee only');

-- Insert Dummy Admin (Password: hari@2025)
INSERT INTO admin (username, password) VALUES ('hari1vkp', '$2b$10$YourHashedPasswordHere') ON DUPLICATE KEY UPDATE username=username;

