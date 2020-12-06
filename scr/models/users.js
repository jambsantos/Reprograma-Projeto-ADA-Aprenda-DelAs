const mongoose = require('mongoose');
const { coursesSchema } = require('./cursos');

const usersSchema = new mongoose.Schema({
  id:{ type: Number },
  nome: { type: String },
  occupation: { type: String },
  tagArea:{ type: String },
  contacts: { type: Number },
  email: { type: String },
  senha: { type: String },
  cursos: [coursesSchema]
}, {
  versionKey: false
});

const usersModel = mongoose.model('users', usersSchema);

module.exports = { usersModel, usersSchema };