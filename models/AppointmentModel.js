const { Sequelize } = require("sequelize");
const { DataTypes, INTEGER, DATE } = require('sequelize');
const { Dog } = require('./DogModel');
const { Owner } = require('./OwnerModel');
const { Walker } = require('./WalkerModel');
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

const Appointment = sequelize.define('Appointment', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    dog_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    walker_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
});

// Appointment.belongsTo(Walker, { foreignKey: 'walker.id', onDelete: 'CASCADE'});
// Appointment.belongsTo(Dog, {foreignKey: 'dog.id', onDelete: 'CASCADE' });

module.exports = Appointment;