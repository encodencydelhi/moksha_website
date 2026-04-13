const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth.middleware");
const {
  submitEnquiry, getAllEnquiries, getEnquiry,
  updateEnquiry, deleteEnquiry, getEnquiryStats,
} = require("../controllers/contact.controller");

router.post("/", submitEnquiry);
router.get("/", protect, getAllEnquiries);
router.get("/stats", protect, getEnquiryStats);
router.get("/:id", protect, getEnquiry);
router.put("/:id", protect, updateEnquiry);
router.delete("/:id", protect, deleteEnquiry);

module.exports = router;
