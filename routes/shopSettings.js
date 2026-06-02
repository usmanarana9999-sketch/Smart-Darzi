const express = require('express');
const auth = require('../middleware/authMiddleware');
const {
  getShopSettings,
  updateShopSettings,
} = require('../controllers/shopSettingsController');

const router = express.Router();

router.use(auth, auth.requireWorkshopRole);
router.get('/', getShopSettings);
router.put('/', updateShopSettings);

module.exports = router;
