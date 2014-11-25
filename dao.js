
var Client = require('mariasql');
var inspect = require('util').inspect;

/** The dao object */
var dao = new Object();

/** Creates a connection to the database
 *
 * @return The created client object
 */
dao.connect = function() {
    var client = new Client();

    client.connect({
        host: "localhost",
        user: "mwcaisse",
        password: "mwcaisse_pw"
    });

    return client;
};

/** Helper function for executing a simple sql SELECT
 *
 * @param conn The connection to the database
 * @param queryString The query string to execute
 * @param onFinished The function to call when finished, returns an array containing the results
 * @param queryParams The parameters to the query
 */
dao.fetchDataString = function(conn, queryString, onFinished, queryParams) {
    if (!conn.connected) {
        throw "Not connected to database!";
    }

    var query;
    if (queryParams) {
        query = conn.query(query, queryParams);
    }
    else {
        query = conn.query(query);
    }

    var results = [];
    var ind = 0;

    query.on("result", function(res) {
        res.on("row", function(row) {
            results[ind++] = inspect(row);
        })
    });

    //when the query
    query.on("end", function() {
        if (onFinished) {
            onFinished(results);
        }
    });
}

/** Fetches all reviews for the game with the specified name
 *
 * @param game The name of the game
 * @param onFinished Function to call with the results of the query
 */
dao.fetchGameReviewsByGame = function(game, onFinished) {
    dao.fetchDataString("SELECT * FROM mwcaisse_db.GAME_REVIEW WHERE UPPER(GAME) = UPPER(:game)", {game : game},
        onFinished);
}

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
