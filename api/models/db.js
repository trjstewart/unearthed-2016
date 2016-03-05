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
<<<<<<< Updated upstream
  sampleId: { type: Number, required: true }
  //someData: { type: String }
=======
  sampleId: { type: Number, required: true },
  lab : {},
  analyst : {}
>>>>>>> Stashed changes
});

var Sample = mongoose.model('Sample', sampleSchema);
