const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  shopName: {type: String, required: true, trim: true},
  name: {type: String, trim: true},
  email: {type: String, lowercase: true, trim: true},
  specialty: {type: String, enum: ['Men', 'Women', 'Both'], default: 'Both'},
  phone: {type: String, required: true, unique: true, trim: true},
  password: {type: String, required: true},
  role: {
    type: String,
    enum: ['OWNER', 'MANAGER', 'EMPLOYEE', 'CUSTOMER'],
    default: 'OWNER',
  },
  logoUrl: {type: String, trim: true},
  language: {type: String, enum: ['en', 'ur'], default: 'en'},
  theme: {type: String, enum: ['light', 'dark', 'system'], default: 'system'},
  fcmTokens: [{type: String, trim: true}],
  otp: {
    code: {type: String, trim: true},
    expiresAt: Date,
    verifiedAt: Date,
  },
  resetPassword: {
    tokenHash: {type: String, trim: true},
    expiresAt: Date,
  },
}, {timestamps: true});

module.exports = mongoose.model('User', userSchema);
