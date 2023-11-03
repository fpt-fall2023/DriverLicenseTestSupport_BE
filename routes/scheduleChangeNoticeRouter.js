const express = require('express');
const scheduleChangeNoticeController = require('../controllers/scheduleChangeNoticeController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protectRoute);

router.route('/get-change').get(authController.grantAccess("user"), scheduleChangeNoticeController.getAScheduleChangeNotice);
router.route('/accept-change/:id').patch(authController.grantAccess("user"), scheduleChangeNoticeController.acceptScheduleChangeNotice);
router.route('/deny-change/:id').patch(authController.grantAccess("user"), scheduleChangeNoticeController.denyScheduleChangeNotice);

router.route('/')
    .get(authController.grantAccess("admin", "staff"), scheduleChangeNoticeController.findAllScheduleChangeNotice)
    .post(authController.grantAccess("admin", "staff"), scheduleChangeNoticeController.createScheduleChangeNotice);

router.route('/:id')
    .delete(authController.grantAccess("admin", "staff"), scheduleChangeNoticeController.deleteScheduleChangeNotice)


module.exports = router