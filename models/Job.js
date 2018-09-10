var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var JobSchema = new Schema ({
  position: {
    type: String,
  },
  link: {
    type: String
  },
  company: {
    type: String
  },
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
});

var Job = mongoose.model('Job', JobSchema);

module.exports = Job;