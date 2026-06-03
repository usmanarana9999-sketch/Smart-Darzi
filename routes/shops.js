const express = require('express');
const User = require('../models/User');

const {getShopSettingsPublic} = require('../controllers/shopSettingsController');

const router = express.Router();

router.get('/:id/settings', getShopSettingsPublic);

router.get('/', async (req, res, next) => {
  try {
    const shops = await User.find({role: {$in: ['OWNER', 'MANAGER']}})
      .select('shopName name specialty phone logoUrl createdAt')
      .sort({createdAt: -1});

    res.json({
      shops: shops.map((shop) => ({
        id: shop._id,
        shopName: shop.shopName,
        name: shop.name,
        specialty: shop.specialty,
        phone: shop.phone,
        logoUrl: shop.logoUrl,
      })),
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
