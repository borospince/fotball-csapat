const express = require('express');
const pictureUploader = require('../middlewares/pictureUpload');
const {
    getNewItemBackend,
    postNewItemBackend,
} = require('../controllers/newTermekControllersBackend');

const router = express.Router();

router.get('/', getNewItemBackend);
router.post('/', pictureUploader, postNewItemBackend);

module.exports = router;
