const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth.middleware");
const {
  getFAQs,
  getFAQ,
  adminGetFAQs,
  createFAQ,
  updateFAQ,
  deleteFAQ,
  reorderFAQs,
} = require("../controllers/faq.controller");

// Public routes
router.get("/admin/all", protect, adminGetFAQs);
router.get("/", getFAQs);
router.get("/:id", getFAQ);

// Admin routes - POST, PUT, DELETE
router.post("/", protect, createFAQ);
router.put("/:id", protect, updateFAQ);
router.delete("/:id", protect, deleteFAQ);
router.post("/admin/reorder", protect, reorderFAQs);

module.exports = router;
