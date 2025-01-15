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

const getAppointmentByOwnerId = async (req, res) => {
    try {
        const ownerId = req.params.id;
        const appointments = await Appointment.findAll({
            include: [{
                model: Dog,
                where: { owner_id: ownerId }
            }]
        });

        if (!appointments.length) {
            console.log('Owner ID:', ownerId);
            return res.status(404).json({ message: 'No appointments found for this owner' });
        }

        res.json(appointments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch Owner Appointment Data' });
    }
};
const getAppointmentByWalkerId = async (req, res, next) => {
    try {
        const walkerId = req.params.id;
        const appointment = await Appointment.findAll({ where: {walker_id: walkerId}});
        if(!appointment.length){
            console.log('walker ID: ', walkerId);
            return res.status(400).json({ message: 'No appointments found for this walker'});
        }
        res.json(appointment);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Failed to fetch walker Appointment Data'});
    }
};
module.exports = {
    getAllAppointments,
    getAppointment,
    getAppointmentByOwnerId,
    getAppointmentByWalkerId,
}