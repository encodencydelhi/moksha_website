const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth.middleware");
const { trackClick, getCounters, getLogs, getTodayStats } = require("../controllers/socialClicks.controller");

router.post("/track", trackClick);
router.get("/", protect, getCounters);
router.get("/logs", protect, getLogs);
router.get("/today", protect, getTodayStats);

module.exports = router;
