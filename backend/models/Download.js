const mongoose = require('mongoose');

const downloadSchema = new mongoose.Schema({
  gameId: { type: mongoose.Schema.Types.ObjectId, ref: 'Game', index: true },
  gameSlug: { type: String, index: true },
  ip: { type: String, default: '' },
  userAgent: { type: String, default: '' },
  referrer: { type: String, default: '' }
}, {
  timestamps: true
});

// TTL index — auto-delete download logs after 90 days to save space
downloadSchema.index({ createdAt: 1 }, { expireAfterSeconds: 90 * 24 * 60 * 60 });

module.exports = mongoose.model('Download', downloadSchema);
