const db = require('./config/db');

async function updateFees() {
    try {
        // Using fee_per_year as identified in the schema
        const sql = `
            UPDATE hostel_fees
            SET 
                mess_fee = ROUND(fee_per_year * 0.40),
                total_amount = fee_per_year + ROUND(fee_per_year * 0.40)
        `;

        const [result] = await db.query(sql);
        console.log(`Successfully updated ${result.affectedRows} records in hostel_fees.`);
        process.exit(0);
    } catch (err) {
        console.error('Update failed:', err.message);
        process.exit(1);
    }
}

updateFees();
