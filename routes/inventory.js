const Inventory = require('../models/Inventory');
const createCrudRouter = require('./crudRouteFactory');

module.exports = createCrudRouter(Inventory, 'inventoryItem', {
  listKey: 'inventory',
});
