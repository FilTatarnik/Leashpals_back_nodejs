const express = require('express');
const AppointmentController = require('../controllers/DogController');
const { getAllAppointments, getAppointment } = require('../controllers/AppointmentController');
const Appointment = require('../models/AppointmentModel');
const router = express.Router();

//GET all Appointments
router.get('/', getAllAppointments);

//GET Appointment by ID
router.get('/:id', getAppointment);
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
//POST create Appointment
router.post('/register', async (req, res) => {
    const { dog_id, walker_id } = req.body;
    try {
        const newAppointment = await Appointment.create({ dog_id, walker_id });
            if (!newAppointment) {
                console.log('Appointment Creation Failed');
                return res.status(500).json({ error: 'Appointment creation failed' });
            }
            res.json(newAppointment);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Appointment creation failed.'});
    }
});


module.exports = router;