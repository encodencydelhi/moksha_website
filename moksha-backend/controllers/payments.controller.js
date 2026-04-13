const Payment = require("../models/Payment.model");
const Settings = require("../models/Settings.model");
const crypto = require("crypto");

// Helper: get payment settings
const getPaymentSettings = async () => {
  const settings = await Settings.findOne();
  return settings?.paymentConfig || {};
};

// ─── Razorpay ────────────────────────────────────────────────────────────────

// @desc    Create Razorpay order
// @route   POST /api/payments/razorpay/create-order
// @access  Public
exports.createRazorpayOrder = async (req, res, next) => {
  try {
    const {
      amount,
      currency = "INR",
      userName,
      userEmail,
      userPhone,
      serviceType,
      description,
    } = req.body;

    const paymentConfig = await getPaymentSettings();
    if (!paymentConfig.razorpay?.enabled) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Razorpay payments are currently disabled",
        });
    }

    const Razorpay = require("razorpay");
    const razorpay = new Razorpay({
      key_id: paymentConfig.razorpay.keyId,
      key_secret: paymentConfig.razorpay.keySecret,
    });

    const options = {
      amount: Math.round(amount * 100), // amount in paise
      currency,
      receipt: `moksha_${Date.now()}`,
      notes: { userName, userEmail, serviceType },
    };

    const order = await razorpay.orders.create(options);

    // Create pending payment record
    const payment = await Payment.create({
      userName,
      userEmail,
      userPhone: userPhone || "",
      gateway: "razorpay",
      gatewayOrderId: order.id,
      amount,
      currency,
      amountFormatted: `₹${amount}`,
      serviceType: serviceType || "",
      description: description || "",
      status: "pending",
      ipAddress: req.ip || "",
    });

    res.json({
      success: true,
      data: {
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        keyId: paymentConfig.razorpay.keyId,
        paymentDbId: payment._id,
      },
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Verify Razorpay payment
// @route   POST /api/payments/razorpay/verify
// @access  Public
exports.verifyRazorpayPayment = async (req, res, next) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      paymentDbId,
    } = req.body;

    const paymentConfig = await getPaymentSettings();
    const expectedSignature = crypto
      .createHmac("sha256", paymentConfig.razorpay.keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      await Payment.findByIdAndUpdate(paymentDbId, {
        status: "failed",
        failureReason: "Invalid signature",
      });
      return res
        .status(400)
        .json({ success: false, message: "Payment verification failed" });
    }

    const payment = await Payment.findByIdAndUpdate(
      paymentDbId,
      {
        status: "success",
        transactionId: razorpay_payment_id,
        gatewayPaymentId: razorpay_payment_id,
        gatewaySignature: razorpay_signature,
        paidAt: new Date(),
      },
      { new: true },
    );

    res.json({
      success: true,
      message: "Payment verified successfully",
      data: payment,
    });
  } catch (err) {
    next(err);
  }
};

// ─── Stripe ──────────────────────────────────────────────────────────────────

