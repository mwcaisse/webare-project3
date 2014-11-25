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

module.exports = router;
