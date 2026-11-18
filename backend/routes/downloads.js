const express = require('express');
const router = express.Router();
const Game = require('../models/Game');
const Download = require('../models/Download');

// POST /api/downloads/:slug - Track download & return redirect URL
router.post('/:slug', async (req, res) => {
  try {
    const game = await Game.findOne({ slug: req.params.slug, isActive: true });
    if (!game) return res.status(404).json({ error: 'Game not found' });

    // Track the download
    await Download.create({
      gameId: game._id,
      gameSlug: game.slug,
      ip: req.ip || req.headers['x-forwarded-for'] || '',
      userAgent: req.headers['user-agent'] || '',
      referrer: req.headers.referer || ''
    });

    // Increment download count
    await Game.updateOne({ _id: game._id }, { $inc: { downloads: 1 } });

    // Return both URLs - frontend prioritizes referralUrl for redirect
    res.json({
      downloadUrl: game.downloadUrl || '',
      referralUrl: game.referralUrl || ''
    });
  } catch (error) {
    console.error('Download tracking error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// GET /api/downloads/stats - Download statistics (admin)
router.get('/stats', async (req, res) => {
  try {
    const { days = 30 } = req.query;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(days));

    const [totalDownloads, recentDownloads, topGames, dailyStats] = await Promise.all([
      Download.countDocuments(),
      Download.countDocuments({ createdAt: { $gte: startDate } }),
      Download.aggregate([
        { $group: { _id: '$gameSlug', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 }
      ]),
      Download.aggregate([
        { $match: { createdAt: { $gte: startDate } } },
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
            count: { $sum: 1 }
          }
        },
        { $sort: { _id: 1 } }
      ])
    ]);

    res.json({ totalDownloads, recentDownloads, topGames, dailyStats });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
