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
// const getDog = async (req, res) => {
//     try {
//         const dog = await Dog.findOne({
//             where: {
//                 id: id
//             }
//         });
//         console.log(dog);
//         if (dog) {
//             res.json(dog);
//         }
//         else {
//             console.log('ID:', req.params.id);
//             console.log('Type of ID:', typeof req.params.id);
//             res.status(404).json({ message: 'Dog not found' });
//         }
//     } catch (err) {
        
//     }
// };
module.exports = {
    getAllDogs,
    // getDog,
}