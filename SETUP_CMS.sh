#!/bin/bash

set -e

echo "🚀 Starting Moksha CMS Complete Setup..."
echo "==========================================="

# Navigate to backend
cd moksha-backend

# 1. Install all required packages
echo "📦 Installing packages..."
npm install slugify uuid express-validator multer sharp nodemailer axios express-rate-limit helmet bcryptjs jsonwebtoken cors mongoose dotenv --legacy-peer-deps

# 2. Create .env file if it doesn't exist
if [ ! -f .env ]; then
  cat > .env << 'EOF'
PORT=5000
MONGODB_URI=mongodb://localhost:27017/moksha
JWT_SECRET=moksha-secret-key-2024-production-grade
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
RAZORPAY_KEY_ID=rzp_test_your_key
RAZORPAY_KEY_SECRET=your_secret
EMAIL_USER=admin@moksha.com
EMAIL_PASS=your_password
EOF
  echo "✅ .env file created"
fi

# 3. Create all model files
echo "📄 Creating Models..."

mkdir -p models

cat > models/User.model.js << 'EOFMODEL'
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  phone: String,
  address: String,
  purchasedServices: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }],
  totalPurchases: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
EOFMODEL

cat > models/Category.model.js << 'EOFMODEL'
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  description: String,
  image: String,
  icon: String,
  parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null },
  children: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  color: { type: String, default: '#000000' },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  metaTitle: String,
  metaDescription: String,
  metaKeywords: [String],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);
EOFMODEL

cat > models/Service.model.js << 'EOFMODEL'
const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  image: String,
  icon: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  price: { type: Number, required: true },
  currency: { type: String, default: 'INR' },
  duration: { type: Number, default: 0 },
  features: [String],
  isActive: { type: Boolean, default: true },
  metaTitle: String,
  metaDescription: String,
  metaKeywords: [String],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);
EOFMODEL

cat > models/Gallery.model.js << 'EOFMODEL'
const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  title: String,
  description: String,
  type: { type: String, enum: ['image', 'video'], required: true },
  url: { type: String, required: true },
  thumbnail: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  tags: [String],
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Gallery', gallerySchema);
EOFMODEL

cat > models/Settings.model.js << 'EOFMODEL'
const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  value: mongoose.Schema.Types.Mixed,
  type: { type: String, enum: ['string', 'number', 'boolean', 'json', 'array'], default: 'string' },
  description: String,
  section: { type: String, enum: ['general', 'navbar', 'footer', 'hero', 'topbar', 'payment', 'email'], default: 'general' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Settings', settingsSchema);
EOFMODEL

cat > models/Payment.model.js << 'EOFMODEL'
const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  transactionId: { type: String, required: true, unique: true },
  razorpayOrderId: String,
  razorpayPaymentId: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'INR' },
  status: { type: String, enum: ['pending', 'completed', 'failed', 'refunded'], default: 'pending' },
  email: String,
  phone: String,
  notes: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);
EOFMODEL

cat > models/ActivityLog.model.js << 'EOFMODEL'
const mongoose = require('mongoose');

