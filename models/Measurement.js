const mongoose = require('mongoose');

const measurementSchema = new mongoose.Schema({
  shop: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  customer: {type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true},
  order: {type: mongoose.Schema.Types.ObjectId, ref: 'Order'},
  profileName: {type: String, trim: true, default: 'Self'},
  relation: {type: String, trim: true},
  garmentType: {
    type: String,
    enum: ['Shalwar Kameez', 'Shirt', 'Pant', 'Waistcoat', 'Coat', 'Suit', 'Sherwani', 'Custom'],
    default: 'Custom',
  },
  category: {type: String, enum: ['Men', 'Women', 'Custom'], default: 'Custom'},
  values: {type: Map, of: String, required: true},
  history: [{
    values: {type: Map, of: String},
    notes: String,
    changedAt: {type: Date, default: Date.now},
  }],
  notes: {type: String, trim: true},
}, {timestamps: true});

measurementSchema.index({shop: 1, customer: 1, garmentType: 1});

module.exports = mongoose.model('Measurement', measurementSchema);
