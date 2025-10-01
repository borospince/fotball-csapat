const User = require('../models/user');

exports.getAllUserBackend = async (req,res) => {
    try {
        const usersBackend = await User.find({});
        res.statusCode = 200;
        return res.render('users.ejs',{usersBackend});
    } catch (error) {
        res.statusCode = 404;
        return res.render('404.ejs');
    }
};

exports.getOneUserBackend = async (req,res) => {
    try{
        const { id } = req.params;
        const userBackend = await User.findById({_id: id });
        res.statusCode = 200;
        return res.render('user.ejs', {userBackend});
    } catch (error){
        res.statusCode = 404;
        return res.render('404.ejs');
    }
};

exports.postUserBackend = async (req,res) => {
    try {
        const {nev,statusz} = req.body;
        const newUserBackend = User({nev,statusz});   
        await newUserBackend.save();
        res.statusCode = 201;
        return res.json({msg:'létre jött az új felhasználó'});
    } catch (error) {
        res.statusCode = 409;
        return res.json({ msg: 'Nem jött létre az új felhasználó!'});
    }

};

exports.updateOneUserBackend = async (req, res) => {
    try{
        const { id } = req.params;
        const { nev, statusz } = req.body;
        await User.findByIdAndUpdate({_id: id }, { nev, statusz});
        res.statusCode = 201;
        return res.json({msg:'sikeres módosítás!'});
    }catch (error) {
        res.statusCode = 404;
        return res.json({msg:'valami hiba történt!'});
    }
};

exports.deleteOneUserBackend = async (req,res) => {
    try {
        const { id } = req.params;
        await User.findByIdAndDelete({_id: id });
        res.statusCode = 200;
        return res.json({msg:'sikeres törtlés!'});
    } catch (error) {
        res.statusCode = 409;
        return res.json({msg:'valami hiba történt!'});
    }
};