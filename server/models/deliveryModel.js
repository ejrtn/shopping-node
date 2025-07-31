const db = require('../config/db');

async function deliverySave(data) {
    const conn = await db.getConnection();
    const [rows] = await conn.query('SELECT NEXT VALUE FOR sq_delivery AS seq')
    const seq = rows[0].seq
    const result = await conn.query(
        "INSERT INTO deliveryList("+
            "address"+
            ", totalAmount"+
            ", userId"+
            ", name"+
            ", phon"+
            ", request"+
            ", quantity"+
            ", tid"+
            ", deliveryId"+
        ")VALUES(?,?,?,?,?,?,?,?,?);",
        [
            data.address,
            data.totalAmount,
            data.userId,
            data.name,
            data.phon,
            data.request,
            data.quantity,
            data.tid,
            seq
        ]
    );
    conn.release();
    result
    return seq;
}

async function deliveryList(data) {
    const conn = await db.getConnection();
    const result = await conn.query(
        "SELECT"+
            " a.deliveryId"+
            ", a.address"+
            ", a.totalAmount"+
            ", a.userId"+
            ", DATE_FORMAT(a.cdate,'%Y-%m-%d %H:%i:%s') cdate"+
            ", a.status"+
            ", a.name"+
            ", a.phon"+
            ", a.request"+
            ", a.quantity"+
            ", a.tid"+
            ", a.trackingCode"+
            ", a.companyName"+
            ", count(*) as kindCnt"+
        " FROM deliveryList a"+
        " INNER JOIN deliveryDetail b"+
        " ON a.deliveryId = b.deliveryId"+
        " WHERE a.userId=?"+
        " GROUP BY b.deliveryId"+
        " LIMIT ?,11",
        [
            data.userId,
            data.start,
        ]
    );
    conn.release();
    return result;
}

async function getDelivery(data) {
    const conn = await db.getConnection();
    const result = await conn.query(
        "SELECT"+
            " deliveryId"+
            ", address"+
            ", totalAmount"+
            ", userId"+
            ", DATE_FORMAT(cdate,'%Y-%m-%d %H:%i:%s') cdate"+
            ", status"+
            ", name"+
            ", phon"+
            ", request"+
            ", quantity"+
            ", tid"+
        " FROM deliveryList"+
        " WHERE deliveryId=?",
        [
            data.deliveryId,
        ]
    );
    conn.release();
    return result;
}

async function deliveryStatusUpdate(data) {
    const conn = await db.getConnection();
    const result = await conn.query(
        "UPDATE deliveryList"+
        " SET"+
            " status=?"+
        " WHERE tid=?",
        [
            data.status,
            data.tid
        ]
    );
    conn.release();
    return result[0].affectedRows;
}

async function deliveryRepay(data) {
    const conn = await db.getConnection();
    const result = await conn.query(
        "UPDATE deliveryList"+
        " SET"+
            "tid=?"+
        " WHERE tid=?",
        [
            data.newTid,
            data.tid
        ]
    );
    conn.release();
    return result[0].affectedRows;
}

async function deliveryDetailSave(data) {
    const conn = await db.getConnection();

    const result = await conn.query(
        "INSERT INTO deliveryDetail("+
            "productId"+
            ", cnt"+
            ", img"+
            ", price"+
            ", discount"+
            ", productName"+
            ", deliveryId"+
        ")VALUES(?,?,?,?,?,?,?)",
        [
            data.productId,
            data.cnt,
            data.img,
            data.price,
            data.discount,
            data.productName,
            data.deliveryId,
        ]
    );
    conn.release();
    return result[0].affectedRows;
}

async function deliveryDetailList(data) {
    const conn = await db.getConnection();
    const result = await conn.query(
        "SELECT"+
            " productId"+
            ", cnt"+
            ", img"+
            ", price"+
            ", discount"+
            ", productName"+
            ", deliveryId"+
        " FROM deliveryDetail"+
        " WHERE deliveryId=?",
        [
            data.deliveryId,
        ]
    );
    conn.release();
    return result;
}

async function deliveryDetailCommentsList(data) {
    const conn = await db.getConnection();
    const result = await conn.query(
        "SELECT"+
            " a.productId"+
            ", a.cnt"+
            ", a.img"+
            ", a.price"+
            ", a.discount"+
            ", a.productName"+
            ", a.deliveryId"+
            ", b.commentId"+
            ", b.rating"+
            ", b.content"+
            ", b.title"+
            ", b.userId"+
        " FROM deliveryDetail a"+
        " LEFT OUTER JOIN comments b"+
        " ON a.productId = b.productId"+
        " WHERE (a.deliveryId=?)"+
        " OR (b.userId = ? AND a.productId=?)",
        [
            data.deliveryId,
            data.userId,
            data.deliveryId
        ]
    );
    conn.release();
    return result;
}

