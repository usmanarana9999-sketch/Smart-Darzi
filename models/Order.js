const mongoose = require('mongoose');

const ORDER_STATUSES = [
  'Pending',
  'Fabric Received',
  'Cutting',
  'Stitching',
  'Trial Ready',
  'Alteration',
  'Ready',
  'Delivered',
  'Cancelled',
];

const orderSchema = new mongoose.Schema({
  shop: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  customer: {type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true},
  assignedTo: {type: mongoose.Schema.Types.ObjectId, ref: 'Employee'},
  garment: {type: String, required: true, trim: true},
  garmentType: {type: String, trim: true},
  quantity: {type: Number, min: 1, default: 1},
  fabricDetails: {type: String, trim: true},
  designNotes: {type: String, trim: true},
  trialDate: Date,
  deliveryDate: Date,
  dueDate: Date,
  price: {type: Number, default: 0},
  advancePayment: {type: Number, default: 0},
  remainingBalance: {type: Number, default: 0},
  status: {type: String, enum: ORDER_STATUSES, default: 'Pending'},
  timeline: [{
    status: {type: String, enum: ORDER_STATUSES},
    note: String,
    changedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    changedAt: {type: Date, default: Date.now},
  }],
  designs: [{
    type: {
      type: String,
      enum: ['Front', 'Back', 'Sleeve', 'Collar', 'Reference', 'Other'],
      default: 'Reference',
    },
    imageUrl: {type: String, trim: true},
    notes: {type: String, trim: true},
  }],
  notes: {type: String, trim: true},
}, {timestamps: true});

orderSchema.pre('save', function setBalance(next) {
  this.remainingBalance = Math.max((this.price || 0) - (this.advancePayment || 0), 0);
  next();
});

orderSchema.index({shop: 1, status: 1, deliveryDate: 1});
orderSchema.index({shop: 1, garment: 'text', garmentType: 'text', notes: 'text'});

module.exports = mongoose.model('Order', orderSchema);
module.exports.ORDER_STATUSES = ORDER_STATUSES;
