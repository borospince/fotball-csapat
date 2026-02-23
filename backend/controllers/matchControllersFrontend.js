const Match = require('../models/Match');

exports.getAllMatchesFrontend = async (req, res) => {
    try {
        const matches = await Match.find({}).sort({ datum: 1 });
        res.statusCode = 200;
        return res.json({ matches });
    } catch (error) {
        res.statusCode = 500;
        return res.json({ msg: error.msg });
    }
};
