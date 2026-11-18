const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const Game = require('../models/Game');

// GET /api/categories - List all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find().sort('order').lean();
    res.json({ categories });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/categories/:slug - Get category with games
router.get('/:slug', async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug }).lean();
    if (!category) return res.status(404).json({ error: 'Category not found' });

    const { page = 1, limit = 120 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [games, total] = await Promise.all([
      Game.find({ category: category.slug, isActive: true })
        .select('-downloadUrl -referralUrl -description -howToDownload -faq')
        .sort({ position: 1, createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit))
        .lean(),
      Game.countDocuments({ category: category.slug, isActive: true })
    ]);

    res.json({
      category,
      games,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
