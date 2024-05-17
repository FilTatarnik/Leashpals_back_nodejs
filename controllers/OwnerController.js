const Owner = require('../models/OwnerModel');
const sequelize = require('../config/db');

const getAllOwners = async (req, res) => {
    try {
        const owners = await Owner.findAll();
        console.log(owners);
        res.json(owners);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

const getOwner = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const owner = await Owner.findOne({
            where: {
                id: id
            }
        });
        console.log(owner);
        if (owner) {
            res.json(owner);
        }
        else {
            console.log('ID:', req.params.id);
            console.log('Type of ID:', typeof req.params.id);
            res.status(404).json({ message: 'Owner not found' });
        }
    } catch (err) {
        
    }
}
module.exports = {
    getAllOwners,
    getOwner,
};