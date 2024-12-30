const express = require('express');
const { getAllDogs, getDog } = require('../controllers/DogController');
const DogController = require('../controllers/DogController');
// const UserController = require('../controllers/UserController');
const router = express.Router();

router.get('/', DogController.getAllDogs);
// router.get('/dogs/:id', getDog);

module.exports = router;