const { Sequelize } = require("../config/db");
const { DataTypes, STRING, INTEGER } = require('sequelize');
const { Dog } = require('./DogModel');
require('dotenv').config();

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

const Owner = sequelize.define('Owner', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull:false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull:false,
    },
    password_digest: {
        type: DataTypes.STRING,
        allowNull:false,
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull:false,
    }
});

// Owner.hasMany(Dog, {as:'dogs', foreignKey: 'ownder_id', onDelete: 'CASCADE' });

module.exports = Owner;