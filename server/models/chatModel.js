const db = require('../config/db');

async function chatSave(data) {
    const conn = await db.getConnection();
    const result = await conn.query(
        "INSERT INTO chat_history("+
            "message"+
            ", sender"+
            ", userId"+
        ")VALUES(?,?,?)",
        [
            data.message,
            data.sender,
            data.userId
        ]
    );
    conn.release();
    return result.affectedRows;
}

async function chatList(data) {
    const conn = await db.getConnection();
    const result = await conn.query(
        "SELECT"+
            "message"+
            ", sender"+
        "FROM chat_history"+
        "WHERE userId=? AND cdate >= date_add(now(), interval -7 day)",
        [
            data.userId
        ]
    );
    conn.release();
    return result;
}

module.exports = {
    chatList,
    chatSave
}