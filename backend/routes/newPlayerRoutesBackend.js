const express = require('express');
const { getNewPlayerBackend } = require('../controllers/newPlayerControllersBackend');

const router = express.Router();

router.get('/',getNewPlayerBackend);
// router.post('/',postUserBackend);

module.exports = router;