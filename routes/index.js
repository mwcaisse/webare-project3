var express = require('express');
var dao = require('../dao');
var router = express.Router();

/** GET home page */
router.get('/dashboard.html', function(req, res) {
    res.render("dashboard", { title: "Video Game Reviews"});
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

module.exports = router;
