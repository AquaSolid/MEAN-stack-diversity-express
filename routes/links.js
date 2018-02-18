var express = require('express');
var router = express.Router();

var conn = require('../connect')();
var http = require('http');

/* GET users listing. */
router.get('/', function (req, res, next) {

    conn.query("SELECT * FROM links LIMIT 100", (err, result, fields) => {
        if (err) throw err;
        res.send(result);

    });
    //res.send('respond with a resource');
});
router.get('/a/:searchByPhoto/', function (req, res, next) {

    var search = req.params.searchByPhoto;

    var query = "";
    if (!isNaN(search))
        query = "SELECT * FROM links WHERE `photoId`='" + search + "'";
    conn.query(query, (err, result, fields) => {
        if (err) throw err;
        
        res.send(result);

    });

});
router.get('/p/:searchByAlbum/', function (req, res, next) {

    var search = req.params.searchByAlbum;

    var query = "";
    if (!isNaN(search))
        query = "SELECT * FROM links WHERE `albumId`='" + search + "'";
    conn.query(query, (err, result, fields) => {
        if (err) throw err;

        res.send(result);

    });

});

module.exports = router;
