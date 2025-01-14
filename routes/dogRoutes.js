const express = require('express');
const {getAllDogs, getDog}  = require('../controllers/DogController');
const DogController = require('../controllers/DogController');
const ensureOwner = require('../middleware/auth');
const Dog = require('../models/DogModel');
// const UserController = require('../controllers/UserController');
const router = express.Router();
//Get all dawgs
router.get('/', DogController.getAllDogs);
//Get Dog by ID
router.get('/:id', DogController.getDog);
//Route for Dog Registration/Creation?
router.post('/register', ensureOwner, async (req, res) => {
    const { name, breed, age, personality, owner_id} = req.body;
    try {
    const newDog = await Dog.create({ name, breed, age, personality, owner_id: req.user.id });
        if (!newDog) {
            console.log('Dog creation failed');
            return res.status(500).json({ error: 'Dog creation failed' });
        }
        res.json(newDog);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Dog creation failed' });
    }
});
//Put for updating Dog
router.put('/:id', ensureOwner, async (req, res) => {
    console.log('PUT request received');
    console.log('Params:', req.params);
    console.log('Body:', req.body);
    const { id } = req.params;
    const { name, breed, age, personality } = req.body;
    try {
        console.log('Looking for dog with id: ', id);
        const dog = await Dog.findByPk(id);
        if(!dog) {
            console.log('Dog not found');
            return res.status(404).json({ error: 'Dog not found'});
        }
        console.log('Dog found: ', dog);
        if (name) dog.name = name;
        if (breed) dog.breed = breed;
        if (age) dog.age = age;
        if (personality) dog.personality = personality;
        await dog.save();
        res.json({ message: 'Dog Updated Successfully!', dog });
    } catch (error) {
        console.error('Error updating dog: ', error);
        res.status(500).json({ error: 'Server error' });
    }
});
module.exports = router;