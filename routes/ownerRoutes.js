const express = require('express');
const { getAllOwners, getOwner } = require('../controllers/OwnerController');
const { PORT, HOST } = require('../app');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.get('/', UserController.getAllOwners);
router.get('/users/owners', getAllOwners);
router.get('/users/owners/:id', getOwner);

module.exports = router;