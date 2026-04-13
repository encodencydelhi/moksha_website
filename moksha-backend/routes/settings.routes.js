const express = require('express');
const { updateSetting, getSetting, getSettingsBySection, getAllSettings } = require('../controllers/settings.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/', protect, updateSetting);
router.get('/all', getAllSettings);
router.get('/section/:section', getSettingsBySection);
router.get('/:key', getSetting);

module.exports = router;
