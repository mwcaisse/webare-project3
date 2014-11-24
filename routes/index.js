var express = require('express');
var dao = require('../dao');
var router = express.Router();

/** GET home page */
router.get('/', function(req, res) {
    res.render("dashboard", {});
});

/* GET test data page. */
router.get('/test', function(req, res) {
  dao.fetchTestData(res);
});

module.exports = router;
