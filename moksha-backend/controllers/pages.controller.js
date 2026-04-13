const Page = require("../models/Page.model");

// @desc    Get page by key (public)
// @route   GET /api/pages/:pageKey
// @access  Public
exports.getPage = async (req, res, next) => {
  try {
    const page = await Page.findOne({
      pageKey: req.params.pageKey,
      isPublished: true,
    });
    if (!page) {
      return res
        .status(404)
        .json({
          success: false,
          message: `Page '${req.params.pageKey}' not found`,
        });
    }
    res.json({ success: true, data: page });
  } catch (err) {
    next(err);
  }
};

// @desc    Get all pages (admin)
// @route   GET /api/pages
// @access  Private
exports.getAllPages = async (req, res, next) => {
  try {
    const pages = await Page.find()
      .select("pageKey title slug isPublished updatedAt")
      .sort("pageKey");
    res.json({ success: true, count: pages.length, data: pages });
  } catch (err) {
    next(err);
  }
};

// @desc    Create or update page (upsert by pageKey)
// @route   PUT /api/pages/:pageKey
// @access  Private
exports.upsertPage = async (req, res, next) => {
  try {
    req.body.lastEditedBy = req.admin.id;
    if (!req.body.slug) {
      req.body.slug = req.params.pageKey;
    }
    const page = await Page.findOneAndUpdate(
      { pageKey: req.params.pageKey },
      { $set: { ...req.body, pageKey: req.params.pageKey } },
      { new: true, upsert: true, runValidators: false },
    );
    res.json({ success: true, message: "Page saved", data: page });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete page
// @route   DELETE /api/pages/:pageKey
// @access  Private
exports.deletePage = async (req, res, next) => {
  try {
    const page = await Page.findOneAndDelete({ pageKey: req.params.pageKey });
    if (!page)
      return res
        .status(404)
        .json({ success: false, message: "Page not found" });
    res.json({ success: true, message: "Page deleted" });
  } catch (err) {
    next(err);
  }
};

// @desc    Add section to page
// @route   POST /api/pages/:pageKey/sections
// @access  Private
exports.addSection = async (req, res, next) => {
  try {
    const page = await Page.findOneAndUpdate(
      { pageKey: req.params.pageKey },
      { $push: { sections: req.body } },
      { new: true },
    );
    if (!page)
      return res
        .status(404)
        .json({ success: false, message: "Page not found" });
    res.json({ success: true, data: page });
  } catch (err) {
    next(err);
  }
};

// @desc    Update section
// @route   PUT /api/pages/:pageKey/sections/:sectionId
// @access  Private
exports.updateSection = async (req, res, next) => {
  try {
    const update = {};
    Object.keys(req.body).forEach((k) => {
      update[`sections.$.${k}`] = req.body[k];
    });
    const page = await Page.findOneAndUpdate(
      { pageKey: req.params.pageKey, "sections._id": req.params.sectionId },
      { $set: update },
      { new: true },
    );
    if (!page)
      return res
        .status(404)
        .json({ success: false, message: "Section not found" });
    res.json({ success: true, data: page });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete section
// @route   DELETE /api/pages/:pageKey/sections/:sectionId
// @access  Private
exports.deleteSection = async (req, res, next) => {
  try {
    const page = await Page.findOneAndUpdate(
      { pageKey: req.params.pageKey },
      { $pull: { sections: { _id: req.params.sectionId } } },
      { new: true },
    );
    if (!page)
      return res
        .status(404)
        .json({ success: false, message: "Page not found" });
    res.json({ success: true, data: page });
  } catch (err) {
    next(err);
  }
};
