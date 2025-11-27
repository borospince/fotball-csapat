const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    match: { type: String, required: true },
    quantity: { type: Number, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Ticket', TicketSchema);
