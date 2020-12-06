const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
  id: { type: Number },
  name: { type: String },
  tagCategory: { type: Array },
  contacts: { type: String },
  email: { type: String },
  password: { type: String }
}, {
  versionKey: false
});

module.exports = mongoose.model('users', usersSchema);