const express = require("express");
const TrafficSignController = require("../controllers/TrafficSignController");
const authController = require('../controllers/authController');

const router = express.Router();

// router.use(authController.protectRoute);


router
  .route("/")
  .get(TrafficSignController.getAllTrafficSign)
  .post(authController.protectRoute, authController.grantAccess("admin", "staff"), TrafficSignController.createTrafficSign);

router
  .route("/:id")
  .delete(
      authController.protectRoute, 
      authController.grantAccess("admin", "staff"), 
      TrafficSignController.deleteTrafficSign
    )
  .patch(authController.protectRoute, authController.grantAccess("admin", "staff"), TrafficSignController.updateTrafficSign);

module.exports = router;
