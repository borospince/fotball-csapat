const express = require('express');
const router = express.Router();

const { createTicket, getTickets, getOccupiedSeats } = require('../controllers/ticketController');

router.post('/', createTicket);
router.get('/', getTickets);
router.get('/occupied', getOccupiedSeats);

module.exports = router;
