const mongoose = require('mongoose');
const slugify = require('slugify');

// Reusable sub-schema for content sections
const contentSectionSchema = {
  visible: { type: Boolean, default: true },
  content: { type: String, default: '' }
};

const gameSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, unique: true, index: true },
  description: { type: String, default: '' },
  shortDescription: { type: String, default: '' },
  logo: { type: String, default: '' },
  screenshots: [{ type: String }],
  category: { type: String, required: true, index: true },
  tags: [{ type: String, index: true }],
  version: { type: String, default: '1.0' },
  size: { type: String, default: '' },
  downloads: { type: Number, default: 0 },
  rating: { type: Number, default: 4.5, min: 1, max: 5 },
  downloadUrl: { type: String, default: '' },
  referralUrl: { type: String, default: '' },
  bonus: { type: String, default: '' },
  featured: { type: Boolean, default: false, index: true },
  trending: { type: Boolean, default: false, index: true },
  seoTitle: { type: String, default: '' },
  seoDescription: { type: String, default: '' },
  faq: [{ question: { type: String }, answer: { type: String } }],
  howToDownload: { type: String, default: '' },

  // Admin-managed content sections
  contentSections: {
    aboutGame:           contentSectionSchema,
    keyFeatures:         contentSectionSchema,
    systemRequirements:  contentSectionSchema,
    whyChoose:           contentSectionSchema,
    safetyAndSecurity:   contentSectionSchema,
  },

  isNewGame: { type: Boolean, default: false },
  isComingSoon: { type: Boolean, default: false },
  releaseDate: { type: Date },
  isActive: { type: Boolean, default: true },
  gameType: { type: String, enum: ['diwa', 'yono'], default: 'diwa', index: true },
  position: { type: Number, default: 1000, index: true }
}, {
  timestamps: true
});

// Auto-generate slug from title, and always ensure slug is URL-safe
gameSchema.pre('save', function(next) {
  if (this.isModified('title') || this.isModified('slug') || !this.slug) {
    // If slug is provided, slugify it; otherwise generate from title
    const rawSlug = this.slug && this.slug.trim() ? this.slug : this.title;
    this.slug = slugify(rawSlug, { lower: true, strict: true });
  }
  // Auto-generate SEO fields if empty
  if (!this.seoTitle) {
    this.seoTitle = `${this.title} APK Download ${new Date().getFullYear()} ${this.bonus ? '- ' + this.bonus : ''}`.trim();
  }
  if (!this.seoDescription) {
    this.seoDescription = `Download ${this.title} APK latest version ${this.version}. ${this.bonus || ''} ${this.shortDescription}`.trim();
  }

  // Auto-generate default content sections if empty (only on first save)
  if (!this.contentSections) {
    this.contentSections = {};
  }
  const cs = this.contentSections;
  const t = this.title;
  const b = this.bonus || '₹500';
  const cat = (this.category || 'gaming').replace(/-/g, ' ');

  if (!cs.aboutGame || !cs.aboutGame.content) {
    cs.aboutGame = {
      visible: true,
      content: `<p>${t} is one of the most popular ${cat} applications in India, offering users an exciting opportunity to earn real money while playing their favorite games. With a user-friendly interface and secure payment system, this app has gained the trust of thousands of players across the country.</p><p>The app features a wide variety of games that not only provide entertainment but also offer substantial earning opportunities for skilled players.</p>`
    };
  }
  if (!cs.keyFeatures || !cs.keyFeatures.content) {
    cs.keyFeatures = {
      visible: true,
      content: `<ul><li><strong>Welcome Bonus:</strong> Get ${b} as a sign-up bonus when you register</li><li><strong>Low Withdrawal:</strong> Minimum withdrawal amount is just ₹100</li><li><strong>Secure Payments:</strong> Fast and secure payment processing</li><li><strong>24/7 Support:</strong> Round-the-clock customer support</li><li><strong>Fair Play:</strong> Certified random number generator for fair gameplay</li><li><strong>Multiple Games:</strong> Wide variety of skill-based games</li></ul>`
    };
  }
  if (!cs.systemRequirements || !cs.systemRequirements.content) {
    cs.systemRequirements = {
      visible: true,
      content: `<table><tr><td>Operating System</td><td>Android ${this.minAndroidVersion || '5.0'} or higher</td></tr><tr><td>Minimum RAM</td><td>2 GB</td></tr><tr><td>Storage Space</td><td>${this.size ? this.size + ' free' : '100 MB free'}</td></tr><tr><td>Internet</td><td>WiFi or 4G/5G</td></tr><tr><td>Screen Size</td><td>4.5" or larger</td></tr></table>`
    };
  }
  if (!cs.whyChoose || !cs.whyChoose.content) {
    cs.whyChoose = {
      visible: true,
      content: `<ul><li>${b} sign-up bonus + daily rewards</li><li>Quick withdrawals starting at ₹100</li><li>Wide variety of games with regular updates</li><li>Lightweight app with smooth performance</li><li>Secure transactions and verified payouts</li><li>Fast payouts, smooth gameplay, and daily rewards</li></ul>`
    };
  }
  if (!cs.safetyAndSecurity || !cs.safetyAndSecurity.content) {
    cs.safetyAndSecurity = {
      visible: true,
      content: `<p>Your safety and security are our top priorities. ${t} uses advanced encryption technology to protect your personal and financial information. All transactions are processed through secure payment gateways, ensuring your money is always safe.</p><p>The app is regularly updated with the latest security patches and features to provide you with the best gaming experience while maintaining the highest standards of security.</p>`
    };
  }

  next();
});

module.exports = mongoose.model('Game', gameSchema);
