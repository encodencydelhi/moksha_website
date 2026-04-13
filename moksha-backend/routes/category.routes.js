const express = require('express');
const { createCategory, getAllCategories, getCategory, updateCategory, deleteCategory } = require('../controllers/category.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/', protect, createCategory);
router.get('/', getAllCategories);
router.get('/:id', getCategory);
router.put('/:id', protect, updateCategory);
router.delete('/:id', protect, deleteCategory);

module.exports = router;
