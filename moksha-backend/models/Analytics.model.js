const mongoose = require("mongoose");

const VisitSchema = new mongoose.Schema(
  {
    sessionId: { type: String, required: true },
    ipAddress: { type: String, default: "" },
    userAgent: { type: String, default: "" },
    browser: { type: String, default: "" },
    os: { type: String, default: "" },
    device: { type: String, enum: ["desktop", "mobile", "tablet", "unknown"], default: "unknown" },
    country: { type: String, default: "" },
    city: { type: String, default: "" },
    region: { type: String, default: "" },
    page: { type: String, required: true },
    referrer: { type: String, default: "" },
    isUnique: { type: Boolean, default: false },
    duration: { type: Number, default: 0 }, // seconds
    exitedAt: { type: Date },
  },
  { timestamps: true }
);

const AnalyticsSummarySchema = new mongoose.Schema(
  {
    date: { type: String, required: true, unique: true }, // YYYY-MM-DD
    totalVisits: { type: Number, default: 0 },
    uniqueVisitors: { type: Number, default: 0 },
    pageViews: { type: Number, default: 0 },
    enquiriesCount: { type: Number, default: 0 },
    paymentsCount: { type: Number, default: 0 },
    revenueTotal: { type: Number, default: 0 },
    topPages: [{ page: String, views: Number }],
    deviceBreakdown: {
      desktop: { type: Number, default: 0 },
      mobile: { type: Number, default: 0 },
      tablet: { type: Number, default: 0 },
    },
    countryBreakdown: [{ country: String, visits: Number }],
  },
  { timestamps: true }
);

const SocialClickSchema = new mongoose.Schema(
  {
    platform: {
      type: String,
      enum: ["facebook", "instagram", "twitter", "linkedin", "youtube", "whatsapp", "telegram", "phone", "email"],
      required: true,
    },
    ipAddress: { type: String, default: "" },
    userAgent: { type: String, default: "" },
    page: { type: String, default: "" },
    date: { type: String, required: true }, // YYYY-MM-DD
  },
  { timestamps: true }
);

// Aggregated counters
const SocialClickCounterSchema = new mongoose.Schema(
  {
    platform: { type: String, unique: true, required: true },
    totalClicks: { type: Number, default: 0 },
    lastClickedAt: { type: Date },
  },
  { timestamps: true }
);

module.exports = {
  Visit: mongoose.model("Visit", VisitSchema),
  AnalyticsSummary: mongoose.model("AnalyticsSummary", AnalyticsSummarySchema),
  SocialClick: mongoose.model("SocialClick", SocialClickSchema),
  SocialClickCounter: mongoose.model("SocialClickCounter", SocialClickCounterSchema),
};
