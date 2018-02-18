var express = require('express');
var router = express.Router();

var conn = require('../connect')();
var cors = require('cors');
var table = "photos";

/* GET users listing. */
router.get('/', cors(), function (req, res, next) {

    conn.query("SELECT * FROM photos LIMIT 100", (err, result, fields) => {
        if (err) throw err;
        res.send(result);

    });
    //res.send('respond with a resource');
});
router.get('/:search/', cors(), function (req, res, next) {

    var search = req.params.search;

    var query = "";
    if (!isNaN(search))
        query = "SELECT * FROM photos WHERE `id`='" + search + "'";
    conn.query(query, (err, result, fields) => {
        if (err) throw err;
        /*http.get("http://localhost:3000/users/"+result[0].author, result => {
            let body = "";
            result.on("data", data => {
                body += data;
            });
            result.on("end", () => {
                response += JSON.parse(body); console.log("chekor2");
            }); 
        });*/
        res.send(result);

    });

});

module.exports = router;
