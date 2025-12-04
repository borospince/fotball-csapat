const express = require('express');
const router = express.Router();
const controller = require('../../controllers/Users/fanMailController');

router.post('/send', controller.sendMessage);
router.get('/all', controller.getMessages);

module.exports = router;
