const express = require('express');
const { getAllWalkers } = require('../controllers/WalkerController');
// const { PORT, HOST } = require('../app');
const router = express.Router();


router.get('/walkers', getAllWalkers);
// router.post('/walkers', createWalker);

module.exports = router;