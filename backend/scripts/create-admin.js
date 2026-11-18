require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('../models/Admin');

async function createAdmin() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const email = 'admin@diwagamekaatufan.com';
    const password = 'admin123';

    let admin = await Admin.findOne({ email });
    if (admin) {
      console.log('Admin already exists. Resetting password...');
      admin.password = password;
      await admin.save();
    } else {
      console.log('Admin does not exist. Creating...');
      admin = await Admin.create({ email, password, name: 'Admin' });
    }

    console.log(`✅ Admin account ready!`);
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

createAdmin();
