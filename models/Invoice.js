const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  shop: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  customer: {type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true},
  order: {type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true},
  invoiceNumber: {type: String, required: true, trim: true},
  subtotal: {type: Number, default: 0},
  discount: {type: Number, default: 0},
  tax: {type: Number, default: 0},
  total: {type: Number, required: true, min: 0},
  paid: {type: Number, default: 0},
  balance: {type: Number, default: 0},
  pdfUrl: {type: String, trim: true},
  issuedAt: {type: Date, default: Date.now},
  status: {type: String, enum: ['Draft', 'Issued', 'Paid', 'Cancelled'], default: 'Issued'},
}, {timestamps: true});

invoiceSchema.index({shop: 1, invoiceNumber: 1}, {unique: true});
invoiceSchema.index({shop: 1, customer: 1, issuedAt: -1});

module.exports = mongoose.model('Invoice', invoiceSchema);
