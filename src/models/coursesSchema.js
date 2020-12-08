const mongoose = require('mongoose');

const coursesSchema = new mongoose.Schema({
  name: { type: String },
  host: { type: String },
  category: {type: String },
  link: {type:String },
  free: { type: Boolean },
  community: {type: Boolean }
}, {
  versionKey: false
});

module.exports = mongoose.model('courses', coursesSchema);