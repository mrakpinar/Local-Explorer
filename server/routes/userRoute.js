const express = require("express");
const {
  registerController,
  loginController,
  updateUserController,
  requireSignIn,
} = require("../controller/userController");

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);

router.put("/update-user", requireSignIn, updateUserController);

// router.put("/update-location", requireSignIn, updateUserLocationController);

module.exports = router;
