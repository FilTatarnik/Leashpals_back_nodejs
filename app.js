require('dotenv').config();
// const {createServer} = require('node:http');
const express = require('express');
const { Sequelize } = require('sequelize');
const walkerRoutes = require('./routes/walkerRoutes');
// const ownerRoutes = require('./routes/ownerRoutes');
const dogRoutes = require('./routes/dogRoutes');
const userRoutes = require('./routes/userRoutes');
const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '127.0.0.1';

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
//app routes
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello World! Click here to go see the Users <a href="/users">Users</a>');
});
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
//routes
app.use('/users/walkers', require('./routes/walkerRoutes'));
app.use('/users', userRoutes);
// app.use('/', ownerRoutes);
// app.use('/', dogRoutes);

sequelize.authenticate()
  .then(() => console.log('Database connection has been established successfully.'))
  .catch(error => console.error('Unable to connect to the database:', error));

// sequelize.sync()
//   .then(() => {
//     app.listen(PORT, HOST, () => {
//       console.log(`Server is running at http://${HOST}:${PORT}/`);
//     });
//   })
//   .catch(err => {
//     console.error('Unable to sync database:', err);
//   })

module.exports = {
  PORT,
  HOST,
}

