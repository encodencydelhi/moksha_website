const express = require('express');
const { protect } = require('../middleware/auth.middleware');
const Admin = require('../models/Admin.model');

const router = express.Router();

router.get('/all', protect, async (req, res) => {
  try {
    const admins = await Admin.find().select('-password');
    res.json({ success: true, admins });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
