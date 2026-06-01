const Appointment = require('../models/Appointment');
const createCrudRouter = require('./crudRouteFactory');

module.exports = createCrudRouter(Appointment, 'appointment', {
  listKey: 'appointments',
  populate: ['customer'],
});
