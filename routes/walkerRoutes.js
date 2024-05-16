const express = require('express');
const { getAllWalkers, createWalker } = require('../controllers/WalkerController');

const router = express.Router();

router.get('/walkers', getAllWalkers);
router.post('/walkers', createWalker);

module.exports = WalkerRoutes;