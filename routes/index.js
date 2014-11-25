var express = require('express');
var dao = require('../dao');
var router = express.Router();

/** GET home page */
router.get('/dashboard.html', function(req, res) {
    res.render("dashboard", { title: "Video Game Reviews"});
});

/* GET second container page */
router.get('/containertwo', function(req, res) {
  dao.fetchAllGames(function(results) {
    res.render("containertwo", {games: results});
  });
});

/* GET third container page */
router.get('/containerthree', function(req, res) {
  res.render("containerthree");
});

/* GET test data page. */
router.get('/test', function(req, res) {
  dao.fetchTestData(res);
});

/* GET reviews for a game */
router.get("/reviews", function(req, res) {
  var game = req.param('game', "");
  dao.fetchGameReviewsByGame(game, function(results) {
    res.json(results);
  });
});

/** GET Hours Played */
router.get("/hours", function(req, res) {
  var game = req.param("game", "");
  dao.fetchHoursPlayedByGame(game, function(results) {
    res.json(results);
  });
});

/** GET Average Spent */
router.get("/spent", function(req, res) {
  dao.fetchAverageSpent(function(results) {
    res.json(results);
  });
});

/** GET chart data for reviews */
router.get("/chart/reviews", function(req, res) {
  var game = req.param("game", "");
  dao.fetchGameReviewsChart(game, function(chartData) {
    res.json(chartData);
  });
});

/** GET chart data for hours played */
router.get("/chart/hours", function(req, res) {
  var player = req.param("player", "");
  dao.fetchHoursPlayedChart(player, function(chartData) {
    res.json(chartData);
  });
});

/** Get a list of all games */
router.get("/game/all", function(req, res) {
  dao.fetchAllGames(function (results) {
    res.json(results);
  });
});

/** Get a list of all players */
router.get("/player/all", function(req, res) {
  dao.fetchAllPlayers(function(results) {
    res.json(results);
  });
});

/** Create a new review */
router.post("/create/review", function(req, res) {
  var game = req.body.game;
  var score = req.body.score;
  var company = req.body.company;

  dao.insertGameReview(game, score, company, function(success) {
    if (success) {
      res.redirect("/dashboard.html");
    }
    else {
      res.send(500);
    }
  });
});


module.exports = router;
