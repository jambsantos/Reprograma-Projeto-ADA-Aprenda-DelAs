const users = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

const createNewUsers = (request, response) => {
  const users = new users(request.body);

 user.save(function(err) {
    if (err) {
    response.status(424).send({ message: err.message });
    }
    response.status(201).send(user)
  });
};

// const getAllUsers = (request, response) => {
//    users.find(function(err, users){
//     if(err) {
//     response.status(500).send({ message: err.message })
//     }
//     response.status(200).send(users)
//   });
//  };

// const loginUsers = (request, response) => {
//   users.findOne({ email: request.body.email }, function(error, user) {
//     if (!user) {
//       return response.status(404).send(`Não existe colaboradora com o email ${request.body.email}`);
//     }
//     const validaPassword = bcrypt.compareSync(request.body.passWord, user.passWord);

//     if (!validaPassword) {
//       return response.status(403).send('invalid password');
//     }

//     const token = jwt.sign({ email: request.body.email }, SECRET);

//     return response.status(200).send(token);
//   });
// }

module.exports = {
    //getAllUsers,
    createNewUsers,
    //loginUsers
}