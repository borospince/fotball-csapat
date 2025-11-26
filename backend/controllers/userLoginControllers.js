// const User = require ('../../models/User.js');
const bcrypt = require ('bcrypt');

exports.loginUser = async (req, res) => {
	try {
		const { email, jelszo } = req.body;

		const users = await User.find({});

		const letezoUser = users.filter(elem => elem.email === email);

		if (letezoUser.length === 0) {
			throw new Error('Ezzel az e-mail címmel nem létezik felhasználó!');
		}
		
		const hasonlit = await bcrypt.compare(jelszo, letezoUser[0].jelszo);

		if (hasonlit) {
			res.statusCode = 200;
			return res.json({ msg: 'Üdvözlünk az oldalunkon!', letezoUser });
		} else {
			throw new Error('Ezzel a jelszóval nem létezik felhasználó!');
		}
    } catch (error) {
		res.statusCode = 500;
        return res.json({ msg: error.message });
    }s
};