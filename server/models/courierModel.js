const db = require('../config/db');

async function courierCompanyCodeSave(data) {
    const conn = await db.getConnection();
    const result = await conn.query(
        "INSERT INTO courierCompanyCode"+
        "(companyName, companyCode, international)"+
        "VALUES(?,?,?)",
        [
            data.companyName,
            data.companyCode,
            data.international,
        ]
    );
    conn.release();
    return result.affectedRows;
}

async function courierCode(data) {
    const conn = await db.getConnection();
    const result = await conn.query(
        "SELECT"+
            "companyCode"+
        "FROM courierCompanyCode"+
        "WHERE companyName=?",
        [
            data.companyName
        ]
    );
    conn.release();
    return result;
}

module.exports = {
    courierCode,
    courierCompanyCodeSave
}