async function deliveryAddressSave(data) {
    const conn = await db.getConnection();
    const [rows] = await conn.query('SELECT NEXT VALUE FOR sq_address AS seq')
    const seq = rows[0].seq
    const result = await conn.query(
        "INSERT INTO deliveryAddressList("+
            "userId"+
            ", name"+
            ", postcode"+
            ", address"+
            ", detailAddress"+
            ", extraAddress"+
            ", phon"+
            ", defaultYn"+
            ", deliveryAddressId"+
        ")VALUES(?,?,?,?,?,?,?,?,?);"+
        "",
        [
            data.userId,
            data.name,
            data.postcode,
            data.address,
            data.detailAddress,
            data.extraAddress,
            data.phon,
            data.defaultYn,
            seq
        ]
    );
    conn.release();
    result
    return seq;
}

async function deliveryAddressChange(data) {
    const conn = await db.getConnection();
    console.log(data)
    const result = await conn.query(
        "UPDATE deliveryAddressList"+
        " SET"+
            " name=?"+
            ", postcode=?"+
            ", address=?"+
            ", detailAddress=?"+
            ", extraAddress=?"+
            ", phon=?"+
            ", defaultYn=?"+
        " WHERE deliveryAddressId=?",
        [
            data.name,
            data.postcode,
            data.address,
            data.detailAddress,
            data.extraAddress,
            data.phon,
            data.defaultYn,
            data.deliveryAddressId
        ]
    );
    conn.release();
    return result[0].affectedRows;
}

async function deliveryAddressChangeDefaultYn(data) {
    const conn = await db.getConnection();
    const result = await conn.query(
        "UPDATE deliveryAddressList"+
        " SET defaultYn = 'N'"+
        " WHERE userId=?",
        [
            data.userId,
        ]
    );
    conn.release();
    console.log(result)
    return result[0].affectedRows;
}

async function deliveryAddressList(data) {
    const conn = await db.getConnection();
    const result = await conn.query(
        "SELECT"+
            " userId"+
            ", name"+
            ", postcode"+
            ", address"+
            ", detailAddress"+
            ", extraAddress"+
            ", phon"+
            ", defaultYn"+
            ", deliveryAddressId"+
        " FROM deliveryAddressList"+
        " WHERE userId=?"+
        " ORDER BY defaultYn desc",
        [
            data.userId,
        ]
    );
    conn.release();
    return result;
}

async function deliveryAddressOne(data) {
    const conn = await db.getConnection();
    const result = await conn.query(
        "SELECT"+
            " userId"+
            ", name"+
            ", postcode"+
            ", address"+
            ", detailAddress"+
            ", extraAddress"+
            ", phon"+
            ", defaultYn"+
            ", deliveryAddressId"+
        " FROM deliveryAddressList"+
        " WHERE deliveryAddressId=?",
        [
            data.deliveryAddressId,
        ]
    );
    conn.release();
    return result;
}

async function deliveryAddressDefault(data) {
    const conn = await db.getConnection();
    const result = await conn.query(
        "SELECT"+
            " userId"+
            ", name"+
            ", postcode"+
            ", address"+
            ", detailAddress"+
            ", extraAddress"+
            ", phon"+
            ", defaultYn"+
            ", deliveryAddressId"+
        " FROM deliveryAddressList"+
        " WHERE userId=? AND defaultYn='Y'",
        [
            data.userId,
        ]
    );
    conn.release();
    return result;
}

async function deliveryAddressDelete(data) {
    const conn = await db.getConnection();
    const result = await conn.query(
        "DELETE FROM deliveryAddressList"+
        " WHERE deliveryAddressId=?",
        [
            data.deliveryAddressId,
        ]
    );
    conn.release();
    return result[0].affectedRows;
}

module.exports = {
    deliverySave,
    deliveryAddressChange,
    deliveryAddressChangeDefaultYn,
    deliveryAddressDefault,
    deliveryAddressDelete,
    deliveryAddressList,
    deliveryAddressOne,
    deliveryAddressSave,
    deliveryDetailCommentsList,
    deliveryDetailList,
    deliveryDetailSave,
    deliveryList,
    deliveryRepay,
    deliverySave,
    deliveryStatusUpdate,
    getDelivery
}