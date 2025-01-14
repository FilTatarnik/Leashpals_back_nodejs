//Middleware/auth.js
const jwt = require('jsonwebtoken');
//Model Imports
const User = require('../models/UserModel');
const Dog = require('../models/DogModel');

function authenticateToken(req, res, next) {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ error: 'Token is required' });
  }
  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    req.user = user;
    next();
  });
}

async function ensureOwner(req, res, next) {
  try {
      // Check for and validate token format
      const authHeader = req.headers['authorization'];
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
          return res.status(401).json({ error: 'No token provided' });
      }
      const token = authHeader.replace('Bearer ', '');

      // Verify token
      const decoded = jwt.verify(token, JWT_SECRET);
      
      // Get user from database to check role
      const user = await User.findByPk(decoded.id);
      if (!user) {
          return res.status(401).json({ error: 'User not found' });
      }

      // Check if user is a Owner
      if (user.role !== 'Owner') {
          return res.status(403).json({ error: 'Access denied - Owner role required' });
      }

      // Attach user to request for use in route handler
      req.user = user;
      next();
  } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
          return res.status(401).json({ error: 'Invalid token' });
      }
      return res.status(500).json({ error: 'Server error' });
  }
}

module.exports = authenticateToken, ensureOwner;