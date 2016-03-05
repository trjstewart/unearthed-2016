var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//****************************//
//
//    Drum Schema and Model
//
//***************************//

var drumSchema = new Schema({
  drumId: { type: Number, required: true },
  samples: { type: Array, default: [] }

});

var Drum = mongoose.model('Drum', drumSchema);


//****************************//
//
//    Sample Schema and Model
//
//***************************//

var sampleSchema = new Schema({
  sampleId: { type: Number, required: true },
  iunno: { type: String }
  
});

var Sample = mongoose.model('Sample', sampleSchema);
