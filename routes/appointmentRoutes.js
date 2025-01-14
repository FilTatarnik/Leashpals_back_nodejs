const express = require('express');
const AppointmentController = require('../controllers/DogController');
const { getAllAppointments, getAppointment } = require('../controllers/AppointmentController');
const Appointment = require('../models/AppointmentModel');
const router = express.Router();

//GET all Appointments
router.get('/', getAllAppointments);

//GET Appointment by ID
router.get('/:id', getAppointment);

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