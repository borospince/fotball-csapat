const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    match: { type: String, required: true },
    matchId: { type: mongoose.Schema.Types.ObjectId, ref: 'match' },
    sector: { type: String },
    seat: { type: Number },
    quantity: { type: Number, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Ticket', TicketSchema);
