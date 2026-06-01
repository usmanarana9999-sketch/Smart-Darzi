const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  shop: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  customer: {type: mongoose.Schema.Types.ObjectId, ref: 'Customer'},
  type: {
    type: String,
    enum: [
      'New Order',
      'Trial Reminder',
      'Delivery Reminder',
      'Appointment Reminder',
      'Payment Reminder',
      'Pickup Reminder',
    ],
    required: true,
  },
  title: {type: String, required: true, trim: true},
  body: {type: String, required: true, trim: true},
  data: {type: Map, of: String},
  readAt: Date,
  sentAt: Date,
}, {timestamps: true});

notificationSchema.index({shop: 1, user: 1, createdAt: -1});

module.exports = mongoose.model('Notification', notificationSchema);
