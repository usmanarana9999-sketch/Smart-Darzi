const Employee = require('../models/Employee');
const createCrudRouter = require('./crudRouteFactory');

module.exports = createCrudRouter(Employee, 'employee', {
  listKey: 'employees',
  populate: ['user', 'assignedOrders'],
});
