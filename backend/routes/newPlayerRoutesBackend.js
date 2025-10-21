const express = require('express');
const pictureUploader = require('../middlewares/pictureUpload');
const {
    getNewPlayerBackend,
    postNewPlayerBackend,
} = require('../controllers/newPlayerControllersBackend');

const router = express.Router();

router.get('/', getNewPlayerBackend);
router.post('/', pictureUploader, postNewPlayerBackend);

module.exports = router;
