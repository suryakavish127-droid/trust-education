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

-- Table: care_hostel_fees
CREATE TABLE IF NOT EXISTS care_hostel_fees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    college_name VARCHAR(255),
    gender VARCHAR(50),
    room_type VARCHAR(50),
    yearly_fee INT,
    one_time_fee INT
);

-- Table: course_fees (Course-specific fee structure with FG/Non-FG categories)
CREATE TABLE IF NOT EXISTS course_fees (
  id INT AUTO_INCREMENT PRIMARY KEY,
  college_name VARCHAR(200),
  place VARCHAR(100),
  course VARCHAR(200),
  fg_fee INT,
  non_fg_fee INT,
  sc_sca_st VARCHAR(100)
);

-- Table: mess_fees
CREATE TABLE IF NOT EXISTS mess_fees (
  id INT AUTO_INCREMENT PRIMARY KEY,
  college_name VARCHAR(255),
  place VARCHAR(255),
  mess_type VARCHAR(50),
  fee_per_year INT
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
('M.A.M College of Engineering and Technology', 'Tiruchirappalli', 'I - CSE, IT & AI', 80000, 'Total Fee: 110000, Note: FG + 55000, Extra: 60000'),
('M.A.M College of Engineering and Technology', 'Tiruchirappalli', 'I - ECE', 60000, 'Total Fee: 75000, Note: FG + 35000, Extra: 60000'),
('M.A.M College of Engineering and Technology', 'Tiruchirappalli', 'I - EEE', 55000, 'Total Fee: 55000, Note: FG + 30000, Extra: 60000'),
('M.A.M College of Engineering and Technology', 'Tiruchirappalli', 'I - MECH', 50000, 'Total Fee: 55000, Note: FG + 25000, Extra: 60000'),
('M.A.M College of Engineering and Technology', 'Tiruchirappalli', 'I - CIVIL', 50000, 'Total Fee: 55000, Note: FG + 25000, Extra: 60000'),
('M.A.M College of Engineering and Technology', 'Tiruchirappalli', 'II LE - CSE, IT, AI & ECE', 55000, 'Total Fee: 55000, Note: FG + 30000, Extra: 60000'),
('M.A.M College of Engineering and Technology', 'Tiruchirappalli', 'II LE - EEE', 55000, 'Total Fee: 55000, Note: FG + 30000, Extra: 60000'),
('M.A.M College of Engineering and Technology', 'Tiruchirappalli', 'II LE - CIVIL & MECH', 50000, 'Total Fee: 55000, Note: FG + 25000, Extra: 60000'),
('M.A.M College of Engineering and Technology', 'Tiruchirappalli', 'M.E - Structural Engineering', 50000, 'Total Fee: 55000'),
('M.A.M College of Engineering and Technology', 'Tiruchirappalli', 'M.E - VLSI & CAD / CAM', 50000, 'Total Fee: 55000');


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

INSERT INTO colleges (college_name, district, degree, fees, description) VALUES
('Imayam College of Engineering', 'Tiruchirappalli', 'AI & DS', 25000, 'AI & Data Science course with PMSS scheme'),
('Imayam College of Engineering', 'Tiruchirappalli', 'CSE', 25000, 'Computer Science Engineering with PMSS scheme'),
('Imayam College of Engineering', 'Tiruchirappalli', 'Cyber Security', 25000, 'Cyber Security Engineering with PMSS scheme'),
('Imayam College of Engineering', 'Tiruchirappalli', 'AI & ML', 25000, 'Artificial Intelligence & Machine Learning with PMSS scheme'),
('Imayam College of Engineering', 'Tiruchirappalli', 'ECE', 25000, 'Electronics and Communication Engineering with PMSS scheme'),
('Imayam College of Engineering', 'Tiruchirappalli', 'EEE', 15000, 'Electrical and Electronics Engineering with PMSS scheme'),
('Imayam College of Engineering', 'Tiruchirappalli', 'MECH', 15000, 'Mechanical Engineering with PMSS scheme'),
('Imayam College of Engineering', 'Tiruchirappalli', 'IT', 25000, 'Information Technology course with PMSS scheme'),
('Imayam College of Engineering', 'Tiruchirappalli', 'Bio - Medical', 25000, 'Biomedical Engineering with PMSS scheme');

INSERT INTO colleges (college_name, district, degree, fees, description) VALUES
('Indra Ganesan Institutions', 'Tiruchirappalli', 'B.E / B.Tech (Agri, ECE, EEE, Mech, Biomedical)', 50000, 'Counselling Fee 50000 | Management Fee 70000'),
('Indra Ganesan Institutions', 'Tiruchirappalli', 'B.E / B.Tech (CSE, IT, AIDS)', 70000, 'Counselling Fee 70000 | Management Fee 90000'),
('Indra Ganesan Institutions', 'Tiruchirappalli', 'B.E / B.Tech Lateral (ECE, EEE, Mech, Biomedical, Agri)', 50000, 'Counselling Fee 50000 | Management Fee 50000'),
('Indra Ganesan Institutions', 'Tiruchirappalli', 'B.E / B.Tech Lateral (CSE, IT, AIDS)', 70000, 'Counselling Fee 70000 | Management Fee 90000'),
('Indra Ganesan Institutions', 'Tiruchirappalli', 'M.E (VLSI, CSE)', 50000, 'Post Graduate ME Counselling Fee 50000'),
('Indra Ganesan Institutions', 'Tiruchirappalli', 'MBA', 60000, 'MBA Counselling Fee 60000'),

('Indra Ganesan Institutions', 'Tiruchirappalli', 'Physiotherapy (BPT)', 96000, 'Counselling Fee 96000'),

('Indra Ganesan Institutions', 'Tiruchirappalli', 'B.Sc Nursing', 130000, 'Counselling Fee 130000 | Management Fee 130000'),
('Indra Ganesan Institutions', 'Tiruchirappalli', 'ANM', 40000, 'Counselling Fee 40000 | Management Fee 40000'),

('Indra Ganesan Institutions', 'Tiruchirappalli', 'BSMS Siddha', 125000, 'Counselling Fee 125000 | Management Fee 250000'),
('Indra Ganesan Institutions', 'Tiruchirappalli', 'BNYS Naturopathy & Yogic Science', 125000, 'Counselling Fee 125000 | Management Fee 250000'),

('Indra Ganesan Institutions', 'Tiruchirappalli', 'B.Pharm', 130000, 'Counselling Fee 130000 | Management Fee 130000'),
('Indra Ganesan Institutions', 'Tiruchirappalli', 'M.Pharm', 80000, 'Counselling Fee 80000 | Management Fee 80000'),
('Indra Ganesan Institutions', 'Tiruchirappalli', 'D.Pharm', 70000, 'Counselling Fee 70000 | Management Fee 70000'),
('Indra Ganesan Institutions', 'Tiruchirappalli', 'Pharm.D', 250000, 'Counselling Fee 250000 | Management Fee 600000'),

('Indra Ganesan Institutions', 'Tiruchirappalli', 'ACET', 70000, 'Allied Health Science'),
('Indra Ganesan Institutions', 'Tiruchirappalli', 'DT', 70000, 'Allied Health Science'),
('Indra Ganesan Institutions', 'Tiruchirappalli', 'RIT', 96000, 'Allied Health Science'),
('Indra Ganesan Institutions', 'Tiruchirappalli', 'MLT', 96000, 'Allied Health Science'),
('Indra Ganesan Institutions', 'Tiruchirappalli', 'OTAT', 130000, 'Allied Health Science'),
('Indra Ganesan Institutions', 'Tiruchirappalli', 'CPPC', 130000, 'Allied Health Science'),
('Indra Ganesan Institutions', 'Tiruchirappalli', 'CT', 130000, 'Allied Health Science'),
('Indra Ganesan Institutions', 'Tiruchirappalli', 'HI', 60000, 'Allied Health Science'),
('Indra Ganesan Institutions', 'Tiruchirappalli', 'DMLT', 40000, 'Allied Health Science'),

('Indra Ganesan Institutions', 'Tiruchirappalli', 'M.Com', 30000, 'Counselling Fee'),
('Indra Ganesan Institutions', 'Tiruchirappalli', 'B.Sc Computer Science', 25000, 'Counselling Fee'),
('Indra Ganesan Institutions', 'Tiruchirappalli', 'B.Com', 25000, 'Counselling Fee'),
('Indra Ganesan Institutions', 'Tiruchirappalli', 'B.Com (CA)', 25000, 'Counselling Fee'),
('Indra Ganesan Institutions', 'Tiruchirappalli', 'B.Sc Nutrition & Dietetics', 25000, 'Counselling Fee'),
('Indra Ganesan Institutions', 'Tiruchirappalli', 'Aviation', 80000, 'Counselling Fee'),
('Indra Ganesan Institutions', 'Tiruchirappalli', 'M.Sc Computer Science', 30000, 'Counselling Fee'),
('Indra Ganesan Institutions', 'Tiruchirappalli', 'B.Sc FT & CD', 40000, 'Counselling Fee'),
('Indra Ganesan Institutions', 'Tiruchirappalli', 'B.Sc AI & ML', 30000, 'Counselling Fee'),
('Indra Ganesan Institutions', 'Tiruchirappalli', 'B.A Defence', 40000, 'Counselling Fee'),
('Indra Ganesan Institutions', 'Tiruchirappalli', 'B.Sc Forensic', 40000, 'Counselling Fee'),
('Indra Ganesan Institutions', 'Tiruchirappalli', 'B.Sc Hotel Management & Catering Services', 40000, 'Counselling Fee');

INSERT INTO colleges (college_name, district, degree, fees, description) VALUES
('CARE College of Engineering','Tiruchirappalli','AI & DS',80000,'GQ Total Fee'),
('CARE College of Engineering','Tiruchirappalli','AI & DS',115000,'MQ Total Fee'),

('CARE College of Engineering','Tiruchirappalli','CSE',85000,'GQ Total Fee'),
('CARE College of Engineering','Tiruchirappalli','CSE',120000,'MQ Total Fee'),

('CARE College of Engineering','Tiruchirappalli','CIVIL',50000,'GQ Total Fee'),
('CARE College of Engineering','Tiruchirappalli','CIVIL',50000,'MQ Total Fee'),

('CARE College of Engineering','Tiruchirappalli','ECE',77500,'GQ Total Fee'),
('CARE College of Engineering','Tiruchirappalli','ECE',102500,'MQ Total Fee'),

('CARE College of Engineering','Tiruchirappalli','MECH',62500,'GQ Total Fee'),
('CARE College of Engineering','Tiruchirappalli','MECH',67500,'MQ Total Fee');

INSERT INTO colleges (college_name, district, degree, fees, description) VALUES
('CARE College of Engineering','Tiruchirappalli','AI & DS',79500,'Lateral GQ Total Fee'),
('CARE College of Engineering','Tiruchirappalli','AI & DS',114500,'Lateral MQ Total Fee'),

('CARE College of Engineering','Tiruchirappalli','CSE',84500,'Lateral GQ Total Fee'),
('CARE College of Engineering','Tiruchirappalli','CSE',119500,'Lateral MQ Total Fee'),

('CARE College of Engineering','Tiruchirappalli','CIVIL',54500,'Lateral GQ Total Fee'),
('CARE College of Engineering','Tiruchirappalli','CIVIL',54500,'Lateral MQ Total Fee'),

('CARE College of Engineering','Tiruchirappalli','ECE',77000,'Lateral GQ Total Fee'),
('CARE College of Engineering','Tiruchirappalli','ECE',102000,'Lateral MQ Total Fee'),

('CARE College of Engineering','Tiruchirappalli','MECH',67000,'Lateral GQ Total Fee'),
('CARE College of Engineering','Tiruchirappalli','MECH',69500,'Lateral MQ Total Fee');

INSERT INTO colleges (college_name, district, degree, fees, description) VALUES
('CARE College of Engineering','Tiruchirappalli','M.E CSE (AI & ML)',65000,'PG GQ Total'),
('CARE College of Engineering','Tiruchirappalli','M.E CSE (AI & ML)',65000,'PG MQ Total');

INSERT INTO colleges (college_name, district, degree, fees, description) VALUES
('Rathinam Group of Institutions', 'Coimbatore', 'B.Com Accounting and Finance', 80000, 'Arts & Science UG course'),
('Rathinam Group of Institutions', 'Coimbatore', 'B.Sc Computer Science', 100000, 'Arts & Science UG course'),
('Rathinam Group of Institutions', 'Coimbatore', 'B.Sc Artificial Intelligence and Machine Learning', 110000, 'Arts & Science UG course'),
('Rathinam Group of Institutions', 'Coimbatore', 'MBA General', 250000, 'Technical Campus PG course'),
('Rathinam Group of Institutions', 'Coimbatore', 'B.E Computer Science and Engineering', 170000, 'Technical Campus UG course'),
('Rathinam Group of Institutions', 'Coimbatore', 'B.Tech Artificial Intelligence and Data Science', 170000, 'Technical Campus UG course'),
('Rathinam Group of Institutions', 'Coimbatore', 'MCA General', 150000, 'Technical Campus PG course'),
('Rathinam Group of Institutions', 'Coimbatore', 'B.Pharm Pharmacy', 100000, 'Health Science course');

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
('LOYOLA INSTITUTE OF TECHNOLOGY, CHENNAI', 'Chennai', 'B.E Computer Science and Engineering', 50000, 'Intake: 120. Tuition fee only.'),
('LOYOLA INSTITUTE OF TECHNOLOGY, CHENNAI', 'Chennai', 'B.E Computer Science and Engineering (CS)', 50000, 'Intake: 60. Tuition fee only.'),
('LOYOLA INSTITUTE OF TECHNOLOGY, CHENNAI', 'Chennai', 'B.E Electrical and Electronics Engineering', 50000, 'Intake: 30. Tuition fee only.'),
('LOYOLA INSTITUTE OF TECHNOLOGY, CHENNAI', 'Chennai', 'B.E Electronics and Communication Engineering', 50000, 'Intake: 60. Tuition fee only.'),
('LOYOLA INSTITUTE OF TECHNOLOGY, CHENNAI', 'Chennai', 'B.E Mechanical Engineering', 50000, 'Intake: 30. Tuition fee only.'),
('LOYOLA INSTITUTE OF TECHNOLOGY, CHENNAI', 'Chennai', 'B.Tech Information Technology', 50000, 'Intake: 120. Tuition fee only.'),
('LOYOLA INSTITUTE OF TECHNOLOGY, CHENNAI', 'Chennai', 'B.Tech Artificial Intelligence and Data Science', 50000, 'Intake: 120. Tuition fee only.'),
('LOYOLA INSTITUTE OF TECHNOLOGY, CHENNAI', 'Chennai', 'MBA', 50000, 'Intake: 90. Tuition fee only.'),
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

-- Dhanalakshmi Srinivasan Arts and Science College
INSERT INTO colleges (college_name, district, degree, fees, description) VALUES
('Dhanalakshmi Srinivasan Arts and Science College', 'Tiruchirappalli', 'B.Sc Computer Science', 60000, 'Undergraduate programme focused on computer applications and programming.'),
('Dhanalakshmi Srinivasan Arts and Science College', 'Tiruchirappalli', 'B.Sc Information Technology', 60000, 'Course focused on IT, software and networking concepts.'),
('Dhanalakshmi Srinivasan Arts and Science College', 'Tiruchirappalli', 'B.Sc Mathematics', 45000, 'Undergraduate degree specializing in advanced mathematics concepts.'),
('Dhanalakshmi Srinivasan Arts and Science College', 'Tiruchirappalli', 'B.Com General', 50000, 'Bachelor of Commerce focusing on accounting, finance and business.'),
('Dhanalakshmi Srinivasan Arts and Science College', 'Tiruchirappalli', 'B.Com Computer Applications', 55000, 'Commerce programme with computer and IT integration.'),
('Dhanalakshmi Srinivasan Arts and Science College', 'Tiruchirappalli', 'BBA', 55000, 'Bachelor of Business Administration focused on management studies.'),
('Dhanalakshmi Srinivasan Arts and Science College', 'Tiruchirappalli', 'B.A English', 45000, 'Undergraduate degree in English language and literature.'),
('Dhanalakshmi Srinivasan Arts and Science College', 'Tiruchirappalli', 'B.Sc Biotechnology', 70000, 'Science programme focusing on biotechnology and life sciences.');

-- Dhanalakshmi Srinivasan College of Engineering
INSERT INTO colleges (college_name, district, degree, fees, description) VALUES
('Dhanalakshmi Srinivasan College of Engineering', 'Tiruchirappalli', 'B.E. Computer Science and Engineering', 100000, 'Undergraduate engineering program focused on computing and software development.'),
('Dhanalakshmi Srinivasan College of Engineering', 'Tiruchirappalli', 'B.E. Computer Science and Engineering - AI & DS', 110000, 'Specialized CSE program in Artificial Intelligence and Data Science.'),
('Dhanalakshmi Srinivasan College of Engineering', 'Tiruchirappalli', 'B.E. Artificial Intelligence and Machine Learning', 110000, 'Focused on Artificial Intelligence, Machine Learning and modern technologies.'),
('Dhanalakshmi Srinivasan College of Engineering', 'Tiruchirappalli', 'B.E. Computer Science and Engineering - Cyber Security', 110000, 'Program specialized in cyber security and ethical hacking.'),
('Dhanalakshmi Srinivasan College of Engineering', 'Tiruchirappalli', 'B.Tech Information Technology', 100000, 'Undergraduate degree in Information Technology and software development.'),
('Dhanalakshmi Srinivasan College of Engineering', 'Tiruchirappalli', 'B.E. Electronics and Communication Engineering', 90000, 'Program focused on electronics, communication systems and embedded technology.'),
('Dhanalakshmi Srinivasan College of Engineering', 'Tiruchirappalli', 'B.E. Electrical and Electronics Engineering', 85000, 'Engineering course in electrical power systems and electronics.'),
('Dhanalakshmi Srinivasan College of Engineering', 'Tiruchirappalli', 'B.E. Mechanical Engineering', 85000, 'Mechanical engineering program focusing on machines and manufacturing.'),
('Dhanalakshmi Srinivasan College of Engineering', 'Tiruchirappalli', 'B.E. Civil Engineering', 80000, 'Civil engineering program focusing on construction and structural engineering.'),
('Dhanalakshmi Srinivasan College of Engineering', 'Tiruchirappalli', 'B.E. Biomedical Engineering', 100000, 'Engineering course combining medical and engineering technology.');

-- Dhanalakshmi Srinivasan Group of Institutions
INSERT INTO colleges (college_name, district, degree, fees, description) VALUES
('Dhanalakshmi Srinivasan Group of Institutions', 'Tiruchirappalli', 'B.Sc Nursing', 120000, 'Undergraduate nursing programme focusing on patient care and clinical practice.'),
('Dhanalakshmi Srinivasan Group of Institutions', 'Tiruchirappalli', 'B.Pharmacy', 150000, 'Professional degree focusing on pharmaceutical science and drug development.'),
('Dhanalakshmi Srinivasan Group of Institutions', 'Tiruchirappalli', 'D.Pharmacy', 90000, 'Diploma programme in pharmaceutical science.'),
('Dhanalakshmi Srinivasan Group of Institutions', 'Tiruchirappalli', 'BPT - Bachelor of Physiotherapy', 130000, 'Physiotherapy programme focusing on rehabilitation and clinical practice.'),
('Dhanalakshmi Srinivasan Group of Institutions', 'Tiruchirappalli', 'B.Sc Nutrition and Dietetics', 90000, 'Programme focusing on food science, health and nutrition.');

-- Dhanalakshmi Srinivasan Engineering College - Perambalur (Postgraduate)
INSERT INTO colleges (college_name, district, degree, fees, description) VALUES
('Dhanalakshmi Srinivasan Engineering College', 'Perambalur', 'M.E Computer Science and Engineering', 120000, 'Postgraduate engineering program in advanced computing and software systems.'),
('Dhanalakshmi Srinivasan Engineering College', 'Perambalur', 'M.E VLSI Design', 130000, 'Specialized postgraduate course in Very Large Scale Integration chip design.'),
('Dhanalakshmi Srinivasan Engineering College', 'Perambalur', 'M.E Communication Systems', 115000, 'Advanced postgraduate program in communication and networking technologies.'),
('Dhanalakshmi Srinivasan Engineering College', 'Perambalur', 'M.E Structural Engineering', 110000, 'Postgraduate course focusing on structural design and construction engineering.'),
('Dhanalakshmi Srinivasan Engineering College', 'Perambalur', 'MBA', 120000, 'Master of Business Administration program in management and leadership.'),
('Dhanalakshmi Srinivasan Engineering College', 'Perambalur', 'MCA', 110000, 'Master of Computer Applications focusing on software development and IT solutions.');

-- Dhanalakshmi Srinivasan Arts and Science College - Perambalur (Postgraduate)
INSERT INTO colleges (college_name, district, degree, fees, description) VALUES
('Dhanalakshmi Srinivasan Arts and Science College', 'Perambalur', 'M.Sc Computer Science', 80000, 'Postgraduate degree specializing in advanced computer science concepts.'),
('Dhanalakshmi Srinivasan Arts and Science College', 'Perambalur', 'M.Sc Mathematics', 70000, 'Postgraduate degree in mathematics and applied statistics.'),
('Dhanalakshmi Srinivasan Arts and Science College', 'Perambalur', 'M.Com', 75000, 'Postgraduate commerce program focusing on finance, accounting and business.'),
('Dhanalakshmi Srinivasan Arts and Science College', 'Perambalur', 'M.A English', 65000, 'Postgraduate degree in English literature and language studies.'),
('Dhanalakshmi Srinivasan Arts and Science College', 'Perambalur', 'M.Sc Biotechnology', 90000, 'Postgraduate program in biotechnology and life sciences.');

-- Dhanalakshmi Srinivasan Medical College and Hospital - Perambalur (Postgraduate)
INSERT INTO colleges (college_name, district, degree, fees, description) VALUES
('Dhanalakshmi Srinivasan Medical College and Hospital', 'Perambalur', 'M.Sc Nursing', 170000, 'Advanced postgraduate nursing program with clinical specialization.'),
('Dhanalakshmi Srinivasan Medical College and Hospital', 'Perambalur', 'M.Pharmacy', 190000, 'Postgraduate pharmacy program focusing on pharmaceutical sciences.'),
('Dhanalakshmi Srinivasan Medical College and Hospital', 'Perambalur', 'MPT - Master of Physiotherapy', 180000, 'Advanced physiotherapy postgraduate program focusing on rehabilitation.'),
('Dhanalakshmi Srinivasan Medical College and Hospital', 'Perambalur', 'M.Sc Medical Laboratory Technology', 140000, 'Postgraduate course specializing in clinical diagnostic laboratory techniques.');

-- Dhanalakshmi Srinivasan Engineering College - Perambalur (Undergraduate)
INSERT INTO colleges (college_name, district, degree, fees, description) VALUES
('Dhanalakshmi Srinivasan Engineering College', 'Perambalur', 'B.E Computer Science and Engineering', 100000, 'Undergraduate engineering programme focusing on computing and software development.'),
('Dhanalakshmi Srinivasan Engineering College', 'Perambalur', 'B.E CSE - Artificial Intelligence and Data Science', 110000, 'Specialized CSE programme focusing on AI and Data Science technologies.'),
('Dhanalakshmi Srinivasan Engineering College', 'Perambalur', 'B.E Electronics and Communication Engineering', 90000, 'Undergraduate programme in electronics and communication systems.'),
('Dhanalakshmi Srinivasan Engineering College', 'Perambalur', 'B.E Electrical and Electronics Engineering', 85000, 'Programme focused on power systems and electrical technologies.'),
('Dhanalakshmi Srinivasan Engineering College', 'Perambalur', 'B.E Mechanical Engineering', 85000, 'Mechanical engineering course focusing on machines and manufacturing.'),
('Dhanalakshmi Srinivasan Engineering College', 'Perambalur', 'B.E Civil Engineering', 80000, 'Undergraduate programme in construction and structural engineering.'),
('Dhanalakshmi Srinivasan Engineering College', 'Perambalur', 'B.Tech Information Technology', 95000, 'Undergraduate degree in IT, networking and software development.');

-- Dhanalakshmi Srinivasan Arts and Science College - Perambalur (Undergraduate)
INSERT INTO colleges (college_name, district, degree, fees, description) VALUES
('Dhanalakshmi Srinivasan Arts and Science College', 'Perambalur', 'B.Sc Computer Science', 60000, 'Undergraduate degree in computer applications and programming.'),
('Dhanalakshmi Srinivasan Arts and Science College', 'Perambalur', 'B.Sc Information Technology', 60000, 'Programme focusing on information technology and computing.'),
('Dhanalakshmi Srinivasan Arts and Science College', 'Perambalur', 'B.Sc Mathematics', 45000, 'Undergraduate programme specializing in mathematics.'),
('Dhanalakshmi Srinivasan Arts and Science College', 'Perambalur', 'B.Com General', 50000, 'Commerce programme focusing on finance and accounting.'),
('Dhanalakshmi Srinivasan Arts and Science College', 'Perambalur', 'B.Com Computer Applications', 55000, 'Commerce programme integrated with computer applications.'),
('Dhanalakshmi Srinivasan Arts and Science College', 'Perambalur', 'BBA', 55000, 'Bachelor of Business Administration focusing on management studies.'),
('Dhanalakshmi Srinivasan Arts and Science College', 'Perambalur', 'B.A English', 45000, 'Undergraduate programme in English language and literature.');

-- Dhanalakshmi Srinivasan Medical College and Hospital - Perambalur (Undergraduate)
INSERT INTO colleges (college_name, district, degree, fees, description) VALUES
('Dhanalakshmi Srinivasan Medical College and Hospital', 'Perambalur', 'B.Sc Nursing', 120000, 'Undergraduate nursing programme focusing on patient care and clinical practice.'),
('Dhanalakshmi Srinivasan Medical College and Hospital', 'Perambalur', 'B.Pharmacy', 150000, 'Undergraduate programme in pharmaceutical science and drug development.'),
('Dhanalakshmi Srinivasan Medical College and Hospital', 'Perambalur', 'D.Pharmacy', 90000, 'Diploma course in pharmaceutical science.'),
('Dhanalakshmi Srinivasan Medical College and Hospital', 'Perambalur', 'BPT - Bachelor of Physiotherapy', 130000, 'Undergraduate physiotherapy course focusing on rehabilitation and therapy.');

-- M.A.M College of Engineering
INSERT INTO colleges (college_name,district,degree,fees,description) VALUES
('M.A.M College of Engineering','Tiruchirappalli','B.E Computer Science and Engineering (GQ)',75000,'UG Engineering - Government Quota'),
('M.A.M College of Engineering','Tiruchirappalli','B.E Computer Science and Engineering (MQ)',110000,'UG Engineering - Management Quota'),
('M.A.M College of Engineering','Tiruchirappalli','B.Tech Artificial Intelligence & Data Science (GQ)',75000,'UG Engineering - Government Quota'),
('M.A.M College of Engineering','Tiruchirappalli','B.Tech Artificial Intelligence & Data Science (MQ)',110000,'UG Engineering - Management Quota'),
('M.A.M College of Engineering','Tiruchirappalli','B.E Artificial Intelligence & Machine Learning (GQ)',70000,'UG Engineering - Government Quota'),
('M.A.M College of Engineering','Tiruchirappalli','B.E Artificial Intelligence & Machine Learning (MQ)',90000,'UG Engineering - Management Quota'),
('M.A.M College of Engineering','Tiruchirappalli','B.Tech Information Technology (GQ)',75000,'UG Engineering - Government Quota'),
('M.A.M College of Engineering','Tiruchirappalli','B.Tech Information Technology (MQ)',90000,'UG Engineering - Management Quota'),
('M.A.M College of Engineering','Tiruchirappalli','B.E Cyber Security (GQ)',70000,'UG Engineering - Government Quota'),
('M.A.M College of Engineering','Tiruchirappalli','B.E Cyber Security (MQ)',85000,'UG Engineering - Management Quota'),
('M.A.M College of Engineering','Tiruchirappalli','B.E Biomedical Engineering (GQ)',70000,'UG Engineering - Government Quota'),
('M.A.M College of Engineering','Tiruchirappalli','B.E Biomedical Engineering (MQ)',80000,'UG Engineering - Management Quota'),
('M.A.M College of Engineering','Tiruchirappalli','B.E Electronics and Communication Engineering (GQ)',60000,'UG Engineering - Government Quota'),
('M.A.M College of Engineering','Tiruchirappalli','B.E Electronics and Communication Engineering (MQ)',75000,'UG Engineering - Management Quota'),
('M.A.M College of Engineering','Tiruchirappalli','B.E Mechanical Engineering (GQ)',50000,'UG Engineering - Government Quota'),
('M.A.M College of Engineering','Tiruchirappalli','B.E Mechanical Engineering (MQ)',55000,'UG Engineering - Management Quota'),
('M.A.M College of Engineering','Tiruchirappalli','B.Tech Agricultural Engineering (GQ)',45000,'UG Engineering - Government Quota'),
('M.A.M College of Engineering','Tiruchirappalli','B.Tech Agricultural Engineering (MQ)',55000,'UG Engineering - Management Quota'),
('M.A.M College of Engineering','Tiruchirappalli','M.E Computer Science and Engineering',50000,'PG Engineering course'),
('M.A.M College of Engineering','Tiruchirappalli','M.E Electronics and Communication Engineering',50000,'PG Engineering course'),
('M.A.M College of Engineering','Tiruchirappalli','M.E Power Electronics & Drives',50000,'PG Engineering course'),
('M.A.M College of Engineering','Tiruchirappalli','M.E Environmental Engineering',70000,'PG Engineering course'),
('M.A.M College of Engineering','Tiruchirappalli','M.E Manufacturing Engineering',50000,'PG Engineering course'),
('M.A.M College of Engineering','Tiruchirappalli','MBA',45000,'PG Management course'),
('M.A.M College of Engineering','Tiruchirappalli','MCA',40000,'PG Computer Applications course');

-- ABC Arts and Science College
INSERT INTO colleges (college_name,district,degree,fees,description) VALUES
('ABC Arts and Science College','Coimbatore','B.Com',25000,'UG Arts and Science course'),
('ABC Arts and Science College','Coimbatore','B.Com Computer Applications',25000,'UG Arts and Science course'),
('ABC Arts and Science College','Coimbatore','B.Com Professional Accounting',30000,'UG Arts and Science course'),
('ABC Arts and Science College','Coimbatore','B.B.A',30000,'UG Arts and Science course'),
('ABC Arts and Science College','Coimbatore','B.C.A',35000,'UG Arts and Science course'),
('ABC Arts and Science College','Coimbatore','B.Sc Computer Science',33000,'UG Arts and Science course'),
('ABC Arts and Science College','Coimbatore','B.Sc Information Technology',33000,'UG Arts and Science course'),
('ABC Arts and Science College','Coimbatore','B.Sc Mathematics',23000,'UG Arts and Science course'),
('ABC Arts and Science College','Coimbatore','B.Sc Physics',22000,'UG Arts and Science course'),
('ABC Arts and Science College','Coimbatore','B.Sc Chemistry',24000,'UG Arts and Science course'),
('ABC Arts and Science College','Coimbatore','B.A English',26500,'UG Arts and Science course'),
('ABC Arts and Science College','Coimbatore','M.Com',25000,'PG Arts and Science course'),
('ABC Arts and Science College','Coimbatore','M.Sc Computer Science',28000,'PG Arts and Science course'),
('ABC Arts and Science College','Coimbatore','M.Sc Mathematics',20000,'PG Arts and Science course'),
('ABC Arts and Science College','Coimbatore','M.A English',17500,'PG Arts and Science course'),
('ABC Arts and Science College','Coimbatore','M.C.A',40000,'PG Computer Applications course');
-- ===== Hostel Fees Dummy Data =====
-- Note: Using college_id from the colleges table above
INSERT INTO hostel_fees (college_id, hostel_type, room_type, fee_per_year, mess_fee, total_amount) VALUES
-- Dhanalakshmi Srinivasan Medical College (college_id will be auto-assigned, typically 1999)
(1999, 'Boys Hostel', 'AC', 50000, 20000, 70000),
(1999, 'Boys Hostel', 'Non-AC', 40000, 16000, 56000),
(1999, 'Girls Hostel', 'AC', 48000, 19200, 67200),
(1999, 'Girls Hostel', 'Non-AC', 38000, 15200, 53200),
-- MAM College of Engineering (college_id will be auto-assigned, typically 2000)
(2000, 'Boys Hostel', 'AC', 52000, 20800, 72800),
(2000, 'Girls Hostel', 'Non-AC', 39000, 15600, 54600);

-- Insert Dummy Admin (Password: hari@2025)
INSERT INTO admin (username, password) VALUES ('hari1vkp', '$2b$10$YourHashedPasswordHere') ON DUPLICATE KEY UPDATE username=username;

-- Add image_url column to colleges table
ALTER TABLE colleges ADD COLUMN IF NOT EXISTS image_url VARCHAR(255) DEFAULT NULL;

-- Update Dhanalakshmi Srinivasan College with image URL
UPDATE colleges 
SET image_url = 'images/dhanalakshmi_trichy.jpg'
WHERE college_name = 'Dhanalakshmi Srinivasan College' 
AND district = 'Tiruchirappalli';

-- ===== Hostel Fees for Dhanalakshmi Srinivasan Institutions =====
INSERT INTO hostel_fees (college_id, hostel_type, room_type, fee_per_year, mess_fee, total_amount)
SELECT college_id, 'Boys Hostel', 'Standard', 85000, 34000, 119000 
FROM colleges WHERE college_name = 'Dhanalakshmi Srinivasan Engineering College' AND district = 'Perambalur';

INSERT INTO hostel_fees (college_id, hostel_type, room_type, fee_per_year, mess_fee, total_amount)
SELECT college_id, 'Girls Hostel', 'Standard', 80000, 32000, 112000 
FROM colleges WHERE college_name = 'Dhanalakshmi Srinivasan Engineering College' AND district = 'Perambalur';

INSERT INTO hostel_fees (college_id, hostel_type, room_type, fee_per_year, mess_fee, total_amount)
SELECT college_id, 'Boys Hostel', 'Standard', 90000, 36000, 126000 
FROM colleges WHERE college_name = 'Dhanalakshmi Srinivasan Medical College and Hospital' AND district = 'Perambalur';

INSERT INTO hostel_fees (college_id, hostel_type, room_type, fee_per_year, mess_fee, total_amount)
SELECT college_id, 'Girls Hostel', 'Standard', 90000, 36000, 126000 
FROM colleges WHERE college_name = 'Dhanalakshmi Srinivasan Medical College and Hospital' AND district = 'Perambalur';

INSERT INTO hostel_fees (college_id, hostel_type, room_type, fee_per_year, mess_fee, total_amount)
SELECT college_id, 'Boys Hostel', 'Standard', 80000, 32000, 112000 
FROM colleges WHERE college_name = 'Dhanalakshmi Srinivasan College of Engineering' AND district = 'Tiruchirappalli';

INSERT INTO hostel_fees (college_id, hostel_type, room_type, fee_per_year, mess_fee, total_amount)
SELECT college_id, 'Girls Hostel', 'Standard', 75000, 30000, 105000 
FROM colleges WHERE college_name = 'Dhanalakshmi Srinivasan College of Engineering' AND district = 'Tiruchirappalli';

INSERT INTO hostel_fees (college_id, hostel_type, room_type, fee_per_year, mess_fee, total_amount)
SELECT college_id, 'Boys Hostel', 'Standard', 70000, 28000, 98000 
FROM colleges WHERE college_name = 'Dhanalakshmi Srinivasan Arts and Science College' AND district = 'Tiruchirappalli';

INSERT INTO hostel_fees (college_id, hostel_type, room_type, fee_per_year, mess_fee, total_amount)
SELECT college_id, 'Girls Hostel', 'Standard', 70000, 28000, 98000 
FROM colleges WHERE college_name = 'Dhanalakshmi Srinivasan Arts and Science College' AND district = 'Tiruchirappalli';

-- ===== Hostel Fees for Indra Ganesan Institutions =====
INSERT INTO hostel_fees (college_id, hostel_type, room_type, fee_per_year, mess_fee, total_amount)
SELECT college_id, 'Boys Hostel', 'Standard', 65000, 26000, 91000 
FROM colleges WHERE college_name = 'Indra Ganesan Institutions';

INSERT INTO hostel_fees (college_id, hostel_type, room_type, fee_per_year, mess_fee, total_amount)
SELECT college_id, 'Girls Hostel', 'Standard', 60000, 24000, 84000 
FROM colleges WHERE college_name = 'Indra Ganesan Institutions';

-- ===== One-Time Fees for Dhanalakshmi Srinivasan Institutions =====
INSERT INTO one_time_fees (college_id, fee_name, amount, purpose, status)
SELECT college_id, 'Admission Fee', 20000, 'One-time admission processing fee', 'Non-Refundable' 
FROM colleges WHERE college_name = 'Dhanalakshmi Srinivasan Engineering College' AND district = 'Perambalur';

INSERT INTO one_time_fees (college_id, fee_name, amount, purpose, status)
SELECT college_id, 'Development Fee', 15000, 'Infrastructure development fee', 'Non-Refundable' 
FROM colleges WHERE college_name = 'Dhanalakshmi Srinivasan Engineering College' AND district = 'Perambalur';

INSERT INTO one_time_fees (college_id, fee_name, amount, purpose, status)
SELECT college_id, 'Admission Fee', 30000, 'One-time admission processing fee', 'Non-Refundable' 
FROM colleges WHERE college_name = 'Dhanalakshmi Srinivasan Medical College and Hospital' AND district = 'Perambalur';

INSERT INTO one_time_fees (college_id, fee_name, amount, purpose, status)
SELECT college_id, 'Laboratory Fee', 20000, 'Laboratory equipment and materials fee', 'Non-Refundable' 
FROM colleges WHERE college_name = 'Dhanalakshmi Srinivasan Medical College and Hospital' AND district = 'Perambalur';

INSERT INTO one_time_fees (college_id, fee_name, amount, purpose, status)
SELECT college_id, 'Admission Fee', 20000, 'One-time admission processing fee', 'Non-Refundable' 
FROM colleges WHERE college_name = 'Dhanalakshmi Srinivasan College of Engineering' AND district = 'Tiruchirappalli';

INSERT INTO one_time_fees (college_id, fee_name, amount, purpose, status)
SELECT college_id, 'Development Fee', 15000, 'Infrastructure development fee', 'Non-Refundable' 
FROM colleges WHERE college_name = 'Dhanalakshmi Srinivasan College of Engineering' AND district = 'Tiruchirappalli';

INSERT INTO one_time_fees (college_id, fee_name, amount, purpose, status)
SELECT college_id, 'Admission Fee', 10000, 'One-time admission processing fee', 'Non-Refundable' 
FROM colleges WHERE college_name = 'Dhanalakshmi Srinivasan Arts and Science College' AND district = 'Tiruchirappalli';

INSERT INTO one_time_fees (college_id, fee_name, amount, purpose, status)
SELECT college_id, 'Development Fee', 8000, 'Infrastructure development fee', 'Non-Refundable' 
FROM colleges WHERE college_name = 'Dhanalakshmi Srinivasan Arts and Science College' AND district = 'Tiruchirappalli';

-- ===== One-Time Fees for Indra Ganesan Institutions =====
INSERT INTO one_time_fees (college_id, fee_name, amount, purpose, status)
SELECT college_id, 'Admission Fee', 15000, 'One-time admission processing fee', 'Non-Refundable' 
FROM colleges WHERE college_name = 'Indra Ganesan Institutions';

INSERT INTO one_time_fees (college_id, fee_name, amount, purpose, status)
SELECT college_id, 'Amenities Fee', 10000, 'Campus amenities and facilities', 'Non-Refundable' 
FROM colleges WHERE college_name = 'Indra Ganesan Institutions';

-- ===== Fees for M.A.M College of Engineering =====
INSERT INTO hostel_fees (college_id, hostel_type, room_type, fee_per_year, mess_fee, total_amount)
SELECT college_id, 'Boys Hostel', 'Non-AC', 45000, 18000, 63000 FROM colleges WHERE college_name = 'M.A.M College of Engineering' AND district = 'Tiruchirappalli';

INSERT INTO hostel_fees (college_id, hostel_type, room_type, fee_per_year, mess_fee, total_amount)
SELECT college_id, 'Boys Hostel', 'AC', 70000, 28000, 98000 FROM colleges WHERE college_name = 'M.A.M College of Engineering' AND district = 'Tiruchirappalli';

INSERT INTO hostel_fees (college_id, hostel_type, room_type, fee_per_year, mess_fee, total_amount)
SELECT college_id, 'Girls Hostel', 'Non-AC', 45000, 18000, 63000 FROM colleges WHERE college_name = 'M.A.M College of Engineering' AND district = 'Tiruchirappalli';

INSERT INTO hostel_fees (college_id, hostel_type, room_type, fee_per_year, mess_fee, total_amount)
SELECT college_id, 'Girls Hostel', 'AC', 70000, 28000, 98000 FROM colleges WHERE college_name = 'M.A.M College of Engineering' AND district = 'Tiruchirappalli';

INSERT INTO one_time_fees (college_id, fee_name, amount, purpose, status)
SELECT college_id, 'Admission Fee', 10000, 'One-time admission charge', 'Non-Refundable' FROM colleges WHERE college_name = 'M.A.M College of Engineering' AND district = 'Tiruchirappalli';

INSERT INTO one_time_fees (college_id, fee_name, amount, purpose, status)
SELECT college_id, 'Technology Fee', 5000, 'Lab and maintenance fee', 'Non-Refundable' FROM colleges WHERE college_name = 'M.A.M College of Engineering' AND district = 'Tiruchirappalli';

-- ===== Fees for ABC Arts and Science College =====
INSERT INTO hostel_fees (college_id, hostel_type, room_type, fee_per_year, mess_fee, total_amount)
SELECT college_id, 'Boys Hostel', 'Non-AC', 30000, 12000, 42000 FROM colleges WHERE college_name = 'ABC Arts and Science College' AND district = 'Coimbatore';

INSERT INTO hostel_fees (college_id, hostel_type, room_type, fee_per_year, mess_fee, total_amount)
SELECT college_id, 'Girls Hostel', 'Non-AC', 30000, 12000, 42000 FROM colleges WHERE college_name = 'ABC Arts and Science College' AND district = 'Coimbatore';

INSERT INTO one_time_fees (college_id, fee_name, amount, purpose, status)
SELECT college_id, 'Admission Fee', 5000, 'One-time admission charge', 'Non-Refundable' FROM colleges WHERE college_name = 'ABC Arts and Science College' AND district = 'Coimbatore';

-- Added Loyola and Hindusthan Data
INSERT INTO colleges (college_name, district, degree, fees, description) VALUES
('LOYOLA INSTITUTE OF TECHNOLOGY, CHENNAI', 'Chennai', 'B.Sc Computer Science', 70000, 'Undergraduate science program with specialization in computer science.'),
('LOYOLA INSTITUTE OF TECHNOLOGY, CHENNAI', 'Chennai', 'B.Com General', 65000, 'Comprehensive commerce undergraduate degree.'),
('LOYOLA INSTITUTE OF TECHNOLOGY, CHENNAI', 'Chennai', 'B.A English Literature', 60000, 'Arts program focused on English language and literature.'),
('LOYOLA INSTITUTE OF TECHNOLOGY, CHENNAI', 'Chennai', 'B.Sc Mathematics', 65000, 'Undergraduate degree specializing in mathematics.'),
('LOYOLA INSTITUTE OF TECHNOLOGY, CHENNAI', 'Chennai', 'BBA Management', 75000, 'Bachelor of Business Administration program.');

INSERT INTO colleges (college_name, district, degree, fees, description) VALUES
('Hindusthan College of Arts & Science', 'Coimbatore', 'B.Sc Computer Science', 50000, 'Computer science undergraduate degree program.'),
('Hindusthan College of Arts & Science', 'Coimbatore', 'B.Com General', 48000, 'Undergraduate commerce degree program.'),
('Hindusthan College of Arts & Science', 'Coimbatore', 'B.A English Literature', 45000, 'Undergraduate arts program in English literature.'),
('Hindusthan College of Arts & Science', 'Coimbatore', 'B.Sc Information Technology', 55000, 'IT focused undergraduate program.'),
('Hindusthan College of Arts & Science', 'Coimbatore', 'BCA Bachelor of Computer Applications', 60000, 'Undergraduate professional computer application program.');

INSERT INTO colleges (college_name, district, degree, fees, description) VALUES
('LOYOLA INSTITUTE OF TECHNOLOGY, CHENNAI', 'Chennai', 'M.Sc Computer Science', 120000, 'Postgraduate program in advanced computer science.'),
('LOYOLA INSTITUTE OF TECHNOLOGY, CHENNAI', 'Chennai', 'M.Com General', 110000, 'Master of Commerce with professional business studies.'),
('LOYOLA INSTITUTE OF TECHNOLOGY, CHENNAI', 'Chennai', 'M.A English Literature', 100000, 'Advanced literature and English language postgraduate program.'),
('LOYOLA INSTITUTE OF TECHNOLOGY, CHENNAI', 'Chennai', 'M.Sc Data Science', 140000, 'Specialized postgraduate degree in Data Science and Analytics.'),
('LOYOLA INSTITUTE OF TECHNOLOGY, CHENNAI', 'Chennai', 'MBA Master of Business Administration', 180000, 'Professional postgraduate management program.');

INSERT INTO colleges (college_name, district, degree, fees, description) VALUES
('Hindusthan College of Arts & Science', 'Coimbatore', 'M.Sc Computer Science', 90000, 'Advanced postgraduate computer science program.'),
('Hindusthan College of Arts & Science', 'Coimbatore', 'M.Com General', 85000, 'Professional postgraduate commerce degree.'),
('Hindusthan College of Arts & Science', 'Coimbatore', 'M.A English Literature', 80000, 'Postgraduate program in English language and literature.'),
('Hindusthan College of Arts & Science', 'Coimbatore', 'M.Sc Information Technology', 95000, 'Specialized PG degree in Information Technology.'),
('Hindusthan College of Arts & Science', 'Coimbatore', 'MBA Master of Business Administration', 150000, 'Professional postgraduate management program.');

-- Add Dhanalakshmi Srinivasan College, Tiruchirappalli Campus
INSERT INTO colleges (college_name, district, degree, fees, description, image_url) VALUES
('Dhanalakshmi Srinivasan College', 'Tiruchirappalli', 'B.E Computer Science and Engineering', 85000, 'Premier engineering institute in Trichy offering world-class education.', '/dhanalakshmi_trichy.jpg'),
('Dhanalakshmi Srinivasan College', 'Tiruchirappalli', 'B.E Electronics and Communication', 80000, 'State-of-the-art electronics labs and infrastructure.', '/dhanalakshmi_trichy.jpg'),
('Dhanalakshmi Srinivasan College', 'Tiruchirappalli', 'B.E Mechanical Engineering', 75000, 'Comprehensive mechanical engineering program.', '/dhanalakshmi_trichy.jpg'),
('Dhanalakshmi Srinivasan College', 'Tiruchirappalli', 'B.Tech Artificial Intelligence', 90000, 'Advanced AI and Data Science curriculum.', '/dhanalakshmi_trichy.jpg'),
('Dhanalakshmi Srinivasan College', 'Tiruchirappalli', 'MBA', 60000, 'Master of Business Administration specializing in HR and Finance.', '/dhanalakshmi_trichy.jpg'),
('Dhanalakshmi Srinivasan College', 'Tiruchirappalli', 'MCA', 55000, 'Master of Computer Applications.', '/dhanalakshmi_trichy.jpg');

-- Add Fees for DCS Trichy
INSERT INTO hostel_fees (college_id, hostel_type, room_type, fee_per_year, mess_fee, total_amount)
SELECT college_id, 'Boys Hostel', 'Non-AC', 45000, 18000, 63000 
FROM colleges WHERE college_name = 'Dhanalakshmi Srinivasan College' AND district = 'Tiruchirappalli' LIMIT 1;

INSERT INTO hostel_fees (college_id, hostel_type, room_type, fee_per_year, mess_fee, total_amount)
SELECT college_id, 'Girls Hostel', 'Non-AC', 45000, 18000, 63000 
FROM colleges WHERE college_name = 'Dhanalakshmi Srinivasan College' AND district = 'Tiruchirappalli' LIMIT 1;

INSERT INTO one_time_fees (college_id, fee_name, amount, purpose, status)
SELECT college_id, 'Admission Fee', 10000, 'Registration and Admin', 'Non-Refundable' 
FROM colleges WHERE college_name = 'Dhanalakshmi Srinivasan College' AND district = 'Tiruchirappalli' LIMIT 1;

-- Update LOYOLA INSTITUTE OF TECHNOLOGY, CHENNAI with image URL
UPDATE colleges 
SET image_url = '/loyola_college_chennai.jpg'
WHERE college_name = 'LOYOLA INSTITUTE OF TECHNOLOGY, CHENNAI' 
AND district = 'Chennai';

-- CARE College Hostel Fees Data
INSERT INTO care_hostel_fees 
(college_name, gender, room_type, yearly_fee, one_time_fee) VALUES
('CARE College of Engineering', 'Boys', 'AC', 90000, 15000),
('CARE College of Engineering', 'Boys', 'Non-AC', 65000, 15000),
('CARE College of Engineering', 'Girls', 'AC', 90000, 15000),
('CARE College of Engineering', 'Girls', 'Non-AC', 65000, 15000);

-- Imayam College Hostel Fees Data
INSERT INTO care_hostel_fees 
(college_name, gender, room_type, yearly_fee, one_time_fee) VALUES
('Imayam College of Engineering', 'Boys', 'AC', 85000, 12000),
('Imayam College of Engineering', 'Boys', 'Non-AC', 60000, 12000),
('Imayam College of Engineering', 'Girls', 'AC', 85000, 12000),
('Imayam College of Engineering', 'Girls', 'Non-AC', 60000, 12000);

-- Sync CARE Hostel Fees to unified system
INSERT INTO hostel_fees (college_id, hostel_type, room_type, fee_per_year, mess_fee, total_amount)
SELECT college_id, 'Boys Hostel', 'AC', 90000, 36000, 126000 FROM colleges WHERE college_name = 'CARE College of Engineering';

INSERT INTO hostel_fees (college_id, hostel_type, room_type, fee_per_year, mess_fee, total_amount)
SELECT college_id, 'Boys Hostel', 'Non-AC', 65000, 26000, 91000 FROM colleges WHERE college_name = 'CARE College of Engineering';

INSERT INTO hostel_fees (college_id, hostel_type, room_type, fee_per_year, mess_fee, total_amount)
SELECT college_id, 'Girls Hostel', 'AC', 90000, 36000, 126000 FROM colleges WHERE college_name = 'CARE College of Engineering';

INSERT INTO hostel_fees (college_id, hostel_type, room_type, fee_per_year, mess_fee, total_amount)
SELECT college_id, 'Girls Hostel', 'Non-AC', 65000, 26000, 91000 FROM colleges WHERE college_name = 'CARE College of Engineering';

-- Sync Imayam Hostel Fees to unified system
INSERT INTO hostel_fees (college_id, hostel_type, room_type, fee_per_year, mess_fee, total_amount)
SELECT college_id, 'Boys Hostel', 'AC', 85000, 34000, 119000 FROM colleges WHERE college_name = 'Imayam College of Engineering';

INSERT INTO hostel_fees (college_id, hostel_type, room_type, fee_per_year, mess_fee, total_amount)
SELECT college_id, 'Boys Hostel', 'Non-AC', 60000, 24000, 84000 FROM colleges WHERE college_name = 'Imayam College of Engineering';

INSERT INTO hostel_fees (college_id, hostel_type, room_type, fee_per_year, mess_fee, total_amount)
SELECT college_id, 'Girls Hostel', 'AC', 85000, 34000, 119000 FROM colleges WHERE college_name = 'Imayam College of Engineering';

INSERT INTO hostel_fees (college_id, hostel_type, room_type, fee_per_year, mess_fee, total_amount)
SELECT college_id, 'Girls Hostel', 'Non-AC', 60000, 24000, 84000 FROM colleges WHERE college_name = 'Imayam College of Engineering';

-- Sync Adithya Hostel Fees to unified system
INSERT INTO hostel_fees (college_id, hostel_type, room_type, fee_per_year, mess_fee, total_amount)
SELECT college_id, 'Boys Hostel', 'AC', 90000, 36000, 126000 FROM colleges WHERE college_name = 'Adithya Institute of Technology';

INSERT INTO hostel_fees (college_id, hostel_type, room_type, fee_per_year, mess_fee, total_amount)
SELECT college_id, 'Boys Hostel', 'Non-AC', 65000, 26000, 91000 FROM colleges WHERE college_name = 'Adithya Institute of Technology';

INSERT INTO hostel_fees (college_id, hostel_type, room_type, fee_per_year, mess_fee, total_amount)
SELECT college_id, 'Girls Hostel', 'AC', 90000, 36000, 126000 FROM colleges WHERE college_name = 'Adithya Institute of Technology';

INSERT INTO hostel_fees (college_id, hostel_type, room_type, fee_per_year, mess_fee, total_amount)
SELECT college_id, 'Girls Hostel', 'Non-AC', 65000, 26000, 91000 FROM colleges WHERE college_name = 'Adithya Institute of Technology';

-- Batch Sync for Arts, Science and Engineering colleges
-- Adithya College of Arts and Science
INSERT INTO hostel_fees (college_id, hostel_type, room_type, fee_per_year, mess_fee, total_amount)
SELECT college_id, 'Boys Hostel', 'AC', 95000, 38000, 133000 FROM colleges WHERE college_name = 'Adithya College of Arts and Science';
INSERT INTO hostel_fees (college_id, hostel_type, room_type, fee_per_year, mess_fee, total_amount)
SELECT college_id, 'Boys Hostel', 'Non-AC', 70000, 28000, 98000 FROM colleges WHERE college_name = 'Adithya College of Arts and Science';
INSERT INTO hostel_fees (college_id, hostel_type, room_type, fee_per_year, mess_fee, total_amount)
SELECT college_id, 'Girls Hostel', 'AC', 95000, 38000, 133000 FROM colleges WHERE college_name = 'Adithya College of Arts and Science';
INSERT INTO hostel_fees (college_id, hostel_type, room_type, fee_per_year, mess_fee, total_amount)
SELECT college_id, 'Girls Hostel', 'Non-AC', 70000, 28000, 98000 FROM colleges WHERE college_name = 'Adithya College of Arts and Science';

-- Rathinam Group of Institutions
INSERT INTO hostel_fees (college_id, hostel_type, room_type, fee_per_year, mess_fee, total_amount)
SELECT college_id, 'Boys Hostel', 'AC', 92000, 36800, 128800 FROM colleges WHERE college_name = 'Rathinam Group of Institutions';
INSERT INTO hostel_fees (college_id, hostel_type, room_type, fee_per_year, mess_fee, total_amount)
SELECT college_id, 'Boys Hostel', 'Non-AC', 68000, 27200, 95200 FROM colleges WHERE college_name = 'Rathinam Group of Institutions';
INSERT INTO hostel_fees (college_id, hostel_type, room_type, fee_per_year, mess_fee, total_amount)
SELECT college_id, 'Girls Hostel', 'AC', 92000, 36800, 128800 FROM colleges WHERE college_name = 'Rathinam Group of Institutions';
INSERT INTO hostel_fees (college_id, hostel_type, room_type, fee_per_year, mess_fee, total_amount)
SELECT college_id, 'Girls Hostel', 'Non-AC', 68000, 27200, 95200 FROM colleges WHERE college_name = 'Rathinam Group of Institutions';

-- Nehru College
INSERT INTO hostel_fees (college_id, hostel_type, room_type, fee_per_year, mess_fee, total_amount)
SELECT college_id, 'Boys Hostel', 'AC', 90000, 36000, 126000 FROM colleges WHERE college_name = 'Nehru College';
INSERT INTO hostel_fees (college_id, hostel_type, room_type, fee_per_year, mess_fee, total_amount)
SELECT college_id, 'Boys Hostel', 'Non-AC', 66000, 26400, 92400 FROM colleges WHERE college_name = 'Nehru College';
INSERT INTO hostel_fees (college_id, hostel_type, room_type, fee_per_year, mess_fee, total_amount)
SELECT college_id, 'Girls Hostel', 'AC', 90000, 36000, 126000 FROM colleges WHERE college_name = 'Nehru College';
INSERT INTO hostel_fees (college_id, hostel_type, room_type, fee_per_year, mess_fee, total_amount)
SELECT college_id, 'Girls Hostel', 'Non-AC', 66000, 26400, 92400 FROM colleges WHERE college_name = 'Nehru College';

-- Sri Ramakrishna College of Engineering
INSERT INTO hostel_fees (college_id, hostel_type, room_type, fee_per_year, mess_fee, total_amount)
SELECT college_id, 'Boys Hostel', 'AC', 97000, 38800, 135800 FROM colleges WHERE college_name = 'Sri Ramakrishna College of Engineering';
INSERT INTO hostel_fees (college_id, hostel_type, room_type, fee_per_year, mess_fee, total_amount)
SELECT college_id, 'Boys Hostel', 'Non-AC', 71000, 28400, 99400 FROM colleges WHERE college_name = 'Sri Ramakrishna College of Engineering';
INSERT INTO hostel_fees (college_id, hostel_type, room_type, fee_per_year, mess_fee, total_amount)
SELECT college_id, 'Girls Hostel', 'AC', 97000, 38800, 135800 FROM colleges WHERE college_name = 'Sri Ramakrishna College of Engineering';
INSERT INTO hostel_fees (college_id, hostel_type, room_type, fee_per_year, mess_fee, total_amount)
SELECT college_id, 'Girls Hostel', 'Non-AC', 71000, 28400, 99400 FROM colleges WHERE college_name = 'Sri Ramakrishna College of Engineering';

-- Hindusthan College of Arts & Science
INSERT INTO hostel_fees (college_id, hostel_type, room_type, fee_per_year, mess_fee, total_amount)
SELECT college_id, 'Boys Hostel', 'AC', 94000, 37600, 131600 FROM colleges WHERE college_name = 'Hindusthan College of Arts & Science';
INSERT INTO hostel_fees (college_id, hostel_type, room_type, fee_per_year, mess_fee, total_amount)
SELECT college_id, 'Boys Hostel', 'Non-AC', 69000, 27600, 96600 FROM colleges WHERE college_name = 'Hindusthan College of Arts & Science';
INSERT INTO hostel_fees (college_id, hostel_type, room_type, fee_per_year, mess_fee, total_amount)
SELECT college_id, 'Girls Hostel', 'AC', 94000, 37600, 131600 FROM colleges WHERE college_name = 'Hindusthan College of Arts & Science';
INSERT INTO hostel_fees (college_id, hostel_type, room_type, fee_per_year, mess_fee, total_amount)
SELECT college_id, 'Girls Hostel', 'Non-AC', 69000, 27600, 96600 FROM colleges WHERE college_name = 'Hindusthan College of Arts & Science';

-- LOYOLA INSTITUTE OF TECHNOLOGY, CHENNAI
INSERT INTO hostel_fees (college_id, hostel_type, room_type, fee_per_year, mess_fee, total_amount)
SELECT college_id, 'Boys Hostel', 'AC', 98000, 39200, 137200 FROM colleges WHERE college_name = 'LOYOLA INSTITUTE OF TECHNOLOGY, CHENNAI';
INSERT INTO hostel_fees (college_id, hostel_type, room_type, fee_per_year, mess_fee, total_amount)
SELECT college_id, 'Boys Hostel', 'Non-AC', 73000, 29200, 102200 FROM colleges WHERE college_name = 'LOYOLA INSTITUTE OF TECHNOLOGY, CHENNAI';
INSERT INTO hostel_fees (college_id, hostel_type, room_type, fee_per_year, mess_fee, total_amount)
SELECT college_id, 'Girls Hostel', 'AC', 98000, 39200, 137200 FROM colleges WHERE college_name = 'LOYOLA INSTITUTE OF TECHNOLOGY, CHENNAI';
INSERT INTO hostel_fees (college_id, hostel_type, room_type, fee_per_year, mess_fee, total_amount)
SELECT college_id, 'Girls Hostel', 'Non-AC', 73000, 29200, 102200 FROM colleges WHERE college_name = 'LOYOLA INSTITUTE OF TECHNOLOGY, CHENNAI';

-- Sync Adithya One-Time Fees to unified system
INSERT INTO one_time_fees (college_id, fee_name, amount, purpose, status)
SELECT college_id, 'Admission Fee', 15000, 'One-time admission charge for Adithya', 'Non-Refundable' FROM colleges WHERE college_name = 'Adithya Institute of Technology';

-- Batch Sync One-Time Fees
-- Adithya College of Arts and Science
INSERT INTO one_time_fees (college_id, fee_name, amount, purpose, status)
SELECT college_id, 'Admission Fee', 15000, 'One-time admission charge', 'Non-Refundable' FROM colleges WHERE college_name = 'Adithya College of Arts and Science';
INSERT INTO one_time_fees (college_id, fee_name, amount, purpose, status)
SELECT college_id, 'Caution Deposit', 10000, 'Refundable security deposit', 'Refundable' FROM colleges WHERE college_name = 'Adithya College of Arts and Science';
INSERT INTO one_time_fees (college_id, fee_name, amount, purpose, status)
SELECT college_id, 'Library Fee', 5000, 'One-time library access fee', 'Non-Refundable' FROM colleges WHERE college_name = 'Adithya College of Arts and Science';

-- Rathinam Group of Institutions
INSERT INTO one_time_fees (college_id, fee_name, amount, purpose, status)
SELECT college_id, 'Admission Fee', 16000, 'One-time admission charge', 'Non-Refundable' FROM colleges WHERE college_name = 'Rathinam Group of Institutions';
INSERT INTO one_time_fees (college_id, fee_name, amount, purpose, status)
SELECT college_id, 'Caution Deposit', 9000, 'Refundable security deposit', 'Refundable' FROM colleges WHERE college_name = 'Rathinam Group of Institutions';
INSERT INTO one_time_fees (college_id, fee_name, amount, purpose, status)
SELECT college_id, 'Lab Fee', 7000, 'One-time lab usage fee', 'Non-Refundable' FROM colleges WHERE college_name = 'Rathinam Group of Institutions';

-- Nehru College
INSERT INTO one_time_fees (college_id, fee_name, amount, purpose, status)
SELECT college_id, 'Admission Fee', 15500, 'One-time admission charge', 'Non-Refundable' FROM colleges WHERE college_name = 'Nehru College';
INSERT INTO one_time_fees (college_id, fee_name, amount, purpose, status)
SELECT college_id, 'Caution Deposit', 9500, 'Refundable security deposit', 'Refundable' FROM colleges WHERE college_name = 'Nehru College';
INSERT INTO one_time_fees (college_id, fee_name, amount, purpose, status)
SELECT college_id, 'Library Fee', 6000, 'One-time library access fee', 'Non-Refundable' FROM colleges WHERE college_name = 'Nehru College';

-- Sri Ramakrishna College of Engineering
INSERT INTO one_time_fees (college_id, fee_name, amount, purpose, status)
SELECT college_id, 'Admission Fee', 17000, 'One-time admission charge', 'Non-Refundable' FROM colleges WHERE college_name = 'Sri Ramakrishna College of Engineering';
INSERT INTO one_time_fees (college_id, fee_name, amount, purpose, status)
SELECT college_id, 'Caution Deposit', 12000, 'Refundable security deposit', 'Refundable' FROM colleges WHERE college_name = 'Sri Ramakrishna College of Engineering';
INSERT INTO one_time_fees (college_id, fee_name, amount, purpose, status)
SELECT college_id, 'Lab Fee', 8000, 'One-time lab usage fee', 'Non-Refundable' FROM colleges WHERE college_name = 'Sri Ramakrishna College of Engineering';

-- Hindusthan College of Arts & Science
INSERT INTO one_time_fees (college_id, fee_name, amount, purpose, status)
SELECT college_id, 'Admission Fee', 16500, 'One-time admission charge', 'Non-Refundable' FROM colleges WHERE college_name = 'Hindusthan College of Arts & Science';
INSERT INTO one_time_fees (college_id, fee_name, amount, purpose, status)
SELECT college_id, 'Caution Deposit', 11000, 'Refundable security deposit', 'Refundable' FROM colleges WHERE college_name = 'Hindusthan College of Arts & Science';
INSERT INTO one_time_fees (college_id, fee_name, amount, purpose, status)
SELECT college_id, 'Library Fee', 5000, 'One-time library access fee', 'Non-Refundable' FROM colleges WHERE college_name = 'Hindusthan College of Arts & Science';

-- LOYOLA INSTITUTE OF TECHNOLOGY, CHENNAI
INSERT INTO one_time_fees (college_id, fee_name, amount, purpose, status)
SELECT college_id, 'Admission Fee', 18000, 'One-time admission charge', 'Non-Refundable' FROM colleges WHERE college_name = 'LOYOLA INSTITUTE OF TECHNOLOGY, CHENNAI';
INSERT INTO one_time_fees (college_id, fee_name, amount, purpose, status)
SELECT college_id, 'Caution Deposit', 12000, 'Refundable security deposit', 'Refundable' FROM colleges WHERE college_name = 'LOYOLA INSTITUTE OF TECHNOLOGY, CHENNAI';
INSERT INTO one_time_fees (college_id, fee_name, amount, purpose, status)
SELECT college_id, 'Library Fee', 6000, 'One-time library access fee', 'Non-Refundable' FROM colleges WHERE college_name = 'LOYOLA INSTITUTE OF TECHNOLOGY, CHENNAI';
INSERT INTO one_time_fees (college_id, fee_name, amount, purpose, status)
SELECT college_id, 'Lab Fee', 8500, 'One-time lab usage fee', 'Non-Refundable' FROM colleges WHERE college_name = 'LOYOLA INSTITUTE OF TECHNOLOGY, CHENNAI';
INSERT INTO one_time_fees (college_id, fee_name, amount, purpose, status)
SELECT college_id, 'Sports Fee', 5000, 'One-time sports activity fee', 'Non-Refundable' FROM colleges WHERE college_name = 'LOYOLA INSTITUTE OF TECHNOLOGY, CHENNAI';

-- Sync CARE One-Time Fees to unified system
INSERT INTO one_time_fees (college_id, fee_name, amount, purpose, status)
SELECT college_id, 'Admission Fee', 15000, 'One-time admission charge for CARE', 'Non-Refundable' FROM colleges WHERE college_name = 'CARE College of Engineering';

-- Sync Imayam One-Time Fees to unified system
INSERT INTO one_time_fees (college_id, fee_name, amount, purpose, status)
SELECT college_id, 'Admission Fee', 12000, 'One-time admission charge for Imayam', 'Non-Refundable' FROM colleges WHERE college_name = 'Imayam College of Engineering';

-- Add Dhanalakshmi Srinivasan College of Engineering and Technology, Perambalur
INSERT INTO colleges (college_name, district, degree, fees, description, image_url) VALUES
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
('Dhanalakshmi Srinivasan College of Engineering and Technology', 'Perambalur', 'B.Tech Information Technology', 110000, 'UG First Year | Govt: 1,10,000 | Management: 1,35,000', 'dscet.jpg');

INSERT INTO colleges (college_name, district, degree, fees, description, image_url) VALUES
('Dhanalakshmi Srinivasan College of Engineering and Technology', 'Perambalur', 'B.E Aeronautical Engineering (Lateral Entry)', 60000, 'UG Direct Second Year | Govt: 60,000 | Management: 70,000', 'dscet.jpg'),
('Dhanalakshmi Srinivasan College of Engineering and Technology', 'Perambalur', 'B.E Agricultural Engineering (Lateral Entry)', 60000, 'UG Direct Second Year | Govt: 60,000 | Management: 90,000', 'dscet.jpg'),
('Dhanalakshmi Srinivasan College of Engineering and Technology', 'Perambalur', 'B.Tech Artificial Intelligence & Data Science (Lateral Entry)', 100000, 'UG Direct Second Year | Govt: 1,00,000 | Management: 1,20,000', 'dscet.jpg'),
('Dhanalakshmi Srinivasan College of Engineering and Technology', 'Perambalur', 'B.E Computer Science and Engineering (Lateral Entry)', 100000, 'UG Direct Second Year | Govt: 1,00,000 | Management: 1,30,000', 'dscet.jpg');

INSERT INTO colleges (college_name, district, degree, fees, description, image_url) VALUES
('Dhanalakshmi Srinivasan College of Engineering and Technology', 'Perambalur', 'M.E Computer Science and Engineering', 70000, 'PG First Year | Govt & Management Fees Same', 'dscet.jpg'),
('Dhanalakshmi Srinivasan College of Engineering and Technology', 'Perambalur', 'M.E Communication Systems', 50000, 'PG First Year | Govt & Management Fees Same', 'dscet.jpg'),
('Dhanalakshmi Srinivasan College of Engineering and Technology', 'Perambalur', 'MBA', 90000, 'PG First Year | Govt & Management Fees Same', 'dscet.jpg'),
('Dhanalakshmi Srinivasan College of Engineering and Technology', 'Perambalur', 'MCA', 65000, 'PG First Year | Govt & Management Fees Same', 'dscet.jpg');

-- Add New Prince Shri Bhavani College of Engineering and Technology
INSERT INTO colleges (college_name, district, degree, fees, description, image_url) VALUES
('New Prince Shri Bhavani College of Engineering and Technology', 'Chennai', 'B.E. Computer Science Engineering', 85000, 'UG Course | Govt: 85,000 | Mgt: 1,20,000', 'new_prince.jpg'),
('New Prince Shri Bhavani College of Engineering and Technology', 'Chennai', 'B.E. CSE - Cyber Security', 85000, 'UG Course | Govt: 85,000 | Mgt: 1,20,000', 'new_prince.jpg'),
('New Prince Shri Bhavani College of Engineering and Technology', 'Chennai', 'B.E. Electrical & Electronics Engineering', 75000, 'UG Course | Govt: 75,000 | Mgt: 75,000', 'new_prince.jpg'),
('New Prince Shri Bhavani College of Engineering and Technology', 'Chennai', 'B.E. Electronics & Communication Engineering', 80000, 'UG Course | Govt: 80,000 | Mgt: 1,15,000', 'new_prince.jpg'),
('New Prince Shri Bhavani College of Engineering and Technology', 'Chennai', 'B.E. Mechanical Engineering', 75000, 'UG Course | Govt: 75,000 | Mgt: 75,000', 'new_prince.jpg'),
('New Prince Shri Bhavani College of Engineering and Technology', 'Chennai', 'B.Tech Information Technology', 85000, 'UG Course | Govt: 85,000 | Mgt: 1,20,000', 'new_prince.jpg'),
('New Prince Shri Bhavani College of Engineering and Technology', 'Chennai', 'B.Tech Artificial Intelligence and Data Science', 85000, 'UG Course | Govt: 85,000 | Mgt: 1,20,000', 'new_prince.jpg'),
('New Prince Shri Bhavani College of Engineering and Technology', 'Chennai', 'M.E. Applied Electronics', 50000, 'PG Course | Govt & Mgt: 50,000', 'new_prince.jpg'),
('New Prince Shri Bhavani College of Engineering and Technology', 'Chennai', 'M.C.A. Master of Computer Application', 70000, 'PG Course | Govt & Mgt: 70,000', 'new_prince.jpg'),
('New Prince Shri Bhavani College of Engineering and Technology', 'Chennai', 'M.B.A. Master of Business Administration', 70000, 'PG Course | Govt & Mgt: 70,000', 'new_prince.jpg'),
('New Prince Shri Bhavani College of Engineering and Technology', 'Chennai', 'Lateral Entry', 80000, 'Lateral Entry Course | Govt: 80,000 | Mgt: 1,15,000', 'new_prince.jpg');

-- Add Hostel Fees for New Prince
INSERT INTO hostel_fees (college_id, hostel_type, room_type, fee_per_year, mess_fee, total_amount)
SELECT college_id, 'Boys Hostel', 'AC', 90000, 36000, 126000 FROM colleges WHERE college_name = 'New Prince Shri Bhavani College of Engineering and Technology';

INSERT INTO hostel_fees (college_id, hostel_type, room_type, fee_per_year, mess_fee, total_amount)
SELECT college_id, 'Boys Hostel', 'Non-AC', 70000, 28000, 98000 FROM colleges WHERE college_name = 'New Prince Shri Bhavani College of Engineering and Technology';

INSERT INTO hostel_fees (college_id, hostel_type, room_type, fee_per_year, mess_fee, total_amount)
SELECT college_id, 'Girls Hostel', 'AC', 90000, 36000, 126000 FROM colleges WHERE college_name = 'New Prince Shri Bhavani College of Engineering and Technology';

INSERT INTO hostel_fees (college_id, hostel_type, room_type, fee_per_year, mess_fee, total_amount)
SELECT college_id, 'Girls Hostel', 'Non-AC', 70000, 28000, 98000 FROM colleges WHERE college_name = 'New Prince Shri Bhavani College of Engineering and Technology';

-- Add One-Time Fees for New Prince
INSERT INTO one_time_fees (college_id, fee_name, amount, purpose, status)
SELECT college_id, 'Admission Fee', 10000, 'One-time admission charge', 'Non-Refundable' FROM colleges WHERE college_name = 'New Prince Shri Bhavani College of Engineering and Technology';

INSERT INTO one_time_fees (college_id, fee_name, amount, purpose, status)
SELECT college_id, 'Caution Deposit (Refundable)', 5000, 'Refundable security deposit', 'Refundable' FROM colleges WHERE college_name = 'New Prince Shri Bhavani College of Engineering and Technology';

INSERT INTO one_time_fees (college_id, fee_name, amount, purpose, status)
SELECT college_id, 'Hostel Admission Fee', 5000, 'One-time hostel processing fee', 'Non-Refundable' FROM colleges WHERE college_name = 'New Prince Shri Bhavani College of Engineering and Technology';

-- Add Mess Fees (New Table)
INSERT INTO mess_fees (college_name, place, mess_type, fee_per_year) VALUES
('New Prince Shri Bhavani College of Engineering and Technology', 'Chennai', 'Veg', 45000),
('New Prince Shri Bhavani College of Engineering and Technology', 'Chennai', 'Non-Veg', 50000);
