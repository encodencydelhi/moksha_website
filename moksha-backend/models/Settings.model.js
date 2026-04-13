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
