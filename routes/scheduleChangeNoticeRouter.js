const express = require('express');
const scheduleChangeNoticeController = require('../controllers/scheduleChangeNoticeController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protectRoute);

router.route('/get-change').get(scheduleChangeNoticeController.getAScheduleChangeNotice);
router.route('/accept-change/:id').patch(scheduleChangeNoticeController.acceptScheduleChangeNotice);
router.route('/deny-change/:id').patch(scheduleChangeNoticeController.denyScheduleChangeNotice);

router.route('/')
    .get(scheduleChangeNoticeController.findAllScheduleChangeNotice)
    .post(scheduleChangeNoticeController.createScheduleChangeNotice);

router.route('/:id')
    .delete(scheduleChangeNoticeController.deleteScheduleChangeNotice)


module.exports = router