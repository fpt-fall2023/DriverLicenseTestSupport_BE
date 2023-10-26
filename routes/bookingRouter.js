const express = require('express');
const bookingController = require('../controllers/bookingController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protectRoute);

router.route('/available-slot/:id').get(bookingController.getAvailableSlot);
router.route('/available-teacher').get(bookingController.getAvailableTeacher);
router.route('/change-booking-schedule').patch(bookingController.changeBookingSchedule)

router.route('/')
    .get(bookingController.getAllBooking) 
    .post(authController.grantAccess('user'), bookingController.createBooking);

router.route('/:id')
    .delete(authController.grantAccess('admin'), bookingController.deleteBooking)
    .patch(authController.grantAccess('admin'), bookingController.updateBooking);

module.exports = router;