const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth.middleware");
const {
  getPage, getAllPages, upsertPage, deletePage,
  addSection, updateSection, deleteSection,
} = require("../controllers/pages.controller");

// Public
router.get("/:pageKey", getPage);

// Admin
router.get("/", protect, getAllPages);
router.put("/:pageKey", protect, upsertPage);
router.delete("/:pageKey", protect, deletePage);
router.post("/:pageKey/sections", protect, addSection);
router.put("/:pageKey/sections/:sectionId", protect, updateSection);
router.delete("/:pageKey/sections/:sectionId", protect, deleteSection);

module.exports = router;
