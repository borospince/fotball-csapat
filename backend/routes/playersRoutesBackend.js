const express = require('express');
const { getAllPlayersBackend } = require('../controllers/playerControllersBackend');

const router = express.Router();

router.get('/',getAllPlayersBackend);
// router.get('/:id',getOneUserBackend);
// router.get('/',postUserBackend);
// router.get('/modosit/:id',updateOneUserBackend);
// router.get('/torol/:id',deleteOneUserBackend);

module.exports = router;