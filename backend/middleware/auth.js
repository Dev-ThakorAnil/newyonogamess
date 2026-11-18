const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check if the session is still valid in the database
    const admin = await Admin.findOne({ 
      _id: decoded.id, 
      'sessions.sessionId': decoded.sessionId 
    });
    
    if (!admin) {
      return res.status(401).json({ error: 'Session expired or invalid' });
    }

    req.adminId = decoded.id;
    req.sessionId = decoded.sessionId;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

module.exports = auth;
