const express = require('express');
const auth = require('../middleware/authMiddleware');
const {
  getShopSettings,
  updateShopSettings,
} = require('../controllers/shopSettingsController');

const router = express.Router();

router.use(auth);
router.get('/', getShopSettings);
router.put('/', updateShopSettings);

module.exports = router;
