const mongoose = require('mongoose');
const { coursesSchema } = require('./courses');

const usersSchema = new mongoose.Schema({
  id:{ type: Number },
  name: { type: String },
  tagArea:{ type: String },
  contacts: { type: Number },
  email: { type: String },
  password: { type: String },
  courses: [coursesSchema]
}, {
  versionKey: false
});

const usersModel = mongoose.model('users', usersSchema);

module.exports = { usersModel, usersSchema };