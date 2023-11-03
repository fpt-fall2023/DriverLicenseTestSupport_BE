const express = require("express");
const TrafficSignCategoryController = require("../controllers/TrafficSignCategoryController");
const authController = require('../controllers/authController');

const router = express.Router();


// router.use(authController.protectRoute);

router
  .route("/")
  .get(TrafficSignCategoryController.getAllTrafficSignCategory)
  .post(
    // authController.grantAccess("admin", "staff"), 
    TrafficSignCategoryController.createTrafficSignCategory
  );

router
  .route("/:id")
  .delete(
    // authController.grantAccess("admin", "staff"), 
    TrafficSignCategoryController.deleteTrafficSignCategory
  )
  .patch(
      // authController.grantAccess("admin", "staff"), 
      TrafficSignCategoryController.updateTrafficSignCategory
  );

module.exports = router
