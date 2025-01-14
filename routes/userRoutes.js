const express = require('express');
const { getAllUsers } = require('../controllers/UserController');
const router = express.Router();
const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const authenticateToken = require('../middleware/auth');

console.log('authenticate token', authenticateToken);

// Route for User Registration
router.post('/register', async (req, res) => {
    const { username, password, email, role} = req.body;
    try {
    const newUser = await User.create({ username, password, email, role });
        if (!newUser) {
            console.log('User creation failed');
            return res.status(500).json({ error: 'User creation failed' });
        }
        res.json(newUser);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'User creation failed' });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ where: { username }});
        if (!user) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }
        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
        // console.log(token);
        res.json({ token });
        console.log(`JWT Token Issued: ${token}`);
        console.log('Username is: ' + user.dataValues.username);
        console.log('Role is: ' + user.dataValues.role);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.put('/:id', async (req, res) => {
    console.log('PUT request received');
    console.log('Params:', req.params);
    console.log('Body:', req.body);
    const { id } = req.params;
    const { username, email } = req.body;
    
    try {
        console.log('Looking for user with id:', id);
        const user = await User.findByPk(id);
        if (!user) {
            console.log('User not found');
            return res.status(404).json({ error: 'User not found' });
        }
        
        console.log('Found user:', user);
        if (username) user.username = username;
        if (email) user.email = email;
        
        await user.save();
        res.json({ message: 'User updated successfully', user });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.post('/logout', async (req, res) => {
    res.status(200).json({ message: 'Logged out succesfuly' });
});

router.get('/me', authenticateToken, async (req, res) => {
    try {
      const user = await User.findByPk(req.user.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch user data' });
    }
  });
router.get('/', getAllUsers);


  

// router.get('/owner', getOwner);
// router.get('/walker', getWalker);


module.exports = router;