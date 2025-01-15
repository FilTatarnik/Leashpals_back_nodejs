// const Sequelize = require('sequelize');
const sequelize = require('../config/db.js');

const Walkers = require('./WalkerModel.js');
const Appointments = require('./AppointmentModel.js');
const Dogs = require('./DogModel.js');
const Owners = require('./OwnerModel.js');


// Each Appointment belongs to one Walker
Appointments.belongsTo(Walkers, { foreignKey: 'walker_Id', onDelete: 'CASCADE' });

// Each Appointment belongs to one Dog
Appointments.belongsTo(Dogs, { foreignKey: 'dog_Id', onDelete: 'CASCADE' });

// Each Appointment belongs to one Owner
Appointments.belongsTo(Owners, { foreignKey: 'owner_Id', onDelete: 'CASCADE' });

// An Owner can have many Dogs
Owners.hasMany(Dogs, { foreignKey: 'owner_Id', onDelete: 'CASCADE' });

// An Owner can have many Appointments
Owners.hasMany(Appointments, { foreignKey: 'owner_Id', onDelete: 'CASCADE' });

// A Walker can have many Appointments
Walkers.hasMany(Appointments, { foreignKey: 'walker_Id', onDelete: 'CASCADE' });

// A Dog can have one Appointments
Dogs.hasOne(Appointments, { foreignKey: 'dog_Id', onDelete: 'CASCADE' });

module.exports = {
    sequelize,
    Walkers,
    Appointments,
    Dogs,
    Owners,
};