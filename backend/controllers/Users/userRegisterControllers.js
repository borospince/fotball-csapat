const User = require('../../models/User.js');
const bcrypt = require('bcrypt');

exports.registerUser = async (req, res) => {
    try{
        const { nev, email, jelszo } = req.body;

        const users  = await User.find({});

        const letezoUser = users.filter(elem => elem.email === email);

        if(letezoUser.length !== 0) {
            throw new Error('Ezzel az e-mail címmel már regisztráltak!');
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(jelszo, salt);

        const newUser = new User({nev, email, jelszo: hashedPassword});
        await newUser.save();

        res.statusCode = 201;
        return res.json({msg: 'Sikeres regisztrció!'});
    } catch(error) {
        res.statusCode = 500;
        return res.json({msg: error.message});
    }
};
