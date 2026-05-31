const Measurement = require('../models/Measurement');
const Customer = require('../models/Customer');
const Order = require('../models/Order');

exports.createMeasurement = async (req, res, next) => {
  try {
    const {customerId, orderId, category, values, notes} = req.body;

    if (!customerId || !values) {
      return res.status(400).json({message: 'customerId and values are required'});
    }

    const customer = await Customer.findOne({_id: customerId, shop: req.userId});
    if (!customer) {
      return res.status(404).json({message: 'Customer not found'});
    }

    if (orderId) {
      const order = await Order.findOne({_id: orderId, shop: req.userId});
      if (!order) {
        return res.status(404).json({message: 'Order not found'});
      }
    }

    const measurement = await Measurement.create({
      shop: req.userId,
      customer: customerId,
      order: orderId,
      category,
      values,
      notes,
    });

    res.status(201).json({measurement});
  } catch (err) {
    next(err);
  }
};

exports.getMeasurements = async (req, res, next) => {
  try {
    const measurements = await Measurement.find({shop: req.userId})
      .populate('customer', 'name phone')
      .populate('order', 'garment status')
      .sort({createdAt: -1});

    res.json({measurements});
  } catch (err) {
    next(err);
  }
};

exports.getMeasurement = async (req, res, next) => {
  try {
    const measurement = await Measurement.findOne({_id: req.params.id, shop: req.userId})
      .populate('customer', 'name phone')
      .populate('order', 'garment status');

    if (!measurement) {
      return res.status(404).json({message: 'Measurement not found'});
    }

    res.json({measurement});
  } catch (err) {
    next(err);
  }
};

exports.updateMeasurement = async (req, res, next) => {
  try {
    const measurement = await Measurement.findOneAndUpdate(
      {_id: req.params.id, shop: req.userId},
      req.body,
      {new: true}
    );

    if (!measurement) {
      return res.status(404).json({message: 'Measurement not found'});
    }

    res.json({measurement});
  } catch (err) {
    next(err);
  }
};

exports.deleteMeasurement = async (req, res, next) => {
  try {
    const measurement = await Measurement.findOneAndDelete({_id: req.params.id, shop: req.userId});
    if (!measurement) {
      return res.status(404).json({message: 'Measurement not found'});
    }
    res.json({message: 'Measurement deleted'});
  } catch (err) {
    next(err);
  }
};
