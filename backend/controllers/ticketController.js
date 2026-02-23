const mongoose = require('mongoose');
const Ticket = require('../models/Ticket');

module.exports = {
    createTicket: async (req, res) => {
        try {
            const { matchId, sector, seat } = req.body;

            if (matchId && sector && seat !== undefined) {
                const existing = await Ticket.findOne({
                    matchId,
                    sector,
                    seat
                });

                if (existing) {
                    return res.status(409).json({ message: "Ez a szék már foglalt!" });
                }
            }

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
    },

    getOccupiedSeats: async (req, res) => {
        try {
            const { matchId } = req.query;
            if (!matchId) {
                return res.status(400).json({ message: "Hiányzó matchId" });
            }
            const filters = [{ matchId }];
            if (mongoose.Types.ObjectId.isValid(matchId)) {
                filters.push({ matchId: new mongoose.Types.ObjectId(matchId) });
            }
            const tickets = await Ticket.find({ $or: filters });
            return res.status(200).json({ tickets });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
