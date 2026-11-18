require('dotenv').config();
const mongoose = require('mongoose');
const Game = require('./models/Game');
const Category = require('./models/Category');
const Admin = require('./models/Admin');

const categories = [
  { name: 'Rummy', slug: 'rummy', icon: '🃏', description: 'Best Rummy apps with real cash rewards', order: 1 },
  { name: 'Casino', slug: 'casino', icon: '🎰', description: 'Top casino games and slots', order: 2 },
  { name: 'Slots', slug: 'slots', icon: '🎲', description: 'Exciting slot machine games', order: 3 },
  { name: 'Card Games', slug: 'card-games', icon: '♠️', description: 'Classic card game applications', order: 4 },
  { name: 'Fantasy', slug: 'fantasy', icon: '⚽', description: 'Fantasy sports and prediction apps', order: 5 },
  { name: 'Earning', slug: 'earning', icon: '💰', description: 'Money earning apps and games', order: 6 },
];

const games = [
  {
    title: 'Joy Rummy', slug: 'joy-rummy', category: 'rummy',
    shortDescription: 'Play rummy online and win real cash prizes daily.',
    description: '<h2>About Joy Rummy</h2><p>Joy Rummy is one of the most popular rummy applications available today. Play 13-card rummy, pool rummy, and deals rummy with millions of players across India.</p><h2>Features</h2><ul><li>Multiple rummy variants</li><li>Daily tournaments with big prizes</li><li>Instant withdrawals to bank account</li><li>24/7 customer support</li><li>Anti-fraud system for fair play</li></ul>',
    logo: '', version: '3.2.1', size: '52 MB', rating: 4.7, downloads: 125000,
    bonus: '₹500 Bonus', featured: true, trending: true,
    tags: ['diwa', 'rummy', 'cash', 'bonus', 'cards'],
    downloadUrl: '#', referralUrl: '#',
    faq: [
      { question: 'Is Joy Rummy safe to download?', answer: 'Yes, Joy Rummy is 100% safe and verified. It uses SSL encryption.' },
      { question: 'How to get the ₹500 bonus?', answer: 'Download the app, register with your mobile number, and the bonus is credited instantly.' },
      { question: 'Can I withdraw real money?', answer: 'Yes, you can withdraw winnings directly to your bank account or UPI.' }
    ],
    howToDownload: '<ol><li>Click the Download button above</li><li>Allow installation from unknown sources in your phone settings</li><li>Open the downloaded APK file</li><li>Install and register with your mobile number</li><li>Claim your ₹500 bonus!</li></ol>'
  },
  {
    title: 'diwa Rummy', slug: 'diwa-rummy', category: 'rummy',
    shortDescription: 'India\'s #1 rummy app with instant withdrawals.',
    description: '<h2>About diwa Rummy</h2><p>diwa Rummy brings you the best online rummy experience with exciting tournaments and instant cash prizes.</p>',
    logo: '', version: '2.8.0', size: '48 MB', rating: 4.6, downloads: 98000,
    bonus: '₹300 Bonus', featured: true, trending: true,
    tags: ['diwa', 'rummy', 'online', 'cash'],
    downloadUrl: '#', referralUrl: '#',
    faq: [
      { question: 'Is diwa Rummy legal?', answer: 'Yes, online rummy is a game of skill and is legal in most Indian states.' },
      { question: 'Minimum withdrawal amount?', answer: 'You can withdraw a minimum of ₹100 to your bank account.' }
    ],
    howToDownload: '<ol><li>Click Download APK</li><li>Enable Unknown Sources</li><li>Install the APK</li><li>Sign up and get bonus</li></ol>'
  },
  {
    title: 'Teen Patti Gold', slug: 'teen-patti-gold', category: 'card-games',
    shortDescription: 'Classic Teen Patti card game with live players.',
    description: '<h2>Teen Patti Gold</h2><p>The most popular Teen Patti game in India with millions of active players.</p>',
    logo: '', version: '5.1.0', size: '65 MB', rating: 4.5, downloads: 250000,
    bonus: '₹1000 Chips Free', featured: true, tags: ['teen-patti', 'cards', 'multiplayer'],
    downloadUrl: '#',
    faq: [{ question: 'Can I play with friends?', answer: 'Yes, create private tables and invite friends to play.' }],
    howToDownload: '<ol><li>Download APK</li><li>Install</li><li>Login with Facebook or Guest</li></ol>'
  },
  {
    title: 'Royal Slots', slug: 'royal-slots', category: 'slots',
    shortDescription: 'Premium slot machine experience with huge jackpots.',
    description: '<h2>Royal Slots</h2><p>Experience Las Vegas style slots on your mobile phone.</p>',
    logo: '', version: '1.9.3', size: '78 MB', rating: 4.3, downloads: 67000,
    bonus: '₹200 Free Coins', tags: ['slots', 'casino', 'jackpot'],
    downloadUrl: '#',
    faq: [{ question: 'Is it free to play?', answer: 'Yes, you get free coins daily.' }],
    howToDownload: '<ol><li>Download</li><li>Install</li><li>Claim free coins</li></ol>'
  },
  {
    title: 'Mega Casino', slug: 'mega-casino', category: 'casino',
    shortDescription: 'All-in-one casino with roulette, blackjack, and more.',
    description: '<h2>Mega Casino</h2><p>Your complete casino experience on mobile.</p>',
    logo: '', version: '4.0.2', size: '92 MB', rating: 4.4, downloads: 89000,
    bonus: '₹500 Welcome Bonus', featured: true, trending: true,
    tags: ['casino', 'roulette', 'blackjack', 'bonus'],
    downloadUrl: '#',
    faq: [{ question: 'What games are available?', answer: 'Roulette, Blackjack, Baccarat, Slots, and more.' }],
    howToDownload: '<ol><li>Download APK</li><li>Install</li><li>Create account</li><li>Get welcome bonus</li></ol>'
  },
  {
    title: 'Lucky Poker', slug: 'lucky-poker', category: 'card-games',
    shortDescription: 'Texas Hold\'em poker with real players worldwide.',
    description: '<h2>Lucky Poker</h2><p>Play poker against real opponents.</p>',
    logo: '', version: '2.3.0', size: '55 MB', rating: 4.2, downloads: 45000,
    bonus: '₹100 Free', tags: ['poker', 'cards', 'texas-holdem'],
    downloadUrl: '#',
    faq: [{ question: 'Is it multiplayer?', answer: 'Yes, play against real people.' }],
    howToDownload: '<ol><li>Download</li><li>Install</li><li>Play</li></ol>'
  },
  {
    title: 'Fantasy Cricket Pro', slug: 'fantasy-cricket-pro', category: 'fantasy',
    shortDescription: 'Build your dream cricket team and win prizes.',
    description: '<h2>Fantasy Cricket Pro</h2><p>Create your fantasy cricket team.</p>',
    logo: '', version: '3.5.0', size: '40 MB', rating: 4.6, downloads: 180000,
    bonus: '₹200 Joining Bonus', trending: true,
    tags: ['fantasy', 'cricket', 'sports', 'ipl'],
    downloadUrl: '#',
    faq: [{ question: 'Which leagues are supported?', answer: 'IPL, BBL, PSL, and international matches.' }],
    howToDownload: '<ol><li>Download</li><li>Install</li><li>Create team</li><li>Join contests</li></ol>'
  },
  {
    title: 'Cash Ludo', slug: 'cash-ludo', category: 'earning',
    shortDescription: 'Play Ludo and earn real money with every win.',
    description: '<h2>Cash Ludo</h2><p>Classic Ludo with real cash rewards.</p>',
    logo: '', version: '1.4.0', size: '28 MB', rating: 4.1, downloads: 56000,
    bonus: '₹50 Sign Up Bonus', tags: ['ludo', 'earning', 'casual'],
    downloadUrl: '#',
    faq: [{ question: 'How to earn money?', answer: 'Win matches against other players and withdraw earnings.' }],
    howToDownload: '<ol><li>Download</li><li>Install</li><li>Play and earn</li></ol>'
  },
  {
    title: 'Rummy Circle', slug: 'rummy-circle', category: 'rummy',
    shortDescription: 'India\'s most trusted rummy platform.',
    description: '<h2>Rummy Circle</h2><p>Trusted by millions. Play and win real cash.</p>',
    logo: '', version: '6.0.1', size: '60 MB', rating: 4.8, downloads: 320000,
    bonus: '₹2000 Welcome Bonus', featured: true, trending: true,
    tags: ['rummy', 'trusted', 'cash', 'tournaments'],
    downloadUrl: '#',
    faq: [{ question: 'Is Rummy Circle safe?', answer: 'Yes, certified by iTech Labs for fair play.' }],
    howToDownload: '<ol><li>Download APK</li><li>Install</li><li>Register</li><li>Get ₹2000 bonus</li></ol>'
  },
  {
    title: 'Spin & Win', slug: 'spin-and-win', category: 'casino',
    shortDescription: 'Spin the wheel daily to win exciting prizes.',
    description: '<h2>Spin & Win</h2><p>Daily spin wheel with guaranteed prizes.</p>',
    logo: '', version: '1.1.0', size: '22 MB', rating: 4.0, downloads: 34000,
    bonus: 'Free Daily Spins', tags: ['casino', 'spin', 'prizes', 'daily'],
    downloadUrl: '#',
    faq: [{ question: 'How many free spins per day?', answer: 'You get 5 free spins every day.' }],
    howToDownload: '<ol><li>Download</li><li>Install</li><li>Spin daily</li></ol>'
  },
  {
    title: 'Dragon Slots', slug: 'dragon-slots', category: 'slots',
    shortDescription: 'Mythical dragon-themed slot machines.',
    description: '<h2>Dragon Slots</h2><p>Enter the dragon\'s den and win massive jackpots.</p>',
    logo: '', version: '2.0.0', size: '70 MB', rating: 4.3, downloads: 42000,
    bonus: '₹150 Free Coins', tags: ['slots', 'dragon', 'jackpot'],
    downloadUrl: '#',
    faq: [{ question: 'What is the max jackpot?', answer: 'Progressive jackpots up to ₹10 Lakhs.' }],
    howToDownload: '<ol><li>Download</li><li>Install</li><li>Play and win</li></ol>'
  },
  {
    title: 'Earn Daily', slug: 'earn-daily', category: 'earning',
    shortDescription: 'Complete tasks and earn money every day.',
    description: '<h2>Earn Daily</h2><p>Multiple ways to earn: surveys, games, referrals.</p>',
    logo: '', version: '2.2.0', size: '18 MB', rating: 4.0, downloads: 72000,
    bonus: '₹25 Sign Up', tags: ['earning', 'tasks', 'surveys', 'money'],
    downloadUrl: '#',
    faq: [{ question: 'How to withdraw?', answer: 'Withdraw via UPI or Paytm, minimum ₹50.' }],
    howToDownload: '<ol><li>Download</li><li>Install</li><li>Start earning</li></ol>'
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Promise.all([Game.deleteMany({}), Category.deleteMany({}), Admin.deleteMany({})]);
    console.log('Cleared existing data');

    // Seed categories
    for (const cat of categories) {
      const count = games.filter(g => g.category === cat.slug).length;
      await Category.create({ ...cat, gameCount: count });
    }
    console.log(`Seeded ${categories.length} categories`);

    // Seed games
    await Game.insertMany(games);
    console.log(`Seeded ${games.length} games`);

    // Seed admin
    await Admin.create({ email: 'admin@diwalatestgames.com', password: 'admin123', name: 'Admin' });
    console.log('Seeded admin: admin@diwalatestgames.com / admin123');

    console.log('\n✅ Seed complete!');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
}

seed();
