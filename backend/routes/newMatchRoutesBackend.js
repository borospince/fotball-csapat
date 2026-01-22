const express = require('express');
const {
    getNewMatchBackend,
    postNewMatchBackend,
} = require('../controllers/newMatchControllersBackend.js');

const router = express.Router();

router.get('/', getNewMatchBackend);
router.post('/', postNewMatchBackend);

module.exports = router;
