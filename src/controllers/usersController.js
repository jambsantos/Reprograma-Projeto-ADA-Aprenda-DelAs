const users = require('../models/usersSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;


const createNewUsers = (request, response) => {
  const passwordHash = bcrypt.hashSync(request.body.password, 10);
  request.body.password = passwordHash;
  const user = new users(request.body);
   user.save(function(err) {
     if (err) {
      response.status(500).send({ message: err.message })
     }
     response.status(201).send(user)
  });
};

const loginUsers = (request, response) => {
 
  users.findOne({ email: request.body.email }, (err, user)=> {
    if (err){
      response.status(500).send({ message: err.message })
    }
    if (!user) {
      return response.status(404).send(`No user registered with email ${request.body.email}`);
    }
    
    const validPassword = bcrypt.compareSync(request.body.password, user.password);
    console.log(validPassword)
    console.log (request.body.password)
    console.log (user.password)

    if (!validPassword) {
      return response.status(401).send('Invalid password!!');
    }
    const token = jwt.sign({ email: request.body.email }, SECRET);
    return response.status(200).send(token);
  });
};

const getAllUsers = (request, response) => {
  const authHeader = request.get('authorization')
  if (!authHeader){
    return response.status(401).send('Header null');
  }
  const token = authHeader.split(' ')[1]
 
  jwt.verify(token,SECRET, err =>{
    if (err){
     return response.status(424).send({ message: err.message });
    }
  users.find(function(err, user){
   if(err) {
   response.status(500).send({ message: err.message })
   }
   response.status(200).send(user)
 });
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
  const authHeader = request.get('authorization')
  if (!authHeader){
    return response.status(401).send('Header null');
  }
  const token = authHeader.split(' ')[1]
 
  jwt.verify(token,SECRET, err =>{
    if (err){
     return response.status(424).send({ message: err.message });
    }
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
});
};

const deleteUsers = (request, response) => {
  const authHeader = request.get('authorization')
  if (!authHeader){
    return response.status(401).send('Header null');
  }
  const token = authHeader.split(' ')[1]
 
  jwt.verify(token,SECRET, err =>{
    if (err){
     return response.status(424).send({ message: err.message });
    }
  const id = request.params.id;
 users.find({ id }, (err, user) => {
    if (user.length > 0) {
        users.deleteOne({ id }, (err) => {
        if (err) {
          return response.status(500).send({message: err.message });
        }
        return response.status(200).send({message: "User successfully deleted",});
      });
    } else {
      return response.status(404).send({message: "User not found" });
    }
  });
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
  const authHeader = request.get('authorization')
  if (!authHeader){
    return response.status(401).send('Header null');
  }
 const token = authHeader.split(' ')[1]
 
 //const token = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImF6dWwxMkBnbWFpbC5jb20iLCJpYXQiOjE2MDc3ODU0MTJ9.kZ78PltBxMLI_Fv2el89Hb-mbHAGo9g9CZlQv7nmVU4
 console.log(token)
  jwt.verify(token,SECRET, err =>{
    if (err){
     return response.status(424).send({ message: err.message });
    }

const id = request.params.id;
users.find({ id }, (err, user) => {
if (user.length > 0) {
users.updateOne({ id },{ $set: request.body }, function (err) {
    if (err) {
      response.status(500).send({ message: err.message })
    } else {
      response.status(200).send({ message: "Level updated succesfuly!"})
    }
  });  
}});
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
    loginUsers
}