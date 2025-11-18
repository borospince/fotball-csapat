const express = require('express');
const pictureUploader = require('../middlewares/itemPictureUpload');
const {
    getNewItemBackend,
    postNewItemBackend,
} = require('../controllers/newItemControllersBackend.js');

const router = express.Router();

router.get('/', getNewItemBackend);
router.post('/', pictureUploader, postNewItemBackend);

module.exports = router;
