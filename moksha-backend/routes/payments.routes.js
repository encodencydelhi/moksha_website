// const express = require("express");
// const router = express.Router();
// const { protect } = require("../middleware/auth.middleware");
// const {
//   createRazorpayOrder, verifyRazorpayPayment, razorpayWebhook,
//   createStripeIntent, stripeWebhook,
//   getAllPayments, getPayment, getPaymentConfig,
// } = require("../controllers/payments.controller");

// // Public
// router.get("/config", getPaymentConfig);
// router.post("/razorpay/create-order", createRazorpayOrder);
// router.post("/razorpay/verify", verifyRazorpayPayment);
// router.post("/razorpay/webhook", razorpayWebhook);
// router.post("/stripe/create-intent", createStripeIntent);
// router.post("/stripe/webhook", express.raw({ type: "application/json" }), stripeWebhook);

// // Admin
// router.get("/", protect, getAllPayments);
// router.get("/:id", protect, getPayment);

// module.exports = router;
