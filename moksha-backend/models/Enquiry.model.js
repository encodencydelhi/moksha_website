const mongoose = require("mongoose");

const EnquirySchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, trim: true, default: "" },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, trim: true, default: "" },
    subject: { type: String, default: "" },
    message: { type: String, required: true },
    serviceType: { type: String, default: "" }, // which service page they came from
    status: { type: String, enum: ["new", "read", "resolved", "spam"], default: "new" },
    source: { type: String, default: "contact-form" }, // contact-form, service-page, etc.
    ipAddress: { type: String, default: "" },
    userAgent: { type: String, default: "" },
    adminNotes: { type: String, default: "" },
    repliedAt: { type: Date },
    resolvedAt: { type: Date },
    resolvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Enquiry", EnquirySchema);
