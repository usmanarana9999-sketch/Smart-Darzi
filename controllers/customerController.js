const Customer = require('../models/Customer');

exports.createCustomer = async (req, res, next) => {
  try {
    const {name, phone, address, notes, photoUrl} = req.body;

    if (!name || !phone) {
      return res.status(400).json({message: 'name and phone are required'});
    }

    const customer = await Customer.create({
      shop: req.userId,
      name,
      phone,
      address,
      notes,
      photoUrl,
    });

    res.status(201).json({customer});
  } catch (err) {
    next(err);
  }
};

exports.getCustomers = async (req, res, next) => {
  try {
    const customers = await Customer.find({shop: req.userId}).sort({createdAt: -1});
    res.json({customers});
  } catch (err) {
    next(err);
  }
};

exports.getCustomer = async (req, res, next) => {
  try {
    const customer = await Customer.findOne({_id: req.params.id, shop: req.userId});
    if (!customer) {
      return res.status(404).json({message: 'Customer not found'});
    }
    res.json({customer});
  } catch (err) {
    next(err);
  }
};

exports.updateCustomer = async (req, res, next) => {
  try {
    const customer = await Customer.findOneAndUpdate(
      {_id: req.params.id, shop: req.userId},
      req.body,
      {new: true}
    );

    if (!customer) {
      return res.status(404).json({message: 'Customer not found'});
    }

    res.json({customer});
  } catch (err) {
    next(err);
  }
};

exports.deleteCustomer = async (req, res, next) => {
  try {
    const customer = await Customer.findOneAndDelete({_id: req.params.id, shop: req.userId});
    if (!customer) {
      return res.status(404).json({message: 'Customer not found'});
    }
    res.json({message: 'Customer deleted'});
  } catch (err) {
    next(err);
  }
};
