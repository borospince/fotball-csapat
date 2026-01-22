const Match = require('../models/Match');

exports.getNewMatchBackend = async (req, res) => {
    try {
        res.statusCode = 200;
        return res.render('new-match.ejs');
    } catch (error) {
        res.statusCode = 404;
        return res.render('404.ejs');
    }
};

exports.postNewMatchBackend = async (req, res) => {
    try {
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

        const newMatchBackend = Match({
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
        });

        await newMatchBackend.save();
        res.statusCode = 201;
        return res.json({ msg: 'Létrejött az új meccs' });
    } catch (error) {
        res.statusCode = 409;
        return res.json({ msg: 'Nem jött létre az új meccs!' });
    }
};
