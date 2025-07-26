const db = require('../config/db');

async function commentSave(data) {
    const conn = await db.getConnection();
    const result = await conn.query(
        "INSERT INTO comments"+
            "(rating, content, title, productId, userId)"+
        ")VALUES(?,?,?,?,?)",
        [
            data.rating,
            data.content,
            data.title,
            data.productId,
            data.userId
        ]
    );
    conn.release();
    return result[0].affectedRows;
}

async function commentUpdate(data) {
    const conn = await db.getConnection();
    const result = await conn.query(
        "UPDATE comments"+
        "SET"+
            "rating=?"+
            ",content=?"+
            ",title=?"+
        "WHERE commentId=?",
        [
            data.rating,
            data.content,
            data.title,
            data.commentId
        ]
    );
    conn.release();
    return result[0].affectedRows;
}

async function productReview(data) {
    const conn = await db.getConnection();
    const result = await conn.query(
        "SELECT"+
            "a.commentId"+
            ",a.rating"+
            ",a.content"+
            ",a.title"+
            ",a.productId"+
            ",a.cdate"+
            ",b.avg"+
        "FROM comments a"+
        "INNER JOIN (SELECT AVG(rating) avg FROM comments) b"+
        "WHERE productId=?"+
        "limit ?,11",
        [
            data.productId,
            data.reviewStartNum
        ]
    );
    conn.release();
    return result;
}

async function productReview(data) {
    const conn = await db.getConnection();
    const result = await conn.query(
        "DELETE FROM comments"+
        "WHERE commentId=?",
        [
            data.commentId
        ]
    );
    conn.release();
    return result[0].affectedRows;
}

module.exports = {
    commentSave,
    commentUpdate,
    productReview,
}