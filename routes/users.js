var express = require('express');
var router = express.Router();


var conn = require('../connect')();
//var cors = require('cors');
var table = "users";

router.get('/', (req, res, next) => {
    var query = `SELECT * FROM ${table}`;
    console.log(query);

    conn.query(query, (err, result, fields) => {
        if (err) throw err;
        res.send(result);
    });
});

router.post('/post', (req, res) => {

    //console.log("Body: ", req.body);
    /**
     * Test Case:
     * {"user":{"name": "jack","email": "jack@gmail.com","password": "jackPass"}}
     * */

    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;

    var query = `INSERT INTO ${table} VALUES (null, "${name}", "${email}", "${password}")`;
    console.log(query);

    conn.query(query, (err, result, fields) => {
        if (err) throw err;
        res.send(result);
    });
});

router.get('/:search/', (req, res, next) => {

    var search = req.params.search;
    var query = "";

    if (isNaN(search)) {
        query = `SELECT * FROM ${table} WHERE name LIKE '%${search}%'`;
    } else {
        query = `SELECT * FROM ${table} WHERE id='${search}'`;
    }
    console.log(query);

    conn.query(query, (err, result, fields) => {
        if (err) throw err;
        res.send(result);
    });
});

module.exports = router;
