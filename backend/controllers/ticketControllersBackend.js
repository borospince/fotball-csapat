const Ticket = require('../models/Ticket');

exports.getAllTicketsBackend = async (req, res) => {
    try {
        const tickets = await Ticket.find({}).sort({ createdAt: -1 });
        res.statusCode = 200;
        return res.render('tickets.ejs', { tickets });
    } catch (error) {
        res.statusCode = 404;
        return res.render('404.ejs');
    }
};
