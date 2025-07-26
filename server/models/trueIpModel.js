const db = require('../config/db');

async function ipSave(data) {
    const conn = await db.getConnection();
    const result = await conn.query(
        "INSERT INTO trueIp(ip)VALUES(?);",
        [
            data.ip
        ]
    );
    conn.release();
    return result[0].affectedRows;
}

async function ipCheck() {
    const conn = await db.getConnection();
    const result = await conn.query(
        "SELECT"+
            "count(*)"+
        "FROM trueIp"+
        "WHERE ip=?",
        [
            data.ip
        ]
    );
    conn.release();
    return result;
}

async function ipList(data) {
    const conn = await db.getConnection();
    const result = await conn.query(
        "SELECT"+
            "ip"+
        "FROM trueIp"+
        "limit ?, 5",
        [
            data.start
        ]
    );
    conn.release();
    return result;
}

async function ipUpdate(data) {
    const conn = await db.getConnection();
    const result = await conn.query(
        "UPDATE trueIp"+
        "SET ip = ?"+
        "WHERE ip=?",
        [
            data.ip,
        ]
    );
    conn.release();
    return result[0].affectedRows;
}

async function ipDelete(data) {
    const conn = await db.getConnection();
    const result = await conn.query(
        "DELETE FROM trueIp"+
        "WHERE ip=?;",
        [
            data.ip,
        ]
    );
    conn.release();
    return result[0].affectedRows;
}

module.exports = {
    ipSave,
    ipCheck,
    ipDelete,
    ipList,
    ipSave,
    ipUpdate
}