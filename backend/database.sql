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
('Nehru College', 'Coimbatore', 'B.Sc Psychology', 25000, 'Category: Others | Duration: 3 years');

-- New specific tables as requested
DELETE FROM nehru_ug_courses;
CREATE TABLE IF NOT EXISTS nehru_ug_courses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  college VARCHAR(200),
  category VARCHAR(100),
  course VARCHAR(200),
  years INT,
  fee_per_sem INT
);

INSERT INTO nehru_ug_courses (college, category, course, years, fee_per_sem) VALUES
('Nehru College','Management','B.B.A Logistics',3,35000),
('Nehru College','Management','B.B.A Computer Application',3,30000),
('Nehru College','Management','B.B.A International Business',3,30000),
('Nehru College','Management','B.B.A Aviation Management',3,50000),
('Nehru College','Commerce','B.Com Banking',3,25000),
('Nehru College','Commerce','B.Com Computer Application',3,30000),
('Nehru College','Commerce','B.Com Professional Accounting',3,30000),
('Nehru College','Commerce','B.Com Information Technology',3,30000),
('Nehru College','Commerce','B.Com Accounting and Finance',3,25000),
('Nehru College','Commerce','B.Com Business Analytics',3,25000),
('Nehru College','Computer Science','B.C.A',3,40000),
('Nehru College','Computer Science','B.Sc Computer Science',3,35000),
('Nehru College','Computer Science','B.Sc Information Technology',3,35000),
('Nehru College','Computer Science','B.Sc Internet of Things',3,30000),
('Nehru College','Computer Science','B.Sc AI & ML',3,40000),
('Nehru College','Computer Science','B.Sc CS with Data Science',3,40000),
('Nehru College','Computer Science','B.Sc Digital & Cyber Forensic',3,40000),
('Nehru College','Computer Science','B.C.A with Business Analytics',3,40000),
('Nehru College','Science','B.Sc Biotechnology',3,25000),
('Nehru College','Science','B.Sc Microbiology',3,25000),
('Nehru College','Science','B.Sc Food Science & Nutrition',3,30000),
('Nehru College','Science','B.Sc Forensic Science',3,35000),
('Nehru College','Media','B.Sc Visual Communication',3,35000),
('Nehru College','Others','B.Sc Catering & Hotel Management',3,25000),
('Nehru College','Others','B.Sc Costume Design & Fashion',3,25000),
('Nehru College','Others','B.A English Literature',3,15000),
('Nehru College','Others','B.A Criminology',3,35000),
('Nehru College','Others','B.Sc Psychology',3,25000);

DELETE FROM nehru_pg_courses;
CREATE TABLE IF NOT EXISTS nehru_pg_courses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  college VARCHAR(200),
  category VARCHAR(100),
  course VARCHAR(200),
  years INT,
  fee_per_sem INT
);

INSERT INTO nehru_pg_courses (college, category, course, years, fee_per_sem) VALUES
('Nehru College','Science','M.Sc Microbiology',2,35000),
('Nehru College','Science','M.Sc Biotechnology',2,30000),
('Nehru College','Science','M.Sc Food Science & Nutrition',2,35000),
('Nehru College','Science','M.Sc Forensic Science',2,25000),
('Nehru College','Computer Science','M.Sc Data Science',2,30000),
('Nehru College','Commerce','M.Com Finance',2,25000),
('Nehru College','Others','M.S.W',2,25000),
('Nehru College','Others','M.A Criminology',2,25000);

DELETE FROM aviation_courses;
CREATE TABLE IF NOT EXISTS aviation_courses (
  sl_no INT PRIMARY KEY,
  course VARCHAR(200),
  years DECIMAL(3,1),
  fee_per_sem INT
);

INSERT INTO aviation_courses (sl_no, course, years, fee_per_sem) VALUES
(1,'A.M.E',2.5,100000),
(2,'B.Sc Aeronautical Science',3,45000),
(3,'B.B.A Airline & Airport Management',3,60000),
(4,'Airline Cabin Crew Training',1,100000);

DELETE FROM engineering_courses;
CREATE TABLE IF NOT EXISTS engineering_courses (
  sl_no INT PRIMARY KEY,
  course VARCHAR(200),
  years INT,
  niet_fee_year INT,
  nit_fee_year INT
);

INSERT INTO engineering_courses (sl_no, course, years, niet_fee_year, nit_fee_year) VALUES
(1,'Aeronautical Engineering',4,125000,125000),
(2,'Mechanical Engineering',4,100000,NULL),
(3,'Mechatronics Engineering',4,100000,NULL),
(4,'Civil Engineering',4,NULL,85000),
(5,'Electrical & Electronics Engineering',4,100000,NULL),
(6,'Electronics & Communication Engineering',4,125000,NULL),
(7,'Computer Science Engineering',4,150000,125000),
(8,'Agricultural Engineering',4,NULL,85000),
(9,'Food Technology',4,NULL,85000),
(10,'Artificial Intelligence & Data Science',4,150000,NULL),
(11,'Computer Science & Business Systems',4,125000,NULL),
(12,'Information Technology',4,150000,125000),
(13,'CSE (AIML)',4,NULL,125000),
(14,'CSE (Cyber Security)',4,NULL,125000),
(15,'Computer & Communication Engineering',4,NULL,100000);

