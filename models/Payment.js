const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  shop: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  customer: {type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true},
  order: {type: mongoose.Schema.Types.ObjectId, ref: 'Order'},
  amount: {type: Number, required: true, min: 0},
  type: {type: String, enum: ['Advance', 'Balance', 'Refund'], default: 'Advance'},
  method: {type: String, enum: ['Cash', 'Card', 'Bank', 'Wallet', 'Other'], default: 'Cash'},
  reference: {type: String, trim: true},
  paidAt: {type: Date, default: Date.now},
  notes: {type: String, trim: true},
}, {timestamps: true});

paymentSchema.index({shop: 1, customer: 1, paidAt: -1});

module.exports = mongoose.model('Payment', paymentSchema);
