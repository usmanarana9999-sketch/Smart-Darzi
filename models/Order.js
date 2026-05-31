const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  shop: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  customer: {type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true},
  garment: {type: String, required: true, trim: true},
  status: {
    type: String,
    enum: ['PENDING', 'IN PROGRESS', 'READY', 'COMPLETED', 'CANCELLED'],
    default: 'PENDING',
  },
  dueDate: {type: Date},
  notes: {type: String, trim: true},
  price: {type: Number, default: 0},
  createdAt: {type: Date, default: Date.now},
});

module.exports = mongoose.model('Order', orderSchema);
