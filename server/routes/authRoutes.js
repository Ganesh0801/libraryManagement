const express = require("express");
const router = express.Router();
const {validateUser} = require("../validation/userValidation.js")
const {
  signUp,
  signIn,
  forgotPassword,
  verifyOtp,
  resetPassword,
} = require("../controllers/authController");

router.post("/signup",validateUser,signUp);
router.post("/signin", signIn);
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPassword);

module.exports = router;
