var express = require('express');
var router = express.Router();

var conn = require('../connect')();

var table = "users";

/*
router.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
*/

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

        query = `SELECT * FROM ${table} WHERE name LIKE '%${name}%' AND email LIKE '${email}'`;
        conn.query(query, (err, result, fields) => {
            if (err) throw err;
            res.send(result[result.length - 1]);
        });
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
