var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

//Models import
var Drum = mongoose.model('Drum');
var Sample = mongoose.model('Sample');

var id = 1;

// GET for fetching next sample id
router.get('/sample/id', function(req, res, next) {
  var thisId = id.toString();
  while(thisId.length < 4){
    thisId = '0' + thisId;
  }
  res.json({status : 200, response : {id : thisId}});
  id++;
});


// GET for fetching sample by id
router.get('/sample/:id', function(req, res, next) {

  var id = req.params.id;

  Drum.find({ "info.samples.sampleId" : id }, function(err, drum) {

    if(err) {
      return res.json({
        status: 500
      });
    }

    //Get sample and return it
    for(var i = 0; i < drum.info.samples.length; i++) {
      var sample = drum.info.samples[i];
      if( sample.sampleId === id) {

        return res.json({
          status: 200,
          response: sample
        });

      }
    }

  });
});

// POST for updating sample
router.post('/sample/update/:id', function(req, res, next) {

  return res.json({});
});

router.get('/drum/all', function(req, res, next){
  var drumList = [];
  Drum.find({}, function(err, drums){
    if (err) return res.json({status: 500}).end();
    for (var i = 0; i < drums.length; i++){
      drumList.append(drums[i].info.drumId);
    }
    if (drumList.length > 0) {
      res.json({status: 200, response: drumList});
    } else {
      res.json({status: 404, response : {message : "No Drums Found."}})
    }
  });
});

// GET for updating drum
router.get('/drum/:id', function(req, res) {

  Drum.findOne({ drumId: req.params.id }, function(err, drum) {

    if(err) {
      return res.json({
        status: 500,
        response: {}
      });
    }

    //if drum not found
    if(!drum) {
      return res.json({
        status: 404,
        response: {}
      });
    }

    //Return drum found
    return res.json({
      status: 200,
      response: drum
    });

  });
});


// POST for starting drums trip
router.post('/drum/start/:id', function(req, res, next) {
  Drum.find({drumId : req.params.id}, function(err, drum){
    if (err) res.json({status : 500});

    drum.info = {
      trackingData : {
        location : [req.body.location], // [latitude, longitude]
        humidity : [req.body.humidity],
        temp : [req.body.temp]
      },
      samples : req.body.samples
    };

    drum.save(function(err){
      if (err) res.json({status: 500});
      res.json({status : 200, response : {message : "Drum Successfully Started"}});
    });


  });
  return res.json({});
});


// POST for updating drum
router.post('/drum/update/:id', function(req, res, next) {
  Drum.find({drumId:req.params.id}, function(err, drum){

    drum.info.trackingData.location.push(req.body.location);
    drum.info.trackingData.humidity.push(req.body.humidity);
    drum.info.trackingData.temp.push(req.body.temp);

    drum.save(function(err){
      if(err) res.json({status:500});
      res.json({
        status : 200

      })
    });

  });
  return res.json({});
});


module.exports = router;
