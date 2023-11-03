const express = require("express");
const questionController = require("../controllers/questionController");
const authController = require('../controllers/authController')

const router = express.Router();

// router.use(authController.protectRoute);

router
  .route("/")
  .get(questionController.getAllQuestion)
  .post(authController.grantAccess("admin", "staff"), questionController.createQuestion);

router
  .route("/:id")
  .delete(authController.grantAccess("admin", "staff"), questionController.deleteQuestion)
  .patch(authController.grantAccess("admin", "staff"), questionController.updateQuestion);

module.exports = router;
