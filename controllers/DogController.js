const Dog = require('../models/DogModel');
const sequelize = require('../config/db');

const getAllDogs = async (req, res) => {
    try {
        const dogs = await Dog.findAll();
        console.log(dogs);
        res.json(dogs);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
}
const getDog = async (req, res) => {
    try {
        const id = req.params.id; // Extract the ID from route parameters
        const dog = await Dog.findOne({
            where: { id }
        });

        if (!dog) {
            console.log('ID:', req.params.id);
            console.log('Type of ID:', typeof req.params.id);
            return res.status(404).json({ message: 'Dog not found' });
        }

        res.json(dog); // Send the dog data as the response
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch Dog data' });
    }
};
module.exports = {
    getAllDogs,
    getDog,
}