const activityLogSchema = new mongoose.Schema({
  admin: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true },
  action: String,
  module: String,
  documentId: mongoose.Schema.Types.ObjectId,
  changes: mongoose.Schema.Types.Mixed,
  ipAddress: String,
  userAgent: String,
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('ActivityLog', activityLogSchema);
EOFMODEL

# 4. Create Controllers
echo "🎮 Creating Controllers..."

mkdir -p controllers

cat > controllers/category.controller.js << 'EOFCONTROLLER'
const Category = require('../models/Category.model');
const ActivityLog = require('../models/ActivityLog.model');

exports.createCategory = async (req, res) => {
  try {
    const { name, description, image, icon, parent, color, metaTitle, metaDescription, metaKeywords } = req.body;
    const slug = name.toLowerCase().replace(/\s+/g, '-');

    const existingCategory = await Category.findOne({ slug });
    if (existingCategory) {
      return res.status(400).json({ success: false, message: 'Category already exists' });
    }

    const category = new Category({
      name,
      slug,
      description,
      image,
      icon,
      parent,
      color,
      metaTitle,
      metaDescription,
      metaKeywords
    });

    await category.save();

    await ActivityLog.create({
      admin: req.admin._id,
      action: 'CREATE',
      module: 'Category',
      documentId: category._id,
      changes: category.toObject()
    });

    res.status(201).json({ success: true, category });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate('children').sort({ order: 1 });
    res.json({ success: true, categories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate('children');
    if (!category) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, category });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    await ActivityLog.create({
      admin: req.admin._id,
      action: 'UPDATE',
      module: 'Category',
      documentId: category._id,
      changes: req.body
    });
    res.json({ success: true, category });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    await ActivityLog.create({
      admin: req.admin._id,
      action: 'DELETE',
      module: 'Category',
      documentId: req.params.id
    });
    res.json({ success: true, message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
EOFCONTROLLER

cat > controllers/service.controller.js << 'EOFCONTROLLER'
const Service = require('../models/Service.model');
const ActivityLog = require('../models/ActivityLog.model');

exports.createService = async (req, res) => {
  try {
    const { name, description, price, category, features, image, icon } = req.body;
    const slug = name.toLowerCase().replace(/\s+/g, '-');

    const service = new Service({
      name,
      slug,
      description,
      price,
      category,
      features,
      image,
      icon
    });

    await service.save();

    await ActivityLog.create({
      admin: req.admin._id,
      action: 'CREATE',
      module: 'Service',
      documentId: service._id,
      changes: service.toObject()
    });

    res.status(201).json({ success: true, service });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find({ isActive: true }).populate('category');
    res.json({ success: true, services });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id).populate('category');
    if (!service) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, service });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateService = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    await ActivityLog.create({
      admin: req.admin._id,
      action: 'UPDATE',
      module: 'Service',
      documentId: service._id,
      changes: req.body
    });
    res.json({ success: true, service });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteService = async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    await ActivityLog.create({
      admin: req.admin._id,
      action: 'DELETE',
      module: 'Service',
      documentId: req.params.id
    });
    res.json({ success: true, message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
EOFCONTROLLER

cat > controllers/gallery.controller.js << 'EOFCONTROLLER'
const Gallery = require('../models/Gallery.model');
const ActivityLog = require('../models/ActivityLog.model');

exports.createGalleryItem = async (req, res) => {
  try {
    const { title, description, type, url, thumbnail, category, tags } = req.body;

    const galleryItem = new Gallery({
      title,
      description,
      type,
      url,
      thumbnail,
      category,
      tags
    });

    await galleryItem.save();

    await ActivityLog.create({
      admin: req.admin._id,
      action: 'CREATE',
      module: 'Gallery',
      documentId: galleryItem._id,
      changes: galleryItem.toObject()
    });

    res.status(201).json({ success: true, galleryItem });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllGallery = async (req, res) => {
  try {
    const gallery = await Gallery.find({ isActive: true }).populate('category').sort({ order: 1 });
    res.json({ success: true, gallery });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getGalleryItem = async (req, res) => {
  try {
    const item = await Gallery.findById(req.params.id).populate('category');
    if (!item) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateGalleryItem = async (req, res) => {
  try {
    const item = await Gallery.findByIdAndUpdate(req.params.id, req.body, { new: true });
    await ActivityLog.create({
      admin: req.admin._id,
      action: 'UPDATE',
      module: 'Gallery',
      documentId: item._id,
      changes: req.body
    });
    res.json({ success: true, item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteGalleryItem = async (req, res) => {
  try {
    await Gallery.findByIdAndDelete(req.params.id);
    await ActivityLog.create({
      admin: req.admin._id,
      action: 'DELETE',
      module: 'Gallery',
      documentId: req.params.id
    });
    res.json({ success: true, message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
EOFCONTROLLER

cat > controllers/settings.controller.js << 'EOFCONTROLLER'
const Settings = require('../models/Settings.model');
const ActivityLog = require('../models/ActivityLog.model');

exports.updateSetting = async (req, res) => {
  try {
    const { key, value, type, section } = req.body;

    let setting = await Settings.findOne({ key });

    if (setting) {
      setting.value = value;
      setting.type = type || setting.type;
      setting.section = section || setting.section;
    } else {
      setting = new Settings({ key, value, type, section });
    }

    await setting.save();

    await ActivityLog.create({
      admin: req.admin._id,
      action: 'UPDATE',
      module: 'Settings',
      documentId: setting._id,
      changes: { key, value }
    });

    res.json({ success: true, setting });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getSetting = async (req, res) => {
  try {
    const setting = await Settings.findOne({ key: req.params.key });
    if (!setting) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, setting });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getSettingsBySection = async (req, res) => {
  try {
    const settings = await Settings.find({ section: req.params.section });
    res.json({ success: true, settings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllSettings = async (req, res) => {
  try {
    const settings = await Settings.find();
    res.json({ success: true, settings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
EOFCONTROLLER

cat > controllers/payment.controller.js << 'EOFCONTROLLER'
const Payment = require('../models/Payment.model');
const User = require('../models/User.model');
const { v4: uuidv4 } = require('uuid');

exports.createPayment = async (req, res) => {
  try {
    const { serviceId, amount, email, phone, name } = req.body;

    const transactionId = uuidv4();

    const payment = new Payment({
      transactionId,
      service: serviceId,
      amount,
      email,
      phone,
      status: 'pending'
    });

    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ name, email, phone });
      await user.save();
    }

    payment.user = user._id;
    await payment.save();

    res.status(201).json({ success: true, payment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getPayment = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id).populate('service').populate('user');
    if (!payment) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, payment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate('service').populate('user').sort({ createdAt: -1 });
    res.json({ success: true, payments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updatePaymentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const payment = await Payment.findByIdAndUpdate(req.params.id, { status }, { new: true }).populate('service').populate('user');
    res.json({ success: true, payment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
EOFCONTROLLER

cat > controllers/analytics.controller.js << 'EOFCONTROLLER'
const Blog = require('../models/Blog.model');
const Service = require('../models/Service.model');
const Payment = require('../models/Payment.model');
const User = require('../models/User.model');
const Gallery = require('../models/Gallery.model');

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
      stats: {
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
EOFCONTROLLER

# 5. Create Routes
echo "🛣️ Creating Routes..."

mkdir -p routes

cat > routes/category.routes.js << 'EOFROUTE'
const express = require('express');
const { createCategory, getAllCategories, getCategory, updateCategory, deleteCategory } = require('../controllers/category.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/', protect, createCategory);
router.get('/', getAllCategories);
router.get('/:id', getCategory);
router.put('/:id', protect, updateCategory);
router.delete('/:id', protect, deleteCategory);

module.exports = router;
EOFROUTE

cat > routes/service.routes.js << 'EOFROUTE'
const express = require('express');
const { createService, getAllServices, getService, updateService, deleteService } = require('../controllers/service.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/', protect, createService);
router.get('/', getAllServices);
router.get('/:id', getService);
router.put('/:id', protect, updateService);
router.delete('/:id', protect, deleteService);

module.exports = router;
EOFROUTE

cat > routes/gallery.routes.js << 'EOFROUTE'
const express = require('express');
const { createGalleryItem, getAllGallery, getGalleryItem, updateGalleryItem, deleteGalleryItem } = require('../controllers/gallery.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/', protect, createGalleryItem);
router.get('/', getAllGallery);
router.get('/:id', getGalleryItem);
router.put('/:id', protect, updateGalleryItem);
router.delete('/:id', protect, deleteGalleryItem);

module.exports = router;
EOFROUTE

cat > routes/settings.routes.js << 'EOFROUTE'
const express = require('express');
const { updateSetting, getSetting, getSettingsBySection, getAllSettings } = require('../controllers/settings.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/', protect, updateSetting);
router.get('/all', getAllSettings);
router.get('/section/:section', getSettingsBySection);
router.get('/:key', getSetting);

module.exports = router;
EOFROUTE

cat > routes/payment.routes.js << 'EOFROUTE'
const express = require('express');
const { createPayment, getPayment, getAllPayments, updatePaymentStatus } = require('../controllers/payment.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/', createPayment);
router.get('/', protect, getAllPayments);
router.get('/:id', getPayment);
router.put('/:id', protect, updatePaymentStatus);

module.exports = router;
EOFROUTE

cat > routes/analytics.routes.js << 'EOFROUTE'
const express = require('express');
const { getDashboardStats } = require('../controllers/analytics.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/dashboard-stats', protect, getDashboardStats);

module.exports = router;
EOFROUTE

cat > routes/activity-log.routes.js << 'EOFROUTE'
const express = require('express');
const { protect } = require('../middleware/auth.middleware');
const ActivityLog = require('../models/ActivityLog.model');

const router = express.Router();

router.get('/', protect, async (req, res) => {
  try {
    const logs = await ActivityLog.find()
      .populate('admin', 'name email')
      .sort({ createdAt: -1 })
      .limit(100);
    res.json({ success: true, logs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
EOFROUTE

cat > routes/admin.routes.js << 'EOFROUTE'
const express = require('express');
const { protect } = require('../middleware/auth.middleware');
const Admin = require('../models/Admin.model');

const router = express.Router();

router.get('/all', protect, async (req, res) => {
  try {
    const admins = await Admin.find().select('-password');
    res.json({ success: true, admins });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
EOFROUTE

# 6. Update server.js
echo "📝 Updating server.js..."

cat > server.js << 'EOFSERVER'
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();

// Middleware
app.use(helmet());
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', process.env.FRONTEND_URL || 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP'
});
app.use('/api/', limiter);

// Static Files
app.use('/public', express.static('public'));

// Database Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/moksha', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.error('❌ MongoDB Error:', err));

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/admin', require('./routes/admin.routes'));
app.use('/api/blog', require('./routes/blog.routes'));
app.use('/api/category', require('./routes/category.routes'));
app.use('/api/service', require('./routes/service.routes'));
app.use('/api/gallery', require('./routes/gallery.routes'));
app.use('/api/settings', require('./routes/settings.routes'));
app.use('/api/analytics', require('./routes/analytics.routes'));
app.use('/api/payment', require('./routes/payment.routes'));
app.use('/api/activity-log', require('./routes/activity-log.routes'));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Server running' });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
EOFSERVER

echo "✅ Backend setup complete!"
echo ""
echo "📋 Summary:"
echo "✓ All models created"
echo "✓ All controllers created"
echo "✓ All routes created"
echo "✓ Server configured"
echo "✓ .env file created"
echo ""
echo "🚀 To start the server:"
echo "   npm run dev"
echo ""

