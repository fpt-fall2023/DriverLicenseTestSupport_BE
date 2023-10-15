const express = require("express");
const TrafficSignController = require("../controllers/TrafficSignController");

const router = express.Router();

router
  .route("/")
  .get(TrafficSignController.getAllTrafficSign)
  .post(TrafficSignController.createTrafficSign);

router
  .route("/:id")
  .delete(TrafficSignController.deleteTrafficSign)
  .patch(TrafficSignController.updateTrafficSign);

module.exports = router;
