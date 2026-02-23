const express = require('express');

const pictureDeleter = require('../middlewares/pictureDeleteItem.js');
const {
    deleteOneUserBackend, getAllItemsBackend,
    getOneItemBackend,
    updateOneItemBackend
} = require('../controllers/ItemControllersBackend.js');

const router = express.Router();

router.get('/', getAllItemsBackend);
router.get('/:id',getOneItemBackend);
router.patch('/:id',updateOneItemBackend);
// router.get('/',postUserBackend);
// router.get('/modosit/:id',updateOneUserBackend);
router.delete('/:id', pictureDeleter ,deleteOneUserBackend);

module.exports = router;
