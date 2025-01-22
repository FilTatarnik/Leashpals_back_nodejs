const User = require('../models/UserModel');
const Owner = require('../models/OwnerModel');
const Walker = require('../models/WalkerModel');
const Dog = require('../models/DogModel');
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

const registerUser = async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    if (!username || !email || !password || !role) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashedPassword, role });
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

//Owners
const getAllOwners = async (req, res) => {
  try {
      const owners = await User.findAll({
        where: {
          role: 'owner'
        }
      });
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
              id: id,
              role: 'owner'
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

//Dogs
const getAllDogs = async (req, res) => {
  try {
    const dogs = await Dog.findAll();
    console.log(dogs);
    res.json(dogs);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
}

//Appointments

module.exports = { getAllUsers, getAllWalkers, getWalker, getAllOwners, getOwner, getAllDogs,registerUser, loginUser }; // Export the function