const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  shop: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  name: {type: String, required: true, trim: true},
  category: {
    type: String,
    enum: ['Fabric', 'Thread', 'Buttons', 'Accessories', 'Other'],
    default: 'Other',
  },
  unit: {type: String, trim: true, default: 'pcs'},
  quantity: {type: Number, default: 0},
  lowStockThreshold: {type: Number, default: 0},
  supplier: {type: String, trim: true},
  costPerUnit: {type: Number, default: 0},
  notes: {type: String, trim: true},
}, {timestamps: true});

inventorySchema.virtual('isLowStock').get(function isLowStock() {
  return this.quantity <= this.lowStockThreshold;
});

inventorySchema.index({shop: 1, category: 1, name: 1});

module.exports = mongoose.model('Inventory', inventorySchema);
