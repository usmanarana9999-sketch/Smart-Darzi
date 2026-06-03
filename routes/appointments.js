const express = require('express');
const Appointment = require('../models/Appointment');
const createCrudRouter = require('./crudRouteFactory');
const auth = require('../middleware/authMiddleware');
const {createCustomerAppointment} = require('../controllers/appointmentController');

const router = express.Router();

router.post('/customer', auth, createCustomerAppointment);
router.use('/', createCrudRouter(Appointment, 'appointment', {
  listKey: 'appointments',
  populate: ['customer'],
}));

module.exports = router;
