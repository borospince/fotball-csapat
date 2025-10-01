const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        nev:{
            type:String,
            required:true,
        },
        statusz:{
            type:String,
            required:true,
        },
    },
    {timestamps:true}
);

const UserModel = mongoose.model('user',userSchema);

module.exports = UserModel;