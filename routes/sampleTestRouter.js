const express = require('express');
const sampleTestController = require('../controllers/samspleTestController');
const authController = require('../controllers/authController')


const router = express.Router();

// router.use(authController.protectRoute);


router.route('/')
    .get(sampleTestController.getAllSampleTest)
    .post(authController.protectRoute, authController.grantAccess("admin", "staff"), sampleTestController.createSampleTest)

router.route('/:id')
    .delete(authController.protectRoute, authController.grantAccess("admin", "staff"), sampleTestController.deleteSampleTest)
    .patch(authController.protectRoute, authController.grantAccess("admin", "staff"), sampleTestController.updateSampleTest);

module.exports = router