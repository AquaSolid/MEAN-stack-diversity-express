module.exports = function () {
    var mysql = require('mysql');
    var conn = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "password",
        port: 3306, // default mysql port
        database: "mydb"
    });
    return conn;
};