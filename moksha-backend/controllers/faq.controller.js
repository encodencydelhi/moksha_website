const FAQ = require("../models/FAQ.model");

// Get all FAQs (public)
exports.getFAQs = async (req, res, next) => {
  try {
    const { category } = req.query;
    const filter = { isActive: true };
    if (category && category !== "All") filter.category = category;

    const faqs = await FAQ.find(filter).sort({ order: 1 });
    res.json({ success: true, data: faqs });
  } catch (err) {
    next(err);
  }
};

// Get single FAQ
exports.getFAQ = async (req, res, next) => {
  try {
    const faq = await FAQ.findById(req.params.id);
    if (!faq)
      return res.status(404).json({ success: false, message: "FAQ not found" });
    res.json({ success: true, data: faq });
  } catch (err) {
    next(err);
  }
};

// Admin - Get all FAQs
exports.adminGetFAQs = async (req, res, next) => {
  try {
    const faqs = await FAQ.find().sort({ order: 1 });
    res.json({ success: true, data: faqs });
  } catch (err) {
    next(err);
  }
};

// Admin - Create FAQ
exports.createFAQ = async (req, res, next) => {
  try {
    const { question, answer, category, order } = req.body;

    if (!question || !answer) {
      return res
        .status(400)
        .json({ success: false, message: "Question and answer are required" });
    }

    const faq = new FAQ({
      question,
      answer,
      category: category || "General",
      order: order || 0,
      isActive: true,
    });

    await faq.save();
    res
      .status(201)
      .json({ success: true, message: "FAQ created successfully", data: faq });
  } catch (err) {
    next(err);
  }
};

// Admin - Update FAQ
exports.updateFAQ = async (req, res, next) => {
  try {
    const { question, answer, category, order, isActive } = req.body;

    const faq = await FAQ.findByIdAndUpdate(
      req.params.id,
      {
        question,
        answer,
        category,
        order,
        isActive,
      },
      { new: true, runValidators: true },
    );

    if (!faq)
      return res.status(404).json({ success: false, message: "FAQ not found" });
    res.json({ success: true, message: "FAQ updated successfully", data: faq });
  } catch (err) {
    next(err);
  }
};

// Admin - Delete FAQ
exports.deleteFAQ = async (req, res, next) => {
  try {
    const faq = await FAQ.findByIdAndDelete(req.params.id);
    if (!faq)
      return res.status(404).json({ success: false, message: "FAQ not found" });
    res.json({ success: true, message: "FAQ deleted successfully" });
  } catch (err) {
    next(err);
  }
};

// Admin - Reorder FAQs
exports.reorderFAQs = async (req, res, next) => {
  try {
    const { faqs } = req.body; // Array of { _id, order }

    for (let item of faqs) {
      await FAQ.findByIdAndUpdate(item._id, { order: item.order });
    }

    res.json({ success: true, message: "FAQs reordered successfully" });
  } catch (err) {
    next(err);
  }
};
