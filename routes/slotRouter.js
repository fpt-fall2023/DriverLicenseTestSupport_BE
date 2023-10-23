const express = require('express');
const authController = require('../controllers/authController');
const slotController = require('../controllers/slotController');

const router = express.Router();

router.use(authController.protectRoute);

router.route('/')
    .get(slotController.getAllSlot)
    .post(authController.grantAccess('staff', 'admin'), slotController.createSlot);

router.route('/:id')
    .delete(authController.grantAccess('staff', 'admin'), slotController.deleteSlot)
    .patch(authController.grantAccess('staff', 'admin'), slotController.updateSlot);

module.exports = router;