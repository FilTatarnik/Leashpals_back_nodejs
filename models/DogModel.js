const { Sequelize } = require('../config/db');
const { DataTypes, INTEGER, STRING } = require('sequelize');
const { Owner } = require('./OwnerModel');
const { Appointment } = require('./AppointmentModel');
const { Walkers } = require('./WalkerModel');

const Dog = sequelize.define('Dog', {
    name: {
        type: DataTypes,STRING,
        allowNull:false,
    },
    breed: {
        type: DataTypes,STRING,
        allow
    }
})
