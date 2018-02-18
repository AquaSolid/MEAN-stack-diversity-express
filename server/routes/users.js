var express = require('express');
var router = express.Router();

var mysql = require('mysql');




/* GET users listing. */
router.get('/', function(req, res, next) {

  var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    port: 3306, // default mysql port
    database: "mydb"
  });

  conn.connect((err) => {
    if (err) throw err;
    console.log("Connected!");
  });

  conn.query("SELECT * FROM users", (err, result, fields) => {
    if (err) throw err;
    res.send(result);
    res.end();
  });

  conn.end();
  //res.send('respond with a resourceeeee');
});

module.exports = router;

