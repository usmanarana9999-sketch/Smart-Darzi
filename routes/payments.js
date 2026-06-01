const Payment = require('../models/Payment');
const createCrudRouter = require('./crudRouteFactory');

module.exports = createCrudRouter(Payment, 'payment', {
  listKey: 'payments',
  populate: ['customer', 'order'],
});
