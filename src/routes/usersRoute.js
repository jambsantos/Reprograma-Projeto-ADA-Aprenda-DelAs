const express = require('express');
const router = express.Router();
const controller = require('../controllers/usersController');

router.get('/', controller.getAllUsers);
router.post('/', controller.createNewUsers);
router.get("/field", controller.getTagFieldUser);
router.get("/level", controller.getTagLevelUser);
router.post('/login', controller.loginUsers);
router.get("/:id", controller.getByIdUsers);
router.put('/:id', controller.updateUsers);
router.delete('/:id', controller.deleteUsers);
router.patch("/:id", controller.updateLevel);



module.exports = router;

