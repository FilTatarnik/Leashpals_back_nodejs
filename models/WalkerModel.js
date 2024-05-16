const { Sequelize } = require("../config/db");
const { DataTypes, STRING, INTEGER } = require('sequelize');
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
const Walker = sequelize.define('Walker', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password_digest: {
        type: DataTypes.STRING,
        allowNull:false,
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
});

module.exports = Walker;