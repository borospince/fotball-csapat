const Ticket = require('../models/Ticket');

module.exports = {
    createTicket: async (req, res) => {
        try {
            const ticket = await Ticket.create(req.body);
            return res.status(201).json(ticket);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },

    getTickets: async (req, res) => {
        try {
            const tickets = await Ticket.find();
            return res.status(200).json(tickets);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
