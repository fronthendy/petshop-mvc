var express = require('express');
var router = express.Router();

/* http://localhost:3000/users/inicio */
router.get('/inicio', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
