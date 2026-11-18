const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const multer = require('multer');
const Game = require('../models/Game');
const Category = require('../models/Category');
const Admin = require('../models/Admin');
const Download = require('../models/Download');
const auth = require('../middleware/auth');
const { uploadImage, uploadScreenshot } = require('../utils/cloudinary');

async function triggerRevalidate(type, payload) {
  const urls = (process.env.FRONTEND_URL || 'http://localhost:3000').split(',').map(s => s.trim()).filter(Boolean);
  const token = process.env.REVALIDATION_TOKEN;
  if (!token) return;
  try {
    const fetch = (await import('node-fetch')).default || global.fetch;
    await Promise.all(
      urls.map(async (url) => {
        try {
          await fetch(`${url}/api/revalidate`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ type, payload })
          });
        } catch (subErr) {
          console.warn(`Revalidate failed for ${url}:`, subErr.message);
        }
      })
    );
  } catch (err) {
    console.error('Failed to trigger revalidation:', err.message);
  }
}

// Multer config for file uploads
const upload = multer({ dest: 'uploads/', limits: { fileSize: 10 * 1024 * 1024 } });

// POST /api/admin/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    
    // Generate session ID and store it
    const sessionId = crypto.randomBytes(16).toString('hex');
    admin.sessions.push({
      sessionId,
      ip: req.ip,
      userAgent: req.headers['user-agent']
    });
    await admin.save();

    const token = jwt.sign({ id: admin._id, sessionId }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, admin: { id: admin._id, email: admin.email, name: admin.name } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/admin/dashboard - Dashboard stats
router.get('/dashboard', auth, async (req, res) => {
  try {
    const [totalGames, totalDownloads, topGames, recentGames, categories, adminUser] = await Promise.all([
      Game.countDocuments({ isActive: true }),
      Download.countDocuments(),
      Game.find({ isActive: true }).sort('-downloads').limit(5).select('title slug downloads logo').lean(),
      Game.find({ isActive: true }).sort('-createdAt').limit(10).select('title slug createdAt logo category').lean(),
      Category.find().sort('order').lean(),
      Admin.findById(req.adminId)
    ]);

    const activeSessions = adminUser ? adminUser.sessions.length : 0;

    res.json({ totalGames, totalDownloads, topGames, recentGames, categories, activeSessions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/admin/games - Create game
router.post('/games', auth, async (req, res) => {
  try {
    const {
      title, slug, description, shortDescription,
      logo, screenshots, category, tags,
      version, size, downloads, rating,
      downloadUrl, referralUrl, bonus,
      featured, trending, isNewGame, isComingSoon, releaseDate, seoTitle, seoDescription,
      faq, howToDownload, isActive, position,
      contentSections
    } = req.body;

    // Validate required fields
    if (!title || !title.trim()) {
      return res.status(400).json({ error: 'Title is required' });
    }
    if (!category || !category.trim()) {
      return res.status(400).json({ error: 'Category is required' });
    }

    // Build game data with only valid fields
    const gameData = {
      title: title.trim(),
      slug: slug ? slug.trim() : undefined,
      description: description || '',
      shortDescription: shortDescription || '',
      logo: logo || '',
      screenshots: Array.isArray(screenshots) ? screenshots.filter(Boolean) : [],
      category: category.trim(),
      tags: Array.isArray(tags) ? tags.filter(Boolean) : [],
      version: version || '1.0',
      size: size || '',
      downloads: downloads || 0,
      rating: typeof rating === 'number' ? Math.min(5, Math.max(1, rating)) : 4.5,
      downloadUrl: downloadUrl || '',
      referralUrl: referralUrl || '',
      bonus: bonus || '',
      featured: !!featured,
      trending: !!trending,
      isNewGame: !!isNewGame,
      isComingSoon: !!isComingSoon,
      releaseDate: releaseDate || null,
      seoTitle: seoTitle || '',
      seoDescription: seoDescription || '',
      faq: Array.isArray(faq) ? faq.filter(f => f && f.question && f.answer) : [],
      howToDownload: howToDownload || '',
      isActive: isActive !== false,
      gameType: req.body.gameType === 'yono' ? 'yono' : 'diwa',
      position: typeof position === 'number' ? position : (position ? parseInt(position) : 1000),
      contentSections: contentSections || undefined
    };

    const game = new Game(gameData);
    
    // Shift positions if taking a top slot
    if (game.position < 1000) {
      await Game.updateMany(
        { position: { $gte: game.position, $lt: 1000 } },
        { $inc: { position: 1 } }
      );
    }
    
    await game.save();

    // Update category game count
    await Category.findOneAndUpdate(
      { slug: game.category },
      { $inc: { gameCount: 1 } },
      { upsert: true, new: true }
    );

    console.log(`Game created: ${game.title} (${game.slug})`);
    // Trigger on-demand ISR
    triggerRevalidate('game', { slug: game.slug, category: game.category });

    res.status(201).json({ game });
  } catch (error) {
    console.error('Create game error:', error);
    if (error.code === 11000) {
      return res.status(400).json({ error: 'A game with this slug already exists. Please use a different title or slug.' });
    }
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(e => e.message).join(', ');
      return res.status(400).json({ error: `Validation error: ${messages}` });
    }
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/admin/games/:id - Update game
router.put('/games/:id', auth, async (req, res) => {
  try {
    const oldGame = await Game.findById(req.params.id);
    if (!oldGame) return res.status(404).json({ error: 'Game not found' });

    const updateData = { ...req.body };
    if (updateData.releaseDate !== undefined) {
      if (!updateData.releaseDate || updateData.releaseDate === '') {
        updateData.releaseDate = null;
      } else {
        const parsed = new Date(updateData.releaseDate);
        updateData.releaseDate = isNaN(parsed.getTime()) ? null : parsed;
      }
    }

    let newPosition = updateData.position;
    if (newPosition !== undefined) {
      newPosition = parseInt(newPosition);
      if (!isNaN(newPosition) && newPosition !== oldGame.position && newPosition < 1000) {
        // Shift other games down to make room for this one
        await Game.updateMany(
          { position: { $gte: newPosition, $lt: 1000 }, _id: { $ne: oldGame._id } },
          { $inc: { position: 1 } }
        );
      }
    }

    const game = await Game.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true
    });

    // Update category counts if category changed or active status changed
    if (oldGame.category !== game.category) {
      const updates = [];
      if (oldGame.isActive) {
        updates.push(Category.findOneAndUpdate({ slug: oldGame.category }, { $inc: { gameCount: -1 } }));
      }
      if (game.isActive) {
        updates.push(Category.findOneAndUpdate({ slug: game.category }, { $inc: { gameCount: 1 } }, { upsert: true }));
      }
      await Promise.all(updates);
    } else if (oldGame.isActive !== game.isActive) {
      if (game.isActive) {
        await Category.findOneAndUpdate({ slug: game.category }, { $inc: { gameCount: 1 } }, { upsert: true });
      } else {
        await Category.findOneAndUpdate({ slug: game.category }, { $inc: { gameCount: -1 } });
      }
    }

    // Trigger on-demand ISR
    triggerRevalidate('game', { slug: game.slug, category: game.category });

    res.json({ game });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/admin/games/:id - Soft delete game (deactivate, hides from site)
router.delete('/games/:id', auth, async (req, res) => {
  try {
    const oldGame = await Game.findById(req.params.id);
    if (!oldGame) return res.status(404).json({ error: 'Game not found' });

    if (oldGame.isActive) {
      await Category.findOneAndUpdate({ slug: oldGame.category }, { $inc: { gameCount: -1 } });
    }

    const game = await Game.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
    
    // Trigger on-demand ISR
    triggerRevalidate('game', { slug: game.slug, category: game.category });
    
    res.json({ message: 'Game deactivated and hidden from site', game });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PATCH /api/admin/games/:id/restore - Restore soft-deleted game (reactivate, shows on site)
router.patch('/games/:id/restore', auth, async (req, res) => {
  try {
    const oldGame = await Game.findById(req.params.id);
    if (!oldGame) return res.status(404).json({ error: 'Game not found' });

    if (!oldGame.isActive) {
      await Category.findOneAndUpdate({ slug: oldGame.category }, { $inc: { gameCount: 1 } }, { upsert: true });
    }

    const game = await Game.findByIdAndUpdate(req.params.id, { isActive: true }, { new: true });
    
    // Trigger on-demand ISR
    triggerRevalidate('game', { slug: game.slug, category: game.category });

    res.json({ message: 'Game restored successfully', game });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/admin/games/:id/permanent - Permanently delete game from database
router.delete('/games/:id/permanent', auth, async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) return res.status(404).json({ error: 'Game not found' });

    if (game.isActive) {
      await Category.findOneAndUpdate({ slug: game.category }, { $inc: { gameCount: -1 } });
    }

    await Game.findByIdAndDelete(req.params.id);
    
    // Trigger on-demand ISR
    triggerRevalidate('game', { slug: game.slug, category: game.category });

    res.json({ message: 'Game permanently deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/admin/games - List all games with status filter, search & gameType
router.get('/games', auth, async (req, res) => {
  try {
    const { page = 1, limit = 50, gameType, status = 'all', search = '' } = req.query;
    const filter = {};

    if (status === 'active') {
      filter.isActive = true;
    } else if (status === 'inactive') {
      filter.isActive = false;
    }

    if (gameType) {
      if (gameType === 'diwa') {
        filter.$and = filter.$and || [];
        filter.$and.push({ $or: [{ gameType: 'diwa' }, { gameType: { $exists: false } }] });
      } else {
        filter.gameType = gameType;
      }
    }

    if (search && search.trim()) {
      const q = search.trim();
      const searchCondition = {
        $or: [
          { title: { $regex: q, $options: 'i' } },
          { slug: { $regex: q, $options: 'i' } },
          { category: { $regex: q, $options: 'i' } }
        ]
      };
      if (filter.$and) {
        filter.$and.push(searchCondition);
      } else {
        filter.$or = searchCondition.$or;
      }
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Build base filter for counts
    const baseCountFilter = {};
    if (gameType) {
      if (gameType === 'diwa') {
        baseCountFilter.$or = [{ gameType: 'diwa' }, { gameType: { $exists: false } }];
      } else {
        baseCountFilter.gameType = gameType;
      }
    }

    const [games, total, activeCount, inactiveCount] = await Promise.all([
      Game.find(filter).sort({ position: 1, createdAt: -1 }).skip(skip).limit(parseInt(limit)).lean(),
      Game.countDocuments(filter),
      Game.countDocuments({ ...baseCountFilter, isActive: true }),
      Game.countDocuments({ ...baseCountFilter, isActive: false })
    ]);

    res.json({
      games,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)) || 1
      },
      counts: {
        all: activeCount + inactiveCount,
        active: activeCount,
        inactive: inactiveCount
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/admin/upload - Upload image to Cloudinary
router.post('/upload', auth, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const type = req.body.type || 'logo'; // 'logo' or 'screenshot'
    let url;
    if (type === 'screenshot') {
      url = await uploadScreenshot(req.file.path);
    } else {
      url = await uploadImage(req.file.path);
    }

    // Clean up temp file
    const fs = require('fs');
    fs.unlink(req.file.path, () => {});

    res.json({ url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/admin/categories - Create/update category
router.post('/categories', auth, async (req, res) => {
  try {
    const category = await Category.findOneAndUpdate(
      { slug: req.body.slug },
      req.body,
      { upsert: true, new: true, runValidators: true }
    );
    res.json({ category });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/admin/password - Change admin password
router.put('/password', auth, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(400).json({ error: 'Old password and new password are required' });
    }
    
    if (newPassword.length < 6) {
      return res.status(400).json({ error: 'New password must be at least 6 characters long' });
    }

    const admin = await Admin.findById(req.adminId);
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    const isMatch = await admin.comparePassword(oldPassword);
    if (!isMatch) {
      return res.status(400).json({ error: 'Incorrect old password' });
    }

    // Keep only the current session, log out all others
    admin.sessions = admin.sessions.filter(s => s.sessionId === req.sessionId);
    admin.password = newPassword;
    await admin.save();

    res.json({ message: 'Password updated successfully. Other devices logged out.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/admin/logout-all - Logout all other devices
router.post('/logout-all', auth, async (req, res) => {
  try {
    const admin = await Admin.findById(req.adminId);
    if (!admin) return res.status(404).json({ error: 'Admin not found' });

    // Keep only the current session
    admin.sessions = admin.sessions.filter(s => s.sessionId === req.sessionId);
    await admin.save();

    res.json({ message: 'All other devices have been logged out successfully.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
