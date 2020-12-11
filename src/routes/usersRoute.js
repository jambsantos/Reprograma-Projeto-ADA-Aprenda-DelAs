const express = require('express');
const router = express.Router();
const controller = require('../controllers/usersController');

router.get('/', controller.getAllUsers);
router.post('/', controller.createNewUsers);
router.get("/field", controller.getTagFieldUser);
router.get("/level", controller.getTagLevelUser);
router.patch("/level", controller.updateLevel);
router.get("/:id", controller.getByIdUsers);
router.put('/:id', controller.updateUsers);
router.delete('/:id', controller.deleteUsers);
//router.post('/login', controller.loginUsers);


module.exports = router;

