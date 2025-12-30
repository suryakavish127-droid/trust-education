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
SELECT college_id, 'Boys Hostel', 'Non-AC', 45000, 35000, 80000 
FROM colleges WHERE college_name = 'Dhanalakshmi Srinivasan College' AND district = 'Tiruchirappalli' LIMIT 1;

INSERT INTO hostel_fees (college_id, hostel_type, room_type, fee_per_year, mess_fee, total_amount)
SELECT college_id, 'Girls Hostel', 'Non-AC', 45000, 35000, 80000 
FROM colleges WHERE college_name = 'Dhanalakshmi Srinivasan College' AND district = 'Tiruchirappalli' LIMIT 1;

INSERT INTO one_time_fees (college_id, fee_name, amount, purpose, status)
SELECT college_id, 'Admission Fee', 10000, 'Registration and Admin', 'Non-Refundable' 
FROM colleges WHERE college_name = 'Dhanalakshmi Srinivasan College' AND district = 'Tiruchirappalli' LIMIT 1;
