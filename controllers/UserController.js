const User = require('../models/UserModel');
const Owner = require('../models/OwnerModel');
const Walker = require('../models/WalkerModel');
 // Import your User model

//Users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

//Walkers
const getAllWalkers = async (req, res) => {
  try {
      const walkers = await User.findAll({
          where: {
              role: 'walker'
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
              id: id
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

//Owners
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
module.exports = { getAllUsers, getAllWalkers, getWalker, getAllOwners, getOwner }; // Export the function