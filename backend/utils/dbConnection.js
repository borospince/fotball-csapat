const mongoose = require('mongoose');

const dbConneciton = async () => {
    const csatlakozas = await mongoose.connect(process.env.DBSTRING);
};

module.exports = dbConneciton;