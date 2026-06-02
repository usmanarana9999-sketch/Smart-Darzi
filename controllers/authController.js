const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const createToken = (user) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
  }

  return jwt.sign(
    {userId: user._id, phone: user.phone, role: user.role},
    process.env.JWT_SECRET,
    {expiresIn: '12h'}
  );
};

exports.signup = async (req, res, next) => {
  try {
    const {shopName, name, specialty, phone, password, logoUrl, role} = req.body;
    const accountRole = role === 'CUSTOMER' ? 'CUSTOMER' : 'OWNER';

    if (!phone || !password || (accountRole === 'OWNER' && !shopName)) {
      return res.status(400).json({message: 'shopName, phone, and password are required'});
    }

    const existing = await User.findOne({phone});
    if (existing) {
      return res.status(400).json({message: 'Phone number already registered'});
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      shopName: accountRole === 'CUSTOMER' ? shopName || name || 'Smart Darzi Customer' : shopName,
      name,
      specialty,
      phone,
      password: hashedPassword,
      role: accountRole,
      logoUrl,
    });

    const token = createToken(user);

    res.status(201).json({
      user: {
        id: user._id,
        shopName: user.shopName,
        name: user.name,
        specialty: user.specialty,
        phone: user.phone,
        role: user.role,
        logoUrl: user.logoUrl,
      },
      token,
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const {phone, password} = req.body;

    if (!phone || !password) {
      return res.status(400).json({message: 'phone and password are required'});
    }

    const user = await User.findOne({phone});
    if (!user) {
      return res.status(401).json({message: 'Invalid credentials'});
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({message: 'Invalid credentials'});
    }

    const token = createToken(user);
    res.json({
      user: {
        id: user._id,
        shopName: user.shopName,
        name: user.name,
        specialty: user.specialty,
        phone: user.phone,
        role: user.role,
        logoUrl: user.logoUrl,
      },
      token,
    });
  } catch (err) {
    next(err);
  }
};

exports.me = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      return res.status(404).json({message: 'User not found'});
    }
    res.json({user});
  } catch (err) {
    next(err);
  }
};
