const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, unique: true, sparse: true },
  description: { type: String, default: '' },
  details: { type: String, default: '' },
  image: { type: String, default: '' },
  icon: { type: String, default: '' },
  // Category as string (e.g. "funeral-samagri", "ambulance", "pandit", etc.)
  pageCategory: { type: String, default: 'general' },
  // Optional reference to Category collection
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  price: { type: Number, default: 0 },
  currency: { type: String, default: 'INR' },
  duration: { type: Number, default: 0 },
  features: [{ type: String }],
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
  metaTitle: { type: String, default: '' },
  metaDescription: { type: String, default: '' },
  metaKeywords: [{ type: String }],
  lastEditedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', default: null },
}, { timestamps: true });

// Auto-generate slug from name before saving
serviceSchema.pre('save', function(next) {
  if (!this.slug && this.name) {
    this.slug = this.name
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
      + '-' + Date.now();
  }
  next();
});

module.exports = mongoose.model('Service', serviceSchema);
