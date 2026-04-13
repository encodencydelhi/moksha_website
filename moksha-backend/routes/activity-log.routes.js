const express = require('express');
const { protect } = require('../middleware/auth.middleware');
const ActivityLog = require('../models/ActivityLog.model');

const router = express.Router();

router.get('/', protect, async (req, res) => {
  try {
    const logs = await ActivityLog.find()
      .populate('admin', 'name email')
      .sort({ createdAt: -1 })
      .limit(100);
    res.json({ success: true, logs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
