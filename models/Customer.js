const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  shop: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  name: {type: String, required: true, trim: true},
  phone: {type: String, required: true, trim: true},
  email: {type: String, lowercase: true, trim: true},
  address: {type: String, trim: true},
  gender: {type: String, enum: ['Male', 'Female', 'Other', 'Unspecified'], default: 'Unspecified'},
  notes: {type: String, trim: true},
  images: [{
    url: {type: String, trim: true},
    label: {type: String, trim: true},
    uploadedAt: {type: Date, default: Date.now},
  }],
  photoUrl: {type: String, trim: true},
}, {timestamps: true});

customerSchema.index({shop: 1, phone: 1});
customerSchema.index({shop: 1, name: 'text', phone: 'text', email: 'text'});

module.exports = mongoose.model('Customer', customerSchema);
