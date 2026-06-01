const PickupRequest = require('../models/PickupRequest');
const createCrudRouter = require('./crudRouteFactory');

module.exports = createCrudRouter(PickupRequest, 'pickupRequest', {
  listKey: 'pickupRequests',
  populate: ['customer'],
});
