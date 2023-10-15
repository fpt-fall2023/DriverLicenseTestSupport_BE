const express = require('express');
const sampleTestController = require('../controllers/samspleTestController');

const router = express.Router();

router.route('/')
    .get(sampleTestController.getAllSampleTest)
    .post(sampleTestController.createSampleTest)

router.route('/:id')
    .get(sampleTestController.deleteSampleTest)
    .patch(sampleTestController.updateSampleTest);

module.exports = router