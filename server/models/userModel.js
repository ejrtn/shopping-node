const db = require('../config/db');

async function userSave(data) {
    const conn = await db.getConnection();
    const result = await conn.query(
        "INSERT INTO user ("+
            "name"+
            ", userId"+
            ", postcode"+
            ", address"+
            ", detailAddress"+
            ", extraAddress"+
            ", phonNumber"+
            ", gender"+
            ", password"+
            ", yyyymmdd"+
            ", email"+
            ", partnerUserId"+
        ")VALUES(?,?,?,?,?,?,?,?,?,?,?,?)",
        [
            data.name
            , data.userId
            , data.address
            , data.postcode
            , data.address
            , data.detailAddress
            , data.extraAddress
            , data.gender
            , data.password
            , data.yyyymmdd
            , data.email
            , data.partnerUserId
        ]
    );
    conn.release();
    return result[0].affectedRows;
}

async function userDelete(data) {
    const conn = await db.getConnection();
    const result = await conn.query(
        "UPDATE user"+
        "SET deleteYn='Y'"+
        "WHERE userId=?",
        [
            data.userId
        ]
    );
    conn.release();
    return result[0].affectedRows;
}

async function login(data) {
    const conn = await db.getConnection();
    const result = await conn.query(
        "SELECT"+
            " count(*) AS cnt"+
        " FROM user"+
        " WHERE userId=? AND password=?",
        [
            data.userId,
            data.password
        ]
    );
    conn.release();
    return result;
}

async function passwordUpdate(data) {
    const conn = await db.getConnection();
    const result = await conn.query(
        "UPDATE user"+
        "SET password=?"+
        "WHERE userId=? AND password=? AND deleteYn = 'N'",
        [
            data.newPassword,
            data.userId,
            data.password
        ]
    );
    conn.release();
    return result[0].affectedRows;
}

async function passwordUpdate2(data) {
    const conn = await db.getConnection();
    const result = await conn.query(
        "UPDATE user"+
        "SET password=?"+
        "WHERE userId=? AND deleteYn = 'N'",
        [
            data.newPassword,
            data.userId
        ]
    );
    conn.release();
    return result[0].affectedRows;
}

async function findId(data) {
    const conn = await db.getConnection();
    const result = await conn.query(
        "SELECT"+
            "userId"+
        "FROM user"+
        "WHERE name=? AND email=?",
        [
            data.name,
            data.email
        ]
    );
    conn.release();
    return result;
}

async function findPassword(data) {
    const conn = await db.getConnection();
    const result = await conn.query(
        "SELECT"+
            "CASE"+
                "WHEN COUNT(*) >= 1 THEN HEX(RAND()*0xFFFFFFFF)"+
                "ELSE '0'"+
            "END result"+
        "FROM user"+
        "WHERE name=? AND email=? AND userId=?",
        [
            data.name,
            data.email,
            data.userId
        ]
    );
    conn.release();
    return result;
}

async function idDoubleCheck(data) {
    const conn = await db.getConnection();
    const result = await conn.query(
        "SELECT"+
            "COUNT(*)"+
        "FROM user"+
        "WHERE userId=?",
        [
            data.userId
        ]
    );
    conn.release();
    return result;
}

async function getUser(data) {
    const conn = await db.getConnection();
    const result = await conn.query(
        "SELECT"+
            "name"+
            ", userId"+
            ", address"+
            ", phonNumber"+
            ", gender"+
            ", password"+
            ", yyyymmdd"+
            ", email"+
            ", deleteYn"+
            ", postcode"+
            ", detailAddress"+
            ", extraAddress"+
            ", partnerUserId"+
        "FROM user"+
        "WHERE userId=?",
        [
            data.userId
        ]
    );
    conn.release();
    return result;
}

async function chatInfo(data) {
    const conn = await db.getConnection();
    const result = await conn.query(
        "SELECT"+
            "concat(name,'(',userId,')') AS name_id"+
        "FROM user"+
        "WHERE userId=?",
        [
            data.userId
        ]
    );
    conn.release();
    return result;
}

async function userList(data) {
    const conn = await db.getConnection();
    const result = await conn.query(
        "SELECT"+
            "name"+
            ", userId"+
            ", address"+
            ", phonNumber"+
            ", gender"+
            ", password"+
            ", yyyymmdd"+
            ", email"+
            ", deleteYn"+
            ", postcode"+
            ", detailAddress"+
            ", extraAddress"+
            ", partnerUserId"+
        "FROM user"+
        "limit ?,21",
        [
            data.start
        ]
    );
    conn.release();
    return result;
}

async function userUpdate(data) {
    const conn = await db.getConnection();
    const result = await conn.query(
        "UPDATE user"+
        "SET"+
            "address=?"+
            ",phonNumber=?"+
            ",gender=?"+
            ",password=?"+
            ",yyyymmdd=?"+
            ",email=?"+
            ",deleteYn=?"+
            ",postcode=?"+
            ",detailAddress=?"+
            ",extraAddress=?"+
        "FROM user"+
        "limit ?,21",
        [
            data.address,
            data.phonNumber,
            data.gender,
            data.password,
            data.yyyymmdd,
            data.email,
            data.deleteYn,
            data.postcode,
            data.detailAddress,
            data.extraAddress,
        ]
    );
    conn.release();
    return result[0].affectedRows;
}

module.exports = {
    chatInfo,
    findId,
    findPassword,
    getUser,
    idDoubleCheck,
    login,
    passwordUpdate,
    passwordUpdate2,
    userDelete,
    userList,
    userSave,
    userUpdate
}