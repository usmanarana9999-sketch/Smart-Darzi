const Invoice = require('../models/Invoice');
const createCrudRouter = require('./crudRouteFactory');

module.exports = createCrudRouter(Invoice, 'invoice', {
  listKey: 'invoices',
  populate: ['customer', 'order'],
});
