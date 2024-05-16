const Walker = require('../models/WalkerModel');

const getAllWalkers = async (req, res) => {
    try {
        const walkers = await Walker.findAll();
        res.json(walkers);
        // res.status(200).json(walkers);
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
    //  createWalker
};
