const express = require('express');
const { getAllDogs, getDog } = require('../controllers/DogController');
const router = express.Router();

router.get('/dogs', getAllDogs);
// router.get('/dogs/:id', getDog);

module.exports = router;