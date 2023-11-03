const express = require('express');
const absentController = require('../controllers/absentController');
const router = express.Router();
const authController = require('../controllers/authController');

router.use(authController.protectRoute);

router
  .route('/approve-absent/:id')
  .patch(
    authController.grantAccess('admin', 'staff'), 
    absentController.aprroveAbsent
  );

router
  .route('/reject-absent/:id')
  .patch(
    authController.grantAccess('admin', 'staff'), 
    absentController.rejectAbsent
  );

router
  .route('/')
  .get(
    authController.grantAccess('staff', 'admin'),
    absentController.getAllAbsent
  )
  .post(authController.grantAccess('teacher'), absentController.requestAbsent);

router
  .route('/:id')
  .delete(
    authController.grantAccess('staff', 'admin'),
    absentController.deleteAbsent
  )
  .patch(
    authController.grantAccess('staff', 'admin'),
    absentController.updateAbsent
  );

module.exports = router;
