const express = require('express');
const { getAllWalkers, getWalker } = require('../controllers/WalkerController');
const { PORT, HOST } = require('../app');
const router = express.Router();

router.get('/users/walkers', getAllWalkers);
router.get('/users/walkers/:id', getWalker);
// router.post('/walkers', createWalker);

module.exports = router;