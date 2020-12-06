const express = require('express');
const router = express.Router();
const controller = require('../controllers/coursesController');

router.get('/', controller.getAllCourses);
router.post('/', controller.createNewCourses);
router.put('/:id', controller.updateCourses);
router.delete('/:id', controller.deleteCourses);

module.exports = router;