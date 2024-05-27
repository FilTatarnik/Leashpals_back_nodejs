const express = require('express');
const { getAllDogs, getDog } = require('../controllers/DogController');
const UserController = require('../controllers/UserController');
const router = express.Router();

router.get('/dogs', UserController.getAllDogs);
// router.get('/dogs/:id', getDog);

module.exports = router;