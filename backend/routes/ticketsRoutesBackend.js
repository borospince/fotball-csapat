const express = require('express');
const {
    getAllTicketsBackend,
} = require('../controllers/ticketControllersBackend');

const router = express.Router();

router.get('/', getAllTicketsBackend);

module.exports = router;
