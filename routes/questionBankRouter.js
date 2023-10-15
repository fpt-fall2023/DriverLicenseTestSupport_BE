const express = require("express");
const questionBankController = require("../controllers/questionBankController");
const authController = require('../controllers/authController')

const router = express.Router();

router.use(authController.protectRoute);

router.route('/')
    .get(authController.grantAccess("admin"), questionBankController.getAllQuestionBank)
    .post(authController.grantAccess("admin"), questionBankController.createQuestionBank);

router.route('/:id')
    .get(questionBankController.getQuestionBank)
    .delete(authController.grantAccess("admin"), questionBankController.deleteQuestionBank)
    .patch(authController.grantAccess("admin"), questionBankController.updateQuestionBank)

module.exports = router;
