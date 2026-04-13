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

    res.status(201).json({ success: true, data: galleryItem });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllGallery = async (req, res) => {
  try {
    const gallery = await Gallery.find({ isActive: true }).populate('category').sort({ order: 1 });
    res.json({ success: true, data: gallery });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getGalleryItem = async (req, res) => {
  try {
    const item = await Gallery.findById(req.params.id).populate('category');
    if (!item) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data: item });
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
    res.json({ success: true, data: item });
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
