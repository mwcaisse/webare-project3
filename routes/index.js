var express = require('express');
var dao = require('../dao');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  dao.fetchTestData(res);
});

module.exports = router;
