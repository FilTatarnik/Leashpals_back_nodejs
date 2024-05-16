const express = require('express');
const { getAllWalkers, getWalker } = require('../controllers/WalkerController');
// const { PORT, HOST } = require('../app');
const router = express.Router();

router.get('/walkers', getAllWalkers);
router.get('/walkers/:id', getWalker);
// router.post('/walkers', createWalker);

module.exports = router;