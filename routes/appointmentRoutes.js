const express = require('express');
const AppointmentController = require('../controllers/DogController');
const { getAllAppointments, getAppointment } = require('../controllers/AppointmentController');
const Appointment = require('../models/AppointmentModel');
const router = express.Router();

//GET all Appointments
router.get('/', getAllAppointments);

//GET Appointment by ID
router.get('/:id', getAppointment, (req, res) => {
    res.json(req.appointment);  // Return the single appointment found
});
// GET Appointment by Walker_id
router.get('/walker/:walker_id', getAppointment, (req, res) => {
    res.json(req.appointment);  // Return the list of appointments for the walker
});
// PUT Update Appointment
router.put('/:id', getAppointment, async (req, res) => {
    console.log('PUT request received');
    console.log('Params:', req.params);
    console.log('Body:', req.body);

    const { dog_id, walker_id } = req.body;
    const appointment = req.appointment;  // Now using the appointment from the middleware

    try {
        console.log('Looking for Appointment with ID: ', req.params.id);
        if (dog_id) appointment.dog_id = dog_id;
        if (walker_id) appointment.walker_id = walker_id;

        await appointment.save();
        res.json({ message: 'Appointment updated successfully!', appointment });
    } catch (error) {
        console.log('Error updating appointment: ', error);
        res.status(500).json({ error: 'Server error' });
    }
});
// POST create Appointment
router.post('/register', async (req, res) => {
    const { dog_id, walker_id, datetime } = req.body;

    try {
        if (!dog_id || !walker_id || !datetime) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const dt = new Date(datetime);
        if (isNaN(dt.getTime())) {
            return res.status(400).json({ message: 'Invalid datetime format' });
        }

        const dateOnly = dt.toISOString().split('T')[0]; // YYYY-MM-DD
        const timeOnly = dt.toTimeString().split(' ')[0]; // HH:MM:SS

        const newAppointment = await Appointment.create({
            dog_id,
            walker_id,
            date: dateOnly,
            time: timeOnly,
            status: 'scheduled',
        });

        res.status(201).json(newAppointment);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Appointment creation failed.' });
    }
});

//DELETE appointment
router.delete('/:id', getAppointment, async( req, res) => {
    const { id } = req.params;
    try {
        console.log('Trying to Delete Appointment with id:', id);
        const appointment = await Appointment.findByPk(id);
        if(!appointment){
            console.log('appointment not found.');
            return res.status(404).json({ error: 'appointment not found'});
        } 
        console.log('appointment found: ', appointment);
        await appointment.destroy();
        res.json({ message: 'appointment Deleted Successfully!', appointment});
    } catch (error) {
        console.log('Error deleting appointment', error);
        res.status(500).json({ error: 'Server error '});
    }
});

module.exports = router;