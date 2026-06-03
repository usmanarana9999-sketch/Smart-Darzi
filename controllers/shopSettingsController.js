const ShopSettings = require('../models/ShopSettings');
const User = require('../models/User');

const defaultWorkingHours = [
  {day: 'Monday', open: '09:00', close: '20:00', closed: false},
  {day: 'Tuesday', open: '09:00', close: '20:00', closed: false},
  {day: 'Wednesday', open: '09:00', close: '20:00', closed: false},
  {day: 'Thursday', open: '09:00', close: '20:00', closed: false},
  {day: 'Friday', open: '09:00', close: '20:00', closed: false},
  {day: 'Saturday', open: '10:00', close: '18:00', closed: false},
  {day: 'Sunday', open: '10:00', close: '18:00', closed: true},
];

const defaultMeasurementCategories = [
  {
    category: 'Men',
    fields: ['Neck', 'Chest', 'Shoulder', 'Waist', 'Sleeve', 'Hip'].map(label => ({
      label,
      enabled: label !== 'Hip',
    })),
  },
  {
    category: 'Women',
    fields: ['Bust', 'Waist', 'Hip', 'Shoulder', 'Arm Length', 'Neck Design'].map(label => ({
      label,
      enabled: true,
    })),
  },
];

const createDefaults = (shopId, user = {}) => ({
  shop: shopId,
  email: user.email || '',
  workingHours: defaultWorkingHours,
  specialtyCategory: user.specialty || 'Both',
  specialties: ['Bespoke Suits', 'Sherwanis', 'Bridal Wear'],
  technicalSpecialties: ['Hand Embroidery', 'Alterations'],
  measurementStandards: {
    unit: 'inches',
    autosave: true,
    categories: defaultMeasurementCategories,
  },
});

const sanitizeUserPayload = (body) => {
  const update = {};
  ['shopName', 'phone', 'email', 'logoUrl', 'specialty'].forEach(key => {
    if (Object.prototype.hasOwnProperty.call(body, key)) {
      update[key] = body[key];
    }
  });
  if (update.specialty && !['Men', 'Women', 'Both'].includes(update.specialty)) {
    update.specialty = 'Both';
  }
  return update;
};

const getOrCreateSettings = async (shopId) => {
  const user = await User.findById(shopId).select('-password');
  if (!user) {
    return null;
  }

  let settings = await ShopSettings.findOne({shop: shopId});
  if (!settings) {
    settings = await ShopSettings.create(createDefaults(shopId, user));
  }

  return {user, settings};
};

exports.getShopSettings = async (req, res, next) => {
  try {
    const result = await getOrCreateSettings(req.userId);
    if (!result) {
      return res.status(404).json({message: 'Shop not found'});
    }

    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.updateShopSettings = async (req, res, next) => {
  try {
    const existing = await getOrCreateSettings(req.userId);
    if (!existing) {
      return res.status(404).json({message: 'Shop not found'});
    }

    const userUpdate = sanitizeUserPayload(req.body.user || req.body);
    if (Object.keys(userUpdate).length) {
      await User.findByIdAndUpdate(req.userId, userUpdate, {
        new: true,
        runValidators: true,
      });
    }

    const settingsPayload = req.body.settings || req.body;
    const allowedSettings = {};
    [
      'address',
      'email',
      'mapPin',
      'workingHours',
      'specialties',
      'technicalSpecialties',
      'specialtyCategory',
      'measurementStandards',
    ].forEach(key => {
      if (Object.prototype.hasOwnProperty.call(settingsPayload, key)) {
        allowedSettings[key] = settingsPayload[key];
      }
    });

    if (
      allowedSettings.specialtyCategory &&
      !userUpdate.specialty &&
      ['Men', 'Women', 'Both'].includes(allowedSettings.specialtyCategory)
    ) {
      await User.findByIdAndUpdate(req.userId, {specialty: allowedSettings.specialtyCategory}, {
        new: true,
        runValidators: true,
      });
    }

    if (Object.keys(allowedSettings).length) {
      await ShopSettings.findOneAndUpdate(
        {shop: req.userId},
        {$set: allowedSettings},
        {
          new: true,
          runValidators: true,
          upsert: true,
          setDefaultsOnInsert: true,
        }
      );
    }

    const result = await getOrCreateSettings(req.userId);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.getShopSettingsPublic = async (req, res, next) => {
  try {
    const shopId = req.params.id || req.params.shopId;
    const user = await User.findById(shopId).select('shopName name phone logoUrl specialty');
    if (!user) {
      return res.status(404).json({message: 'Shop not found'});
    }

    let settings = await ShopSettings.findOne({shop: shopId});
    if (!settings) {
      settings = createDefaults(shopId, user);
    }

    res.json({user, settings});
  } catch (err) {
    next(err);
  }
};
