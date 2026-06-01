const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  shop: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  category: {
    type: String,
    enum: ['Rent', 'Salaries', 'Utilities', 'Transportation', 'Miscellaneous'],
    default: 'Miscellaneous',
  },
  amount: {type: Number, required: true, min: 0},
  spentAt: {type: Date, default: Date.now},
  vendor: {type: String, trim: true},
  notes: {type: String, trim: true},
  receiptUrl: {type: String, trim: true},
}, {timestamps: true});

expenseSchema.index({shop: 1, category: 1, spentAt: -1});

module.exports = mongoose.model('Expense', expenseSchema);
