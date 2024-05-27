const express = require('express');
const { getAllUsers } = require('../controllers/UserController');
const router = express.Router();
const { User } = require('../models/UserModel');

// Route for User Registration
router.post('/register', async (req, res) => {
    //getting the username, password, email, and role from the request body
    const { username, password, email, role} = req.body;
    try {
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

    //create a new user with provided data
    const newUser = await User.create({ username, password, email, role });

    //Todo: add error handling here

    //send the newly created user as response
    res.json(newUser);
});

router.post('/login', async (req, res) => {
    //getting the username and password from the request body
    const { username, password } = req.body;

    //Todo add validation and err handling

    //check password

    //log user in by setting a cookie or session variable
    
    //redirect to home page based on user role
    
//old
});
router.get('/', getAllUsers);
// router.get('/owner', getOwner);
// router.get('/walker', getWalker);


module.exports = router;