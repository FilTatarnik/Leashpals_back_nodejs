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
router.get('/users/me', authenticateToken, async (req, res) => {
    try {
      const user = await User.findByPk(req.user.id);
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch user data' });
    }
});
router.get('/', getAllUsers);


  

// router.get('/owner', getOwner);
// router.get('/walker', getWalker);


module.exports = router;