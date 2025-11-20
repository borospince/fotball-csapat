const express = require('express');
const {
    getNewItemBackend,
    postNewItemBackend,
} = require('../controllers/newItemControllersBackend.js');
const pictureUploader = require('../middlewares/pictureUpload.js');

const router = express.Router();

router.get('/', getNewItemBackend);
router.post('/', pictureUploader, postNewItemBackend);

module.exports = router;
