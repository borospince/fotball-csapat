const express = require('express');
const {
    getAllMatchesBackend,
    getOneMatchBackend,
    updateOneMatchBackend,
    deleteOneMatchBackend,
} = require('../controllers/matchControllersBackend');

const router = express.Router();

router.get('/', getAllMatchesBackend);
router.get('/:id', getOneMatchBackend);
router.patch('/:id', updateOneMatchBackend);
router.delete('/:id', deleteOneMatchBackend);

module.exports = router;
