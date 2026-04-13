const Payment = require("../models/Payment.model");
const User = require("../models/User.model");
const Service = require("../models/Service.model");
const { v4: uuidv4 } = require("uuid");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const emailService = require("../services/email.service");

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_RTd9y3ngRanKxq",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "bxH0R4Mbz5x3lC7XMWPezN4m",
});

// Create Razorpay Order
exports.createOrder = async (req, res) => {
  try {
    const { serviceId, amount, email, phone, name, description } = req.body;

    if (!amount || !email || !serviceId) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    // Create Razorpay order
    const order = await razorpay.orders.create({
      amount: amount * 100, // Razorpay expects amount in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      description: description || "Moksha Voyage Service",
      notes: {
        serviceId,
        email,
        phone,
        name,
      },
    });

    // Create payment record in DB
    const payment = new Payment({
      transactionId: uuidv4(),
      razorpayOrderId: order.id,
      service: serviceId,
      amount,
      email,
      phone,
      status: "pending",
      currency: "INR",
      notes: `Customer: ${name}, Email: ${email}, Phone: ${phone}`,
    });

    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ name, email, phone });
      await user.save();
    }

    payment.user = user._id;
    await payment.save();

    res.status(201).json({
      success: true,
      order: {
        id: order.id,
        amount: order.amount,
        currency: order.currency,
        paymentId: payment._id,
        key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_RTd9y3ngRanKxq",
      },
    });
  } catch (error) {
    console.error("Order creation error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Verify Payment
exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    // Verify signature
    const hmac = crypto.createHmac(
      "sha256",
      process.env.RAZORPAY_KEY_SECRET || "bxH0R4Mbz5x3lC7XMWPezN4m",
    );
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    const generated_signature = hmac.digest("hex");

    if (generated_signature !== razorpay_signature) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid signature" });
    }

    // Update payment status
    const payment = await Payment.findOneAndUpdate(
      { razorpayOrderId: razorpay_order_id },
      {
        razorpayPaymentId: razorpay_payment_id,
        status: "completed",
      },
      { new: true },
    )
      .populate("service")
      .populate("user");

    if (!payment) {
      return res
        .status(404)
        .json({ success: false, message: "Payment not found" });
    }

    // Send confirmation emails
    await emailService.sendPaymentConfirmation(payment);
    await emailService.sendPaymentNotificationToAdmin(payment);

    res.json({
      success: true,
      message: "Payment verified successfully",
      payment,
    });
  } catch (error) {
    console.error("Payment verification error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Payment Details
exports.getPayment = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id)
      .populate("service")
      .populate("user");
    if (!payment)
      return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, payment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get All Payments (Admin)
exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate("service")
      .populate("user")
      .sort({ createdAt: -1 });
    res.json({ success: true, payments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Payment Status (Admin)
exports.updatePaymentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const payment = await Payment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    )
      .populate("service")
      .populate("user");
    res.json({ success: true, payment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
