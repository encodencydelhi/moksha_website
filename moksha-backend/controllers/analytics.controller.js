const { Visit, AnalyticsSummary } = require('../models/Analytics.model');
const Blog = require('../models/Blog.model');
const Service = require('../models/Service.model');
const Payment = require('../models/Payment.model');
const User = require('../models/User.model');
const Gallery = require('../models/Gallery.model');

exports.trackVisit = async (req, res) => {
  try {
    const { page, sessionId } = req.body;
    
    if (!sessionId || !page) {
      return res.status(400).json({ success: false, message: 'SessionId and Page are required' });
    }

    const userAgent = req.headers['user-agent'] || '';
    const ipAddress = req.ip || req.connection.remoteAddress || '';

    // Create a new visit record
    const visit = await Visit.create({
      sessionId,
      page,
      ipAddress,
      userAgent,
      device: userAgent.toLowerCase().includes('mobile') ? 'mobile' : 'desktop',
    });

    // Update AnalyticsSummary (Simple version: just increment totalVisits)
    const today = new Date().toISOString().split('T')[0];
    await AnalyticsSummary.findOneAndUpdate(
      { date: today },
      { $inc: { totalVisits: 1, pageViews: 1 } },
      { upsert: true, new: true }
    );

    res.json({ success: true, data: visit });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getDashboardStats = async (req, res) => {
  try {
    const totalBlogs = await Blog.countDocuments();
    const totalServices = await Service.countDocuments();
    const totalPayments = await Payment.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalGalleryItems = await Gallery.countDocuments();
    
    const totalRevenue = await Payment.aggregate([
      { $match: { status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    const recentPayments = await Payment.find({ status: 'completed' })
      .sort({ createdAt: -1 })
      .limit(10)
      .populate('service', 'name');

    res.json({
      success: true,
      data: {
        totalBlogs,
        totalServices,
        totalPayments,
        totalUsers,
        totalGalleryItems,
        totalRevenue: totalRevenue[0]?.total || 0,
        recentPayments
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getVisits = async (req, res) => {
  try {
    const { page = 1, limit = 50 } = req.query;
    const skip = (page - 1) * limit;

    const visits = await Visit.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Visit.countDocuments();

    res.json({
      success: true,
      data: visits,
      total,
      currentPage: Number(page),
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
