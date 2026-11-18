require('dotenv').config();
const mongoose = require('mongoose');
const Game = require('../models/Game');
const Category = require('../models/Category');

async function wipeData() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data except Admin
    console.log('Deleting all Games...');
    await Game.deleteMany({});
    console.log('Deleted all Games.');

    console.log('Deleting all Categories...');
    await Category.deleteMany({});
    console.log('Deleted all Categories.');

    console.log('\n✅ Database wiped successfully for production!');
    console.log('Admin account was preserved.');
    
    // Create default categories so the app isn't completely broken
    const categories = [
      { name: 'Rummy', slug: 'rummy', icon: '🃏', description: 'Best Rummy apps with real cash rewards', order: 1, gameCount: 0 },
      { name: 'Casino', slug: 'casino', icon: '🎰', description: 'Top casino games and slots', order: 2, gameCount: 0 },
      { name: 'Slots', slug: 'slots', icon: '🎲', description: 'Exciting slot machine games', order: 3, gameCount: 0 },
      { name: 'Card Games', slug: 'card-games', icon: '♠️', description: 'Classic card game applications', order: 4, gameCount: 0 },
      { name: 'Fantasy', slug: 'fantasy', icon: '⚽', description: 'Fantasy sports and prediction apps', order: 5, gameCount: 0 },
      { name: 'Earning', slug: 'earning', icon: '💰', description: 'Money earning apps and games', order: 6, gameCount: 0 },
    ];
    await Category.insertMany(categories);
    console.log('✅ Default empty categories restored.');

    process.exit(0);
  } catch (error) {
    console.error('Error wiping data:', error);
    process.exit(1);
  }
}

wipeData();
