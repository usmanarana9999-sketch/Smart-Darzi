const Measurement = require('../models/Measurement');
const Customer = require('../models/Customer');
const Order = require('../models/Order');

exports.createMeasurement = async (req, res, next) => {
  try {
    const {customerId, orderId, profileName, relation, garmentType, category, values, notes} = req.body;

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
      profileName,
      relation,
      garmentType,
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
    const query = {shop: req.userId};

    if (req.query.customerId) {
      query.customer = req.query.customerId;
    }

    const measurements = await Measurement.find(query)
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
    const existingMeasurement = await Measurement.findOne({_id: req.params.id, shop: req.userId});

    if (!existingMeasurement) {
      return res.status(404).json({message: 'Measurement not found'});
    }

    const update = {...req.body};

    if (update.customerId) {
      const customer = await Customer.findOne({_id: update.customerId, shop: req.userId});
      if (!customer) {
        return res.status(404).json({message: 'Customer not found'});
      }
      update.customer = update.customerId;
      delete update.customerId;
    }

    if (update.orderId) {
      const order = await Order.findOne({_id: update.orderId, shop: req.userId});
      if (!order) {
        return res.status(404).json({message: 'Order not found'});
      }
      update.order = update.orderId;
      delete update.orderId;
    }

    const updateOperation = {$set: update};

    if (update.values) {
      updateOperation.$push = {
        history: {
          values: existingMeasurement.values,
          notes: existingMeasurement.notes,
        },
      };
    }

    const measurement = await Measurement.findOneAndUpdate(
      {_id: req.params.id, shop: req.userId},
      updateOperation,
      {new: true}
    )
      .populate('customer', 'name phone')
      .populate('order', 'garment status');

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
