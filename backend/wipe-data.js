require('dotenv').config();
const mongoose = require('mongoose');
const Game = require('./models/Game');
const Category = require('./models/Category');

async function wipeData() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    console.log('Deleting all games...');
    await Game.deleteMany({});
    console.log('✅ All dummy games have been removed.');

    console.log('Deleting all categories...');
    await Category.deleteMany({});
    console.log('✅ All dummy categories have been removed.');

    console.log('Admin account was NOT deleted. You can still log in.');
    
    process.exit(0);
  } catch (error) {
    console.error('Error wiping data:', error);
    process.exit(1);
  }
}

wipeData();
