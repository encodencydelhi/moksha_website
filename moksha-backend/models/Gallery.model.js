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
