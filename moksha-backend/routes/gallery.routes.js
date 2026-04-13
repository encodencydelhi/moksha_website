const express = require('express');
const { createGalleryItem, getAllGallery, getGalleryItem, updateGalleryItem, deleteGalleryItem } = require('../controllers/gallery.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/', protect, createGalleryItem);
router.get('/', getAllGallery);
router.get('/:id', getGalleryItem);
router.put('/:id', protect, updateGalleryItem);
router.delete('/:id', protect, deleteGalleryItem);

module.exports = router;
