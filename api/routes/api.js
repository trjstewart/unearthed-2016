var express = require('express');
var router = express.Router();

// Get for /api/users
router.get('/users', function(req, res, next) {
  res.send('respond with a resource');
});



// Get for /api/
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});





module.exports = router;
