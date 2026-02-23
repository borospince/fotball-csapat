const express = require('express');
const {
    getAllMatchesFrontend,
} = require('../controllers/matchControllersFrontend');

const router = express.Router();

router.get('/', getAllMatchesFrontend);

module.exports = router;
