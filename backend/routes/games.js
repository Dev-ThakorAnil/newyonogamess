const express = require('express');
const router = express.Router();
const Game = require('../models/Game');

// GET /api/games - List games with filters & pagination
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      category,
      tag,
      gameType,
      featured,
      trending,
      sort = '-createdAt'
    } = req.query;

    const filter = { isActive: true };
    if (category) filter.category = category;
    if (tag) filter.tags = tag;
    if (gameType) {
      if (gameType === 'diwa') {
        filter.$or = [{ gameType: 'diwa' }, { gameType: { $exists: false } }];
      } else {
        filter.gameType = gameType;
      }
    }
    if (featured === 'true') filter.featured = true;
    if (trending === 'true') filter.trending = true;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Build compound sort object: primary sort by position (ASC), secondary sort by requested field
    const sortObj = { position: 1 };
    if (sort) {
      if (sort.startsWith('-')) {
        sortObj[sort.substring(1)] = -1;
      } else {
        sortObj[sort] = 1;
      }
    } else {
      sortObj.createdAt = -1;
    }
    
    const [games, total] = await Promise.all([
      Game.find(filter)
        .select('-downloadUrl -referralUrl -description -howToDownload -faq')
        .sort(sortObj)
        .skip(skip)
        .limit(parseInt(limit))
        .lean(),
      Game.countDocuments(filter)
    ]);

    res.json({
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

// GET /api/games/search?q= - Search games
router.get('/search', async (req, res) => {
  try {
    const { q = '', limit = 100 } = req.query;
    if (!q.trim()) return res.json({ games: [] });

    const games = await Game.find({
      isActive: true,
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { tags: { $regex: q, $options: 'i' } },
        { category: { $regex: q, $options: 'i' } }
      ]
    })
      .select('-downloadUrl -referralUrl -description -howToDownload -faq')
      .sort({ position: 1, downloads: -1 })
      .limit(parseInt(limit))
      .lean();

    res.json({ games });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/games/:slug - Get single game
router.get('/:slug', async (req, res) => {
  try {
    const game = await Game.findOne({ slug: req.params.slug, isActive: true })
      .select('-downloadUrl')
      .lean();
    
    if (!game) return res.status(404).json({ error: 'Game not found' });

    // Get related games (same category first, up to 24 games, at least 18)
    let related = await Game.find({
      category: game.category,
      slug: { $ne: game.slug },
      isActive: true
    })
      .select('title slug logo category rating version downloads bonus isNewGame isComingSoon releaseDate position')
      .sort({ position: 1, createdAt: -1 })
      .limit(24)
      .lean();

    // If category has fewer than 18 games, top up with other active games
    if (related.length < 18) {
      const excludeSlugs = [game.slug, ...related.map((r) => r.slug)];
      const additional = await Game.find({
        slug: { $nin: excludeSlugs },
        isActive: true
      })
        .select('title slug logo category rating version downloads bonus isNewGame isComingSoon releaseDate position')
        .sort({ position: 1, createdAt: -1 })
        .limit(24 - related.length)
        .lean();

      related = [...related, ...additional];
    }

    res.json({ game, related });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
