const Appointment = require('../models/AppointmentModel.js');
const sequelize = require('../config/db');

const getAllAppointments = async (req, res) => {
    try {
        const appointment = await Appointment.findAll();
        console.log(appointment);
        res.json(appointment);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server Error' });
    }
}

const getAppointment = async (req, res, next) => {
    try {
        const id = req.params.id;
        const appointment = await Appointment.findOne({
            where: { id }
        });

        if (!appointment) {
            console.log('ID: ', req.params.id);
            console.log('Type of ID: ', typeof req.params.id);
            return res.status(404).json({ message: 'Appointment not found' });
        }

        // Add appointment to request object to use in the next route
        req.appointment = appointment;
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.log(error);  // Corrected error logging
        res.status(500).json({ message: 'Failed to fetch Appointment' });
    }
};

module.exports = {
    getAllAppointments,
    getAppointment,
}