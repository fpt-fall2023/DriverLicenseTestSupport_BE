const express = require('express');
const testResultController = require('../controllers/testResultController')
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protectRoute)

router.route('/')
    .get(testResultController.getAllTestResult)
    .post(testResultController.saveTestResult)

router.route('/:id')
    .get(testResultController.getTestResult)
    .delete(authController.grantAccess('amdin'), testResultController.deleteTestResult)
    .patch(authController.grantAccess('amdin'), testResultController.updateTestResult)

module.exports = router;