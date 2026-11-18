const mongoose = require('mongoose');
const Game = require('../models/Game');
require('dotenv').config({ path: '.env' });

async function fixPositions() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to DB');

    // Get all games that have a position < 1000, sorted by position, then by newest
    const games = await Game.find({ position: { $lt: 1000 } }).sort({ position: 1, createdAt: -1 });
    
    let currentPos = 1;
    for (const game of games) {
      console.log(`Setting ${game.title} from pos ${game.position} to ${currentPos}`);
      game.position = currentPos;
      await game.save();
      currentPos++;
    }
    
    console.log('Finished fixing positions!');
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

fixPositions();
