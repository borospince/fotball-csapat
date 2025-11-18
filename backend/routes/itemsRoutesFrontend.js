const express = require('express');

const {
    getAllItemsFrontend,
} = require('../controllers/ItemControllersFrontend');

const router = express.Router();

router.get('/', getAllItemsFrontend);
//router.get('/:id',getOneUserBackend);
//router.get('/',postUserBackend);
//router.get('/modosit/:id',updateOneUserBackend);
//router.get('/torol/:id',deleteOneUserBackend);

module.exports = router;
