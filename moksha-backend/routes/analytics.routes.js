const express = require('express');
const { getDashboardStats, trackVisit, getVisits } = require('../controllers/analytics.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/track', trackVisit);
router.get('/dashboard-stats', protect, getDashboardStats);
router.get('/visits', protect, getVisits);

module.exports = router;
