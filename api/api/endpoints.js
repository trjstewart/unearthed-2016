var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

//Models import
var Drum = mongoose.model('Drum');
var Sample = mongoose.model('Sample');

var id = 1;

function randomWithRange(min, max) {
  return ((Math.random() * (max - min)) + min).toFixed(2);
}

// GET for fetching next sample id
router.get('/sample/id', function (req, res, next) {
  if (id > 9999) {
    id = 1;
  }
  var thisId = id.toString();
  while (thisId.length < 4) {
    thisId = '0' + thisId;
  }
  res.json({status: 200, response: {id: thisId}});
  id++;
});


// GET for fetching sample by id
router.get('/sample/:id', function (req, res, next) {

  var id = req.params.id;

  Drum.find({"info.samples.sampleId": id}, function (err, drum) {

    if (err) {
      return res.json({
        status: 500
      });
    }

    //Get sample and return it
    for (var i = 0; i < drum.info.samples.length; i++) {
      var sample = drum.info.samples[i];
      if (sample.sampleId === id) {

        return res.json({
          status: 200,
          response: sample
        });

      }
    }

  });
});

// POST for updating sample
router.post('/sample/update/:type/:id', function (req, res, next) {

  var id = req.params.id;
  Drum.find({"info.samples.sampleId": id}, function (err, drum) {
    if (err) {
      return res.json({status: 500});
    }

    //Get sample and return it
    var sample;
    for (var i = 0; i < drum.info.samples.length; i++) {
      sample = drum.info.samples[i];
      if (sample.sampleId === id) {

        //update depending on type
        switch (req.params.type) {

          //update lab stuff
          case "lab":

            drum.endTime = Date.now();
            EndDrumTrip(drum, function (err) {
            }); //save drum updated end time

            sample.lab = {
              results: {
                coalComp: req.body.coalComp,
                quality: req.body.quality,
                density: req.body.density
              }
            };
            break;

          //update analyst stuff
          case "analyst":
            sample.analyst = {
              tests: req.body.tests
            };
            break;

          //false call
          default:
            return res.json({status: 404});
        }
        break; //break loop
      }
    }

    //Save updated sample
    sample.save(function (err) {
      if (err) {
        return res.json({status: 500});
      }
      return res.json({status: 200});
    });

  });
});

router.get('/drum/all', function (req, res, next) {
  var drumList = [];
  Drum.find({}, function (err, drums) {
    if (err) return res.json({status: 500}).end();
    for (var i = 0; i < drums.length; i++) {
      drumList.push(drums[i].info.drumId);
    }
    if (drumList.length > 0) {
      res.json({status: 200, response: drumList});
    } else {
      res.json({status: 404, response: {message: "No Drums Found."}})
    }
  });
});

// GET for updating drum
router.get('/drum/:id', function (req, res) {

  Drum.findOne({"info.drumId": req.params.id}, function (err, drum) {

    if (err) {
      return res.json({
        status: 500,
        response: {}
      });
    }

    //if drum not found
    if (!drum) {
      return res.json({
        status: 404,
        response: {}
      });
    }

    //Return drum found
    return res.json({
      status: 200,
      response: {
        drum : drum,
        inf0 : drum.info.trackingData
      }
    });

  });
});


// POST for starting drums trip
router.post('/drum/start/:id', function (req, res, next) {
  new Drum({
    info: {
      drumId: req.params.id,
      samples: req.body.samples
    }
  }).save(function (err) {
    if (err) return res.json({status: 500, response: {message: "shit's fucked"}});
    return res.json({status: 200, response: {message: "Drum Saved"}});
  });
});

// POST for updating drum
router.post('/drum/update/:id', function (req, res, next) {
  Drum.findOne({"info.drumId": req.params.id}, function (err, drum) {
    console.log(JSON.stringify(drum));

    drum.info.trackingData.location.push(req.body.location);
    drum.info.trackingData.humidity.push(req.body.humidity);
    drum.info.trackingData.temp.push(req.body.temp);

    drum.save(function (err) {
      if (err) res.json({status: 500});
      res.json({
        status: 200

      })
    });
  });
});

router.get('/data/dash/temp', function (req, res, next) {
  var averageTemps = [];
  for (var i = 0; i < 50; i++) {
    averageTemps.push(randomWithRange(25, 45));
  }
  return res.json({status: 200, response: {temps: averageTemps}})

});

router.get('/data/dash/random/:min/:max', function(req, res, next){
  return res.json({status : 200, response : {random : randomWithRange(parseInt(req.params.min), parseInt(req.params.max))}});
});


// GET for average time
router.get('/data/dash/time', function (req, res) {

  //Return "Average" Time in seconds
  return res.json({
    status: 200,
    response: {
      averageTime: 39 * 60 * 60 //seconds
    }
  });

});



//*********************************//
//
//      Helpers
//
//******************************//

function EndDrumTrip(drum, callback) {
  drum.save(function (err) {
    if (err) {
      console.log("Da faq m8!");
    }
    return callback();
  });
}


module.exports = router;
