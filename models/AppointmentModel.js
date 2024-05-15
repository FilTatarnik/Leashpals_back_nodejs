const { Sequelize } = require("../config/db");
const { DataTypes, INTEGER, DATE } = require('sequelize');
const { Dog } = require('./DogModel');
const { Owner } = require('./OwnerModel');
const { Walker } = require('./WalkerModel');


const Appointment = sequelize.define('Appointment', {
    data: {
        type: DataTypes,DATE,
        allowNull:false,
    },
    dog_id: {
        type: DataTypes,INTEGER,
        allowNull: false,
    },
    walker_id: {
        type: DataTypes, INTEGER,
        allowNull: false,
    }
});

Appointment.belongsTo(Walker, { foreignKey: 'walker.id', onDelete: 'CASCADE'});
Appointment.belongsTo(Dog, {foreignKey: 'dog.id', onDelete: 'CASCADE' });

module.exports = Appointments;