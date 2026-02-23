const Match = require('../models/Match');

exports.getAllMatchesBackend = async (req, res) => {
    try {
        const matches = await Match.find({}).sort({ datum: 1 });
        res.statusCode = 200;
        return res.render('matches.ejs', { matches });
    } catch (error) {
        res.statusCode = 404;
        return res.render('404.ejs');
    }
};

exports.getOneMatchBackend = async (req, res) => {
    try {
        const { id } = req.params;
        const matchBackend = await Match.findById({ _id: id });
        const datumInput = matchBackend?.datum
            ? new Date(matchBackend.datum).toISOString().slice(0, 16)
            : '';
        res.statusCode = 200;
        return res.render('match.ejs', { matchBackend, datumInput });
    } catch (error) {
        res.statusCode = 404;
        return res.render('404.ejs');
    }
};

exports.updateOneMatchBackend = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            sajatCsapat,
            ellenfel,
            helyszin,
            datum,
            hazaiIdegen,
            eredmeny,
            jegyLink,
            jegyElerheto,
            liga,
            korosztaly,
        } = req.body;

        await Match.findByIdAndUpdate(
            { _id: id },
            {
                $set: {
                    sajatCsapat,
                    ellenfel,
                    helyszin,
                    datum,
                    hazaiIdegen,
                    eredmeny,
                    jegyLink,
                    jegyElerheto,
                    liga,
                    korosztaly,
                },
            }
        );

        res.statusCode = 201;
        return res.json({ msg: 'Sikeres módosítás!' });
    } catch (error) {
        res.statusCode = 404;
        return res.json({ msg: 'Valami hiba történt!' + error.message });
    }
};

exports.deleteOneMatchBackend = async (req, res) => {
    try {
        const { id } = req.params;
        await Match.findByIdAndDelete({ _id: id });
        res.statusCode = 200;
        return res.json({ msg: 'Sikeres törlés!' });
    } catch (error) {
        res.statusCode = 409;
        return res.json({ msg: 'Valami hiba történt!' });
    }
};
