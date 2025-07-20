const db = require('../config/db');

async function cartSave(data) {
    const conn = await db.getConnection();
    const result = await conn.query(
        "INSERT INTO cart("+
            "productId"+
            ", userId"+
            ", cnt"+
        ")VALUES(?,?,?)",
        [
            data.productId,
            data.userId,
            data.cnt
        ]
    );
    conn.release();
    return result.affectedRows;
}

async function cartList(data) {
    const conn = await db.getConnection();
    const result = await conn.query(
        "SELECT"+
            "c.productId"+
            ", c.userId"+
            ", c.cnt"+
            ", p.img"+
            ", p.price"+
            ", p.discount"+
            ", p.productName"+
        "FROM shopping.cart c"+
        "INNER JOIN shopping.products p"+
        "ON c.productId = p.productId"+
        "WHERE c.userId = ?",
        [
            data.userId
        ]
    );
    conn.release();
    return result;
}

async function cartDelete(data) {
    const conn = await db.getConnection();
    const result = await conn.query(
        "DELETE FROM cart"+
        "WHERE userId=? AND productId=?",
        [
            data.userId,
            data.productId
        ]
    );
    conn.release();
    return result.affectedRows;
}

async function tmpCartDelete(data) {
    const conn = await db.getConnection();
    const result = await conn.query(
        "DELETE FROM tmpCart"+
        "WHERE keyData=?",
        [
            data.keyData
        ]
    );
    conn.release();
    return result.affectedRows;
}

async function tmpCartSave(data) {
    const conn = await db.getConnection();
    const result = await conn.query(
        "INSERT INTO tmpCart("+
            "productId"+
            ", userId"+
            ", cnt"+
            ", keyData"+
        ")VALUES(?,?,?,?)",
        [
            data.productId,
            data.userId,
            data.cnt,
            data.keyData,
        ]
    );
    conn.release();
    return result.affectedRows;
}

async function tmpCartList(data) {
    const conn = await db.getConnection();
    
    const result = await conn.query(
        "SELECT "+
            "c.productId"+
            ", c.cnt"+
            ", p.img"+
            ", p.price"+
            ", p.discount"+
            ", p.productName"+
        " FROM shopping.tmpCart c"+
        " INNER JOIN shopping.products p"+
        " ON c.productId = p.productId"+
        " WHERE c.keyData = ?",
        [
            data.keyData
        ]
    );
    conn.release();
    return result;
}

module.exports = {
    cartSave,
    cartList,
    cartDelete,
    tmpCartDelete,
    tmpCartSave,
    tmpCartList,
}