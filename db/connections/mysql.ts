const mysql = require("mysql2");
const mysqlPool = mysql.createPool({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Platan123",
    database: "maskalukas"
});

module.exports = mysqlPool;
