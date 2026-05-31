const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  shopName: {type: String, required: true, trim: true},
  specialty: {type: String, enum: ['Men', 'Women', 'Both'], default: 'Both'},
  phone: {type: String, required: true, unique: true, trim: true},
  password: {type: String, required: true},
  logoUrl: {type: String, trim: true},
  createdAt: {type: Date, default: Date.now},
});

module.exports = mongoose.model('User', userSchema);
