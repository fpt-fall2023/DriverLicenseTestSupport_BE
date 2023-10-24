const express = require('express');
const carController = require('../controllers/carController');
const authController = require('../controllers/authController');
const router = express.Router();

router.use(authController.protectRoute);
router.use(authController.grantAccess('admin', 'staff'));

router
  .route('/')
  .get(carController.getAllCar)
  .post(carController.createCar);

router
  .route('/:id')
  .delete(carController.createCar)
  .patch(carController.updateCar);

module.exports = router;
