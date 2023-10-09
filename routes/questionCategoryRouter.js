const express = require("express");
const questionCategoryController = require("../controllers/questionCategoryController");

const router = express.Router();

// router.use()

router
  .route("/")
  .get(questionCategoryController.getAllCategory)
  .post(questionCategoryController.createCategory);

router
  .route("/:id")
  .delete(questionCategoryController.deleteCategory)
  .patch(questionCategoryController.updateCategory);

module.exports = router;
