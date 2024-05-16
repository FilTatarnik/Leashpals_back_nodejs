// const Sequelize = require('sequelize');
const sequelize = require('../config/db.js');

const Walkers = require('./WalkerModel.js');
const Appointments = require('./AppointmentModel.js');
const Dogs = require('./DogModel.js');
const Owners = require('./OwnerModel.js');


// Appointments.belongsTo(Walkers, { foreignKey: 'walker.id', onDelete: 'CASCADE'});
// Appointments.belongsTo(Dogs, {foreignKey: 'dog.id', onDelete: 'CASCADE' });
// Owners.hasMany(Dogs, {as:'dogs', foreignKey: 'dog_id', onDelete: 'CASCADE' });
// Walkers.belongsToMany(Appointments, { through: 'Owners'});
// // Dog.belongsTo(Owner,foreignKey: 'ownder.id', onDelete: 'CASCADE' );
// Dogs.hasMany(Appointments, { through: 'Owners'});

module.exports = {
    sequelize,
    Walkers,
    Appointments,
    Dogs,
    Owners,
};