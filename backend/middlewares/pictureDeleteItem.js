const cloudinary = require('cloudinary').v2;
const Termek = require('../models/Termek');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_API_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const pictureDeleter = async (req, res, next) => {
    const { id } = req.params;
    console.log('====================================');
    console.log(id);
    console.log('====================================');
    const torolKep = await Termek.findById({ _id: id });
    console.log(torolKep);
    
    const kep = torolKep.kep.split('/')[6].split('?')[0];
    console.log(kep);

    await cloudinary.uploader.destroy(kep.toString());

    next();
};

module.exports = pictureDeleter;
