require('dotenv-safe').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

mongoose.connect(`${process.env.MONGODB_URL}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.log.bind(console, 'connection error:'));
db.once('open', () => {
  console.info('Successful connection');
});

const index = require('./routes/index');
const users = require('./routes/usersRoute');
const courses = require('./routes/coursesRoute');


app.use('/', (request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*');
  response.header(
    'Access-Control-Alow-Headers',
    'Origin', 'X-Request-With', 'Content-Type', 'Accept'
  );
  console.info('New successful request');
  next();
});

app.use('/', index);
app.use('/users', users);
app.use('/courses', courses);

module.exports = app;