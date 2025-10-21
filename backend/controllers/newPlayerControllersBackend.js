const Footballer = require('../models/Footballer');

exports.getNewPlayerBackend = async (req,res) => {
    try {
        // const usersBackend = await User.find({});
        res.statusCode = 200;
        return res.render('new-player.ejs');
    } catch (error) {
        res.statusCode = 404;
        return res.render('404.ejs');
    }
};

// exports.postUserBackend = async (req,res) => {
//     try {
//         const {nev,statusz} = req.body;
//         const newUserBackend = User({nev,statusz});   
//         await newUserBackend.save();
//         res.statusCode = 201;
//         return res.json({msg:'létre jött az új felhasználó'});
//     } catch (error) {
//         res.statusCode = 409;
//         return res.json({ msg: 'Nem jött létre az új felhasználó!'});
//     }

// };
