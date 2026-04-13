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
