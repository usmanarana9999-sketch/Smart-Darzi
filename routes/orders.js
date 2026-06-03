const express = require('express');
const {
  createCustomerOrder,
  createOrder,
  getOrders,
  getOrder,
  updateOrder,
  deleteOrder,
} = require('../controllers/orderController');
const auth = require('../middleware/authMiddleware');

const router = express.Router();
router.post('/customer', auth, createCustomerOrder);
router.use(auth, auth.requireWorkshopRole);

router.post('/', createOrder);
router.get('/', getOrders);
router.get('/:id', getOrder);
router.put('/:id', updateOrder);
router.delete('/:id', deleteOrder);

module.exports = router;
