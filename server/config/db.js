require('dotenv').config(); // 맨 위에서 호출해야 함

const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port:process.env.DB_PORT || 3306
});

module.exports = pool;