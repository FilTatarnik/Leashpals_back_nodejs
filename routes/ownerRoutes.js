const express = require('express');
const { getAllOwners, getOwner } = require('../controllers/OwnerController');
const router = express.Router();

router.get('/owners', getAllOwners);
router.get('/owners/:id', getOwner);

module.exports = router;