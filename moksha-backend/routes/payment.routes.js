const express = require("express");
const {
  createOrder,
  verifyPayment,
  getPayment,
  getAllPayments,
  updatePaymentStatus,
} = require("../controllers/payment.controller");
const { protect } = require("../middleware/auth.middleware");

const router = express.Router();

// Public routes
router.post("/create-order", createOrder);
router.post("/verify", verifyPayment);
router.get("/:id", getPayment);

// Protected routes (Admin)
router.get("/", protect, getAllPayments);
router.put("/:id", protect, updatePaymentStatus);

module.exports = router;
