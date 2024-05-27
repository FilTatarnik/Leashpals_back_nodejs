const express = require('express');
const { getAllWalkers, getWalker } = require('../controllers/UserController');
const { PORT, HOST } = require('../app');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.get('/', UserController.getAllWalkers);
router.get('/users/walkers', getAllWalkers);
router.get('/users/walkers/:id', getWalker);
// router.post('/walkers', createWalker);

module.exports = router;