const {
  SocialClick,
  SocialClickCounter,
} = require("../models/Analytics.model");

const todayDate = () => new Date().toISOString().split("T")[0];

// @desc    Track social click
// @route   POST /api/social-clicks/track
// @access  Public
exports.trackClick = async (req, res, next) => {
  try {
    const { platform, page } = req.body;
    const validPlatforms = [
      "facebook",
      "instagram",
      "twitter",
      "linkedin",
      "youtube",
      "whatsapp",
      "telegram",
      "phone",
      "email",
    ];

    if (!platform || !validPlatforms.includes(platform)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid platform" });
    }

    const ip = req.ip || "";
    const ua = req.headers["user-agent"] || "";
    const date = todayDate();

    // Log individual click
    await SocialClick.create({
      platform,
      ipAddress: ip,
      userAgent: ua,
      page: page || "",
      date,
    });

    // Update counter
    await SocialClickCounter.findOneAndUpdate(
      { platform },
      { $inc: { totalClicks: 1 }, lastClickedAt: new Date() },
      { upsert: true },
    );

    res.json({ success: true, message: "Click tracked" });
  } catch (err) {
    next(err);
  }
};

// @desc    Get all social click counters
// @route   GET /api/social-clicks
// @access  Private
exports.getCounters = async (req, res, next) => {
  try {
    const counters = await SocialClickCounter.find().sort({ totalClicks: -1 });
    res.json({ success: true, data: counters });
  } catch (err) {
    next(err);
  }
};

// @desc    Get click logs (admin)
// @route   GET /api/social-clicks/logs
// @access  Private
exports.getLogs = async (req, res, next) => {
  try {
    const { platform, page = 1, limit = 50, startDate, endDate } = req.query;
    const filter = {};
    if (platform) filter.platform = platform;
    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = startDate;
      if (endDate) filter.date.$lte = endDate;
    }

    const total = await SocialClick.countDocuments(filter);
    const logs = await SocialClick.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({ success: true, total, count: logs.length, data: logs });
  } catch (err) {
    next(err);
  }
};

// @desc    Get today's click breakdown per platform
// @route   GET /api/social-clicks/today
// @access  Private
exports.getTodayStats = async (req, res, next) => {
  try {
    const today = todayDate();
    const stats = await SocialClick.aggregate([
      { $match: { date: today } },
      { $group: { _id: "$platform", clicks: { $sum: 1 } } },
      { $sort: { clicks: -1 } },
    ]);
    res.json({ success: true, data: stats });
  } catch (err) {
    next(err);
  }
};
