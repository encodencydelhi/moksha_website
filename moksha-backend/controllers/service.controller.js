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

    res.status(201).json({ success: true, data: service });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find({ isActive: true }).populate('category');
    res.json({ success: true, data: services });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id).populate('category');
    if (!service) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data: service });
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
    res.json({ success: true, data: service });
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
