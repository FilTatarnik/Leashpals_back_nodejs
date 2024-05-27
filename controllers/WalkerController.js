const Walker = require('../models/WalkerModel');
const sequelize = require('../config/db');

const getAllWalkers = async (req, res) => {
    try {
        const walkers = await User.findAll({
            where: {
                role: 'walkers'
            }
        });
        console.log(walkers);
        res.json(walkers);
        // res.status(200).json(walkers);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

const getWalker = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const walker = await Walker.findOne({
            where: {
                id: id,
                role: 'walker'
            }
        });
        console.log(walker);
        if (walker) {
            res.json(walker);
        }
        else {
            console.log('ID:', req.params.id);
            console.log('Type of ID:', typeof req.params.id);
            res.status(404).json({ message: 'Walker not found' });
            // res.status(200).json(walkers);
        } 
    } catch (err) {

        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// const createWalker = async (req, res) => {
//     try {
//         const walkers = await Walker.create(req.body);
//         res.status(201).json(walker);

//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

module.exports = {
     getAllWalkers,
     getWalker, 
    //  createWalker
};
