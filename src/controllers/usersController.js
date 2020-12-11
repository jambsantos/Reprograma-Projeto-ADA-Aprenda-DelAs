const users = require('../models/usersSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

// const loginUsers = (request, response) => {
//   users.findOne({ email: request.body.email }, function(error, user) {
//     if (!user) {
//       return response.status(404).send(`Email not found ${request.body.email}`);
//     }
//     const validaPassword = bcrypt.compareSync(request.body.passWord, user.passWord);

//     if (!validaPassword) {
//       return response.status(403).send('invalid password');
//     }

//     const token = jwt.sign({ email: request.body.email }, SECRET);

//     return response.status(200).send(token);
//   });
// }


const getAllUsers = (request, response) => {
  users.find(function(err, user){
   if(err) {
   response.status(500).send({ message: err.message })
   }
   response.status(200).send(user)
 });
};

const createNewUsers = (request, response) => {
  const user = new users(request.body);
   user.save(function(err) {
     if (err) {
        response.status(500).send({ message: err.message })
     }
     response.status(201).send(user)
  });
};

const getByIdUsers = (request, response) => {
  const id = request.params.id;
 users.find({ id }, function(err, user){
      if(err) {
          response.status(500).send({ message: err.message })
      }
      response.status(200).send(user)
  });
};

const updateUsers = (request, response) => {
  const id = request.params.id;
users.find({ id }, (err, user) => {
    if (user.length > 0) {
      users.updateMany(
        { id },
        { $set: request.body },
        (err) => {
          if (err) {
            return response.status(500).send({message: error.message})
          }
          return response.status(200).send({message: "User changed successfully" })
        }
      );
    } else {
      return response.status(404).send({ message: "User not found" })
    }
  });
};

const deleteUsers = (request, response) => {
  const id = request.params.id;
 users.find({ id }, (err, user) => {
    if (user.length > 0) {
        users.deleteMany({ id }, (err) => {
        if (err) {
          return response.status(500).send({message: err.message });
        }
        return response.status(200).send({message: "User successfully deleted",});
      });
    } else {
      return response.status(404).send({message: "User not found" });
    }
  });
};

const getTagFieldUser = (request, response) => {
  const field = request.query.tagField
  users.find({tagField: field}, function (err, user) {
      if (err) {
          response.status(500).send({ message: err.message })
      } else {
          response.status(200).send(user)
      }
  });
};

const getTagLevelUser= (request, response) => {
  const level = request.query.tagLevel
 users.find({tagLevel:level}, function (err, user) {
      if (err) {
          response.status(500).send({ message: err.message })
      } else {
          response.status(200).send(user)
      }
  });
};

const updateLevel = (request, response) => {
  const level = request.query.tagLevel
 users.updateMany({tagLevel:level }, { $set : request.body}, function (err) {
    if (err) {
      response.status(500).send({ message: err.message })
    } else {
      response.status(200).send({ message: "Level updated succesfuly!"})
    }
  });  
};

module.exports = {
    getAllUsers,
    createNewUsers,
    getByIdUsers,
    updateUsers,
    deleteUsers,
    getTagFieldUser,
    getTagLevelUser,
    updateLevel,
    //loginUsers
}