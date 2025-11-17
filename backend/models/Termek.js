const mongoose = require('mongoose');

consttermekSchema = new mongoose.Schema(
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
        kep: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const TermekModel = mongoose.model('footballer', termekSchema);

module.exports = TermekModel;
