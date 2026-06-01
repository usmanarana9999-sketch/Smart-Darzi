const Notification = require('../models/Notification');
const createCrudRouter = require('./crudRouteFactory');

module.exports = createCrudRouter(Notification, 'notification', {
  listKey: 'notifications',
  populate: ['user', 'customer'],
});
