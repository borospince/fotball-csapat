const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        nev:{
            type: String,
            required: true,
        },
        email:{
            type: String,
            required: true,
        },
        jelszo:{
            type: String,
            required: true,
        },
        statusz:{
            type: String,
            default: false
        },
    },
    {timestamps:true}
);

const UserModel = mongoose.model('user',userSchema);

module.exports = UserModel;