const express = require('express');
const router = express.Router();
const controller = require('../controllers/usersController');

router.get('/', controller.readAllUsers);
//router.get("/:id", controller.readByID);
router.post('/', controller.createNewUsers);
//router.post('/login', controller.loginUsers);
router.put('/:id', controller.updateUsers);
router.delete('/:id', controller.deleteUsers);

module.exports = router;

