const express = require('express');
const {
  createMeasurement,
  getMeasurements,
  getMeasurement,
  updateMeasurement,
  deleteMeasurement,
} = require('../controllers/measurementController');
const auth = require('../middleware/authMiddleware');

const router = express.Router();
router.use(auth);

router.post('/', createMeasurement);
router.get('/', getMeasurements);
router.get('/:id', getMeasurement);
router.put('/:id', updateMeasurement);
router.delete('/:id', deleteMeasurement);

module.exports = router;
