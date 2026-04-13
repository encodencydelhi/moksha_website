const express = require('express');
const { createService, getAllServices, getService, updateService, deleteService } = require('../controllers/service.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/', protect, createService);
router.get('/', getAllServices);
router.get('/:id', getService);
router.put('/:id', protect, updateService);
router.delete('/:id', protect, deleteService);

module.exports = router;
