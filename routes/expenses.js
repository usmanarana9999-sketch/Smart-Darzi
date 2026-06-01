const Expense = require('../models/Expense');
const createCrudRouter = require('./crudRouteFactory');

module.exports = createCrudRouter(Expense, 'expense', {
  listKey: 'expenses',
});
