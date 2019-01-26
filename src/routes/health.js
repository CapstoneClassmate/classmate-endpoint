var express = require('express');
var router = express.Router();

router.get('/version', function (req, res, next) {
  res.send('0.1');
});


module.exports = router;