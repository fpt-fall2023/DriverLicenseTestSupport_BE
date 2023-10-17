const express = require('express');
const testResultController = require('../controllers/testResultController')

const router = express.Router();

router.route('/')
    .post(testResultController.saveTestResult)

router.route('/:id')
    .get(testResultController.getTestResult)
    .delete(testResultController.deleteTestResult)
    .patch(testResultController.updateTestResult)

module.exports = router;