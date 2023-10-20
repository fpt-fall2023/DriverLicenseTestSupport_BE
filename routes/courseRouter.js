const express = require('express');
const courseController = require('../controllers/courseController');
const authController = require('../controllers/authController');
const router = express.Router();

router.use(authController.protectRoute);

router
  .route('/')
  .get(courseController.getAllCourse)
  .post(
    authController.grantAccess('admin', 'staff'),
    courseController.createCourse
  );

router
  .route('/:id')
  .delete(
    authController.grantAccess('admin', 'staff'),
    courseController.deleteCourse
  )
  .patch(
    authController.grantAccess('admin', 'staff'),
    courseController.updateCourse
  );

module.exports = router;
