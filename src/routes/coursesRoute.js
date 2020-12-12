const express = require('express');
const router = express.Router();
const controller = require('../controllers/coursesController');


router.get('/', controller.getAllCourses);
router.post('/', controller.createNewCourses);
router.get("/free", controller.getFreeCourses);
router.get("/type", controller.getTipyCourses);
router.get("/field", controller.getFieldCourses);
router.get("/levelfree", controller.getLevelFreeCourses);
router.get('/community', controller.getCommunityCourses);
router.put('/:id', controller.updateCourses);
router.delete('/:id', controller.deleteCourses);


module.exports = router;