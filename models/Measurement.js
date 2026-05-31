const mongoose = require('mongoose');

const measurementSchema = new mongoose.Schema({
  shop: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  customer: {type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true},
  order: {type: mongoose.Schema.Types.ObjectId, ref: 'Order'},
  category: {type: String, enum: ['Men', 'Women', 'Custom'], default: 'Custom'},
  values: {type: Map, of: String, required: true},
  notes: {type: String, trim: true},
  createdAt: {type: Date, default: Date.now},
});

module.exports = mongoose.model('Measurement', measurementSchema);
