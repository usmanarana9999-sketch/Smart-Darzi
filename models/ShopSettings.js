const mongoose = require('mongoose');

const workingHourSchema = new mongoose.Schema({
  day: {type: String, required: true, trim: true},
  open: {type: String, default: '09:00', trim: true},
  close: {type: String, default: '20:00', trim: true},
  closed: {type: Boolean, default: false},
}, {_id: false});

const measurementFieldSchema = new mongoose.Schema({
  label: {type: String, required: true, trim: true},
  enabled: {type: Boolean, default: true},
}, {_id: false});

const measurementCategorySchema = new mongoose.Schema({
  category: {type: String, required: true, trim: true},
  fields: [measurementFieldSchema],
}, {_id: false});

const shopSettingsSchema = new mongoose.Schema({
  shop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  address: {type: String, trim: true},
  email: {type: String, lowercase: true, trim: true},
  mapPin: {
    label: {type: String, trim: true},
    latitude: Number,
    longitude: Number,
  },
  workingHours: [workingHourSchema],
  specialties: [{type: String, trim: true}],
  technicalSpecialties: [{type: String, trim: true}],
  specialtyCategory: {
    type: String,
    enum: ['Men', 'Women', 'Both', 'Bridal', 'Unisex'],
    default: 'Both',
  },
  measurementStandards: {
    unit: {type: String, enum: ['inches', 'cm'], default: 'inches'},
    autosave: {type: Boolean, default: true},
    categories: [measurementCategorySchema],
  },
}, {timestamps: true});

module.exports = mongoose.model('ShopSettings', shopSettingsSchema);
