const express = require("express");
const router = express.Router();
const {
  signUp,
  signIn,
  forgotPassword,
  verifyOtp,
  resetPassword,
} = require("../controllers/adminAuthController.js");
const {validateAdmin} = require("../middlewares/adminValidate.js");


router.post("/signup", validateAdmin , signUp);
router.post("/signin", signIn);
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPassword);

module.exports = router;
