
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
 * @param queryString The query string to execute
 * @param onFinished The function to call when finished, returns an array containing the results
 * @param queryParams The parameters to the query
 */
dao.fetchDataString = function(queryString, onFinished, queryParams) {
    var conn = dao.connect();

    conn.on("connect", function() {

        var query;
        if (queryParams) {
            query = conn.query(queryString, queryParams);
        }
        else {
            query = conn.query(queryString);
        }

        var results = [];
        var ind = 0;

        query.on("result", function (res) {
            res.on("row", function (row) {
                results[ind++] = row;
            })
        });

        //when the query
        query.on("end", function () {
            conn.end();
            if (onFinished) {
                onFinished(results);
            }
        });
    });

    conn.on("error", function() {
        console.log("Error connecting to database");
    });

};

/** Fetches all reviews for the game with the specified name
 *
 * @param game The name of the game
 * @param onFinished Function to call with the results of the query
 */
dao.fetchGameReviewsByGame = function(game, onFinished) {
    dao.fetchDataString("SELECT * FROM mwcaisse_db.GAME_REVIEW WHERE UPPER(GAME) = UPPER(:game)", onFinished,
        {game : game} );
};

/** Fetches all of the hours played for the game with the specified name
 *
 * @param game The name of the game
 * @param onFinished The function to call with the results
 */
dao.fetchHoursPlayedByGame = function(game, onFinished) {
    dao.fetchDataString("SELECT * FROM mwcaisse_db.HOURS_PLAYED WHERE UPPER(GAME) = UPPER(:game)", onFinished,
        {game : game} );
};

/** Fetches the average spent data
 *
 * @param onFinished The function to call with the results when finished
 */
dao.fetchAverageSpent = function(onFinished) {
    dao.fetchDataString("SELECT * FROM mwcaisse_db.AVERAGE_SPENT", onFinished);
};

/** Fetches the data for the GameReviews Chart
 *
 * @param game The game to get the chart data for
 * @param onFinished The function to call when the results are ready
 */
dao.fetchGameReviewsChart = function(game, onFinished) {
    dao.fetchGameReviewsByGame(game, function(results) {
        var chartData = [];

        for (var i = 0; i < results.length; i++) {
            var value = results[i];
            var data = [];
            data[0] = value.COMPANY;
            data[1] = Number(value.SCORE);
            chartData[i] = data;
        }

        if (onFinished) {
            onFinished(chartData);
        }
    });
};


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

/** Exexcutes the specified insert command
 *
 * @param queryString The query string for the insert
 * @param queryParams The query params for the insert
 * @param onFinished The function to call when it is finished, with true / false as a parameter. True meaning successful
 */
dao.insertData = function(queryString, queryParams, onFinished) {
    var conn = dao.connect();

    conn.on("connect", function() {

        var query;
        if (queryParams) {
            query = conn.query(queryString, queryParams);
        }
        else {
            query = conn.query(queryString);
        }

        var results = [];
        var ind = 0;

        //when the query finishes successfully
        query.on("end", function () {
            conn.end();
            if (onFinished) {
                onFinished(true);
            }
        });

        //query finished with errors
        query.on("error", function() {
            conn.end();
            if (onFinished) {
                onFinished(false);
            }
        });
    });

    //connection finished with errors
    conn.on("error", function() {
        console.log("Error connecting to database");
        if (onFinished) {
            onFinished(false);
        }
    });
};

/** Inserts a Game Review into the database with the given game, score, and company
 *
 * @param game The game of the review
 * @param score The score of the review
 * @param company The company of the review
 * @param onFinished Function to call with the status of the insert, True if successful, false otherwise
 */
dao.insertGameReview = function(game, score, company, onFinished) {
    dao.insertData("INSERT INTO mwcaisse_db.GAME_REVIEW (GAME, SCORE, COMPANY)" +
    "VALUES (:game, :score, :company)", {game: game, score: score, company: company},
        onFinished);
};


/** Export the functions / object */
module.exports = dao;
