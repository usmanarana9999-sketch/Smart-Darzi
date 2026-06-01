const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  shop: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  customer: {type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true},
  scheduledAt: {type: Date, required: true},
  purpose: {type: String, trim: true},
  status: {
    type: String,
    enum: ['Requested', 'Approved', 'Rejected', 'Rescheduled', 'Completed', 'Cancelled'],
    default: 'Requested',
  },
  notes: {type: String, trim: true},
}, {timestamps: true});

appointmentSchema.index({shop: 1, scheduledAt: 1, status: 1});

module.exports = mongoose.model('Appointment', appointmentSchema);
