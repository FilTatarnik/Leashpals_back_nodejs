const express = require('express');
const { getAllUsers, getOwner, getWalker } = require('../controllers/UserController');
const router = express.Router();

router.get('/', getAllUsers);
// router.get('/owner', getOwner);
// router.get('/walker', getWalker);

module.exports = router;