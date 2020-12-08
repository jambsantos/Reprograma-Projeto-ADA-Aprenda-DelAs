const users = require('../models/usersSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

const createNewUsers = (request, response) => {
  const user = new users(request.body);

 user.save(function(err) {
    if (err) {
    response.status(424).send({ message: err.message });
    }
    response.status(201).send(user)
  });
};

const readAllUsers = (request, response) => {
   users.find(function(err, user){
    if(err) {
    response.status(424).send({ message: err.message })
    }
    response.status(201).send(user)
  });
 };

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

const updateUsers = (request, response) => {
  const id = request.params.id;

users.find({ id }, (err, user) => {
    if (user.length > 0) {
      users.updateMany(
        { id },
        { $set: request.body },
        (err) => {
          if (err) {
            return response.status(500).send({message: error.message});
          }
          return response.status(200).send({message: "User changed successfully" });
        }
      );
    } else {
      return response.status(200).send({ message: "Não existe usuários para atualizar" });
    }
  });
};

const deleteUsers = (request, response) => {
  const id = request.params.id;

 users.find({ id }, (err, user) => {
    if (user.length > 0) {
        users.deleteMany({ id }, (err) => {
        if (err) {
          return response.status(424).send({message: err.message });
        }
        return response.status(201).send({message: "User successfully deleted",});
      });
    } else {
      return response.status(201).send({message: "Não existe usuário para deletar" });
    }
  });
};
module.exports = {
    readAllUsers,
    createNewUsers,
    updateUsers,
    deleteUsers
    //loginUsers
}