const express = require('express');

const {
  getAllItemsFrontend,
  decreaseStockFrontend,
  increaseStockFrontend,
} = require('../controllers/ItemControllersFrontend');

const router = express.Router();

router.get('/', getAllItemsFrontend);

// ✅ készlet csökkentés (kosárba rakáskor)
router.patch('/:id/decrease-stock', decreaseStockFrontend);

// ✅ készlet növelés (kosárból törlésnél / visszaadás)
router.patch('/:id/increase-stock', increaseStockFrontend);

module.exports = router;
