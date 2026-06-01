const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  shop: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  name: {type: String, required: true, trim: true},
  phone: {type: String, trim: true},
  email: {type: String, lowercase: true, trim: true},
  role: {type: String, enum: ['MANAGER', 'EMPLOYEE'], default: 'EMPLOYEE'},
  salary: {type: Number, default: 0},
  skills: [{type: String, trim: true}],
  assignedOrders: [{type: mongoose.Schema.Types.ObjectId, ref: 'Order'}],
  attendance: [{
    date: {type: Date, required: true},
    status: {type: String, enum: ['Present', 'Absent', 'Leave', 'Half Day'], default: 'Present'},
    checkIn: Date,
    checkOut: Date,
  }],
  performance: {
    completedOrders: {type: Number, default: 0},
    alterationCount: {type: Number, default: 0},
    rating: {type: Number, min: 0, max: 5, default: 0},
  },
  isActive: {type: Boolean, default: true},
}, {timestamps: true});

employeeSchema.index({shop: 1, name: 'text', phone: 'text'});

module.exports = mongoose.model('Employee', employeeSchema);
