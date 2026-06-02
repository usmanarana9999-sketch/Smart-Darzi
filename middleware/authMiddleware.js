const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).json({message: 'Authorization token required'});
  }

  const token = authorization.split(' ')[1];

  try {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined');
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = payload.userId;
    const user = await User.findById(payload.userId).select('role');
    if (!user) {
      return res.status(401).json({message: 'Invalid or expired token'});
    }
    req.userRole = user.role;
    next();
  } catch (err) {
    return res.status(401).json({message: 'Invalid or expired token'});
  }
};

auth.requireWorkshopRole = (req, res, next) => {
  if (req.userRole === 'CUSTOMER') {
    return res.status(403).json({message: 'This account cannot access shop-owner resources'});
  }

  next();
};

module.exports = auth;
