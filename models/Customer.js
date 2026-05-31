const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  shop: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  name: {type: String, required: true, trim: true},
  phone: {type: String, required: true, trim: true},
  address: {type: String, trim: true},
  notes: {type: String, trim: true},
  photoUrl: {type: String, trim: true},
  createdAt: {type: Date, default: Date.now},
});

module.exports = mongoose.model('Customer', customerSchema);
