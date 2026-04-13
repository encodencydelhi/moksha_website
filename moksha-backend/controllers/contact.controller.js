const Enquiry = require("../models/Enquiry.model");
const emailService = require("../services/email.service");

// @desc    Submit contact form (public)
// @route   POST /api/contact
// @access  Public
exports.submitEnquiry = async (req, res, next) => {
  try {
    const { firstName, lastName, email, phone, subject, message, serviceType } =
      req.body;

    if (!firstName || !email || !message) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Please provide name, email, and message",
        });
    }

    const enquiry = await Enquiry.create({
      firstName,
      lastName: lastName || "",
      email,
      phone: phone || "",
      subject: subject || "",
      message,
      serviceType: serviceType || "",
      source: "contact-form",
      ipAddress: req.ip || req.connection?.remoteAddress || "",
      userAgent: req.headers["user-agent"] || "",
    });

    // Send emails (non-blocking)
    emailService
      .sendEnquiryConfirmation(enquiry)
      .catch((e) => console.error("Email error:", e));
    emailService
      .sendAdminEnquiryNotification(enquiry)
      .catch((e) => console.error("Email error:", e));

    res.status(201).json({
      success: true,
      message:
        "Thank you! Your message has been sent successfully. We will contact you soon.",
      data: { id: enquiry._id },
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get all enquiries (admin)
// @route   GET /api/contact
// @access  Private
exports.getAllEnquiries = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 20, search } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { firstName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
        { message: { $regex: search, $options: "i" } },
      ];
    }

    const total = await Enquiry.countDocuments(filter);
    const enquiries = await Enquiry.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({
      success: true,
      count: enquiries.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: Number(page),
      data: enquiries,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single enquiry
// @route   GET /api/contact/:id
// @access  Private
exports.getEnquiry = async (req, res, next) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);
    if (!enquiry)
      return res
        .status(404)
        .json({ success: false, message: "Enquiry not found" });

    // Auto-mark as read when admin views it
    if (enquiry.status === "new") {
      enquiry.status = "read";
      await enquiry.save();
    }

    res.json({ success: true, data: enquiry });
  } catch (err) {
    next(err);
  }
};

// @desc    Update enquiry status / notes
// @route   PUT /api/contact/:id
// @access  Private
exports.updateEnquiry = async (req, res, next) => {
  try {
    const { status, adminNotes } = req.body;
    const updateData = {};
    if (status) updateData.status = status;
    if (adminNotes !== undefined) updateData.adminNotes = adminNotes;
    if (status === "resolved") {
      updateData.resolvedAt = new Date();
      updateData.resolvedBy = req.admin.id;
    }

    const enquiry = await Enquiry.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    if (!enquiry)
      return res
        .status(404)
        .json({ success: false, message: "Enquiry not found" });

    res.json({ success: true, message: "Enquiry updated", data: enquiry });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete enquiry
// @route   DELETE /api/contact/:id
// @access  Private
exports.deleteEnquiry = async (req, res, next) => {
  try {
    const enquiry = await Enquiry.findByIdAndDelete(req.params.id);
    if (!enquiry)
      return res
        .status(404)
        .json({ success: false, message: "Enquiry not found" });
    res.json({ success: true, message: "Enquiry deleted" });
  } catch (err) {
    next(err);
  }
};

// @desc    Get enquiry stats
// @route   GET /api/contact/stats
// @access  Private
exports.getEnquiryStats = async (req, res, next) => {
  try {
    const [total, newCount, readCount, resolvedCount] = await Promise.all([
      Enquiry.countDocuments(),
      Enquiry.countDocuments({ status: "new" }),
      Enquiry.countDocuments({ status: "read" }),
      Enquiry.countDocuments({ status: "resolved" }),
    ]);
    const recent = await Enquiry.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("firstName email status createdAt");
    res.json({
      success: true,
      data: {
        total,
        new: newCount,
        read: readCount,
        resolved: resolvedCount,
        recent,
      },
    });
  } catch (err) {
    next(err);
  }
};
