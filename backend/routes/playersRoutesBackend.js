const express = require('express');
const pictureDeleter = require('../middlewares/pictureDelete');
const {
    deleteOneUserBackend, getAllPlayersBackend, getOneUserBackend
} = require('../controllers/playerControllersBackend');

const router = express.Router();

router.get('/', getAllPlayersBackend);
router.get('/:id',getOneUserBackend);
// router.get('/',postUserBackend);
// router.get('/modosit/:id',updateOneUserBackend);
router.delete('/:id', pictureDeleter ,deleteOneUserBackend);

module.exports = router;
