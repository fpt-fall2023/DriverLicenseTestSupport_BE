const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

const router = express.Router();

router.post("/register", authController.signUp);
router.post("/signin", authController.signIn);
router.patch('/updateMe', authController.protectRoute, userController.UpdateMe)

router.use(authController.protectRoute);

router.use(authController.grantAccess("admin"));

router.route("/").get(userController.getAllUsers).post(userController.createUser);

router
  .route("/:id")
  .delete(userController.deleteUser)
  .patch(userController.updateUser);
module.exports = router;
