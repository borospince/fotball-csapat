const express = require('express');
const {
    getAllUserBackend,
    postUserBackend,
    getOneUserBackend,
    deleteOneUserBackend,
    updateOneUserBackend,
} = require('../controllers/userControllersBackend');

const router = express.Router();

router.get('/',getAllUserBackend);
router.get('/:id',getOneUserBackend);
router.get('/',postUserBackend);
router.get('/modosit/:id',updateOneUserBackend);
router.get('/torol/:id',deleteOneUserBackend);

module.exports = router;