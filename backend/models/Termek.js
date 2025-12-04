const mongoose = require('mongoose');

const termekSchema = new mongoose.Schema(
    {
        nev: {
            type: String,
            required: true,
        },
        termekleiras:{
            type:String,
            required:true,
        },
        ar:{
            type:Number,
            required:true,
        },
        mennyiseg:{
            type:Number,
            required:true,
        },
        mennyisegiEgyseg:{
            type:Number,
            required:true,
        },
        vAdatok: [{
            type: String,
            required:true,
        }],
        kep: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const TermekModel = mongoose.model('item', termekSchema);

module.exports = TermekModel;
