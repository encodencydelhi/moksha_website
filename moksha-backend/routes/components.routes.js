const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth.middleware");
const {
  getAllComponents, getComponentByKey, getBulkComponents,
  createComponent, updateComponent, deleteComponent,
  getHero, getTopbar, getNavbar, getSideIcons,
} = require("../controllers/components.controller");

// Public
router.get("/", getAllComponents);
router.post("/bulk", getBulkComponents);
router.get("/hero", getHero);
router.get("/topbar", getTopbar);
router.get("/navbar", getNavbar);
router.get("/sideicons", getSideIcons);
router.get("/:key", getComponentByKey);

// Admin
router.post("/", protect, createComponent);
router.put("/:key", protect, updateComponent);
router.delete("/:key", protect, deleteComponent);

module.exports = router;
