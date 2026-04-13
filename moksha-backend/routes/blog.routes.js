const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth.middleware");
const {
  getBlogs, getBlogBySlug, adminGetBlogs,
  createBlog, updateBlog, deleteBlog,
} = require("../controllers/blog.controller");

// Public
router.get("/", getBlogs);
router.get("/slug/:slug", getBlogBySlug);

// Admin
router.get("/admin/all", protect, adminGetBlogs);
router.post("/", protect, createBlog);
router.put("/:id", protect, updateBlog);
router.delete("/:id", protect, deleteBlog);

module.exports = router;
