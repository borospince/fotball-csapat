const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema(
    {
        sajatCsapat: { type: String, required: true },
        ellenfel: { type: String, required: true },
        helyszin: { type: String, required: true },
        datum: { type: Date, required: true },
        hazaiIdegen: { type: String, required: true },
        eredmeny: { type: String, default: '' },
        jegyLink: { type: String, default: '' },
        jegyElerheto: { type: Boolean, default: true },
        liga: { type: String, required: true },
        korosztaly: { type: String, required: true },
    },
    { timestamps: true }
);

const MatchModel = mongoose.model('match', matchSchema);

module.exports = MatchModel;
