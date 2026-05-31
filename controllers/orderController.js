const Order = require('../models/Order');
const Customer = require('../models/Customer');

exports.createOrder = async (req, res, next) => {
  try {
    const {customerId, garment, status, dueDate, notes, price} = req.body;

    if (!customerId || !garment) {
      return res.status(400).json({message: 'customerId and garment are required'});
    }

    const customer = await Customer.findOne({_id: customerId, shop: req.userId});
    if (!customer) {
      return res.status(404).json({message: 'Customer not found'});
    }

    const order = await Order.create({
      shop: req.userId,
      customer: customerId,
      garment,
      status,
      dueDate,
      notes,
      price,
    });

    res.status(201).json({order});
  } catch (err) {
    next(err);
  }
};

exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({shop: req.userId})
      .populate('customer', 'name phone')
      .sort({createdAt: -1});

    res.json({orders});
  } catch (err) {
    next(err);
  }
};

exports.getOrder = async (req, res, next) => {
  try {
    const order = await Order.findOne({_id: req.params.id, shop: req.userId}).populate(
      'customer',
      'name phone'
    );

    if (!order) {
      return res.status(404).json({message: 'Order not found'});
    }

    res.json({order});
  } catch (err) {
    next(err);
  }
};

exports.updateOrder = async (req, res, next) => {
  try {
    const order = await Order.findOneAndUpdate({_id: req.params.id, shop: req.userId}, req.body, {
      new: true,
    });

    if (!order) {
      return res.status(404).json({message: 'Order not found'});
    }

    res.json({order});
  } catch (err) {
    next(err);
  }
};

exports.deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findOneAndDelete({_id: req.params.id, shop: req.userId});
    if (!order) {
      return res.status(404).json({message: 'Order not found'});
    }
    res.json({message: 'Order deleted'});
  } catch (err) {
    next(err);
  }
};
