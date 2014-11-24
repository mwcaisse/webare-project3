
var Client = require('mariasql');
var inspect = require('util').inspect;

/** The dao object */
var dao = new Object();

dao.me = "HelloWorld";

dao.fetchTestData = function(out) {
    var results = [];
    var c = new Client();
    var ind = 0;

    c.connect({
        host: "localhost",
        user: "mwcaisse",
        password: "mwcaisse_pw"
    });

    c.on("connect", function() {
        console.log("Connected to database");
    });

    c.query("SELECT * FROM mwcaisse_db.TEST")
    .on("result", function (res) {
        console.log("Got results: " + res);
        res.on("row", function(row) {
            console.log("Row: " + inspect(row));
            results[ind++] = inspect(row);
        });
    })
    .on("end", function () {
        out.json(results);
    });

    c.end();

    console.log("Fetch Returning");

    return results;
};



/** Export the functions / object */
module.exports = dao;
