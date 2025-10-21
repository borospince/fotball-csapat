const mongoose = require('mongoose');

const footballerSchema = new mongoose.Schema(
    {
        nev:{
            type:String,
            required:true,
        },
        nemzetiseg:{
            type:String,
            required:true,
        },
        poszt:{
            type:String,
            required:true,
        },
        ugyesebblaba:{
            type:String,
            required:true,
        },
        gol:{
            type:String,
            required:true,
        },
        golpasz:{
            type:String,
            required:true,
        },
    },
    {timestamps:true}
);

const FootballerModel = mongoose.model('footballer', footballerSchema);

module.exports = FootballerModel;