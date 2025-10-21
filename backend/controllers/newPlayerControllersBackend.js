const Footballer = require('../models/Footballer');

exports.getNewPlayerBackend = async (req, res) => {
    try {
        res.statusCode = 200;
        return res.render('new-player.ejs');
    } catch (error) {
        res.statusCode = 404;
        return res.render('404.ejs');
    }
};

exports.postNewPlayerBackend = async (req, res) => {
    try {
        const {
            nev,
            nemzetiseg,
            szuletes,
            korosztaly,
            poszt,
            ugyesebblaba,
            gol,
            golpassz,
            kep,
        } = req.body;

        console.log({
            nev,
            nemzetiseg,
            szuletes,
            korosztaly,
            poszt,
            ugyesebblaba,
            gol,
            golpassz,
            kep,
        });

        const newPlayerBackend = Footballer({
            nev,
            nemzetiseg,
            szuletes,
            korosztaly,
            poszt,
            ugyesebblaba,
            gol,
            golpassz,
            kep,
        });
        console.log(newPlayerBackend);

        await newPlayerBackend.save();
        res.statusCode = 201;
        return res.json({ msg: 'Létrejött az új játékos' });
    } catch (error) {
        res.statusCode = 409;
        return res.json({ msg: 'Nem jött létre az új felhasználó!' });
    }
};
