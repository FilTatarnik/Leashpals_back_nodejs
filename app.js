require('dotenv').config();
// const {createServer} = require('node:http');
const express = require('express');
const { Sequelize } = require('sequelize');
// const walkerRoutes = require('./routes/walkerRoutes');
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
app.use(express.json());
// app.use('/api', walkerRoutes);
// app.get('/', (req, res) => res.send('Hello World!'))
// app.listen(PORT, () => console.log(`Example app listening on port ${port}!`))

sequelize.sync()
  .then(() => {
    app.listen(PORT, HOST, () => {
      console.log(`Server is running at http://${HOST}:${PORT}/`);
    });
  })
  .catch(err => {
    console.error('Unable to sync database:', err);
  })

