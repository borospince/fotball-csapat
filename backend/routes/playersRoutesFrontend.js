const express = require('express');

const {
    getAllPlayersFrontend,
} = require('../controllers/playerControllersFrontend');

const router = express.Router();

router.get('/', getAllPlayersFrontend);
//router.get('/:id',getOneUserBackend);
//router.get('/',postUserBackend);
//router.get('/modosit/:id',updateOneUserBackend);
//router.get('/torol/:id',deleteOneUserBackend);

module.exports = router;