DELETE FROM ug_courses_fee;
CREATE TABLE IF NOT EXISTS ug_courses_fee (
  id INT AUTO_INCREMENT PRIMARY KEY,
  course_name VARCHAR(200),
  tuition_fee INT,
  exam_fee INT,
  total_fee INT,
  stream VARCHAR(100)
);

INSERT INTO ug_courses_fee (course_name, tuition_fee, exam_fee, total_fee, stream) VALUES
('B.Com', 33500, 2500, 36000, 'Commerce'),
('B.Com Computer Applications', 42500, 2500, 45000, 'Commerce'),
('B.Com Information Technology', 33500, 2500, 36000, 'Commerce'),
('B.Com Corporate Secretaryship', 24500, 2500, 27000, 'Commerce'),
('B.Com Professional Accounting', 33500, 2500, 36000, 'Commerce'),
('B.Com Accounting & Finance', 25500, 2500, 28000, 'Commerce'),
('B.Com Banking & Insurance', 22500, 2500, 25000, 'Commerce'),
('B.Com International Business', 22500, 2500, 25000, 'Commerce'),
('BBA', 29000, 2500, 31500, 'Management'),
('BBA Computer Applications', 29000, 2500, 31500, 'Management'),
('BBA Logistics', 29000, 2500, 31500, 'Management'),
('BBA Business Analytics', 29000, 2500, 31500, 'Management'),
('B.Sc Computer Science', 42500, 2500, 45000, 'Computer'),
('BCA', 42500, 2500, 45000, 'Computer'),
('B.Sc Information Technology', 42500, 2500, 45000, 'Computer'),
('B.Sc Computer Technology', 39500, 2500, 42000, 'Computer'),
('B.Sc CS with Cognitive Systems', 42500, 2500, 45000, 'Computer'),
('B.Sc AI & ML', 42500, 2500, 45000, 'Computer'),
('B.Sc Data Science & Analytics', 42500, 2500, 45000, 'Computer'),
('B.Sc CS with Cyber Security', 42500, 2500, 45000, 'Computer'),
('B.Sc Biotechnology', 33500, 2500, 36000, 'Science'),
('B.Sc Microbiology', 30500, 2500, 33000, 'Science'),
('B.Sc Food Processing Technology & Management', 21500, 2500, 24000, 'Science'),
('B.Sc Physics', 19500, 2500, 22000, 'Science'),
('B.Sc Animation & Visual Effects', 37500, 2500, 40000, 'Media'),
('B.Sc Visual Communication', 47500, 2500, 50000, 'Media'),
('B.Voc', 47500, 2500, 50000, 'Media'),
('B.A English', 24000, 2500, 26500, 'Other'),
('B.Sc Catering Science & Hotel Management', 33500, 2500, 36000, 'Other'),
('B.Sc Costume Design & Fashion', 36500, 2500, 39000, 'Other'),
('B.Sc Psychology', 24500, 2500, 27000, 'Other'),
('B.Sc ECS', 22500, 2500, 25000, 'Other'),
('B.Sc Maths', 19500, 2500, 22000, 'Other');

DELETE FROM pg_programme_fee;
CREATE TABLE IF NOT EXISTS pg_programme_fee (
  id INT AUTO_INCREMENT PRIMARY KEY,
  programme_name VARCHAR(200),
  tuition_fee INT,
  other_fee INT,
  total_fee INT
);

INSERT INTO pg_programme_fee (programme_name, tuition_fee, other_fee, total_fee) VALUES
('M.A English', 16000, 1500, 17500),
('M.Com Computer Applications', 28500, 1500, 30000),
('M.Com International Business', 28500, 1500, 30000),
('M.Sc Biotechnology', 30500, 1500, 32000),
('M.Sc Microbiology', 34500, 1500, 36000),
('M.Sc Computer Science', 22500, 1500, 24000),
('M.Sc Information Technology', 22500, 1500, 24000),
('M.Sc Electronics & Communication Systems', 16000, 1500, 17500),
('M.Sc Physics', 30500, 1500, 32000),
('M.Sc Costume Design & Fashion', 20500, 1500, 22000),
('M.Sc Mathematics', 16000, 1500, 17500),
('M.Sc Visual Communication', 16000, 1500, 17500),
('MSW', 30500, 1500, 32000),
('M.Sc Applied Psychology', 31500, 1500, 33000),
('MBA Elite', 112500, 2500, 115000),
('MBA (M)', 87500, 2500, 90000),
('MBA (C)', 0, 2500, 2500),
('MCA (M)', 62500, 2500, 65000),
('MCA (C)', 0, 2500, 2500);

-- Insert Dummy Admin (Password: hari@2025)
INSERT INTO admin (username, password) VALUES ('hari1vkp', '$2b$10$YourHashedPasswordHere') ON DUPLICATE KEY UPDATE username=username;
