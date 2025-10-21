const mongoose = require('mongoose');

const footballerSchema = new mongoose.Schema(
    {
        nev: {
            type: String,
            required: true,
        },
        nemzetiseg: {
            type: String,
            required: true,
        },
        szuletes: {
            type: String,
            required: true,
        },
        korosztaly: {
            type: String,
            required: true,
        },
        poszt: {
            type: String,
            required: true,
        },
        ugyesebblaba: {
            type: String,
            required: true,
        },
        gol: {
            type: Number,
            required: true,
        },
        golpassz: {
            type: Number,
            required: true,
        },
        kep: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const FootballerModel = mongoose.model('footballer', footballerSchema);

module.exports = FootballerModel;
