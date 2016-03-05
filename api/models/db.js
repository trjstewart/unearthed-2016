var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://ec2-54-206-23-214.ap-southeast-2.compute.amazonaws.com:27017/unearthed');

//****************************//
//
//    Drum Schema and Model
//
//***************************//

var drumSchema = new Schema({
  info : {
    drumId: { type: Number, unique : true },
    samples: { type: Array, default: [] },
    trackingData: {
      location: [],
      humidity: [],
      temp: []
    },
    startTime: { type: Date, default: Date.now },
    endTime: { type: Date },
    dispatcher: String
  }
});

var Drum = mongoose.model('Drum', drumSchema);





//****************************//
//
//    Sample Schema and Model
//
//***************************//

var sampleSchema = new Schema({
  sampleId: { type: Number, required: true },
  depth: [], // [min, max] strings of depth in metres
  timeDug : String,
  borehole : String,
  lab : {
    results : {
      coalComp : Number,
      quality : String,
      density : String
    }
  },
  analyst : {
    tests: [String]
  }
});

var Sample = mongoose.model('Sample', sampleSchema);