// @desc    Create Stripe payment intent
// @route   POST /api/payments/stripe/create-intent
// @access  Public
exports.createStripeIntent = async (req, res, next) => {
  try {
    const {
      amount,
      currency = "usd",
      userName,
      userEmail,
      userPhone,
      serviceType,
      description,
    } = req.body;

    const paymentConfig = await getPaymentSettings();
    if (!paymentConfig.stripe?.enabled) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Stripe payments are currently disabled",
        });
    }

    const Stripe = require("stripe");
    const stripe = new Stripe(paymentConfig.stripe.secretKey);

    const intent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency,
      metadata: { userName, userEmail, serviceType },
      description: description || "Moksha Voyage Service",
    });

    const payment = await Payment.create({
      userName,
      userEmail,
      userPhone: userPhone || "",
      gateway: "stripe",
      gatewayOrderId: intent.id,
      amount,
      currency,
      amountFormatted: `$${amount}`,
      serviceType: serviceType || "",
      description: description || "",
      status: "pending",
      ipAddress: req.ip || "",
    });

    res.json({
      success: true,
      data: {
        clientSecret: intent.client_secret,
        intentId: intent.id,
        paymentDbId: payment._id,
      },
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Stripe webhook
// @route   POST /api/payments/stripe/webhook
// @access  Public (raw body)
exports.stripeWebhook = async (req, res, next) => {
  try {
    const paymentConfig = await getPaymentSettings();
    const Stripe = require("stripe");
    const stripe = new Stripe(paymentConfig.stripe.secretKey);

    const sig = req.headers["stripe-signature"];
    let event;
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        paymentConfig.stripe.webhookSecret,
      );
    } catch (err) {
      return res
        .status(400)
        .json({ success: false, message: `Webhook Error: ${err.message}` });
    }

    if (event.type === "payment_intent.succeeded") {
      const intent = event.data.object;
      await Payment.findOneAndUpdate(
        { gatewayOrderId: intent.id },
        {
          status: "success",
          transactionId: intent.id,
          paidAt: new Date(),
          webhookReceived: true,
        },
      );
    } else if (event.type === "payment_intent.payment_failed") {
      const intent = event.data.object;
      await Payment.findOneAndUpdate(
        { gatewayOrderId: intent.id },
        {
          status: "failed",
          failureReason: intent.last_payment_error?.message || "Payment failed",
          webhookReceived: true,
        },
      );
    }

    res.json({ received: true });
  } catch (err) {
    next(err);
  }
};

// @desc    Razorpay webhook
// @route   POST /api/payments/razorpay/webhook
// @access  Public
exports.razorpayWebhook = async (req, res, next) => {
  try {
    const paymentConfig = await getPaymentSettings();
    const signature = req.headers["x-razorpay-signature"];
    const expectedSig = crypto
      .createHmac("sha256", paymentConfig.razorpay.webhookSecret)
      .update(JSON.stringify(req.body))
      .digest("hex");

    if (signature !== expectedSig) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid webhook signature" });
    }

    const { event, payload } = req.body;
    if (event === "payment.captured") {
      const p = payload.payment.entity;
      await Payment.findOneAndUpdate(
        { gatewayOrderId: p.order_id },
        {
          status: "success",
          transactionId: p.id,
          paidAt: new Date(),
          webhookReceived: true,
        },
      );
    } else if (event === "payment.failed") {
      const p = payload.payment.entity;
      await Payment.findOneAndUpdate(
        { gatewayOrderId: p.order_id },
        {
          status: "failed",
          failureReason: p.error_description || "Payment failed",
          webhookReceived: true,
        },
      );
    }

    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

// ─── Admin ───────────────────────────────────────────────────────────────────

// @desc    Get all payments
// @route   GET /api/payments
// @access  Private
exports.getAllPayments = async (req, res, next) => {
  try {
    const { status, gateway, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (gateway) filter.gateway = gateway;

    const total = await Payment.countDocuments(filter);
    const payments = await Payment.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const stats = await Payment.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
          total: { $sum: "$amount" },
        },
      },
    ]);

    res.json({
      success: true,
      count: payments.length,
      total,
      totalPages: Math.ceil(total / limit),
      stats,
      data: payments,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single payment
// @route   GET /api/payments/:id
// @access  Private
exports.getPayment = async (req, res, next) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment)
      return res
        .status(404)
        .json({ success: false, message: "Payment not found" });
    res.json({ success: true, data: payment });
  } catch (err) {
    next(err);
  }
};

// @desc    Get payment gateway config (public keys only)
// @route   GET /api/payments/config
// @access  Public
exports.getPaymentConfig = async (req, res, next) => {
  try {
    const settings = await Settings.findOne();
    const config = settings?.paymentConfig || {};
    res.json({
      success: true,
      data: {
        stripe: {
          enabled: config.stripe?.enabled || false,
          publicKey: config.stripe?.publicKey || "",
          currency: config.stripe?.currency || "usd",
          mode: config.stripe?.mode || "test",
        },
        razorpay: {
          enabled: config.razorpay?.enabled || false,
          keyId: config.razorpay?.keyId || "",
          currency: config.razorpay?.currency || "INR",
          mode: config.razorpay?.mode || "test",
        },
      },
    });
  } catch (err) {
    next(err);
  }
};
