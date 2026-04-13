const express = require("express");
const router = express.Router();
const {
  login,
  signup,
  requestOtp,
  verifyOtp,
  getMe,
  refreshToken,
  logout,
  updatePassword,
  updateProfile,
} = require("../controllers/auth.controller");
const { protect } = require("../middleware/auth.middleware");

router.post("/login", login);
router.post("/signup", signup);
router.post("/otp/request", requestOtp);
router.post("/otp/verify", verifyOtp);
router.post("/refresh", refreshToken);
router.post("/logout", protect, logout);
router.get("/me", protect, getMe);
router.put("/update-password", protect, updatePassword);
router.put("/update-profile", protect, updateProfile);

module.exports = router;
