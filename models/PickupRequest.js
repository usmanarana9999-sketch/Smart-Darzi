const mongoose = require('mongoose');

const pickupRequestSchema = new mongoose.Schema({
  shop: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  customer: {type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true},
  address: {type: String, required: true, trim: true},
  scheduledAt: Date,
  status: {
    type: String,
    enum: ['Requested', 'Scheduled', 'Picked Up', 'Cancelled', 'Completed'],
    default: 'Requested',
  },
  notes: {type: String, trim: true},
}, {timestamps: true});

pickupRequestSchema.index({shop: 1, status: 1, scheduledAt: 1});

module.exports = mongoose.model('PickupRequest', pickupRequestSchema);
