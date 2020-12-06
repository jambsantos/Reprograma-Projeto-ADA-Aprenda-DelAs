const mongoose = require('mongoose');

const coursesSchema = new mongoose.Schema({
  nome: { type: String },
  realizadora: { type: String },
  categoria: {type: String },
  link: {type:String },
  gratuito: { type: Boolean },
  localDoLink: {type: String },
}, {
  versionKey: false
});

const coursesModel = mongoose.model('Courses', coursesSchema);

module.exports = { coursesModel, coursesSchema};