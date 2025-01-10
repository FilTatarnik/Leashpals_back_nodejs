require('dotenv').config();
const express = require('express');
const cors = require('cors'); // Import CORS middleware
const router = express.Router();
const { Sequelize } = require('sequelize');
const walkerRoutes = require('./routes/walkerRoutes');
const ownerRoutes = require('./routes/ownerRoutes');
const dogRoutes = require('./routes/dogRoutes');
const userRoutes = require('./routes/userRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const User = require('./models/UserModel');
const app = express();
const PORT = process.env.PORT || 42069;
const HOST = process.env.HOST || '127.0.0.1';
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

// Database connection
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
  }
);

// Middleware
const auth = async (req,res,next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    if(!token){
      throw new Error('No token provided');
    }
   
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findByPk(decoded.id);
  if(!user){
    throw new Error('User not found');
  }

  req.user = user;
  req.token = token;
  next();
} catch (error) {
  res.status(401).json({ error: 'Please Authenticate'})
}
};

const authorize = (roles = []) => {
  return(req,res,next) => {
    if(!roles.includes(req.user.role)){
      return res.status(403).json({ error: 'not authorized'});
    }
    next();
  }
}
//Middleware
app.use(cors()); // Enable CORS for all origins (for development)
app.use(express.json());


// Routes
app.use('/api/users', userRoutes);
app.use('/users', userRoutes);
app.use('/api', router);
app.get('/', (req, res) => {
  res.send(
    'Hello World! Click here to go see the Users <a href="/users">Users</a> \nClick here to go see the Walkers <a href="/users/walkers">Walkers</a> Click here to go see the Owners <a href="/users/owners">Owners</a> Click here to go see the Dogs <a href="/dogs">Dogs</a>. Click here to see the Appointments <a href="/appointments">Appointments</a>')
});
app.use('/appointments', require('./routes/appointmentRoutes'));
app.use('/users/walkers', require('./routes/walkerRoutes'));
app.use('/users/owners', require('./routes/ownerRoutes'));
app.use('/dogs/', require('./routes/dogRoutes'));
app.use('/me', userRoutes);

// Start server
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));

// Database authentication
sequelize.authenticate()
  .then(() => console.log('Database connection has been established successfully.'))
  .catch(error => console.error('Unable to connect to the database:', error));

module.exports = {
  PORT,
  HOST,
  auth,
  authorize,
};
