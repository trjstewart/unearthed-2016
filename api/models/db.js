var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//****************************//
//
//    Drum Schema and Model
//
//***************************//

var drumSchema = new Schema({
  info : {
    drumId: { type: Number, required: true },
    samples: { type: Array, default: [] },
    trackingData: {
      location: [String],
      humidity: [Number],
      temp: [Number]
    },
    time: String,
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
  depth: [], // [min, max]
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
