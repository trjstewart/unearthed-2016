var express = require('express');
var router = express.Router();


// Get for /api/test
router.get('/test', function(req, res, next) {

  return res.json({
    test: "true"
  });

});




module.exports = router;
