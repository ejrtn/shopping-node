const db = require('../config/db');

async function productSave(data) {
    const conn = await db.getConnection();
    const result = await conn.query(
        "INSERT INTO products("+
            "productName"+
            ", price"+
            ", category"+
            ", explanation"+
            ", productId"+
            ", img"+
            ", discount"+
            ", smallCategory"+
            ", cnt"+
        ")VALUES(?,?,?,?,?,?,?,?,?);",
        [
            data.productName,
            data.price,
            data.category,
            data.explanation,
            data.productId,
            data.img,
            data.discount,
            data.smallCategory,
            data.cnt
        ]
    );
    conn.release();
    return result.affectedRows;
}

async function productTotal() {
    const conn = await db.getConnection();
    const result = await conn.query(
        "SELECT"+
            "count(*)"+
        "FROM products",
    );
    conn.release();
    return result;
}

async function productList(data) {
    const conn = await db.getConnection();
    const result = await conn.query(
        "SELECT"+
            "productName"+
            ", price"+
            ", category"+
            ", explanation"+
            ", productId"+
            ", saleYn"+
            ", img"+
            ", discount"+
            ", numberOfSalse"+
            ", smallCategory"+
            ", cnt"+
        "FROM products"+
        "limit ?, 5",
        [
            data.start
        ]
    );
    conn.release();
    return result;
}

async function productUpdate(data) {
    const conn = await db.getConnection();
    const result = await conn.query(
        "UPDATE products"+
        "SET"+
            ", productName = ?"+
            ", price = ?"+
            ", category = ?"+
            ", explanation = ?"+
            ", img = ?"+
            ", discount = ?"+
            ", numberOfSalse = ?"+
            ", smallCategory = ?"+
            ", cnt = ?"+
        "WHERE productId=?",
        [
            data.productName,
            data.price,
            data.category,
            data.explanation,
            data.img,
            data.discount,
            data.numberOfSalse,
            data.smallCategory,
            data.cnt,
            data.productId,
        ]
    );
    conn.release();
    return result.affectedRows;
}

async function productDelete(data) {
    const conn = await db.getConnection();
    const result = await conn.query(
        "DELETE FROM products"+
        "WHERE productId=?;",
        [
            data.productId,
        ]
    );
    conn.release();
    return result.affectedRows;
}

async function top10() {
    const conn = await db.getConnection();
    const result = await conn.query(
        "SELECT"+
            "category"+
            ", productName"+
            ", productId"+
            ", price"+
            ", img"+
            ", ranking"+
            ", discount"+
        "FROM ("+
            "SELECT"+
                "category"+
                ", productName"+
                ", productId"+
                ", price"+
                ", img"+
                ", discount"+
                ", RANK() OVER(PARTITION BY category ORDER BY numberOfSalse DESC, productId DESC) ranking"+
            "FROM products"+
        ") a"+
        "WHERE a.ranking &lt;= 10;",
    );
    conn.release();
    return result;
}

async function listAll(data) {
    const conn = await db.getConnection();
    const result = await conn.query(
        "SELECT"+
            "productName"+
            ", productId"+
            ", price"+
            ", img"+
            ", discount"+
        "FROM products"+
        "WHERE category=#{category}"+
        data.smallCategory != null ? " and smallCategory="+data.smallCategory+"" : ""+
        "LIMIT #{},11",
        [
            data.category,
            data.startNum
        ]
    );
    conn.release();
    return result;
}

async function getProduct(data) {
    const conn = await db.getConnection();
    const result = await conn.query(
        "SELECT"+
            "productName"+
            ", concat(category,'-',smallCategory) AS category"+
            ", productId"+
            ", price"+
            ", img"+
            ", discount"+
            ", cnt"+
        "FROM products"+
        "WHERE productId = #{}",
        [
            data.productId,
        ]
    );
    conn.release();
    return result;
}

module.exports = {
    getProduct,
    productList,
    productDelete,
    listAll,
    productSave,
    productTotal,
    productUpdate,
    top10
}