const mongoose = require('mongoose');
require('dotenv').config({ path: '.env' });

async function fixNullPositions() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to DB');

    const res = await mongoose.connection.db.collection('games').updateMany(
      { position: { $exists: false } },
      { $set: { position: 1000 } }
    );
    
    // Also fix any games that have position set to null
    const res2 = await mongoose.connection.db.collection('games').updateMany(
      { position: null },
      { $set: { position: 1000 } }
    );
    
    console.log(`Updated ${res.modifiedCount} games without position field.`);
    console.log(`Updated ${res2.modifiedCount} games with null position.`);
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

fixNullPositions();
