var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://10.90.91.220:27017/unearthed');

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
    time: { type: Date, default: Date.now },
    depth : {
      min : Number,
      max : Number
    },
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
