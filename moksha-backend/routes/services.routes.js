const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth.middleware");
const {
  getAllServices, getServiceByKey, getServiceBySlug, adminGetAllServices,
  createService, updateService, deleteService,
  addSubService, updateSubService, deleteSubService,
} = require("../controllers/services.controller");

// Public
router.get("/", getAllServices);
router.get("/slug/:slug", getServiceBySlug);
router.get("/:pageKey", getServiceByKey);

// Admin
router.get("/admin/all", protect, adminGetAllServices);
router.post("/", protect, createService);
router.put("/:pageKey", protect, updateService);
router.delete("/:pageKey", protect, deleteService);
router.post("/:pageKey/sub-services", protect, addSubService);
router.put("/:pageKey/sub-services/:subId", protect, updateSubService);
router.delete("/:pageKey/sub-services/:subId", protect, deleteSubService);

module.exports = router;
