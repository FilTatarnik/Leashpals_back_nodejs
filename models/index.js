// const Sequelize = require('sequelize');
const sequelize = require('../config/db.js');

const Walkers = require('./WalkerModel.js');
const Appointments = require('./AppointmentModel.js');
const Dogs = require('./DogModel.js');
const Owners = require('./OwnerModel.js');


// Each Appointment belongs to one Walker
Appointments.belongsTo(Walkers, { foreignKey: 'walkerId', onDelete: 'CASCADE' });

// Each Appointment belongs to one Dog
Appointments.belongsTo(Dogs, { foreignKey: 'dogId', onDelete: 'CASCADE' });

// Each Appointment belongs to one Owner
Appointments.belongsTo(Owners, { foreignKey: 'ownerId', onDelete: 'CASCADE' });

// An Owner can have many Dogs
Owners.hasMany(Dogs, { foreignKey: 'ownerId', onDelete: 'CASCADE' });

// An Owner can have many Appointments
Owners.hasMany(Appointments, { foreignKey: 'ownerId', onDelete: 'CASCADE' });

// A Walker can have many Appointments
Walkers.hasMany(Appointments, { foreignKey: 'walkerId', onDelete: 'CASCADE' });

// A Dog can have one Appointments
Dogs.hasOne(Appointments, { foreignKey: 'dogId', onDelete: 'CASCADE' });

module.exports = {
    sequelize,
    Walkers,
    Appointments,
    Dogs,
    Owners,
};