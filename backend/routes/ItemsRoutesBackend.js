const express = require('express');
const pictureDeleter = require('../middlewares/pictureDeleteItem.js');
const {
    deleteOneUserBackend, getAllItemsBackend
} = require('../controllers/ItemControllersBackend.js');

const router = express.Router();

router.get('/', getAllItemsBackend);
// router.get('/:id',getOneUserBackend);
// router.get('/',postUserBackend);
// router.get('/modosit/:id',updateOneUserBackend);
router.delete('/:id', pictureDeleter ,deleteOneUserBackend);

module.exports = router;
