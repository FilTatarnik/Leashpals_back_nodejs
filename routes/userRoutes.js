const express = require('express');
const { getAllUsers } = require('../controllers/UserController');
const router = express.Router();
const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

// Route for User Registration
router.post('/register', async (req, res) => {
    //getting the username, password, email, and role from the request body
    const { username, password, email, role} = req.body;
    try {
    //create a new user with provided data
    const newUser = await User.create({ username, password, email, role });
        //if newUser is not defined, then the user creation failed
        if (!newUser) {
            console.log('User creation failed');
            return res.status(500).json({ error: 'User creation failed' });
        }
        //send newly created user as response
        res.json(newUser);
    } catch (error) {
        //log error and send response with error message
        console.log(error);
        res.status(500).json({ error: 'User creation failed' });
    }
    //Todo: add validation and error handling here

    //Todo: add error handling here

});

router.post('/login', async (req, res) => {
    //getting the username and password from the request body
    const { username, password } = req.body;

    try {
        //find user by username
        const user = await User.findOne({ where: { username }});
        //If User doesn't exist, send error
        if (!user) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }
        //check password
        const isMatch = await bcrypt.compare(password, user.password);

        //if password doesn't match, send error
        if(!isMatch) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }
        //if login is successful, generate and send token
        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
    //Todo add validation and err handling



    //log user in by setting a cookie or session variable
    
    //redirect to home page based on user role
    
//old
});
router.get('/', getAllUsers);
// router.get('/owner', getOwner);
// router.get('/walker', getWalker);


module.exports = router;