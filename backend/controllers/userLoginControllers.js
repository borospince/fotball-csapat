const User = require ('../models/User.js');
const bcrypt = require ('bcrypt');

exports.loginUser = async (req, res) => {
	try {
		const { email, jelszo } = req.body;
		console.log(email);
		
		
		const users = await User.find({});
		
		const letezoUser = users.filter(elem => elem.email === email);
		console.log(letezoUser);

		if (letezoUser.length === 0) {
			throw new Error('Dupla: Ezzel az e-mail címmel nem létezik felhasználó!');
		}
		
		const hasonlit = await bcrypt.compare(jelszo, letezoUser[0].jelszo);

		if (hasonlit) {
			res.statusCode = 201;
			return res.json({ msg: 'Üdvözlünk az oldalunkon!', letezoUser });
		} else {
			throw new Error('Jelszó: Ezzel a jelszóval nem létezik felhasználó!');
		}
    } catch (error) {
		res.statusCode = 500;
        return res.json({ msg: error.message });
    }
};