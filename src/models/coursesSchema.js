const mongoose = require('mongoose');

const coursesSchema = new mongoose.Schema({
  id: { type: Number},
  name: { type: String },
  type: {type: String },
  field: {type: String},
  level:{type: String},
  host: { type: String },
  free: { type: Boolean },
  community: {type: Boolean },
  link: {type:String }
}, {
  versionKey: false
});

module.exports = mongoose.model('courses', coursesSchema);