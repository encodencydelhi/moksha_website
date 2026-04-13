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

    res.status(201).json({ success: true, data: category });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate('children').sort({ order: 1 });
    res.json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate('children');
    if (!category) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data: category });
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
    res.json({ success: true, data: category });
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
