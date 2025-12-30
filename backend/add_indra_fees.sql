-- Add Fees for Indra Ganesan Institutions

-- Clear existing Indra Ganesan fees (if any, though we found none)
DELETE hf FROM hostel_fees hf
INNER JOIN colleges c ON hf.college_id = c.college_id
WHERE c.college_name = 'Indra Ganesan Institutions';

DELETE otf FROM one_time_fees otf
INNER JOIN colleges c ON otf.college_id = c.college_id
WHERE c.college_name = 'Indra Ganesan Institutions';

-- Re-insert Hostel Fees for ALL college_ids
INSERT INTO hostel_fees (college_id, hostel_type, room_type, fee_per_year, mess_fee, total_amount)
SELECT college_id, 'Boys Hostel', 'Standard', 65000, 0, 65000 
FROM colleges WHERE college_name = 'Indra Ganesan Institutions';

INSERT INTO hostel_fees (college_id, hostel_type, room_type, fee_per_year, mess_fee, total_amount)
SELECT college_id, 'Girls Hostel', 'Standard', 60000, 0, 60000 
FROM colleges WHERE college_name = 'Indra Ganesan Institutions';

-- Re-insert One-Time Fees for ALL college_ids
INSERT INTO one_time_fees (college_id, fee_name, amount, purpose, status)
SELECT college_id, 'Admission Fee', 15000, 'One-time admission processing fee', 'Non-Refundable' 
FROM colleges WHERE college_name = 'Indra Ganesan Institutions';

INSERT INTO one_time_fees (college_id, fee_name, amount, purpose, status)
SELECT college_id, 'Amenities Fee', 10000, 'Campus amenities and facilities', 'Non-Refundable' 
FROM colleges WHERE college_name = 'Indra Ganesan Institutions';
