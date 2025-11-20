const Termek = require('../models/Termek');

exports.getNewItemBackend = async (req, res) => {
    try {
        res.statusCode = 200;
        return res.render('new-item.ejs');
    } catch (error) {
        res.statusCode = 404;
        return res.render('404.ejs');
    }
};

exports.postNewItemBackend = async (req, res) => {
    try {
        const {
            nev,
            termekleiras,
            ar,
            mennyiseg,
            mennyisegiEgyseg,
            kep,
        } = req.body;

        const newTermekBackend = Termek({
            nev,
            termekleiras,
            ar,
            mennyiseg,
            mennyisegiEgyseg,
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
