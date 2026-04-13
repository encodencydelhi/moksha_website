const Service = require("../models/Service.model");

// @desc    Get all services (public)
// @route   GET /api/services
// @access  Public
exports.getAllServices = async (req, res, next) => {
  try {
    const { category, pageCategory } = req.query;
    const filter = { isActive: true };
    if (category) filter.category = category;
    if (pageCategory) filter.pageCategory = pageCategory;

    const services = await Service.find(filter).sort("order");

    res.json({ success: true, count: services.length, data: services });
  } catch (err) {
    next(err);
  }
};

// @desc    Get service by pageKey (matches Next.js route)
// @route   GET /api/services/:pageKey
// @access  Public
exports.getServiceByKey = async (req, res, next) => {
  try {
    const service = await Service.findOne({
      pageKey: req.params.pageKey,
      isPublished: true,
    });
    if (!service) {
      return res
        .status(404)
        .json({
          success: false,
          message: `Service '${req.params.pageKey}' not found`,
        });
    }
    res.json({ success: true, data: service });
  } catch (err) {
    next(err);
  }
};

// @desc    Get service by slug
// @route   GET /api/services/slug/:slug
// @access  Public
exports.getServiceBySlug = async (req, res, next) => {
  try {
    const service = await Service.findOne({
      slug: req.params.slug,
      isPublished: true,
    });
    if (!service) {
      return res
        .status(404)
        .json({ success: false, message: "Service not found" });
    }
    res.json({ success: true, data: service });
  } catch (err) {
    next(err);
  }
};

// @desc    Admin - Get all services
// @route   GET /api/services/admin/all
// @access  Private
exports.adminGetAllServices = async (req, res, next) => {
  try {
    const services = await Service.find().sort("order");
    res.json({ success: true, count: services.length, data: services });
  } catch (err) {
    next(err);
  }
};

// @desc    Create service
// @route   POST /api/services
// @access  Private
exports.createService = async (req, res, next) => {
  try {
    req.body.lastEditedBy = req.admin?.id;
    
    // Auto-generate slug from name if not provided
    if (!req.body.slug && req.body.name) {
      req.body.slug = req.body.name
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");
    }

    // Basic cleaning of category field (must be ObjectId or removed)
    if (req.body.category && typeof req.body.category === 'string' && req.body.category.length !== 24) {
      delete req.body.category;
    }

    const service = await Service.create(req.body);
    res.status(201).json({ success: true, data: service });
  } catch (err) {
    next(err);
  }
};

// @desc    Update service
// @route   PUT /api/services/:id
// @access  Private
exports.updateService = async (req, res, next) => {
  try {
    if (req.admin?.id) req.body.lastEditedBy = req.admin.id;
    
    // Auto-generate slug from name if not provided
    if (!req.body.slug && req.body.name) {
      req.body.slug = req.body.name
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");
    }

    // Basic cleaning of category field (must be ObjectId or removed)
    if (req.body.category && typeof req.body.category === 'string' && req.body.category.length !== 24) {
      delete req.body.category;
    }

    const service = await Service.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true },
    );

    if (!service) {
      return res.status(404).json({ success: false, message: "Service not found" });
    }

    res.json({ success: true, message: "Service updated", data: service });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete service
// @route   DELETE /api/services/:id
// @access  Private
exports.deleteService = async (req, res, next) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service)
      return res
        .status(404)
        .json({ success: false, message: "Service not found" });
    res.json({ success: true, message: "Service deleted" });
  } catch (err) {
    next(err);
  }
};

// @desc    Add sub-service to a service
// @route   POST /api/services/:pageKey/sub-services
// @access  Private
exports.addSubService = async (req, res, next) => {
  try {
    const service = await Service.findOneAndUpdate(
      { pageKey: req.params.pageKey },
      { $push: { subServices: req.body } },
      { new: true },
    );
    if (!service)
      return res
        .status(404)
        .json({ success: false, message: "Service not found" });
    res.json({ success: true, data: service });
  } catch (err) {
    next(err);
  }
};

// @desc    Update sub-service
// @route   PUT /api/services/:pageKey/sub-services/:subId
// @access  Private
exports.updateSubService = async (req, res, next) => {
  try {
    const update = {};
    Object.keys(req.body).forEach((k) => {
      update[`subServices.$.${k}`] = req.body[k];
    });
    const service = await Service.findOneAndUpdate(
      { pageKey: req.params.pageKey, "subServices._id": req.params.subId },
      { $set: update },
      { new: true },
    );
    if (!service)
      return res
        .status(404)
        .json({ success: false, message: "Sub-service not found" });
    res.json({ success: true, data: service });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete sub-service
// @route   DELETE /api/services/:pageKey/sub-services/:subId
// @access  Private
exports.deleteSubService = async (req, res, next) => {
  try {
    const service = await Service.findOneAndUpdate(
      { pageKey: req.params.pageKey },
      { $pull: { subServices: { _id: req.params.subId } } },
      { new: true },
    );
    if (!service)
      return res
        .status(404)
        .json({ success: false, message: "Service not found" });
    res.json({ success: true, data: service });
  } catch (err) {
    next(err);
  }
};
