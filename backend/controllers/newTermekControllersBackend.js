const Termek = require('../models/termek');

exports.getNewTermekBackend = async (req, res) => {
    try {
        res.statusCode = 200;
        return res.render('new-items.ejs');
    } catch (error) {
        res.statusCode = 404;
        return res.render('404.ejs');
    }
};

exports.postNewTermekBackend = async (req, res) => {
    try {
        const {
            nev,
            termekleiras,
            ar,
            kep,
        } = req.body;

        const newTermekBackend = Termek({
            nev,
            termekleiras,
            ar,
            kep,
        });
        console.log(newTermekBackend);

        await newTermekBackend.save();
        res.statusCode = 201;
        return res.json({ msg: 'Létrejött az új termék' });
    } catch (error) {
        res.statusCode = 409;
        return res.json({ msg: 'Nem jött létre az új termék' });
    }
};
