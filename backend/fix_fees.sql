-- Fix for Hostel Fees and One-Time Fees Display Issue
-- This script removes existing fees and re-inserts them for ALL college_ids

-- Clear existing Dhanalakshmi Srinivasan fees
DELETE hf FROM hostel_fees hf
INNER JOIN colleges c ON hf.college_id = c.college_id
WHERE c.college_name LIKE '%Dhanalakshmi Srinivasan%';

DELETE otf FROM one_time_fees otf
INNER JOIN colleges c ON otf.college_id = c.college_id
WHERE c.college_name LIKE '%Dhanalakshmi Srinivasan%';

-- Re-insert Hostel Fees for ALL college_ids (no LIMIT 1)
INSERT INTO hostel_fees (college_id, hostel_type, room_type, fee_per_year, mess_fee, total_amount)
SELECT college_id, 'Boys Hostel', 'Standard', 85000, 0, 85000 
FROM colleges WHERE college_name = 'Dhanalakshmi Srinivasan Engineering College' AND district = 'Perambalur';

INSERT INTO hostel_fees (college_id, hostel_type, room_type, fee_per_year, mess_fee, total_amount)
SELECT college_id, 'Girls Hostel', 'Standard', 80000, 0, 80000 
FROM colleges WHERE college_name = 'Dhanalakshmi Srinivasan Engineering College' AND district = 'Perambalur';

INSERT INTO hostel_fees (college_id, hostel_type, room_type, fee_per_year, mess_fee, total_amount)
SELECT college_id, 'Boys Hostel', 'Standard', 90000, 0, 90000 
FROM colleges WHERE college_name = 'Dhanalakshmi Srinivasan Medical College and Hospital' AND district = 'Perambalur';

INSERT INTO hostel_fees (college_id, hostel_type, room_type, fee_per_year, mess_fee, total_amount)
SELECT college_id, 'Girls Hostel', 'Standard', 90000, 0, 90000 
FROM colleges WHERE college_name = 'Dhanalakshmi Srinivasan Medical College and Hospital' AND district = 'Perambalur';

INSERT INTO hostel_fees (college_id, hostel_type, room_type, fee_per_year, mess_fee, total_amount)
SELECT college_id, 'Boys Hostel', 'Standard', 80000, 0, 80000 
FROM colleges WHERE college_name = 'Dhanalakshmi Srinivasan College of Engineering' AND district = 'Tiruchirappalli';

INSERT INTO hostel_fees (college_id, hostel_type, room_type, fee_per_year, mess_fee, total_amount)
SELECT college_id, 'Girls Hostel', 'Standard', 75000, 0, 75000 
FROM colleges WHERE college_name = 'Dhanalakshmi Srinivasan College of Engineering' AND district = 'Tiruchirappalli';

INSERT INTO hostel_fees (college_id, hostel_type, room_type, fee_per_year, mess_fee, total_amount)
SELECT college_id, 'Boys Hostel', 'Standard', 70000, 0, 70000 
FROM colleges WHERE college_name = 'Dhanalakshmi Srinivasan Arts and Science College' AND district = 'Tiruchirappalli';

INSERT INTO hostel_fees (college_id, hostel_type, room_type, fee_per_year, mess_fee, total_amount)
SELECT college_id, 'Girls Hostel', 'Standard', 70000, 0, 70000 
FROM colleges WHERE college_name = 'Dhanalakshmi Srinivasan Arts and Science College' AND district = 'Tiruchirappalli';

-- Re-insert One-Time Fees for ALL college_ids (no LIMIT 1)
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
