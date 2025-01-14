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
        const { id, walker_id } = req.params;

        let appointment;
        // Check if the request is for an appointment by 'id'
        if (id) {
            appointment = await Appointment.findOne({
                where: { id }
            });
        } 
        // Check if the request is for appointments by 'walker_id'
        else if (walker_id) {
            appointment = await Appointment.findAll({
                where: { walker_id }
            });
        }

        if (!appointment || (Array.isArray(appointment) && appointment.length === 0)) {
            console.log('ID:', id || walker_id);
            console.log('Type of ID:', typeof (id || walker_id));
            return res.status(404).json({ message: 'Appointment(s) not found' });
        }

        // Add appointment(s) to request object to use in the next route
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