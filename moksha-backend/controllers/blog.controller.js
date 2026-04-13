const Blog = require("../models/Blog.model");

const makeSlug = (title) =>
  title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") + "-" + Date.now();

// @desc    Get published blogs (public)
// @route   GET /api/blog
// @access  Public
exports.getBlogs = async (req, res, next) => {
  try {
    const { category, tag, page = 1, limit = 9, featured } = req.query;
    const filter = { isPublished: true };
    if (category) filter.category = category;
    if (tag) filter.tags = tag;
    if (featured) filter.isFeatured = true;

    const total = await Blog.countDocuments(filter);
    const blogs = await Blog.find(filter)
      .select("-content")
      .sort({ publishedAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({
      success: true, count: blogs.length, total,
      totalPages: Math.ceil(total / limit), currentPage: Number(page),
      data: blogs,
    });
  } catch (err) { next(err); }
};

// @desc    Get single blog by slug (public)
// @route   GET /api/blog/:slug
// @access  Public
exports.getBlogBySlug = async (req, res, next) => {
  try {
    const blog = await Blog.findOneAndUpdate(
      { slug: req.params.slug, isPublished: true },
      { $inc: { views: 1 } },
      { new: true }
    );
    if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });
    res.json({ success: true, data: blog });
  } catch (err) { next(err); }
};

// @desc    Admin - get all blogs
// @route   GET /api/blog/admin/all
// @access  Private
exports.adminGetBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json({ success: true, count: blogs.length, data: blogs });
  } catch (err) { next(err); }
};

// @desc    Create blog
// @route   POST /api/blog
// @access  Private
exports.createBlog = async (req, res, next) => {
  try {
    if (!req.body.slug) req.body.slug = makeSlug(req.body.title);
    req.body.lastEditedBy = req.admin.id;
    const blog = await Blog.create(req.body);
    res.status(201).json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ isActive: true }).populate('category').sort({ publishedAt: -1 });
    res.json({ success: true, data: blogs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('category');
    if (!blog) return res.status(404).json({ success: false, message: 'Not found' });
    
    // Increment views
    blog.views += 1;
    await blog.save();
    
    res.json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    await ActivityLog.create({
      admin: req.admin._id,
      action: 'UPDATE',
      module: 'Blog',
      documentId: blog._id,
      changes: req.body
    });
    res.json({ success: true, data: blog });
  } catch (err) { next(err); }
};

// @desc    Delete blog
// @route   DELETE /api/blog/:id
// @access  Private
exports.deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });
    res.json({ success: true, data: { message: "Blog deleted" } });
  } catch (err) { next(err); }
};
