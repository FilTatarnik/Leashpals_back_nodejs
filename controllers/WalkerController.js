const Walker = require('../models/WalkerModel');

const getAllWalkers = async (req, res) => {
    try {
        const walkers = await Walker.findAll();
        res.status(200).json(walkers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createWalker = async (req, res) => {
    try {
        const walkers = await Walker.create(req.body);
        res.status(201).json(walker);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
     getAllWalkers, 
     createWalker,
};
