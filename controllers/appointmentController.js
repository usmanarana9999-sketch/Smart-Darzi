const Appointment = require('../models/Appointment');
const Customer = require('../models/Customer');
const User = require('../models/User');

exports.createCustomerAppointment = async (req, res, next) => {
  try {
    const {shopId, scheduledAt, purpose, notes} = req.body;

    if (!shopId || !scheduledAt) {
      return res.status(400).json({message: 'shopId and scheduledAt are required'});
    }

    const shop = await User.findOne({_id: shopId, role: {$in: ['OWNER', 'MANAGER']}});
    if (!shop) {
      return res.status(404).json({message: 'Shop not found'});
    }

    const customerUser = await User.findById(req.userId).select('name phone email');
    if (!customerUser) {
      return res.status(401).json({message: 'Customer not found'});
    }

    let customer = await Customer.findOne({shop: shopId, user: req.userId});
    if (!customer) {
      customer = await Customer.create({
        shop: shopId,
        user: req.userId,
        name: customerUser.name || customerUser.email || 'Customer',
        phone: customerUser.phone,
        email: customerUser.email,
      });
    }

    const appointment = await Appointment.create({
      shop: shopId,
      customer: customer._id,
      scheduledAt: new Date(scheduledAt),
      purpose: purpose || 'Home Visit',
      notes,
      status: 'Requested',
    });

    res.status(201).json({appointment});
  } catch (err) {
    next(err);
  }
};
