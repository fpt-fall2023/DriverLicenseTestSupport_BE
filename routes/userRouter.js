const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

const router = express.Router();

router.post("/register", authController.signUp);
router.post("/signin", authController.signIn);

router
  .route("/")
  .get(
    authController.protectRoute,
    authController.grantAccess("admin"),
    userController.getAllUsers
  );

module.exports = router;
