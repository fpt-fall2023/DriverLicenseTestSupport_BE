const express = require("express");
const questionCategoryController = require("../controllers/questionCategoryController");
const authController = require('../controllers/authController')

const router = express.Router();

router.use(authController.protectRoute);

router
.route("/")
.get(questionCategoryController.getAllCategory)
.post(authController.grantAccess("admin"), questionCategoryController.createCategory);

router
  .route("/:id")
  .delete(authController.grantAccess("admin"), questionCategoryController.deleteCategory)
  .patch(authController.grantAccess("admin"), questionCategoryController.updateCategory);

module.exports = router;
