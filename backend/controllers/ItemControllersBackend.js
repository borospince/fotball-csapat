const Termek = require('../models/Termek');

exports.getAllItemsBackend = async (req, res) => {
    try {
        const termekek = await Termek.find({});
        res.statusCode = 200;
        return res.render('items.ejs', { termekek });
    } catch (error) {
        res.statusCode = 404;
        return res.render('404.ejs');
    }
};

exports.getOneItemBackend = async (req,res) => {
    try{
        const { id } = req.params;
        const itemBackend = await Termek.findById({_id: id });
        res.statusCode = 200;
        return res.render('item.ejs', {itemBackend});
    } catch (error){
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

exports.updateOneItemBackend = async (req, res) => {
    try{
        const { id } = req.params;
        const { nev,
            termekleiras,
            ar,
            mennyiseg,
            mennyisegiEgyseg, } = req.body;
        await Termek.findByIdAndUpdate({_id: id }, { $set: { nev, termekleiras, ar, mennyiseg, mennyisegiEgyseg } } );
        res.statusCode = 201;
        return res.json({msg:'sikeres módosítás!'});
    }catch (error) {
        res.statusCode = 404;
        return res.json({msg:'valami hiba történt!' + error.message });
    }
};

exports.deleteOneUserBackend = async (req,res) => {
    try {
        const { id } = req.params;
        console.log('====================================');
        console.log(id);
        console.log('====================================');
        await Termek.findByIdAndDelete({_id: id });
        res.statusCode = 200;
        return res.json({msg:'sikeres törtlés!'});
    } catch (error) {
        res.statusCode = 409;
        return res.json({msg:'valami hiba történt!'});
    }
};
