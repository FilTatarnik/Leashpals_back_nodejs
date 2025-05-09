const { Sequelize } = require('../config/db');
const { DataTypes, INTEGER, STRING } = require('sequelize');
const { Owner } = require('./OwnerModel');

const { Appointment } = require('./AppointmentModel');
const { Walkers } = require('./WalkerModel');
const { 
    PrimaryKey,
    Attribute,
    AutoIncrement,
    NotNull,
    HasOne,
    BelongsTo
   } = require('@sequelize/core/decorators-legacy');
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

const Dog = sequelize.define('Dog', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes,STRING,
        allowNull:false
    },
    breed: {
        type: DataTypes,STRING,
        allowNull:false
    },
    age: {
        type: DataTypes, INTEGER,
        allowNull: false
    },
    personality: {
        type: DataTypes, STRING,
        allowNull: true
    },
    owner_id: {
        type: DataTypes, INTEGER,
        allowNull: false
    }

})


module.exports = Dog;

// Dog.belongsTo(Owner, { foreignKey: 'owner_id' });