const express = require('express');
const pictureDeleter = require('../middlewares/pictureDelete');
const {
    deleteOneUserBackend, getAllItemsBackend
} = require('../controllers/ItemControllersBackend');

const router = express.Router();

router.get('/', getAllItemsBackend);
// router.get('/:id',getOneUserBackend);
// router.get('/',postUserBackend);
// router.get('/modosit/:id',updateOneUserBackend);
router.delete('/:id', pictureDeleter ,deleteOneUserBackend);

module.exports = router;
