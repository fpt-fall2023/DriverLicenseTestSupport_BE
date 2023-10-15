const express = require("express");
const TrafficSignCategoryController = require("../controllers/TrafficSignCategoryController");

const router = express.Router();

router
  .route("/")
  .get(TrafficSignCategoryController.getAllTrafficSignCategory)
  .post(TrafficSignCategoryController.createTrafficSignCategory);

router
  .route("/:id")
  .delete(TrafficSignCategoryController.deleteTrafficSignCategory)
  .patch(TrafficSignCategoryController.updateTrafficSignCategory);

module.exports = router
