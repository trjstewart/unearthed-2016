var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

//Models import
var Drum = mongoose.model('Drum');
var Sample = mongoose.model('Sample');


// GET for fetching next sample id
router.get('/sample/id', function(req, res, next) {

  return res.json({});
});


// GET for fetching sample by id
router.get('/sample/:id', function(req, res, next) {
  return res.json({});
});


// POST for creating sample
router.post('/sample/create', function(req, res, next) {

  return res.json({});
});

// POST for updating sample
router.post('/sample/update/:id', function(req, res, next) {

  return res.json({});
});

/*
// POST for updating sample at analyst
router.post('/sample/update/analyst/:id', function(req, res, next) {

  return res.json({});
});
*/

// GET for updating drum
router.get('/drum/:id', function(req, res, next) {

  return res.json({});
});


// POST for starting drums trip
router.post('/drum/start/:id', function(req, res, next) {

  return res.json({});
});


// POST for updating drum
router.post('/drum/update/:id', function(req, res, next) {

  return res.json({});
});


module.exports = router;
